import { View, Text, StyleSheet } from "react-native";
import { Colors, AppStyle } from '@/constants';
import { IconCustom} from "@/utils/custom";

type BlockWidgetProp = {
    text?: string
    iconName?: any,
    source?: any,
    size?: number,
    color?: string
};

export const BlockWidget = ({text, iconName, source, size= 25, color=""}:BlockWidgetProp) => {
    
    return(
        <View style={[s.headerContainer]}>
            <IconCustom 
                iconName={iconName} 
                source={source} 
                style={[AppStyle.icon, AppStyle.defaultTheme]} 
                size={size} 
                color={color}
            />
            <Text style={[AppStyle.caption, s.text]}>{text}</Text>
            <IconCustom 
                iconName={"Logo"} 
                source={require('../../../assets/images/logo-sign.webp')} 
                style={[AppStyle.icon, AppStyle.darkTheme]} 
                size={size} 
                color={color}
            />
        </View>
    )
};

const s = StyleSheet.create({
    headerContainer: {
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
        elevation: 5
    },
    text: {
        flex: 2,
        color: Colors.light,
        marginHorizontal: 10,
        fontWeight: "bold"

    }
});