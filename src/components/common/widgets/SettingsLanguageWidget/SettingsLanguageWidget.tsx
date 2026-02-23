import { useTranslation } from 'react-i18next';
import { ImageProps } from "expo-image";
import { useAppStyle } from '@/constants';
import {
    CustomText, CustomRadio, CustomIcon, CustomIconProps,
    CustomRadioProps, CustomRadioGroupProps
} from "@/components/custom";
import { Widget } from '@/components/common/widgets/Widget';
import { useTheme, useLanguage } from '@/hooks';
import { Loading } from '@/components/common/Loading';

export type SettingsLanguageWidgetType = {
    radio: CustomRadioProps;
    icon?: any;
    image?: ImageProps;
};
export type SettingsLanguageWidgetProps = {
    options: any[]
};

export default function SettingsLanguageWidget({ options = [] }: SettingsLanguageWidgetProps) {
    const { t } = useTranslation();
    const { language, changeLanguage, loading} = useLanguage();

    const { theme } = useTheme();

    const ss = useAppStyle({ theme });
    const radioFuncProps = (option: CustomRadioProps): CustomRadioProps => {
        return { ...option };
    };
    const iconFuncProps = (option: CustomIconProps): CustomIconProps => {
        return {
            iconName: option.iconName,
            source: option.source,
            size: option.size,
            style: [{ marginRight: 8 }, option.style]
        };
    };
    const handleLanguageChange = (value: string) => {
        if (value === 'fr' || value === 'en') {
            changeLanguage(value)
        }
    }
    const groupProps: CustomRadioGroupProps = {
        style: [ss.settingsWidgetContent, ss.shadow],
        value: language,
        onValueChange: handleLanguageChange,
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <Widget style={ss.settingsWidgetContainer}>
            <CustomText style={ss.settingsWidgetTitle}>{t('change_language')}</CustomText>
            <CustomRadio.Group {...groupProps} >
                {
                    options?.map((option) => (
                        <CustomRadio key={option.radio.label} {...radioFuncProps(option.radio)} >
                            <CustomIcon {...iconFuncProps(option.icon)} />
                        </CustomRadio>
                    ))
                }
            </CustomRadio.Group>
        </Widget>
    );
}