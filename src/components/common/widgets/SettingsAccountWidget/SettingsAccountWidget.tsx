import { useTranslation } from 'react-i18next';
import { StyleProp, ViewStyle, TextStyle, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import { useAppStyle } from '@/constants';
import { CustomText, CustomButton } from '@/components/custom';
import { Widget } from '@/components/common/widgets/Widget';
import { useTheme } from '@/hooks';
import { ThemeProps } from '@/theme';
import { Image, ImageProps } from "expo-image";


export type SettingsAccountWidgetProps = {
    theme: ThemeProps;
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SettingsAccountWidget() {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const ss = useAppStyle({ theme });
    const navigation = useNavigation<NavigationProp>();

    const image: ImageProps = {
        source: theme.images.splashIcon,
        style: {
            width: 50,
            height: 50,
            borderRadius: 10,
            marginBottom: 0
        },
    };

    const rowsStyle: StyleProp<ViewStyle> = {
        flex: 1,
        flexDirection: "column"
    };
    const textStyle: StyleProp<TextStyle> = {
        color: theme.colors.secondary,
        marginBottom: 1,
        textAlign: 'center',
    }
    const handlePressLogin = () => {
        navigation.navigate('Auth', {
            screen: 'Login'
        });
    };
    const handlePressSignUp = () => {
        navigation.navigate('Auth', {
            screen: 'Register',
        });
    };


    return (
        <Widget style={ss.settingsWidgetContainer}>
            <CustomText style={ss.settingsWidgetTitle}>{t('account')}</CustomText>
            <View style={[ss.settingsWidgetContent, ss.shadow]}>

                <View style={[rowsStyle, { alignItems: 'center' , marginBottom: 20}]}>
                    <Image {...image} />
                    <CustomText style={[textStyle, ss.medium]}>{t('welcome')}</CustomText>
                    <CustomText style={[textStyle, ss.extraSmall]}>{t('account_text')}</CustomText>
                </View>
                <View style={rowsStyle}>
                    <CustomButton
                        title={t('log_in')}
                        colorText={theme.colors.light}
                        onPress={handlePressLogin}
                        style={{ backgroundColor: theme.colors.foreground }}
                    />
                    <CustomButton
                        title={t('sign_up')}
                        colorText={theme.colors.black}
                        onPress={handlePressSignUp}
                        style={{ backgroundColor: theme.colors.default }}
                    />
                </View>
            </View>
        </Widget>
    );
};