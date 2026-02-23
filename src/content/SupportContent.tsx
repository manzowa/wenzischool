import { useTranslation } from 'react-i18next';
import {
    View, ScrollView, ScrollViewProps
} from "react-native";
import { useAppStyle } from "@/constants";
import { 
    CustomIcon, 
    CustomIconProps, CustomText 
} from '@/components/custom';
import { ButtonLink } from "@/components/common/ButtonLink/ButtonLink";
import { Widget } from "@/components/common/widgets/Widget";
import { ThemeProps } from "@/theme";

export type SupportContentProps = {
    theme: ThemeProps;
    navigation?: null;
    scrollViewProps?: ScrollViewProps;
};

export default function SupportContent({
    theme, navigation,
    scrollViewProps
}: SupportContentProps) {
    const { t } = useTranslation();
    const ss = useAppStyle({ theme });
    const iconProps: CustomIconProps = {
        iconName: "Entypo",
        source: "help-with-circle",
        color: theme.colors.light,
        size: 24,
        style: ss.icon,
    };

    return (
        <ScrollView {...scrollViewProps}>
            <Widget style={ss.container}>
                <View style={ss.supportAssistance}>
                    <View style={ss.supportInfo}>
                        <CustomIcon {...iconProps} />
                        <CustomText style={[{ color: theme.colors.secondary }, ss.extraSmall]}>
                            {t("support_center_help_title")}
                        </CustomText>
                    </View>
                    <View style={ss.supportFaq}>
                        <CustomText style={[{ color: theme.colors.secondary }, ss.medium]} >
                           {t("support_center_faq_title")}
                        </CustomText>
                        <CustomText style={[{ color: theme.colors.secondary }, ss.extraSmall]} >
                          {t("support_center_message")}
                        </CustomText>
                        <ButtonLink url={"https://manzowa.com/contact"} style={ss.supportButton}>
                            {t("support_center_button")}
                        </ButtonLink>
                    </View>
                </View>
            </Widget>
        </ScrollView>
    );
}