import {StyleSheet, View, ImageBackground } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Colors, Images, AppStyle } from "@/constants";
import { IconCustom, TextCustom } from "@/utils/custom";
import { ButtonLink } from "@/utils/button";

export function  SupportScreen() {
    return(
        <SafeAreaProvider>
            <SafeAreaView style={s.area}>
                <ImageBackground source={Images.background} style={AppStyle.background}>
                    <View style={s.container}>
                        <View style={s.assistance}>
                            <View style={s.info}>
                                <IconCustom 
                                    iconName={"AntDesign"} 
                                    source={'customerservice'} 
                                    color={Colors.light} 
                                    size={55}
                                    style={s.icon} 
                                />
                                <TextCustom 
                                    children={"Besoin d'aide ? Nous sommes là pour vous aider."}
                                    color={"secondary"}
                                    type={"caption"}
                                />
                            </View>
                            <View style={s.faq}>
                                <TextCustom 
                                    children={"Foire aux questions (FAQ)"}
                                    type={"bodyBold"} 
                                />
                                <TextCustom 
                                    children={"Comment contacter le support technique ?"}
                                    color={"secondary"}
                                    type={"caption"}
                                />
                                <TextCustom 
                                    children={"Comment modifier les infos de l'école ?"}
                                    color={"secondary"}
                                    type={"caption"}
                                />
                                <ButtonLink 
                                    url={"https://manzowa.com/contact"} 
                                    children={"Aller sur Manzowa"} 
                                    style={s.button} 
                                />
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const s = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    area: {
        flex: 1
    },
    assistance:{
        padding: 10,
        alignItems: "center",
        backgroundColor: Colors.light,
        borderRadius: 5,
    },
    icon: {
        padding: 10,
        width: 75,
        height: 75,
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 50,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: Colors.primary,
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    info: { 
        alignItems: "center"
    },
    faq: {
        alignItems: "center",
        marginTop: 10
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 5,
        margin: 10,
        padding: 20,
        elevation: 4,
        shadowColor: Colors.dark,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});