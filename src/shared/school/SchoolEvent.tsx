import { useTranslation } from 'react-i18next';
import React, { useCallback, useState, useMemo } from "react";
import {
    View, TouchableOpacity, TouchableOpacityProps,
    Animated, StyleProp, ViewStyle, TextStyle
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppStyle } from "@/constants";
import { formatDate } from "@/utils/helpers";
import { Empty } from "@/components/common/Empty";
import { Card } from "@/components/common/Card";
import {
    CustomText, CustomIcon,
    CustomIconProps
} from "@/components/custom";
import { RootStackParamList, EventType, ImageType } from "@/types";

import { useTheme } from "@/hooks";
import { Widget } from "@/components/common/widgets/Widget";
import { ThemeProps } from "@/theme";


export type SchoolEventProps = {
    evenements: EventType[];
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "App">;


type RenderRowedProps = {
    theme: ThemeProps,
    images: ImageType[],
    title: string,
    date?: string,
    imageStyle?: StyleProp<ViewStyle>
};

const RenderRowed: React.FC<RenderRowedProps> = ({ theme, images, title, date, imageStyle }) => {
    const ss = useAppStyle({ theme });
    const logo: ImageType | undefined = useMemo(() => {
        return images?.find((image: ImageType) =>
            image.title?.toLowerCase().includes(title?.toLowerCase() ?? "")
        );
    }, [images, title]);

    const containerStyle: StyleProp<ViewStyle | TextStyle> = [
        {
            padding: 10,
            width: 45,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            backgroundColor: theme.colors.primary,
            color: theme.colors.light,
        },
        imageStyle
    ];
    const cardStyle: StyleProp<ViewStyle> = {
        flex: 1, flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: theme.colors.primary,
        borderBottomWidth: 1,
        marginBottom: 5
    };
    const rowStyle: StyleProp<ViewStyle> = [{
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'flex-start', marginLeft: 8

    }];
    const titleStyle: StyleProp<TextStyle> = [
        ss.medium,
        { color: theme.colors.secondary, marginLeft: 8 }
    ];
    const dateStyle: StyleProp<TextStyle> = [
        ss.extraSmall,
        { color: theme.colors.secondary }
    ];
    const iconTitleProps: CustomIconProps = {
        iconName: logo ? "Logo" : "Ionicons",
        source: logo?.url ?? "trophy-sharp",
        size: 24,
        style: containerStyle
    };
    const iconDateProps: CustomIconProps = {
        iconName: "MaterialIcons",
        source: "calendar-today",
        size: 16,
        color: theme.colors.primary

    };
    return (
        <Card style={cardStyle}>
            <CustomIcon {...iconTitleProps} />
            <View style={{ flex: 2 }}>
                <CustomText style={titleStyle}>{title}</CustomText>
                <View style={rowStyle}>
                    <CustomIcon {...iconDateProps} />
                    <CustomText style={dateStyle}>{date}</CustomText>
                </View>
            </View>
        </Card>
    )
};

const MemoizedRenderRowed = React.memo(RenderRowed);

export const SchoolEvent = ({ evenements }: SchoolEventProps) => {
    const { t } = useTranslation();
    const navigation = useNavigation<NavigationProp>();
    const [scale] = useState(new Animated.Value(1));
    const { theme } = useTheme();
    const ss = useAppStyle({ theme });

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.75,
            useNativeDriver: true,
        }).start();
    };
    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    const goToEventDetail = useCallback((eventId: string) => {
        navigation.navigate("EventDetail", { eventId });
    }, [navigation]);

    const touchedProps = (id: string): TouchableOpacityProps => ({
        activeOpacity: 0.7,
        onPressIn: handlePressIn,
        onPressOut: handlePressOut,
        onPress: () => {
            goToEventDetail(id);
        }
    });

    const containerStyle: StyleProp<ViewStyle> = [
        {
            transform: [
                { scale },
                { translateY: scale.interpolate({ inputRange: [0, 1], outputRange: [5, 0] }) }
            ]
        }
    ];

    return (
        <Widget style={ss.settingsWidgetContainer}>
            <CustomText style={ss.settingsWidgetTitle}>{t('school_event_title')}</CustomText>
            {evenements && evenements.length > 0 ? (
                evenements.map((evenement) => (
                    <TouchableOpacity key={evenement.id} {...touchedProps(evenement.id.toString())}>
                        <Animated.View style={containerStyle}>
                            <MemoizedRenderRowed
                                theme={theme}
                                images={evenement.images}
                                title={evenement.titre}
                                date={formatDate(evenement.date, true)}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                ))
            ) : (<Empty message={t('no_event')} />)}
        </Widget>
    );
};