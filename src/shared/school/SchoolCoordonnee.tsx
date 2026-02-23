import { useTranslation } from 'react-i18next';
import React from "react";
import {
    StyleProp, ViewStyle
} from "react-native";
import { formatAdresse } from "@/utils";
import { SchoolType } from "@/types";
import { Card } from "@/components/common/Card";
import { CustomButtonLink } from "@/components/custom/CustomButtonLink";
import { Widget } from "@/components/common/widgets/Widget";
import {
    CustomIcon, CustomIconProps, CustomText
} from "@/components/custom";
import { useAppStyle } from "@/constants";
import { useLinkActive, useTheme } from "@/hooks";



export type SchoolCoordonneeProps = {
    school: SchoolType;
};

const RenderRow = (
    iconName: any,
    source: any,
    text: string | React.ReactNode,
    title: string,
    button?: boolean,
    key?: React.Key,
    theme?: any,
    style?: any,
   
) => {
    const ss = style;
    const iconProps: CustomIconProps = {
        iconName: iconName,
        source: source,
        color: theme.colors.primary,
        size: 24
    };
    const btnStyle: StyleProp<ViewStyle> = [
        ss.btn, ss.shadows
    ];
    return (
        <Card.Row key={key}>
            < CustomIcon {...iconProps} />
            {button ? (
                <CustomButtonLink
                    title={title}
                    url={text as string}
                    style={btnStyle}
                />
            ) : (
                <CustomText style={[{ color: theme.colors.secondary }, ss.extraSmall]}>{text}</CustomText>
            )}
        </Card.Row>
    )
};

export const SchoolCoordonnee = ({ school }: SchoolCoordonneeProps) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const ss = useAppStyle({ theme });
    const isActive = useLinkActive(school?.site ?? "");
    const { adresses = [], telephone, email, site } = school ?? {};
    const fields = [
        {
            condition: Boolean(telephone),
            iconSet: "MaterialIcons",
            icon: "local-phone",
            value: telephone,
            key: "telephone",
            isLink: false,
        },
        {
            condition: Boolean(email),
            iconSet: "MaterialCommunityIcons",
            icon: "email",
            value: email,
            key: "email",
            isLink: false,
        },
        {
            condition: isActive && Boolean(site),
            iconSet: "MaterialCommunityIcons",
            icon: "web",
            value: site,
            key: "site",
            isLink: true,
        },

    ];
    const btnTitle:string = t('go_to').toString();
    
    return (
        <Widget style={ss.settingsWidgetContainer}>
            <CustomText style={ss.settingsWidgetTitle}>{t('school_info')}</CustomText>
            <Card>
                <Card.Body>
                    {/* Affichage des adresses */}
                    {adresses.length > 0 &&
                        adresses.map((adresse, index: number) =>
                            RenderRow(
                                "MaterialIcons",
                                "place",
                                formatAdresse(adresse),
                                btnTitle,
                                false,
                                `adresse-${adresse?.id ?? index}`,
                                theme,
                                ss,
                            )
                        )
                    }
                    {/* Affichage des informations de contact */}
                    {fields
                        .filter(field => field.condition) // Filtrer les champs valides
                        .map(field =>
                            RenderRow(
                                field.iconSet,
                                field.icon,
                                field.value,
                                btnTitle,
                                field.isLink,
                                field.key,
                                theme,
                                ss
                            )
                        )}
                </Card.Body>
            </Card>
        </Widget>
    );
};