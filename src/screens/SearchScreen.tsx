import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, ImageBackground, View, RefreshControl } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSchools } from "@/hooks";
import { SearchBar, SchoolList } from "@/components";
import { BlockWidget } from "@/utils/widget";
import { SchoolType, RootStackType } from "@/utils/types";
import { Images, AppStyle } from "@/constants";

type SearchScreenProp = NativeStackScreenProps<RootStackType>;

export function SearchScreen({ navigation }: SearchScreenProp) {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState(text);
  const [clicked, setClicked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, 500);
    return () => clearTimeout(handler);
  }, [text]);

  const schools: Array<SchoolType> = useSchools(debouncedText);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simuler un rafraîchissement (exemple)
    setTimeout(() => {
      setRefreshing(false);
      // Ici tu peux recharger les données si besoin
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={AppStyle.safeArea} edges={["left", "right"]}>
      <ImageBackground source={Images.background} style={AppStyle.bg}>
        <View style={s.searchContainer}>
          {!clicked && (
            <BlockWidget
              iconName={"Logo"}
              source={Images.townIcon}
              text={"Trouver une école à kinshasa "}
            />
          )}
          <SearchBar
            text={text}
            setText={setText}
            clicked={clicked}
            setClicked={setClicked}
          />
          <SchoolList
            text={text}
            setText={setText}
            setClicked={setClicked}
            data={schools}
            navigation={navigation}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  searchContainer: {
    margin: 20,
  },
});