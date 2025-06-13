import React, { useRef } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, ScrollView,  ImageBackground } from "react-native";
import { Colors, Images, AppStyle, Options } from "@/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSchool } from "@/hooks";
import { capitalize, iconSchool, getArrayLogo } from "@/utils/util";
import { BlockWidget } from "@/utils/widget";
import { RootStackType, SchoolType, } from "@/utils/types";
import { SchoolCoordonnee, SchoolSlider } from "@/components";

type SchoolScreenProp = NativeStackScreenProps<RootStackType, "School">;
/**
 * SchoolScreen component displays the details of a school including its name, logo, and coordinates.
 * It fetches school data based on the schoolId passed in the route parameters.
 *
 * @param {SchoolScreenProp} props - The navigation and route properties.
 * @returns {JSX.Element} The rendered SchoolScreen component.
 */
export function SchoolScreen({ navigation, route }: SchoolScreenProp) {
  const { schoolId } = route.params;
  let imageUrl: string = `${Options.apiUrl}ecoles/${schoolId}/images`;

  const oSchool: any = useSchool(parseInt(schoolId));
  const school: SchoolType | null = oSchool?.data?.school;
  const arrLogo: any = getArrayLogo(school?.images);
  const oLogo: any = arrLogo.length > 0 ? arrLogo[0] : null;

  const _renderSource = (o: any | null = null) => {
    const out: string = (o) ? imageUrl + "/" + o?.id : "school-sharp";
    return out;
  };
  const _buildData = (inputs: any[]) => {
    const t:any = [];
    if (inputs && inputs.length> 0) {
      for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        const idEcole:number = input?.ecoleid;
        const idImage:number = input?.id;
        const link:any = `${Options.apiUrl}ecoles/${idEcole}/images/${idImage}`;
        t.push(link);
      }
    }
    return t;
  }
  const dataImages: any[] = _buildData(school?.images);

  return (
    <SafeAreaView style={AppStyle.safeArea} edges={['left', 'right']}>
      <ImageBackground source={Images.background} style={AppStyle.bg}>
        <ScrollView>
          {school && (
            <View style={s.containerSchool}>
              <BlockWidget
                iconName={iconSchool(oLogo ? true : false)}
                source={_renderSource(oLogo)}
                text={capitalize(school?.nom)}
                color={Colors.primary}
              />
              <SchoolCoordonnee school={school} />
              <SchoolSlider images={dataImages} />
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  containerSchool: {
    paddingHorizontal: 20,
    marginBottom: 20
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 250,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});