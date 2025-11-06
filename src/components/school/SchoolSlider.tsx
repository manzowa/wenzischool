import React, { useMemo } from 'react';
import { View } from 'react-native';
import ImageSlider from '@/components/ImageSlider'; 
import { ImageType } from '@/utils/types';
import Empty from '@/utils/Empty';


//type SchoolImage = SchoolType['images'][number];
interface SchoolSliderProps {
  images: ImageType[];
}

export function SchoolSlider({ images }: SchoolSliderProps) {
  const imagesAvailable = useMemo(() => !!images?.length, [images]);

  return (
    <View style={{marginTop: 10}}>
      {imagesAvailable ? (
        <ImageSlider images={images} />
      ) : (
        <Empty message='Aucune image disponible' />
      )}
    </View>
  );
}