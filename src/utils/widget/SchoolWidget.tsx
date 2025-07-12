import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  View,
} from "react-native";
import { SchoolItem } from "@/components/school";
import { TextCustom } from "@/utils/custom";
import { SchoolType, AppStackParamList } from "@/utils/types";
import { Widget } from "./Widget";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type SchoolItemProp = {
  data: SchoolType[];
};
type NavigationProp = NativeStackNavigationProp<AppStackParamList, "App">;

export function SchoolWidget({ data }: SchoolItemProp) {
  const navigation = useNavigation<NavigationProp>();
  const renderItem: ListRenderItem<SchoolType> = ({ item }) => (
    <TouchableOpacity
      key={item.id.toString()}
      activeOpacity={0.7}
      onPress={() => navigation.navigate("School", { schoolid: item.id.toString() })}
      testID={`school-item-${item.id}`}
    >
      <SchoolItem {...item} />
    </TouchableOpacity>
  );
  return (
    <Widget style={s.schoolWidgetContainer}>
      <TextCustom color="secondary">Récemment ajouté</TextCustom>
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false} // car probablement dans un ScrollView parent
        />
      ) : (
        <View style={s.schoolWidgetEmptyContainer}>
          <TextCustom color="secondary">Aucune école disponible</TextCustom>
        </View>
      )}
    </Widget>
  );
}
const s = StyleSheet.create({
  schoolWidgetContainer: {
    padding: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  schoolWidgetEmptyContainer: {
    marginTop: 10,
    alignItems: "center",
  },
});
