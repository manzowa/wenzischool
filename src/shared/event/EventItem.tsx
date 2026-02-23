import { useTranslation } from 'react-i18next';
import React, { useMemo, useEffect, useRef} from "react";
import { 
  View, Image, ImageProps, 
  Animated, TouchableOpacity,
  StyleProp, ViewStyle,
} from "react-native";
import { 
 CustomText, CustomIcon, CustomIconProps, 
} from "@/components/custom";
import { SchoolType } from "@/types";
import { 
  formatDate, isDatePassedOrValid 
} from "@/utils";
import { createStyles, useAppStyle } from "@/constants";
import { useTheme } from "@/hooks";
import { ThemeProps } from "@/theme";


type RowItemProps = {
  iconName?: any,
  source?: string,
  text?: string
};
// type SchoolImage = SchoolType['images'][number];
type ImageType = NonNullable<SchoolType['images']>[number];


const RowItem = ({ iconName, source, text }: RowItemProps) => {
  const { theme } = useTheme();
  const ss = useAppStyle({ theme });
  return (
  <View style={ss.eventItemRowed}>
    {
      source === "title" ? (
        <CustomText style={[{color: theme.colors.secondary}, ss.small, ss.bold]}>
          {text}
        </CustomText>
      ) : (
        <>
          <CustomIcon iconName={iconName} source={source} size={16} style={ss.eventItemIcon}/>
          <CustomText style={[{color: theme.colors.secondary}, ss.extraSmall]}>{text}</CustomText>
        </>
      )
    }
  </View>
  );
};
type StatusMessageProps = {
  theme: ThemeProps,
  date?: any;
  ongoings?: any;
  past?: any;
};
const StatusMessage = ({theme, date, ongoings, past }: StatusMessageProps) => {
  const ss = useAppStyle({ theme });

  const colorAnim = useRef(new Animated.Value(0)).current;
  // Looping animation
  useEffect(() => {
    const loopAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false, // color animation cannot use native driver
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    loopAnim.start();
    // Optional: cleanup
    return () => loopAnim.stop();
  }, [colorAnim]);

  // Interpolated color for text and icon
  const animatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.secondary, theme.colors.primary], // from gray to primary color
  });

  const AnimatedIcon = Animated.createAnimatedComponent(CustomIcon);
  const iconProps: CustomIconProps = {
    iconName: "Entypo",
    source: "time-slot",
    color: animatedColor,
    size: 16,
  }

  return (
    <View style={ss.eventItemStatus}>
      <Animated.Text style={{color: animatedColor, fontSize: 14, textAlign: 'center'}}>
        <AnimatedIcon {...iconProps} />
        {!isDatePassedOrValid(date) ? ongoings : past}
      </Animated.Text>
    </View>
  );
};

export type EventItemProps = {
  id: number;
  titre: string;
  description: string;
  date: string;
  lieu: string;
  images?: ImageType[],
  onPress?: () => void;
};

export const EventItem = ({titre, date, lieu, images, onPress }: EventItemProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const ss = useMemo(() => createStyles({theme}), [theme]);
  const scale = useRef(new Animated.Value(1)).current;
  const formaDated: string = formatDate(date, false, t("local"));

  const image: ImageType | null = useMemo(() => {
    return images?.[0] ?? null;
  }, [images]);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const titleProps: RowItemProps = {
    iconName: "MaterialIcons",
    source: "title",
    text: titre?.toString()
  }
  const placeProps: RowItemProps = {
    iconName: "MaterialIcons",
    source: "place",
    text: lieu?.toString()
  }
  const calendarProps: RowItemProps = {
    iconName: "FontAwesome6",
    source: "calendar-days",
    text: formaDated.toString() + " "
  }
  const containerStyle: StyleProp<ViewStyle> = [
    ss.eventItemContainer, 
    { transform: [{ scale }] }, 
    ss.shadow
  ];
  const imageProps: ImageProps = {
    source: { uri: image?.url },
    style: ss.eventItemImage,
  };
  const statusMessageProps: StatusMessageProps = {
    theme: theme,
    date: date,
    ongoings: t('ongoing'),
    past: t('past')
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
    <Animated.View style={containerStyle}>
      {image?.url && (<Image {...imageProps} />)}
      <View style={ss.flex}>
        <RowItem {...titleProps} />
        <RowItem {...placeProps} />
        <RowItem {...calendarProps} />
      </View>
      <StatusMessage {...statusMessageProps} />
    </Animated.View>
    </TouchableOpacity>
  );
};