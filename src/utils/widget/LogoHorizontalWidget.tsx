import { Widget } from "./Widget";
import { StyleSheet } from "react-native";
import { Image, ImageProps } from 'expo-image';


export function LogoHorizontalWidget(prop: ImageProps){
    return(
        <Widget style={s.container}>
            <Image {...prop} contentFit="cover"/>
        </Widget>
    );
}
const s = StyleSheet.create({
    container: {
      flex: 1,
      margin: 20,
      padding: 5
    }
});