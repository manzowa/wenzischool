import React, { useCallback, useMemo } from "react";
import {
  View, FlatList, FlatListProps, TouchableOpacity,
  RefreshControl, RefreshControlProps
} from "react-native";
import { SchoolItem } from "./SchoolItem";
import { SchoolType } from "@/types";

export type SchoolListProps = {
  data: SchoolType[];
  navigation?: any;
  text: string;
  setText: Function;
  setClicked: Function;
  refreshControl?: React.ReactElement<RefreshControlProps, typeof RefreshControl>;
};

export const SchoolList = ({
  data, navigation, text, setText,
  setClicked, refreshControl
}: SchoolListProps) => {

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
        onPress={() => { navigation.navigate("School", { schoolid: item.id }); }}
      >
        <SchoolItem {...item} />
      </TouchableOpacity>
    ),
    [navigation]
  );

  const flatListProps: FlatListProps<SchoolType> = {
    data: filteredData ?? [],
    renderItem: renderItem,
    keyExtractor: (item, index) => `${item.id}-${index}`,
    refreshControl: refreshControl,
    scrollEnabled: false,
  };



  return (
    <View onStartShouldSetResponder={() => setClicked(false)}>
      <FlatList {...flatListProps} />
    </View>
  );
};
