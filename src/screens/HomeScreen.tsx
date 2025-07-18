import React from "react";
import { 
  ScrollView, 
  ImageBackground, 
  ActivityIndicator 
} from "react-native";
import { 
  SafeAreaView, SafeAreaProvider, 
  useSafeAreaInsets 
} from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useSchools } from "@/hooks";
import { Colors, AppImages, AppStyle } from "@/constants";
import { 
  LogoHorizontalWidget, 
  WelcomeWidget, 
  GistWidget, 
  SchoolWidget, 
  InfoWidget, 
  SupportWidget 
} from "@/utils/widget";
import { SchoolStackParamList } from "@/utils/types";

type HomeScreenProps = NativeStackScreenProps<SchoolStackParamList, "Home">;

export function HomeScreen({ navigation }: HomeScreenProps) 
{
  const { schools, loading } = useSchools();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={AppStyle.safeArea}>
        <ImageBackground
          source={AppImages.background}
          resizeMode="cover"
          style={AppStyle.bg}
        >
          <ScrollView 
            contentContainerStyle={[
              AppStyle.scrollContainer,
              { 
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
              }
            ]}
          >
            <LogoHorizontalWidget 
              source={AppImages.logoHorizontal} 
              style={AppStyle.logo} 
            />
            <WelcomeWidget />
            <GistWidget navigation={navigation} />
            {loading ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <SchoolWidget data={schools} />
            )}
            <InfoWidget navigation={navigation} />
            <SupportWidget />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}