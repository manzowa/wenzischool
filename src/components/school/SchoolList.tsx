import React, { useCallback, useMemo } from "react";
import { 
  StyleSheet, View, FlatList, TouchableOpacity, 
  RefreshControl, RefreshControlProps 
} from "react-native";
import { SchoolItem } from "./SchoolItem";
import { SchoolType } from "@/utils/types";

type SchoolListProp = {
  text: string;
  setText: Function;
  setClicked: Function;
  data: Array<SchoolType>;
  navigation?: any;
  refreshControl?: React.ReactElement<RefreshControlProps, typeof RefreshControl>;
};

export const SchoolList = ({
  text,
  setClicked,
  data,
  navigation,
  refreshControl, // <- réception de la prop
}: SchoolListProp) => {
  
  const filteredData = useMemo(() => {
    if (text === "") {
      return data;
    }
    return data.filter(item =>
      item.nom.toUpperCase().includes(text.toUpperCase().trim().replace(/\s/g, ""))
    );
  }, [text, data]);

  const renderItem = useCallback(
    ({ item }: { item: SchoolType }) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("School", { schoolId: item.id });
        }}
      >
        <SchoolItem {...item} />
      </TouchableOpacity>
    ),
    [navigation]
  );

  return (
    <View style={s.container}>
      <View style={s.content} onStartShouldSetResponder={() => setClicked(false)}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}  // <- Ici ta clé unique
          renderItem={renderItem}
          refreshControl={refreshControl}
        />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    padding: 5,
    marginLeft: 0,
    marginRight: 10,
    marginVertical: 10
  },
  content: {
    marginLeft: 0,
  },
});
