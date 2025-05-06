import { StyleSheet, View } from "react-native";
import { 
  formatDate, Card, CardBody, CardRow, CardFlex, CardFlex3,
  ButtonLink, IconCustom, TextCustom, ArticleType 
} from "@/utils";
import { Colors } from "@/constants";

export function ArticleItem({
  id, title, author, content, imageUrl,
  linkUrl, published
  }: ArticleType
) {

  const formated: string = `Auteur ${author} |Publié ${formatDate(published)}`;

  return (
    <Card key={id}>
      <CardBody>
        <CardRow>
          <CardFlex>
            {imageUrl && (
              <IconCustom 
                iconName="Logo" 
                source={imageUrl} 
                style={s.imageCard} 
              />
            )}
          </CardFlex>
          <CardFlex3>
            {title && (
              <View>
                <CardRow>
                  <TextCustom 
                    children={formated} 
                    type={"captionBold"} 
                    color={"secondary"} 
                  />
                </CardRow>
                <TextCustom 
                  children={title} 
                  type={"caption"} 
                  color={"secondary"} 
                />
              </View>
            )}
            {linkUrl && (
              <ButtonLink 
                url={linkUrl} 
                children={"voir plus"} 
                style={s.button} 
              />
            )}
          </CardFlex3>
        </CardRow>
      </CardBody>
    </Card>
  );
}
const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: Colors.primary,
    width: 60,
    height: 30,
  },
  imageCard: {
    width: '100%',
    height: 90,
  },
  row: {
    backgroundColor: Colors.warning
  }
});
