import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { MemoizedImageSlider } from '@/components/common/ImageSlider'; 
import { ImageType } from '@/types';
import { Empty } from '@/components/common/Empty';
import { ThemeProps } from "@/theme";

// --- School Slider Component ---
export type SchoolSliderProps = {
  theme: ThemeProps
  images: ImageType[];
  message?: string;
  containerStyle?: any
}

export function SchoolSlider({theme, images, message, containerStyle }: SchoolSliderProps) {
  const { t } = useTranslation();
  const imagesAvailable = useMemo(() => !!images?.length, [images]);
  const style: StyleProp<ViewStyle> = [
    containerStyle,
    {marginTop: 10}
  ];

  return (
    <View style={style}>
      {imagesAvailable ? (
        <MemoizedImageSlider images={images} />
      ) : (
        <Empty message={t(message ?? "no_image")} />
      )}
    </View>
  );
}