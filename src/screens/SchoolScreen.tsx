import React, { useMemo } from 'react';
import { 
  SafeAreaView, SafeAreaProvider, 
  useSafeAreaInsets  
} from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Colors, AppImages, AppStyle } from "@/constants";
import { useSchool } from "@/hooks";
import { capitalize } from "@/utils/helpers";
import { BlockWidget, Widget } from "@/utils/widget";
import { 
  SchoolType, 
  SchoolScreenProp
} from "@/utils/types";
import { SchoolCoordonnee, SchoolSlider } from "@/components";

type SchoolImage = SchoolType['images'][number];
const MemoizedSchoolSlider = React.memo(SchoolSlider);

/**
 * Écran d'affichage des détails d'une école.
 *
 * @param {SchoolScreenProp} props - Propriétés de navigation et de route.
 * @returns {JSX.Element} 
 */
export function SchoolScreen({ route }: SchoolScreenProp) {
  const { schoolid } = route.params;
  const { school, loading } = useSchool(parseInt(schoolid));
  const insets = useSafeAreaInsets();

  const images: SchoolImage[] = useMemo(() => school?.images ?? [], [school?.images]);
  const logo: SchoolImage | undefined = useMemo(() => {
    return images.find((image: SchoolImage) =>
      image.filename?.toLowerCase().includes('logo')
    );
  }, [images]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={AppStyle.safeArea} >
        <ImageBackground source={AppImages.background} style={AppStyle.bg}>
          <ScrollView 
            contentContainerStyle={[
              { 
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
              }
            ]}
          >
            <Widget style={AppStyle.widgetContainer}>
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color={Colors.primary}
                  style={{ marginTop: 50 }}
                />
              ) : (
                school && <SchoolContent school={school} images={images} logo={logo} />
              )}
            </Widget>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
interface SchoolContentProps {
  school: SchoolType;
  images: SchoolImage[];
  logo: SchoolImage;
}
const SchoolContent = ({ school, images, logo }: SchoolContentProps) => (
  <View style={s.containerSchool}>
    <BlockWidget
      iconName={logo ? 'Logo' : 'Ionicons'}
      source={logo?.url ?? 'school-sharp'}
      text={capitalize(school.nom || "")}
      color={Colors.primary}
    />
    <SchoolCoordonnee school={school} />
    <MemoizedSchoolSlider images={images} />
  </View>
);
const s = StyleSheet.create({
  containerSchool: {
    marginBottom: 20,
    marginTop: 10
  },
  loadingIndicator: {
    marginTop: 50,
  }
});