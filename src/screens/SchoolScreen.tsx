import React, { useMemo } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
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
import { BlockWidget } from "@/utils/widget";
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

  const images: SchoolImage[] = useMemo(() => school?.images ?? [], [school?.images]);
  const logo: SchoolImage | undefined = useMemo(() => {
    return images.find((image: SchoolImage) =>
      image.filename?.toLowerCase().includes('logo')
    );
  }, [images]);

  return (
    <SafeAreaView style={AppStyle.safeArea} edges={['left', 'right']}>
      <ImageBackground source={AppImages.background} style={AppStyle.bg}>
        <ScrollView>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.primary}
              style={{ marginTop: 50 }}
            />
          ) : (
            school && <SchoolContent school={school} images={images} logo={logo} />
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
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
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  loadingIndicator: {
    marginTop: 50,
  }
});