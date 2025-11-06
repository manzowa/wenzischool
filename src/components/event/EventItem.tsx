import React, { useMemo, useEffect, useRef } from "react";
import { StyleSheet, View, Image, Animated, TouchableOpacity } from "react-native";
import { TextCustom, IconCustom } from "@/utils/custom";
import { formatDate, isDatePassedOrValid } from "@/utils/helpers";
import { Colors, AppStyle } from "@/constants";
import { SchoolType } from "@/utils/types";

type IconCustomProps = {
  iconName?: any,
  source?: string,
  text?: string
};
type SchoolImage = SchoolType['images'][number];

const RowItem = ({ iconName, source, text }: IconCustomProps) => (
  <View style={s.containerRow}>
    <IconCustom iconName={iconName} source={source} size={16} style={s.icon} />
    <TextCustom color="secondary" type={source === "title" ? "captionBold" : "caption"}>{text}</TextCustom>
  </View>
);

const StatusMessage = (date?:any) => {

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
    outputRange: ['#888', Colors.primary],
  });

  // Create Animated version of your IconCustom
  const AnimatedIcon = Animated.createAnimatedComponent(IconCustom);

  return (
    <View style={s.status}>
      <Animated.Text style={{ color: animatedColor, fontSize: 14,  flexDirection: 'row', alignItems: 'center' }}>
         <AnimatedIcon
          iconName="Entypo"
          source="time-slot"
          size={16}
          color={animatedColor} 
        />
        {!isDatePassedOrValid(date) ? ' En cours ' : ' Passé '}
      </Animated.Text>
    </View>
  );
};

type EventItemProps = {
  id: number;
  titre: string;
  description: string;
  date: string;
  lieu: string;
  images?: SchoolImage[],
  onPress?: () => void;
};

export const EventItem = ({ titre, description, date, lieu, images, onPress }: EventItemProps) => {
  const scale = useRef(new Animated.Value(1)).current;
  const formaDated: string = formatDate(date);

  const image: SchoolImage | null = useMemo(() => {
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

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
    <Animated.View style={[s.container,  AppStyle.boxShadow]}>
      {image?.url && (
        <Image source={{ uri: image.url }} style={s.image} />
      )}
      <View style={AppStyle.bg}>
        <RowItem
          iconName="MaterialIcons"
          source="title"
          text={titre?.toString()}
        />
        <RowItem
          iconName="MaterialIcons"
          source="place"
          text={lieu?.toString()}
        />
        <RowItem
          iconName="FontAwesome6"
          source="calendar-days"
          text={formaDated.toString() + " "}
        />
      </View>
      <StatusMessage date={date} />
    </Animated.View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.light,
    padding: 2,
    borderRadius: 8,
    gap: 4,
    position: "relative"
  },
  image: {
    width: 140,
    height: 200,
    borderRadius: 8,
    backgroundColor: "#ccc",
    resizeMode: "cover",
  },
  containerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingRight: 15
  },
  icon: {
    color: Colors.primary,
    marginTop: 2,
    marginRight: 8,
  },
  status: {
    position: 'absolute',
    top: 8,
    left: 5,
    backgroundColor: Colors.light,
    opacity: 0.8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.light,
    borderRadius: 4,
  }
});