import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  memo,
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

interface ImageSliderProps {
  images: string[];
  autoSlideInterval?: number; // ms
}

interface ItemProps {
  item: string;
  width: number;
}

const ImageItem = memo(({ item, width }: ItemProps) => (
  <Image source={{ uri: item }} style={[styles.image, { width }]} resizeMode="cover" />
));

const ImageSlider: React.FC<ImageSliderProps> = ({ images, autoSlideInterval = 3000 }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const sliderHeight = isLandscape ? height * 0.7 : width * 0.6;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const flatListRef = useRef<FlatList<string>>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
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

  const onScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setCurrentIndex((prevIndex) => (prevIndex !== newIndex ? newIndex : prevIndex));
  }, [width]);

  const renderItem = useCallback(({ item }: { item: string }) => (
    <ImageItem item={item} width={width} />
  ), [width]);

  const keyExtractor = useCallback((item: string) => item, []);

  const togglePlayPause = () => setIsPlaying((prev) => !prev);

  // Gestion de l'échec du scroll vers index (pour éviter crash)
  const onScrollToIndexFailed = useCallback(({ index }: { index: number }) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }, 100);
  }, []);

  return (
    <View style={[styles.container, { height: sliderHeight }]}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        initialScrollIndex={currentIndex}
        onScrollToIndexFailed={onScrollToIndexFailed}
        initialNumToRender={2}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true} // supprime les éléments hors écran
      />
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index.toString()}
            style={[styles.dot, currentIndex === index ? styles.activeDot : styles.inactiveDot]}
          />
        ))}
      </View>
      <TouchableOpacity onPress={togglePlayPause} style={styles.button}>
        <Text style={styles.buttonText}>
          {isPlaying ? '⏸ Pause' : '▶️ Play'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  image: {
    height: '100%',
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
});

export default memo(ImageSlider);
