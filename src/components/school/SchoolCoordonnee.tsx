import {
    StyleSheet
} from "react-native";
import {
    Card, CardHeader, CardTitle,
    CardRow, CardBody
} from "@/utils/card";
import { IconCustom, TextCustom } from "@/utils/custom";
import { SchoolType } from "@/utils/types";
import { ButtonLink } from "@/utils/button";
import { formatAdresse } from "@/utils/util";
import { Colors } from "@/constants";


type SchoolCoordonneeType = {
    school?: SchoolType
}
export const SchoolCoordonnee = (props: SchoolCoordonneeType) => {
    const { school } = props;
    const _Adresses = (adresses: []) => {
        return ( 
          adresses.length > 0 &&
          adresses.map((adresse: SchoolType["adresses"], index: number) => (
            <CardRow key={index}>
              <IconCustom
                iconName={"FontAwesome6"}
                size={24}
                color={Colors.primary}
                source={"diamond-turn-right"}
              />
              <TextCustom 
                children={formatAdresse(adresse)}
                type={'caption'} color={"secondary"} 
                style={s.text}
              />
            </CardRow>
          ))
        );
    };
    const _Phone = (telephone: string) => {
        return (
          <CardRow>
            <IconCustom
              iconName={"MaterialIcons"}
              size={24}
              color={Colors.primary}
              source={"local-phone"}
            />
            <TextCustom 
              children={telephone}
              type={'caption'} color={"secondary"} 
              style={s.text}
            />
          </CardRow>
        )
    };
    const _Email = (email: string) => {
        return (
          <CardRow>
            <IconCustom
              iconName={"MaterialCommunityIcons"}
              size={24}
              color={Colors.primary}
              source={"email"}
            />
            <TextCustom 
              children={email}
              type={'caption'} color={"secondary"} 
              style={s.text}
            />
          </CardRow>
        )
    };
    const _Site = (site: string) => {
        return (
          <CardRow>
            <IconCustom
              iconName={"MaterialCommunityIcons"}
              size={24}
              color={Colors.primary}
              source={"web"}
            />
            {site && (
              <ButtonLink 
                url={site} 
                children={"Aller sur le site"} 
                style={s.button} 
              />
            )}
          </CardRow>
        )
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle children={"Coordonnée de l'établissement"}  />
            </CardHeader>
            <CardBody>
                {school?.adresses ? _Adresses(school?.adresses) : false}
                {school?.telephone ? _Phone(school?.telephone) : false}
                {school?.email? _Email(school?.email): false}
                {school?.site? _Site(school?.site): false}
            </CardBody>
        </Card>
    );
}
const s = StyleSheet.create({
    card: {
    },
    text: {
        flex: 2,
        color: Colors.secondary
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 5,
        padding: 6,
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