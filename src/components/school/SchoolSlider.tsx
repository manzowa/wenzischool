import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet} from "react-native";
import ImageSlider from "@/components/ImageSlider";

type SchoolSliderType = {
    images: any[]
}

const ImageEmpty = () => {
    return (
        <View style={s.empty}>
            {/* <Text>Aucune image disponible</Text> */}
        </View>
    )
};

export function  SchoolSlider ({ images }: SchoolSliderType) {
    // Vérifie si le tableau d'images est valide et non vide
    const hasImages = Array.isArray(images) && images.length > 0;
    
    return (
        <View style={s.container}>
            { hasImages ? (<ImageSlider images={images} />) :   (<ImageEmpty />) }
        </View> 
    );
}

const s = StyleSheet.create({
    container:  {
        marginTop: 10
    },
    empty: {
        height: 200,
        justifyContent: "center",
        alignItems: "center"
    }
});