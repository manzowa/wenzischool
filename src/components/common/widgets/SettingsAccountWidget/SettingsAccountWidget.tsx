import { useTranslation } from 'react-i18next';
import { StyleProp, ViewStyle, TextStyle, View } from 'react-native';
import { useAppStyle } from '@/constants';
import { CustomText, CustomButton } from '@/components/custom';
import { Widget } from '@/components/common/widgets/Widget';
import { useTheme } from '@/hooks';
import { ThemeProps } from '@/theme';


export type SettingsAccountWidgetProps = {
    theme: ThemeProps;
};

export default function SettingsAccountWidget() {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const ss = useAppStyle({ theme });

    const rowsStyle: StyleProp<ViewStyle> = {
        flex: 1,
        flexDirection: "column"
    };
    const textStyle: StyleProp<TextStyle> = {
        color: theme.colors.secondary,
        marginBottom: 5
    }

    return (
        <Widget style={ss.settingsWidgetContainer}>
            <CustomText style={ss.settingsWidgetTitle}>{t('account')}</CustomText>
            <View style={[ss.settingsWidgetContent, ss.shadow]}>
                <CustomText style={[textStyle, ss.small]}>
                    {t('account_text')}
                </CustomText>
                <View style={rowsStyle}>
                    <CustomButton
                        title={t('log_in')}
                        colorText={theme.colors.light}
                        style={{ backgroundColor: theme.colors.foreground }}
                    />
                    <CustomButton
                        title={t('sign_up')}
                        colorText={theme.colors.black}
                        style={{ backgroundColor: theme.colors.default }}
                    />
                </View>
            </View>
        </Widget>
    );
};