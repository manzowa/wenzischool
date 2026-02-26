import React  from 'react';
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
  ImageSourcePropType 
} from 'react-native';
import { Image } from 'expo-image';
// import type { ImageSource } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather, Entypo } from '@expo/vector-icons';


// Map of icon sets
const iconMap = {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome6,
  Feather,
  Entypo,
} as const;

// Strict union of available icon sets
export type IconName = keyof typeof iconMap | 'Logo';

export type CustomIconProps = {
  iconName?: IconName;
  source?: string | ImageSourcePropType  | number; // string: icon name or URL, number: require(...), ImageSource: image source object
  color?: any;
  size?: number;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  onPress?: () => void;
  disabled?: boolean;
};

export const CustomIcon: React.FC<CustomIconProps> = ({
  iconName = 'Ionicons',
  source,
  color = 'black',
  size = 24,
  style,
  onPress,
  disabled,
}) => {
  
  // Handle Logo (image icon)
  if (iconName === 'Logo') {
    if (!source) return null;

    const imageSource = typeof source === 'string' ? { uri: source } : source;
    const image = (
      <Image
        source={imageSource}
        style={style as StyleProp<ImageStyle>}
        contentFit="cover"
      />
    );

    return onPress ? (
      <TouchableOpacity onPress={onPress} disabled={disabled}>{image}</TouchableOpacity>
    ) : (
      image
    );
  }

  // Get the appropriate icon set component
  const IconComponent = iconMap[iconName] || Ionicons;

  const icon = (
    <IconComponent
      name={source as string}
      size={size}
      color={color}
      style={style as StyleProp<ViewStyle | TextStyle>}
    />
  );

  return onPress ? (
    <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>
  ) : (
    icon
  );
};