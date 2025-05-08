import { StyleSheet, View, TouchableOpacity } from "react-native";
import { TextCustom, IconCustom } from "@/utils/custom";
import { Widget } from "./Widget";
import { Colors } from "@/constants";



type GistWidgetProp = {
  navigation: any
}
export function GistWidget({navigation}: GistWidgetProp) {
  const onPressSearchHandler = () => {
    navigation.navigate('Search');
  };
  const onPressSchoolHandler = () => {
    navigation.navigate('News');
  };
  return (
    <Widget style={s.gistContainer}>
      <TextCustom 
        color={"secondary"} 
        children={"Découvrez l'essentiel de nos écoles"} 
      />
      <View style={s.gistContent}>
        <TouchableOpacity onPress={onPressSearchHandler}>
          <IconCustom
            iconName={"Ionicons"}
            source={"search"}
            style={s.gistRoundedIcon}
          />
        </TouchableOpacity>
      </View>
    </Widget>
  );
}

const s = StyleSheet.create({
  gistContainer: {
    flex: 1,
    marginHorizontal: 20,   
    justifyContent: "center",
    alignItems: "center",
  },
  gistContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 5
  },
  gistRoundedIcon: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: Colors.primary,
    padding: 8,
    fontSize: 25,
    color: Colors.primary,
    margin: 5,
  },
});
