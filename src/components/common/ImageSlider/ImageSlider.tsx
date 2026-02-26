import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  FlatList,
  Image,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity
} from 'react-native';
import { ImageType } from '@/types';
import { ucfirst } from '@/utils/helpers';
import { useAppStyle } from '@/constants';
import { CustomText } from "@/components/custom";
import { useTheme } from '@/hooks';

type ImageItemProps =  {
  item: ImageType;
  width: number;
}

const ImageItem = memo(({ item, width }:  ImageItemProps) => {
  const { theme } = useTheme();
  const ss = useAppStyle({theme});
  return (
    <View style={[ss.imageSliderItemContainer, { width }]}>
      <Image
        source={{ uri: item.url }}
        style={[ss.imageSliderImage, { width }]}
        resizeMode="cover"
        accessibilityLabel={item.title}
      />
      <View style={ss.imageSliderCaptionContainer}>
        <CustomText style={ss.imageSliderCaptionText}> {ucfirst(item?.title ?? "")}</CustomText>
        <CustomText style={ss.imageSliderCaptionSubText}></CustomText>
        <CustomText style={ss.imageSliderCaptionSubText}></CustomText>
      </View>
    </View>
  );
}, (prev, next) => prev.item.id === next.item.id && prev.width === next.width);
ImageItem.displayName = 'ImageItem';

export type ImageSliderProps = {
  images: ImageType[];
  autoSlideInterval?: number;
}
const ImageSlider: React.FC<ImageSliderProps> = ({ images, autoSlideInterval = 3000 }) => {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const sliderHeight = isLandscape ? height * 0.7 : width * 0.6;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [layoutReady, setLayoutReady] = useState(false);
  const isFirstRender = useRef(true);

  const flatListRef = useRef<FlatList<ImageType>>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { theme } = useTheme();
  const ss = useAppStyle({theme});

  useEffect(() => {
    if (width > 0) setLayoutReady(true);
  }, [width]);

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % images.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, autoSlideInterval);
  }, [autoSlideInterval, images.length]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPlaying) startAutoSlide();
    else stopAutoSlide();
    return stopAutoSlide;
  }, [isPlaying, startAutoSlide, stopAutoSlide]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const onScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setCurrentIndex(prevIndex => (prevIndex !== newIndex ? newIndex : prevIndex));
  }, [width]);

  const renderItem = useCallback(({ item }: { item: ImageType }) => (
    <ImageItem item={item} width={width} />
  ), [width]);

  const keyExtractor = useCallback((item: ImageType) => String(item.id ?? ''),[]);
  const togglePlayPause = () => setIsPlaying(prev => !prev);

  const onScrollToIndexFailed = useCallback(({ index }: { index: number }) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }, 100);
  }, []);

  if (!layoutReady) return null;

  return (
    <View style={[ss.imageSliderContainer, ss.shadow, { height: sliderHeight }]}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        scrollEnabled={isPlaying ? false : true}  // Désactive le défilement automatique si en pause
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onMomentumScrollEnd={onScrollEnd}  // Ajoute la logique à la fin du mouvement de défilement
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        initialScrollIndex={isFirstRender.current ? currentIndex : undefined}
        onScrollToIndexFailed={onScrollToIndexFailed}
        initialNumToRender={2}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        extraData={[currentIndex, width]}
        onScrollBeginDrag={stopAutoSlide}  // Arrête l'auto-slide dès que l'utilisateur commence à glisser
        onScrollEndDrag={() => isPlaying && startAutoSlide()}  // Relance l'auto-slide quand l'utilisateur arrête de glisser
      />
      <View style={ss.imageSliderPagination}>
        {images.map((_, index) => (
          <View
            key={index.toString()}
            style={[ss.imageSliderDot, currentIndex === index ? ss.imageSliderActiveDot : ss.imageSliderInActiveDot]}
          />
        ))}
      </View>
      <TouchableOpacity onPress={togglePlayPause} style={ss.imageSliderButton} activeOpacity={0.8}>
        <CustomText style={ss.imageSliderButtonText}> {isPlaying ? '⏸ '+t('pause') : '▶️ '+t('play')}</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const MemoizedImageSlider = memo(ImageSlider);
MemoizedImageSlider.displayName = 'ImageSlider';
export default MemoizedImageSlider;