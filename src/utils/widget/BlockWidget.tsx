import { View, StyleSheet } from "react-native";
import { Colors, Images } from '@/constants';
import { TextCustom, IconCustom } from "@/utils/custom";

type BlockWidgetProp = {
    text?: string
    iconName?: string,
    source?: string,
    size?: number,
    color?: string
};

export const BlockWidget = ({text, iconName, source, size= 30, color=""}:BlockWidgetProp) => {
    return(
        <View style={[s.headerContainer, s.shadowProps]}>
            <IconCustom 
                iconName={iconName} source={source} 
                style={s.logo} size={size} color={color}
            />
            <TextCustom children={text} type={"caption"} color={"light"} style={s.middle} />
            <IconCustom iconName={"Logo"} source={Images.logo} style={s.logo} size={size} />
        </View>
    )
};

const s = StyleSheet.create({
    headerContainer: {
        marginTop: 20,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.primary,
        backgroundColor: Colors.primary,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    logo: {
        width: 40,
        height: 40,
        backgroundColor: Colors.light,
        borderRadius: 50,
        padding: 5
    },
    shadowProps: {
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5
    },
    middle: {
        flex: 2,
    }
});