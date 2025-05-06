import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, ImageBackground, View, ScrollView } from "react-native";
import { useArticlePage } from "@/hooks";
import { ArticleList } from "@/components";
import { Colors, Images, AppStyle } from "@/constants";
import { BlockWidget } from "@/utils/widget";

export function NewsScreen() {

  const [current, setCurrent] = useState(1);
  const { success, data } = useArticlePage(current);
  const onPressPrevious = () => setCurrent(current - 1);
  const onPressNext = () => setCurrent(current + 1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.newsContainer}>
        <ImageBackground source={Images.background} style={AppStyle.background}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={s.content}>
              <BlockWidget
                iconName={"AntDesign"}
                source={"infocirlce"}
                text={"Infos éducation"}
                color={Colors.primary}
              />
              {success && (
                <ArticleList
                  articles={data.articles}
                  onPrevious={onPressPrevious}
                  onNext={onPressNext}
                  hasPrevious={data.has_privious_page}
                  hasNext={data.has_next_page}
                />
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const s = StyleSheet.create({
  newsContainer: {
    flex: 1,
  },
  content: {
    marginTop: 20,
    marginHorizontal: 20,
  }
});
