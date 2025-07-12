import { StyleSheet, Text } from "react-native";
import { Card } from "@/utils/card";
import { IconCustom } from "@/utils/custom";
import { SchoolType } from "@/utils/types";
import { ButtonLink } from "@/utils/button";
import { formatAdresse } from "@/utils/helpers";
import { Colors, AppStyle } from "@/constants";

type SchoolCoordonneeType = {
    school?: SchoolType;
};

// Fonction générique pour rendre les informations de contact
const renderContactInfo = (
    iconName: any,
    source: any,
    text: string | React.ReactNode,
    button?: boolean,
    key?: React.Key
) => (
    <Card.Row key={key}>
        <IconCustom
            iconName={iconName}
            size={24}
            color={Colors.primary}
            source={source}
        />
        {button ? (
            <ButtonLink
                url={text as string}
                style={s.button}
            >  Aller sur le site
            </ButtonLink>
        ) : (
            <Text style={[AppStyle.caption]}>{text}</Text>
        )}
    </Card.Row>
);

export const SchoolCoordonnee = ({ school }: SchoolCoordonneeType) => {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Informations de localisation et de contact</Card.Title>
            </Card.Header>
            <Card.Body>
                {school?.adresses?.length > 0 &&
                    school?.adresses.map((adresse: any[], index: number) =>
                        renderContactInfo(
                            "FontAwesome6",
                            "diamond-turn-right",
                            formatAdresse(adresse),
                            false,
                            `adresse-${index}`
                        )
                    )}

                {school?.telephone &&
                    renderContactInfo(
                        "MaterialIcons",
                        "local-phone",
                        school.telephone,
                        false,
                        "telephone"
                    )}

                {school?.email &&
                    renderContactInfo(
                        "MaterialCommunityIcons",
                        "email",
                        school.email,
                        false,
                        "email"
                    )}

                {school?.site &&
                    renderContactInfo(
                        "MaterialCommunityIcons",
                        "web",
                        school.site,
                        true,
                        "site"
                    )}
            </Card.Body>
        </Card>
    );
};

const s = StyleSheet.create({
    card: {},
    text: {
        flex: 2,
        color: Colors.secondary,
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
