import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView} from "react-native-safe-area-context";
import { 
  StyleSheet, 
  ScrollView, 
  StatusBar, 
  ImageBackground,
  RefreshControl  
} from "react-native";
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
  const [refreshing, setRefreshing] = useState(false);
  const [clicked, setClicked] = useState(false);
  const schools: Array<SchoolType> = useSchools("", 5);

  return (
    <SafeAreaView style={AppStyle.safeArea} edges={['left', 'right']}>
      <ImageBackground
        source={Images.background} resizeMode="cover"
        style={AppStyle.bg}
      >
       <ScrollView contentContainerStyle={AppStyle.scrollContainer}>
          <StatusBar animated={true} backgroundColor={Colors.primary} />
          <LogoHorizontalWidget source={Images.logoHorizontal} style={AppStyle.logo} />
          <WelcomeWidget />
          <GistWidget navigation={navigation}/>
          <SchoolItemWidget navigation={navigation} data={schools} />
          <FooterInfoWidget navigation={navigation} />
          <FooterSupportWidget />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  searchRecent: {
    padding: 4,
  }
});