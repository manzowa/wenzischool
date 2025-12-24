import React, { useMemo } from 'react';
import {
  SafeAreaView, SafeAreaProvider,
  useSafeAreaInsets
} from "react-native-safe-area-context";
import {
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
  SchoolScreenProps,
  EventType,
  ImageType,
  SchedulesType
} from "@/utils/types";
import {
  SchoolCoordonnee, SchoolSlider,
  SchoolSchedule, SchoolEvent
} from "@/components";

const MemoizedSchoolSlider = React.memo(SchoolSlider);

/**
 * Écran d'affichage des détails d'une école.
 *
 * @param {SchoolScreenProps} props - Propriétés de navigation et de route.
 * @returns {JSX.Element} 
 */
export function SchoolScreen({ route }: SchoolScreenProps) {

  const { schoolid } = route.params;
  const { school, loading } = useSchool(parseInt(schoolid));
  const insets = useSafeAreaInsets();

  const images: ImageType[] = useMemo(() => school?.images ?? [], [school?.images]);
  const logo: ImageType | undefined = useMemo(() => {
    return images.find((image: ImageType) =>
      image.filename?.toLowerCase().includes('logo')
    );
  }, [images]);
  const horaires = useMemo(() => school?.horaires ?? [], [school?.horaires]);
  const eventements = useMemo(() => school?.evenements ?? [], [school?.evenements]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={AppStyle.safeArea} >
        <ImageBackground source={AppImages.background}>
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
              ) : (school && <SchoolContent 
                school={school} images={images} logo={logo} horaires={horaires} evenements={eventements} />
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
  images: ImageType[];
  logo: ImageType | undefined;
  horaires: SchedulesType[];
  evenements: EventType[];
}
const SchoolContent = ({ school, images, logo, horaires, evenements }: SchoolContentProps) => (
  <View style={{
    marginBottom: 20,
    marginTop: 10
  }}>
    <BlockWidget
      iconName={logo ? 'Logo' : 'Ionicons'}
      source={logo?.url ?? 'school-sharp'}
      text={capitalize(school.nom || "")}
      color={Colors.primary}
    />
    <SchoolCoordonnee school={school} />
    <SchoolSchedule horaires={horaires} />
    <SchoolEvent evenements={evenements} />
    <MemoizedSchoolSlider images={images} />
  </View>
);