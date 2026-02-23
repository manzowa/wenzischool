import React from "react";
import {
    TouchableOpacity,
    Text,
    Linking,
    Alert,
    GestureResponderEvent,
    StyleProp,
    ViewStyle,
    TextStyle
} from "react-native";

export type CustomButtonLinkProps = {
    url: string;
    title: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>
};

const CustomButtonLink: React.FC<CustomButtonLinkProps> = ({
    url,
    title,
    style,
    textStyle

}) => {
    const handlePress = async (event: GestureResponderEvent) => {
        try {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert("Erreur", `Impossible d'ouvrir l'URL : ${url}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert("Erreur", error.message);
            } else {
                Alert.alert("Erreur", "Une erreur inconnue est survenue.");
            }
        }
    };

    return (
        <TouchableOpacity style={[style]} onPress={handlePress}>
            <Text style={[textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};
CustomButtonLink.displayName = "CustomButtonLink";
export default CustomButtonLink;