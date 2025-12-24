import React from "react";
import {
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  View,
  ActivityIndicator,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AppImages, AppStyle, Colors } from "@/constants";
import { EventDetailScreenProps } from "@/utils/types";
import { Widget } from "@/utils/widget";
import { IconCustom, TextCustom , isTextVariant } from "@/utils/custom";
import { formatDate } from "@/utils/helpers";
import { useEvent } from "@/hooks/useEvent";

type RewriteLineProps = {
  iconName?: any;
  source?: string;
  type?: string;
  text?: string;
  color?: any;
};

const RewriteLine = ({ iconName, source, type, text, color }: RewriteLineProps) => (
  <View style={s.lineContainer}>
    <IconCustom iconName={iconName} size={24} color={Colors.primary} source={source} />
    <TextCustom type={isTextVariant(type) ? type : "body"} color={color} style={s.lineText}>
      {text}
    </TextCustom>
  </View>
);

export function EventDetailScreen({ route }: EventDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const { eventId } = route.params;
  const { events, loading } = useEvent(parseInt(eventId));

  const event = events?.[0];

  if (loading) {
    return (
      <SafeAreaView style={[AppStyle.safeArea]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  if (!event) {
    return (
      <SafeAreaView style={[AppStyle.safeArea]}>
        <TextCustom type="body" color="secondary">
          Aucune donnée disponible
        </TextCustom>
      </SafeAreaView>
    );
  }

  const eventDetails = [
    { source: "title", type: "bodyBold", text: event.titre, color: "primary" },
    { source: "description", type: "caption", text: event.description, color: "secondary" },
    { source: "place", type: "caption", text: event.lieu, color: "secondary" },
    {
      source: "calendar-today",
      type: "caption",
      text: formatDate(event.date, true),
      color: "secondary",
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={AppStyle.safeArea}>
        <ImageBackground source={AppImages.background} resizeMode="cover">
          <ScrollView
            contentContainerStyle={{
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            }}
          >
            <Widget style={AppStyle.widgetContainer}>
              <View>
                <Image
                  style={s.image}
                  source={{ uri: event.images?.[0]?.url }}
                />
                {eventDetails.map((item, index) => (
                  <RewriteLine key={index} {...item} iconName="MaterialIcons" />
                ))}
              </View>
            </Widget>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  lineText: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});