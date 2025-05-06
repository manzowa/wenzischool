import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { SchoolItem } from "./SchoolItem";
import { SchoolType } from "@/utils/types";

type SchoolListProp =  {
  text: string;
  setText: Function;
  setClicked: Function;
  data: Array<SchoolType>;
  navigation?: any
};
export const SchoolList = ({text, setClicked, data, navigation }: SchoolListProp) => {
  const renderItem = (item: SchoolType): any => {
    // when no input, show all
    if (text === "") {
      return (
        <TouchableOpacity 
          key={item.id.toString()} 
          onPress={() => {
            navigation.navigate("School", {schoolId: item.id});
          }}
        >
          <SchoolItem {...item} />
        </TouchableOpacity>
      );
    }
    // filter of bay name
    if (
      item.nom
        .toUpperCase()
        .includes(text.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <TouchableOpacity 
          key={item.id.toString()} 
          onPress={() => {
            navigation.navigate("School", {schoolId: item.id});
          }}
        >
          <SchoolItem {...item} />
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={s.container}>
      <View style={s.content} onStartShouldSetResponder={() => setClicked(false)}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>
    </View>
  );
};
const s = StyleSheet.create({
  container: {
    padding: 5,
    margin: 5,
    width: "100%",
  },
  content: {}
});