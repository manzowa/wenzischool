import React, { useCallback, useMemo } from "react";
import { 
  StyleSheet, View, FlatList, TouchableOpacity, 
  RefreshControl, RefreshControlProps 
} from "react-native";
import { SchoolItem } from "./SchoolItem";
import { SchoolType } from "@/utils/types";

type SchoolListProp = {
  data: SchoolType[];
  navigation?: any;
  text: string;
  setText: Function;
  setClicked: Function;
  refreshControl?: React.ReactElement<RefreshControlProps, typeof RefreshControl>;
  
};

export const SchoolList = ({
  text,
  setClicked,
  data,
  navigation,
  refreshControl
}: SchoolListProp)=> {
  
  const filteredData = useMemo(()=> {
    if (text === "") {
      return data;
    }
    return data.filter(item =>
      item.nom.toUpperCase().includes(text.toUpperCase().trim().replace(/\s/g, ""))
    );
  }, [text, data]);

  const renderItem = useCallback(
    ({ item }: { item: SchoolType })=> (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("School", { schoolid: item.id });
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
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} 
          refreshControl={refreshControl}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    padding: 0
  },
  content: {
    marginLeft: 0
  },
});
