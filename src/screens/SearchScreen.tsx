import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, ImageBackground, View} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSchools } from "@/hooks";
import { SearchBar, SchoolList } from "@/components";
import { BlockWidget } from "@/utils/widget";
import { SchoolType, RootStackType } from "@/utils/types";
import { Images, AppStyle} from "@/constants";

type SearchScreenProp = NativeStackScreenProps<RootStackType>;
export function SearchScreen({ navigation, route }: SearchScreenProp) {
  const [text, setText] = useState("");
  const [clicked, setClicked] = useState(false);
  const schools: Array<SchoolType> = useSchools(text);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.container}>
        <ImageBackground source={Images.background} style={AppStyle.background}>
          <View style={s.searchContainer}>
            {!clicked && (
              <BlockWidget 
                iconName={"Logo"}
                source={Images.townIcon}
                text={"Trouver une école à kinshasa "}
              />
            )}
            <SearchBar
              text={text} setText={setText}
              clicked={clicked} setClicked={setClicked}
            />
            <SchoolList
              text={text} setText={setText}
              setClicked={setClicked}
              data={schools}
              navigation={navigation}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const s = StyleSheet.create({
  container: {
    flex: 1
  },
  searchContainer: {
    margin: 20
  },
});
