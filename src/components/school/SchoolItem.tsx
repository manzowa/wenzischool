import { StyleSheet, View} from "react-native";
import { Colors, Options} from "@/constants";
import {IconCustom , TextCustom} from "@/utils/custom";
import { 
    formatAdresse, capitalize,   
    getArrayLogo, iconSchool
} from "@/utils/util";
import { SchoolType } from "@/utils/types";

type ItemType = {
    iconName: any,
    source: any,
    nom: any,
    adresses: any
};
const Item = (props: ItemType) => {
    const {iconName, source, nom, adresses} = props;
    return (
        <View style={s.itemContainer}>
            <IconCustom 
                iconName={iconName} source={source} 
                size={24} style={s.itemIcon}
                color={Colors.light}
            />
            <View style={s.itemRow}>
                <TextCustom children={nom}  type={'caption'} color={"primary"} />
                <TextCustom children={adresses} type={'caption'} color={"secondary"} />
            </View>
        </View>
    );
};

export const SchoolItem = (props: SchoolType) => {
    const { 
        id, nom, telephone, email, 
        adresses, images,site
    } = props;

    const arrLogo: any = getArrayLogo(images);
    const oLogo: any = arrLogo.length > 0 ? arrLogo[0] : null;
    const ecoleid: number = oLogo ? oLogo?.ecoleid: 0;
    let pathImage: string = `${Options.apiUrl}ecoles/${ecoleid}/images`;
    
    const _renderSource = (o: any|null = null) => {
        const out: string = (o) ? pathImage+"/"+o?.id : "school-sharp";
        return out;
    };
    return (
        <Item 
            iconName={iconSchool(oLogo? true: false)} 
            source={_renderSource(oLogo)}
            nom={capitalize(nom)}
            adresses={formatAdresse(adresses[0])}
        />
    );
};

const s = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexGrow: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 10,
        marginTop: 10,
    },
    itemRow: {
        flex: 3,
        marginLeft: 10,
    },
    itemIcon: {
        padding: 10,
        width: 45,
        height: 45,
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 50,
    },
});