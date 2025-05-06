import { 
    TouchableOpacity, StyleSheet
} from 'react-native';
import { Colors } from "@/constants";
import { TextCustom } from "./TextCustom";

type ButtonCustomProp = {
    title: string,
    colorText: any
    style?: any,
    onPress?: () => void
};

export const ButtonCustom = (prop: ButtonCustomProp) => {
    return (
        <TouchableOpacity 
            style={[s.buttonContainer, prop.style]} 
            onPress={prop.onPress}
        >
            <TextCustom 
               children={prop.title} 
               style={{color: prop.colorText}} 
               type={"mediumBold"}
            />
        </TouchableOpacity>
    )
};

const s = StyleSheet.create({
    buttonContainer: {
        borderRadius: 5,
        elevation: 4,
        shadowColor: Colors.dark,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontFamily: 'Comfortaa-Regular',
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 12,
    }
});