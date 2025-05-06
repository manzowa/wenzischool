import React, { useEffect, useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, ScrollView, StatusBar, ImageBackground } from "react-native";
import { useSchools} from "@/hooks";
import { Colors, Images, AppStyle } from "@/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { 
  SchoolItemWidget, LogoHorizontalWidget, WelcomeWidget, 
  FooterInfoWidget, FooterSupportWidget, GistWidget,
} from "@/utils/widget";
import { SchoolType, NavBottomTabListType } from "@/utils/types";

type HomeScreenProp = NativeStackScreenProps<NavBottomTabListType, "Home">;
export function HomeScreen({ navigation, route }: HomeScreenProp) 
{
  const [text, setText] = useState("");
  const [clicked, setClicked] = useState(false);
  const schools: Array<SchoolType> = useSchools("", 5);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.container}>
        <ImageBackground source={Images.background} style={AppStyle.background}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar animated={true} backgroundColor={Colors.primary} />
            <LogoHorizontalWidget source={Images.logoHorizontal} style={s.logo} />
            <WelcomeWidget />
            <GistWidget navigation={navigation}/>
            <SchoolItemWidget navigation={navigation} data={schools} />
            <FooterInfoWidget navigation={navigation} />
            <FooterSupportWidget /> 
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const s = StyleSheet.create({
  container: {
    flex: 1
  },
  searchRecent: {
    padding: 4,
  },
  logo: {
    width: 220,
    height: 40
  },
});
