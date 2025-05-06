import React, {useState} from "react";
import {
    View, Image, StyleSheet, 
    ScrollView, Dimensions, Text
} from "react-native";
import { Colors } from "@/constants";

type SchoolSliderType = {
    images: any[]
}

export function  SchoolSlider ({ images }: SchoolSliderType) {
    const {width} = Dimensions.get('screen');
    const _width:number = width -40;
    const height = _width * 0.7;
    const [active, setActive] = useState(0);
    const handleChange = (evt: any) => {
        const nativeEvent: any = evt.nativeEvent;
        const _contentOffset = nativeEvent?.contentOffset;
        const _layoutMeasurement = nativeEvent?.layoutMeasurement;
        const slide:number= Math.ceil(
            _contentOffset?.x / _layoutMeasurement?.width
        );
        if (slide !== active) {
            setActive(slide);
        }
    }
    
    return (
        <View style={s.container}>
            <ScrollView
                pagingEnabled
                horizontal
                onScroll={handleChange}
                showsVerticalScrollIndicator={false}
                style= {{ width:_width, height}}
            >
                {images?.map((image, index)=> (
                    <Image 
                        key={index} 
                        source={{uri: image}} 
                        style={{width:_width, height, resizeMode: 'cover'}} 
                    />
                ))}
            </ScrollView>
            <View style={s.pagination}>
                {images?.map((i, k) => (
                    <Text key={k} style={k == active ? s.activeDot: s.dot}>.</Text>
                ))}
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container:  {
        marginVertical: 8,
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: -30,
        alignSelf: "center"
    },
    dot: {
        color: Colors.primary,
        fontSize: 60
    },
    activeDot: {
        color: Colors.light,
        fontSize: 60
    }
});