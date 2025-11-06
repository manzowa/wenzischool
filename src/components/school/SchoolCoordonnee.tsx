import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "@/utils/card";
import { IconCustom, TextCustom } from "@/utils/custom";
import { SchoolType } from "@/utils/types";
import { ButtonLink } from "@/utils/button";
import { formatAdresse } from "@/utils/helpers";
import { Colors } from "@/constants";
import { useLinkActive } from "@/hooks";

type SchoolCoordonneeProps = {
    school?: SchoolType;
};

const RenderRow= (
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
            <TextCustom type="caption" color="secondary">{text}</TextCustom>
        )}
    </Card.Row>
);

export const SchoolCoordonnee = ({ school }: SchoolCoordonneeProps) => {
    const isActive = useLinkActive(school?.site ?? "");
    return (
        <Card>
            <Card.Header>
                <Card.Title>Informations de l'école</Card.Title>
            </Card.Header>
            <Card.Body>
                <View>
                    {school?.adresses?.length > 0 &&
                        school?.adresses.map((adresse: any[], index: number) =>
                            RenderRow(
                                "MaterialIcons",
                                "place",
                                formatAdresse(adresse),
                                false,
                                `adresse-${index}`
                            )
                        )}

                    {school?.telephone &&
                        RenderRow(
                            "MaterialIcons",
                            "local-phone",
                            school?.telephone,
                            false,
                            "telephone"
                        )}

                    {school?.email &&
                        RenderRow(
                            "MaterialCommunityIcons",
                            "email",
                            school?.email,
                            false,
                            "email"
                        )}

                    {isActive &&
                        RenderRow(
                            "MaterialCommunityIcons",
                            "web",
                            school?.site,
                            true,
                            "site"
                        )
                    }
                </View>
            </Card.Body>
        </Card>
    );
};

const s = StyleSheet.create({
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
    }
});