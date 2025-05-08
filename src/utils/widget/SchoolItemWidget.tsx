import { StyleSheet, TouchableOpacity } from "react-native";
import { SchoolItem } from "@/components/school";
import { TextCustom } from "@/utils/custom";
import { SchoolType } from "@/utils/types";
import { Widget } from "./Widget";

type SchoolItemProp = {
  data: Array<SchoolType>,
  navigation: any 
};

export function SchoolItemWidget({ navigation, data }: SchoolItemProp) {
  return (
    <Widget style={s.container}>
      <TextCustom
        color={"secondary"}
        children={"Récemment ajouté"}
      />
      {
        data.map((school) => (
          <TouchableOpacity
            key={school.id.toString()}
            onPress={() => {
              navigation.navigate("School", {
                schoolId: school.id }
              );
            }}
          >
            <SchoolItem {...school} />
          </TouchableOpacity>
        ))
      }
    </Widget>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 4,
    marginVertical: 10,
    marginHorizontal: 20
  },
});
