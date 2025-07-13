import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  ImageBackground,
  ScrollView, 
  Text,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { 
  SafeAreaView, SafeAreaProvider, 
  useSafeAreaInsets  
} from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchBar } from "@/components";
import { BlockWidget, Widget } from "@/utils/widget";
import { SchoolStackParamList } from "@/utils/types";
import { AppStyle, AppImages, Colors } from "@/constants";
import { useSchoolsBy } from "@/hooks/useSchoolsBy";
import { SchoolList } from "@/components/school/SchoolList"; 

// Type for the SearchScreen props
type SearchScreenProp = NativeStackScreenProps<SchoolStackParamList, "Search">;
export function SearchScreen({ navigation }: SearchScreenProp) 
{
  const insets = useSafeAreaInsets();
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

  // API hook
  const { schools, loading, error } = useSchoolsBy(debouncedText, 8);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={AppStyle.safeArea}>
        <ImageBackground source={AppImages.background} style={AppStyle.bg}>
          <ScrollView contentContainerStyle={[
              { 
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
              }
          ]}>
            <Widget style={AppStyle.widgetContainer}>
              {!clicked && !text && (
                <BlockWidget
                  iconName={"Logo"}
                  source={AppImages.townIcon}
                  text={"Trouver une école à Kinshasa"}
                />
              )}
              <SearchBar
                text={text}
                setText={setText}
                clicked={clicked}
                setClicked={setClicked}
              />
              {loading && (
                <ActivityIndicator
                  size="large"
                  color="#007bff"
                  style={s.indicator}
                />
              )}
              {error && (
                <Text style={s.errorText}>
                  Une erreur est survenue lors du chargement des écoles.
                </Text>
              )}
              {!loading && schools?.length === 0 && debouncedText !== "" && (
                <Text style={s.noResult}>
                  Aucune école trouvée pour « {debouncedText} »
                </Text>
              )}
              {/* ✅ SchoolList affichée si pas loading ni erreur */}
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
            </Widget>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  searchContainer: {
    margin: 8,
  },
  indicator: {
    marginVertical: 10,
  },
  errorText: {
    color: Colors.error,
    textAlign: "center",
    marginVertical: 10,
  },
  noResult: {
    textAlign: "center",
    marginVertical: 10,
    fontStyle: "italic",
    color: "#666",
  },
  widgetContainer: {
    padding: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
});