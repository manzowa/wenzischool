import { StyleSheet, View } from "react-native";
import { Colors } from '@/constants';
import { Widget } from "./Widget";
import { TextCustom, IconCustom } from '@/utils/custom';

export function FooterSupportWidget() {
    return (
        <Widget style={s.container}>
            <TextCustom 
                children={"Support technique"} 
                color={"primary"}
            />
            <View style={s.content}>
                <IconCustom
                    iconName={'AntDesign'}
                    source={'infocirlce'}
                    size={80} color={Colors.primary}
                />
                <TextCustom  
                    type={"caption"} 
                    style={s.supportText} 
                    children={"Certaines des adresses actuelles ne sont pas très précises. Nous travaillons à leur amélioration et vous remercions de votre compréhension "}               
                />
            </View>
        </Widget>
    );
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    content: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        padding: 10,
        zIndex: 3
    },
    supportText: {
        flex: 2, 
        color: Colors.primary,
        fontSize: 12,
        textAlign: "justify",
        lineHeight: 18,
    }
});