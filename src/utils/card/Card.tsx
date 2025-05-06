import { forwardRef, Ref } from "react";
import { View,ViewProps, Text, TextProps, StyleSheet} from 'react-native';
import { Colors } from "@/constants";

type textType = "title"|"subtitle"|"body"|"caption"|"titleBold"|"subtitleBold"|"bodyBold"|"captionBold";
type textColor= "primary"|"secondary"|"light"|"error"|"warning";

type TextCustomProps = TextProps & {
    type?: textType;
    color?: textColor;
}

export const Card = forwardRef<View, ViewProps>(({children, ...props}, ref) => {
    return (
        <View style={[s.card, props.style]} {...props} ref={ref}>
          {children}
        </View>
    )
});
export const CardHeader = forwardRef<View, ViewProps>(({children, ...props}, ref) => {
    return (
        <View style={[s.cardheader, props.style]} {...props} ref={ref}>
          {children}
        </View>
    )
});
export const CardBody = forwardRef<View, ViewProps>(({children, ...props}, ref) => {
    return (
        <View style={[s.cardbody, props.style]} {...props} ref={ref}>
          {children}
        </View>
    )
});
export const CardRow = forwardRef<View, ViewProps>(({children, ...props}, ref) => {
    return (
        <View style={[s.cardrow, props.style]} {...props} ref={ref}>
          {children}
        </View>
    )
});
export const CardFlex = forwardRef<View, ViewProps>(({children, ...props}, ref) => {
    return (
        <View style={[s.cardflex, props.style]} {...props} ref={ref}>
          {children}
        </View>
    )
});
export const CardFlex2 = forwardRef<View, ViewProps>(({children, ...props}, ref) => {
    return (
        <View style={[s.cardflex2, props.style]} {...props} ref={ref}>
          {children}
        </View>
    )
});
export const CardFlex3 = forwardRef<View, ViewProps>(({children, ...props}, ref) => {
    return (
        <View style={[s.cardflex3, props.style]} {...props} ref={ref}>
          {children}
        </View>
    )
});
export const CardTitle = forwardRef<Text, TextProps>(({children,...props}, ref) => {
    return (
        <Text style={[s.cardtitle, props.style]} {...props} ref={ref}>
            {children}
        </Text>
    )
});
export const CardSubtitle = forwardRef<Text, TextProps>(({children,...props}, ref) => {
    return (
        <Text style={[s.cardsubtitle, props.style]} {...props} ref={ref}>
            {children}
        </Text>
    )
});
export const CardText = forwardRef<Text, TextProps>(({children,...props}, ref) => {
    return (
        <Text style={[s.cardtext, props.style]} {...props} ref={ref}>
            {children}
        </Text>
    )
});

const s = StyleSheet.create({
    card: {
        marginTop: 10,
        paddingHorizontal: 4,
        paddingTop: 4,
        paddingBottom: 8,
        borderRadius: 4,
        borderColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: Colors.primary,
        shadowOpacity: 0.3,
        shadowRadius: 6,
        backgroundColor: Colors.light,
        elevation: 5,
    },
    cardheader: {
        borderBottomWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 4,
        marginBottom: 5
    },
    cardbody: {
    },
    cardtitle: {
        padding: 10,
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Comfortaa-Bold',
        color: Colors.primary,
    },
    cardsubtitle: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Comfortaa-SemiBold',
    },
    cardtext: {
        padding: 10,
        fontSize: 14,
        fontFamily: 'Comfortaa',
        lineHeight: 20,
    },
    cardrow: {
        flexDirection: 'row',
        gap: 2
    },
    cardflex: {
        flex: 1,
        padding: 2
    },
    cardflex2: {
        flex: 2,
        padding: 2
    },
    cardflex3: {
        flex: 3,
        padding: 2
    },
});