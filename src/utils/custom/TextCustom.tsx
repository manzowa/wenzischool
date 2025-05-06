import { Text, TextProps, StyleSheet } from 'react-native';
import { Colors } from "@/constants";
import { StyleType} from '@/utils/types';

// You can add more text types if needed
type textType = "title"|"subtitle"|"body"|"caption"|"titleBold"|"subtitleBold"|"bodyBold"|"captionBold"|"small"|"smallBold"|"medium"|"mediumBold";
type textColor= "primary"|"secondary"|"light"|"error"|"warning";

type TextCustomProps = TextProps & {
    type?: textType;
    color?: textColor;
}

export const TextCustom = (({children, type="body", color="primary", style, ...props}: TextCustomProps) => {
    const textStyles: StyleType = {
        title: s.title,
        titleBold: {...s.title, fontWeight: "900"},
        subtitle: s.subtitle,
        subtitleBold: {...s.subtitle, fontWeight: "700"},
        body: s.body,
        bodyBold: {...s.body, fontWeight: "bold"},
        caption: s.caption,
        captionBold: {...s.caption, fontWeight: "bold"},
        small: s.small,
        smallBold: {...s.small, fontWeight: "bold"},
        medium: s.medium,
        mediumBold: {...s.medium, fontWeight: "bold"},
    };
    const textColors = {
        primary: {color: Colors.primary}, 
        secondary: {color: Colors.secondary},
        light: {color: Colors.light},
        error: {color: Colors.error},
        warning: {color: Colors.warning},
        dark: {color: Colors.dark},
    }
    return (
        <Text 
            style={[textColors[color], textStyles[type], style]} 
            {...props}
        >
          {children}
        </Text>
    )
});
const s = StyleSheet.create({
    title:{
        fontFamily: 'Comfortaa-Bold',
        fontSize: 22,
        lineHeight: 34,
        letterSpacing: 0.1,
        marginHorizontal: 5
    },
    subtitle:{
        fontFamily: 'Comfortaa-SemiBold',
        fontSize: 20,
        lineHeight: 30,
        letterSpacing: 0.1,
    },
    body:{
        fontFamily: 'Comfortaa-Regular',
        fontSize: 16,
        lineHeight: 22,
        letterSpacing: 0.1,
    },
    caption: {
        fontFamily: 'Comfortaa-Regular',
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0.1,
        marginHorizontal: 5
    },
    medium: {
        fontFamily: 'Comfortaa-Regular',
        fontSize: 10, 
        lineHeight: 12,
        letterSpacing: 0.1,
    },
    small: {
        fontFamily: 'Comfortaa-Regular',
        fontSize: 8, 
        lineHeight: 10,
        letterSpacing: 0.1,
    },

});