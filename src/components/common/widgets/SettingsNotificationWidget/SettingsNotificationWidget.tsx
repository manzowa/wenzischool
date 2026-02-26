import React from 'react';
import { StyleProp, ViewStyle, TextStyle, View, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
    CustomIcon, CustomIconProps,
    CustomText
} from "@/components/custom";
import { Widget } from '@/components/common/widgets/Widget';
import { useTheme, useNotifications } from "@/hooks";
import { useAppStyle } from "@/constants";


export type SettingsNotificationWidgetProps = {
    options?: any[]
};

const SettingsNotificationWidget = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { enabled, toggle } = useNotifications();
    const ss = useAppStyle({ theme });

    const iconProps: CustomIconProps = {
        iconName: "MaterialIcons",
        source: enabled ? "notifications-on" : "notifications-off",
        size: 24,
        color: theme.colors.primary
    };
    const containerStyle: StyleProp<ViewStyle> = [
        ss.settingsWidgetContent,
        ss.shadow,
        {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }

    ];
    const rowStyle: StyleProp<ViewStyle> = [
        { flexDirection: 'row', alignItems: 'center' }
    ];
    const textStyle: StyleProp<TextStyle> = [{ color: theme.colors.secondary }, ss.small];

    return (
        <Widget style={ss.settingsWidgetContainer}>
            <CustomText style={ss.settingsWidgetTitle}>{t('notification')}</CustomText>
            <View style={containerStyle}>
                <View style={rowStyle}>
                    <CustomIcon {...iconProps} />
                    <CustomText style={textStyle}>{t('active')}</CustomText>
                </View>
                <Switch
                    value={enabled}
                    onValueChange={toggle}
                    trackColor={{ false: theme.colors.grayLight, true: theme.colors.grayLight }}
                    thumbColor={enabled ? theme.colors.primary : theme.colors.light}
                />
            </View>
        </Widget>
    );
}

export default SettingsNotificationWidget;