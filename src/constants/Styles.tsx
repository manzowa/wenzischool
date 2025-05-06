import { TextStyle, StyleProp } from 'react-native';
import { Colors, Fonts } from "@/constants";

type Style =  {
    titleText: TextStyle;
    subtitleText: TextStyle;
    bodyText: TextStyle;
    captionText: TextStyle;
};
  
export const Styles = {
    titleText: {
        fontFamily: 'Comfortaa-Bold',
        fontSize: 30,
        lineHeight: 38,
        fontWeight: '700',
        letterSpacing: 0.1,
        marginHorizontal: 5
    },
    subtitleText: {
        fontFamily: 'Comfortaa-SemiBold',
        fontSize: 22,
        lineHeight: 30,
        fontWeight: '600',
        letterSpacing: 0.1,
        marginHorizontal: 5
    },
    bodyText: {
        fontFamily: 'Comfortaa-Regular',
        fontSize: 14,
        lineHeight: 22,
        fontWeight: '500',
        letterSpacing: 0.1,
        marginHorizontal: 5
    },
    captionText: {
        fontFamily: 'Comfortaa-Regular',
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '400',
        letterSpacing: 0.1,
        marginHorizontal: 5
    },
    backImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1
    }
};