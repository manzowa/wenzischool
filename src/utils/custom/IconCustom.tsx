import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Feather, Entypo } from "@expo/vector-icons";

type IconType = {
    iconName?: string;
    source?: any;
    color?: string;
    size?: number;
    style?: object
    onPress?: () => void;
};
export const IconCustom = (props: IconType) => {
    const {iconName, source, color, size, style, onPress} = props;
    switch (iconName) {
        case 'AntDesign':
            return (
                <AntDesign 
                    name={source} size={size} 
                    color={color} style={style} onPress={onPress} 
                />
            );
        case 'MaterialCommunityIcons':
            return (
                <MaterialCommunityIcons
                    name={source} size={size} color={color} 
                    style={style} onPress={onPress} 
                />
            );
        case 'MaterialIcons':
            return (
                <MaterialIcons 
                    name={source} size={size} color={color} 
                    style={style} onPress={onPress}
                />
            );
        case 'Ionicons':
            return (
                <Ionicons 
                    name={source} size={size} color={color} 
                    style={style} onPress={onPress}
                />
            );
        case 'Logo':
            return <Image source={source} style={style} contentFit="cover"/>;
        case 'FontAwesome6':
            return (
                <FontAwesome6 
                    name={source} size={size} color={color} 
                    style={style} onPress={onPress}
                />
            );
        case 'Feather':
            return (
                <Feather 
                    name={source} size={size} color={color} 
                    style={style} onPress={onPress}
                />
            );
        case 'Entypo':
            return (
                <Entypo 
                    name={source} size={size} color={color} 
                    style={style} onPress={onPress}
                />
            );
        // Add more icons as needed
        default:
            return (
                <Ionicons 
                    name={source} size={size} color={color} 
                    style={style} onPress={onPress}
                />
            );
    }
};