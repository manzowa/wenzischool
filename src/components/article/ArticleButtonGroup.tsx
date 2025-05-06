import { StyleSheet, View} from "react-native";
import { Colors } from "@/constants";
import { ButtonCustom } from "@/utils";

type ArticleButtonGroupProps = {
  previous: boolean,
  next: boolean,
  style?: any,
  onPressPrevious?: () => void,
  onPressNext?: () => void,
};

export function ArticleButtonGroup(prop: ArticleButtonGroupProps) {
  const { onPressPrevious, onPressNext, previous, next} = prop;
  return (
    <View style={[s.buttonContainer, prop.style]}>
      {previous && (
        <ButtonCustom 
          title={"Précédent"}
          colorText={Colors.light}
          onPress={onPressPrevious}
          style={s.buttonPrevious}
        />
      )}
      {next && (
        <ButtonCustom
          title={"Suivant"}
          onPress={onPressNext}
          colorText={Colors.light}
          style={s.buttonNext}
        />
      )}
    </View>
  );
};

const s = StyleSheet.create({
    buttonContainer: {
      marginTop: 8,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    buttonPrevious: {
      backgroundColor: Colors.primary,
      alignSelf: "flex-start",
      width: 80,
      height: 30,
      padding: 5
    },
    buttonNext: {
      backgroundColor: Colors.primary,
      width: 80,
      height: 30,
      padding: 5,
      alignSelf: "flex-end"
    },
});