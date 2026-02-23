import { useTranslation } from 'react-i18next';
import { 
    CustomIcon,CustomIconProps,
    CustomText, CustomRadio, 
    CustomRadioProps, CustomRadioGroupProps
} from "@/components/custom";
import { Widget } from '@/components/common/widgets/Widget';
import { useTheme } from "@/hooks";
import { useAppStyle } from "@/constants";

export type SettingsThemeWidgetType = {
  icon: CustomIconProps;
  radio?:CustomRadioProps
};
export type SettingsThemeWidgetProps = {
    options: any[]
};

const SettingsThemeWidget = ({ options = [] }: SettingsThemeWidgetProps) => {
    const { t } = useTranslation();
    const { theme, mode, setMode } = useTheme();
    const ss = useAppStyle({ theme });
    const handleChangeTheme = (value: string) => {
        if (value === "light" || value === "dark" || value === "system") {
            setMode(value);
        }
    };
    const groupProps: CustomRadioGroupProps = {
        style: [ss.settingsWidgetContent, ss.shadow],
        value: mode,
        onValueChange: handleChangeTheme,
    };
    const radioFuncProps = (option: CustomRadioProps) : CustomRadioProps => {
        return { ...option};
    };
    const iconFuncProps = (option: CustomIconProps) : CustomIconProps => {
        return {
            iconName : option.iconName,
            source: option.source,
            size: option.size,
            style: [{ marginRight: 4, color: option.color }]
        };
    };

    return (
        <Widget style={ss.settingsWidgetContainer}>
            <CustomText style={ss.settingsWidgetTitle}>{t('theme')}</CustomText>
            <CustomRadio.Group {...groupProps} >
                {
                    options?.map((option) => (
                        <CustomRadio
                            key={option.radio.label}
                            {...radioFuncProps(option.radio)}
                        >
                            <CustomIcon {...iconFuncProps(option.icon)} />
                        </CustomRadio>
                    ))
                }
            </CustomRadio.Group>
        </Widget>
    );
}

export default SettingsThemeWidget;