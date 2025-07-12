import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ImageSlider from '@/components/ImageSlider'; 
import { SchoolType } from '@/utils/types';
import { IconCustom } from '@/utils/custom';
import { Colors } from "@/constants";


type SchoolImage = SchoolType['images'][number];
interface SchoolSliderProps {
  images: SchoolImage[];
}

export function SchoolSlider({ images }: SchoolSliderProps) {
  const imagesAvailable = useMemo(() => !!images?.length, [images]);

  return (
    <View style={styles.container}>
      {imagesAvailable ? (
        <ImageSlider images={images} />
      ) : (
        <View style={styles.empty}>
          <IconCustom
            iconName="MaterialIcons"
            source="image-not-supported"
            size={40}
            color={Colors.primary}
          />
          <Text style={styles.emptyText}>Aucune image disponible</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  empty: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
    fontStyle: 'italic',
  },
});