import {
    StyleSheet, View, ImageBackground, 
    ScrollView
} from "react-native";
import { 
    SafeAreaView, SafeAreaProvider, 
    useSafeAreaInsets
} from "react-native-safe-area-context";
import { Colors, AppStyle, AppImages } from "@/constants";
import { IconCustom, TextCustom } from "@/utils/custom";
import { ButtonLink } from "@/utils/button";
import { Widget } from "@/utils/widget";

export function  SupportScreen() {
    const insets = useSafeAreaInsets();
    return(
        <SafeAreaProvider>
            <SafeAreaView style={AppStyle.safeArea}>
                <ImageBackground source={AppImages.background}>
                    <ScrollView  contentContainerStyle={[
                        AppStyle.scrollContainer, 
                        { 
                            paddingTop: insets.top, 
                            paddingBottom: insets.bottom,
                            paddingLeft: insets.left,
                            paddingRight: insets.right
                        }
                      ]}
                    >
                        <Widget style={AppStyle.widgetContainer}>
                            <View style={s.assistance}>
                                <View style={s.info}>
                                    <IconCustom 
                                        iconName={"AntDesign"} 
                                        source={'customerservice'} 
                                        color={Colors.light} 
                                        size={24}
                                        style={[AppStyle.icon, AppStyle.darkTheme]} 
                                    />
                                    <TextCustom color={"secondary"} type={"caption"}>
                                        Besoin d'aide ? Nous sommes là pour vous aider.
                                    </TextCustom>
                                </View>
                                <View style={s.faq}>
                                    <TextCustom type={"bodyBold"} >
                                        Foire aux questions (FAQ)
                                    </TextCustom>
                                    <TextCustom color={"secondary"} type={"caption"}>
                                        Comment contacter le support technique ?
                                    </TextCustom>
                                    <TextCustom color={"secondary"} type={"caption"}>
                                        Comment modifier les infos de l'école ?
                                    </TextCustom>
                                    <ButtonLink 
                                        url={"https://manzowa.com/contact"} 
                                        style={s.button} 
                                    >Aller sur Manzowa</ButtonLink>
                                </View>
                            </View>
                        </Widget>
                    </ScrollView>
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
    }
});