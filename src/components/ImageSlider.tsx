import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  memo
} from 'react';
import {
  View,
  FlatList,
  Image,
  useWindowDimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  Text,
} from 'react-native';

import { ucfirst } from "@/utils/helpers";
import { SchoolType } from '@/utils/types';

type SchoolImage = SchoolType['images'][number];
interface ImageSliderProps {
  images: SchoolImage[];
  autoSlideInterval?: number;
}

interface ItemProps {
  item: SchoolImage;
  width: number;
}

const ImageItem = memo(({ item, width }: ItemProps) => {
  return (
    <View style={[s.imageContainer, { width }]}>
      <Image
        source={{ uri: item.url }}
        style={[s.image, { width }]}
        resizeMode="cover"
        accessibilityLabel={item.title}
      />
      <View style={s.captionContainer}>
        <Text style={s.captionText}>{ucfirst(item.title)}</Text>
        <Text style={s.captionSubText}></Text>
        <Text style={s.captionSubText}></Text>
      </View>
    </View>
  );
}, (prev, next) => prev.item.id === next.item.id && prev.width === next.width);
ImageItem.displayName = 'ImageItem';

const ImageSlider: React.FC<ImageSliderProps> = ({ images, autoSlideInterval = 3000 }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const sliderHeight = isLandscape ? height * 0.7 : width * 0.6;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [layoutReady, setLayoutReady] = useState(false);
  const isFirstRender = useRef(true);

  const flatListRef = useRef<FlatList<SchoolImage>>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const renderItem = useCallback(({ item }: { item: SchoolImage }) => (
    <ImageItem item={item} width={width} />
  ), [width]);

  const keyExtractor = useCallback((item: SchoolImage) => item.id.toString(), []);

  const togglePlayPause = () => setIsPlaying(prev => !prev);

  const onScrollToIndexFailed = useCallback(({ index }: { index: number }) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }, 100);
  }, []);

  if (!layoutReady) return null;

  return (
    <View style={[s.container, { height: sliderHeight }]}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        scrollEnabled={!isPlaying}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onMomentumScrollEnd={onScrollEnd}
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
        onScrollBeginDrag={stopAutoSlide}
        onScrollEndDrag={() => isPlaying && startAutoSlide()}
      />
      <View style={s.pagination}>
        {images.map((_, index) => (
          <View
            key={index.toString()}
            style={[s.dot, currentIndex === index ? s.activeDot : s.inactiveDot]}
          />
        ))}
      </View>
      <TouchableOpacity onPress={togglePlayPause} style={s.button} activeOpacity={0.8}>
        <Text style={s.buttonText}>
          {isPlaying ? '⏸ Pause' : '▶️ Play'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const MemoizedImageSlider = memo(ImageSlider);
MemoizedImageSlider.displayName = 'ImageSlider';
export default MemoizedImageSlider;

const s = StyleSheet.create({
  container: {
    width: '100%',
  },
  image: {
    height: '100%',
  },
  imageContainer: {
    position: 'relative',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
  activeDot: {
    backgroundColor: '#ffffff',
  },
  inactiveDot: {
    backgroundColor: '#6600CC',
  },
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#6600CC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
  },
  captionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  captionSubText: {
    color: '#ddd',
    fontSize: 12,
  },
});