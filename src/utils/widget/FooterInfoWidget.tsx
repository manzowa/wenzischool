import { StyleSheet, View, Button } from "react-native";
import { Widget } from "./Widget";
import { IconCustom, TextCustom } from "@/utils/custom";
import { Colors } from "@/constants";

type FooterInfoWidgetProp =  {
  navigation: any
}
export function FooterInfoWidget({navigation}: FooterInfoWidgetProp) {
  const onPressHandler = () => {
    navigation.navigate("Support");
  };
  return (
    <Widget style={s.container}>
      <View style={s.content}>
        <TextCustom children={"Besoin d'aide ?"} color={"light"} />
        <View style={s.rowContent}>
          <TextCustom
            children={
              "Trouvez rapidement des réponses ou contactez l'un de nos agents."
            }
            type={"caption"}
            style={s.textRowContent}
          />
          <IconCustom
            iconName={"AntDesign"}
            source={"questioncircle"}
            size={80}
            style={s.iconRowContent}
          />
        </View>
        <Button 
          title="Espace ASSISTANCE" 
          color={Colors.warning} 
          onPress={onPressHandler}
        />
      </View>
    </Widget>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 20
  },
  content: {
  },
  rowContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  textRowContent: {
    flex: 2,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.light

  },
  iconRowContent: {
    flex: 1,
    color: Colors.light
  },
  btnContent: {
    backgroundColor: Colors.secondary,
    color: Colors.light,
    borderRadius: 5
  }
});