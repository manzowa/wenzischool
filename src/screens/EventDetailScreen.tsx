import { useTranslation } from 'react-i18next';
import {
  ScrollView, ScrollViewProps,
  ImageBackground, ImageBackgroundProps,
  Image, View, ViewStyle, StyleProp,
  Animated
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useAppStyle } from "@/constants";
import { EventDetailScreenProps } from "@/types";
import { 
  Widget 
} from "@/components/common/widgets";
import { 
  CustomIcon, CustomText
} from "@/components/custom";
import { formatDate } from "@/utils";
import { useEvent, useTheme, useFadeScaleAnimation } from "@/hooks";
import { Loading } from "@/components/common/Loading";

type RewriteLineProps = {
  iconName?: any;
  source?: string;
  type?: string;
  text?: string;
  color?: any;
};

const RewriteLine = ({ iconName, source, type, text, color }: RewriteLineProps) => {
  const { theme } = useTheme();
  const ss = useAppStyle({ theme });

  return (
    <View style={ss.eventDetailContainer}>
      {
        source === "title" ? (
          <CustomText style={[{ color: theme.colors.primary }, ss.medium, ss.bold]}>
            {text}
          </CustomText>
        ) : (
          <>
            <CustomIcon iconName={iconName} size={24} style={{ color: theme.colors.primary }} source={source} />
            <CustomText style={[{ color: theme.colors.secondary }, ss.extraSmall, { textAlign: 'justify', paddingRight: 12 }]}>
              {text}
            </CustomText>
          </>
        )
      }

    </View>
  )
};

export default function EventDetailScreen({ route }: EventDetailScreenProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const ss = useAppStyle({ theme });
  const { animatedStyle } = useFadeScaleAnimation({ duration: 400 });

  const insets = useSafeAreaInsets();
  const { eventId } = route.params;
  const { events, loading } = useEvent(parseInt(eventId));

  const event = events?.[0];

  if (loading) {
    return (
      <SafeAreaView style={[ss.flex]}>
        <Loading />
      </SafeAreaView>
    );
  }

  if (!event) {
    return (
      <SafeAreaView style={[ss.flex]}>
        <CustomText type="body" style={{ color: theme.colors.secondary }}>
          Aucune donnée disponible
        </CustomText>
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
      text: formatDate(event.date, true, t("local"), t('from')),
      color: "secondary",
    },
  ];
  const scrollStyle: StyleProp<ViewStyle> = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    flexGrow: 1,
    justifyContent: "center"
  };
  const scrollViewProps: ScrollViewProps = {
    contentContainerStyle: scrollStyle,
    contentInsetAdjustmentBehavior: "automatic",
    showsVerticalScrollIndicator: false,
    bounces: false,
  };
  const bgProps: ImageBackgroundProps = {
    style: ss.flex,
    source: theme.images.background,
    resizeMode: "cover",
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={ss.flex}>
        <ImageBackground {...bgProps}>
          <Animated.View style={animatedStyle}>
            <ScrollView {...scrollViewProps}>
              <Widget style={ss.container}>
                <View>
                  <Image style={ss.eventDetailImage} source={{ uri: event.images?.[0]?.url }} />
                  {eventDetails.map((item, index) => (
                    <RewriteLine key={index} {...item} iconName="MaterialIcons" />
                  ))}
                </View>
              </Widget>
            </ScrollView>
          </Animated.View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}