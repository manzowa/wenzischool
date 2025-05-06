import { Widget } from "./Widget";
import {TextCustom} from "@/utils/custom";
import { StyleSheet } from "react-native";
import {Colors} from '@/constants';

export function WelcomeWidget() {
    return (
        <Widget style={s.container}>
            <TextCustom color={"light"} children={"Salut,"} type={"caption"}  />
            <TextCustom 
                color={"light"} 
                children={"Infomez-vous sur vos écoles"} 
                type={"caption"}  
            />
        </Widget>
    );
}

const s = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        borderRadius: 4,
        padding: 10,
        margin: 20,
        elevation: 3
    }
})
