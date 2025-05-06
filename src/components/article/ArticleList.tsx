import { StyleSheet, View } from "react-native";
import { ArticleType } from "@/utils";
import { ArticleItem } from "./ArticleItem";
import { ArticleButtonGroup } from "./ArticleButtonGroup";

type ArticleListProps = {
  articles: Array<ArticleType>,
  onPrevious?: () => void
  onNext?: () => void,
  hasPrevious: boolean,
  hasNext: boolean,
}

export function ArticleList(props: ArticleListProps) {
  const { articles, onPrevious, onNext, hasPrevious, hasNext } = props;
  return (
    <View style={s.container}>
      {
        articles.map((item, index) => (
          <ArticleItem key={index} {...item} />
        ))
      }
      <ArticleButtonGroup
        onPressNext={onNext}
        onPressPrevious={onPrevious}
        previous={hasPrevious}
        next={hasNext}
      />
    </View>
  );
}
const s = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 0
  }
});