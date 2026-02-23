import { useTranslation } from 'react-i18next';
import React from "react";
import { StyleProp, ViewStyle, TextStyle} from "react-native";
import { SchedulesType } from "@/types";
import { Card } from "@/components/common/Card";
import { CustomText } from "@/components/custom";
import { formaTimer } from "@/utils/helpers";
import { useAppStyle } from "@/constants";
import { useTheme } from "@/hooks";
import { Widget } from "@/components/common/widgets/Widget";

export type SchoolScheduleProps = {
    horaires: SchedulesType[];
};

export const SchoolSchedule = ({ horaires }: SchoolScheduleProps) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const ss = useAppStyle({ theme });

    const rowStyle: StyleProp<ViewStyle> = [
        {
            justifyContent: 'space-between', 
            borderBottomColor: theme.colors.secondary, 
            borderBottomWidth: 1
        }
    ];
    const textStyle: StyleProp<TextStyle> = [
        { color: theme.colors.secondary }, 
        ss.extraSmall
    ];

    return (
        <Widget style={ss.settingsWidgetContainer}>
            <CustomText style={ss.settingsWidgetTitle}>{t('school_schedule')}</CustomText>
            <Card>
                <Card.Body>
                    {horaires && horaires?.length > 0 ? (
                        horaires.map((horaire: any, index: number) => (
                            <Card.Row key={index} style={rowStyle}>
                                <CustomText style={textStyle}>{t(horaire.jour.toLowerCase())} : </CustomText>
                                {horaire.debut === '00:00:00' && horaire.fin === '00:00:00' ? (
                                    <CustomText style={textStyle}>{t('closed')}</CustomText>
                                ) : (
                                    <CustomText style={textStyle}>
                                        {t('from')} {formaTimer(horaire.debut)} {t('to')} {formaTimer(horaire.fin)}
                                    </CustomText>
                                )}
                            </Card.Row>
                        ))
                    ) : (
                        <CustomText style={textStyle}>{t('no_schedule')}</CustomText>
                    )}
                </Card.Body>
            </Card>
        </Widget>
    );
};