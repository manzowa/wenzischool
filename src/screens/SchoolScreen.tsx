import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, View, ImageBackground, StatusBar } from "react-native";
import { Colors, Images, AppStyle, Options } from "@/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSchool } from "@/hooks";
import { capitalize, iconSchool, getArrayLogo } from "@/utils/util";
import { BlockWidget } from "@/utils/widget";
import { RootStackType, SchoolType, } from "@/utils/types";
import { SchoolCoordonnee, SchoolSlider } from "@/components"; 

type SchoolScreenProp = NativeStackScreenProps<RootStackType, "School">;

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
    <SafeAreaProvider>
      <SafeAreaView style={s.container}>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <ImageBackground source={Images.background} style={AppStyle.background}>
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
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSchool: {
    paddingHorizontal: 20,
  }
});