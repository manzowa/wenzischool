import React from 'react';
import { StyleProp, ViewStyle, TextStyle, ImageStyle, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather, Entypo } from '@expo/vector-icons';

type IconName =
  | 'AntDesign'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Ionicons'
  | 'FontAwesome6'
  | 'Feather'
  | 'Entypo'
  | 'Logo';

type IconType = {
  iconName?: IconName;
  source?: string | number; // string (icon name or URL), number (require)
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  onPress?: () => void;
};

const iconMap = {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome6,
  Feather,
  Entypo,
} as const;

export const IconCustom = (props: IconType) => {
  const {
    iconName = 'Ionicons',
    source,
    color = 'black',
    size = 24,
    style,
    onPress,
  } = props;

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
      <TouchableOpacity onPress={onPress}>{image}</TouchableOpacity>
    ) : (
      image
    );
  }

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
