import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from "react";
import {
    ScrollView, ScrollViewProps,
    RefreshControl
} from "react-native";
import { useAppStyle } from "@/constants";
import { ThemeProps } from "@/theme";
import { useSchoolsBy } from "@/hooks";
import { Loading } from "@/components/common/Loading";
import { CustomText } from "@/components/custom";

import { 
    SearchBar, SearchBarProps
} from "@/components/common/SearchBar";
import {
    SchoolList, SchoolListProps
} from "@/shared/school/SchoolList";
import { 
    Widget,
    BlockWidget, BlockWidgetProps
} from "@/components/common/widgets";


export type SchoolSearchContentProps = {
    navigation: any;
    theme: ThemeProps;
    scrollViewProps?: ScrollViewProps;
}

const SchoolSearchContent = ({
    navigation, theme, 
    scrollViewProps
}: SchoolSearchContentProps) => {
    const { t } = useTranslation();
    const [text, setText] = useState("");
    const [debouncedText, setDebouncedText] = useState(text);
    const [clicked, setClicked] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { schools, loading, error } = useSchoolsBy(debouncedText, 8);

    const ss = useAppStyle({ theme });

    useEffect(() => {
        const handler = setTimeout(() => {setDebouncedText(text);}, 500);
        return () => clearTimeout(handler);
    }, [text]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {setRefreshing(false);}, 1000);
    }, []);

    const blockWidgetProps: BlockWidgetProps = {
        iconName: "Logo",
        source: theme.images.townIcon,
        text: t("search_title"),
        color: theme.colors.primary,
    };
    const searchBarProps: SearchBarProps = {
        text: text,
        setText: setText,
        clicked: clicked,
        setClicked: setClicked,
        placeholder: t("search_placeholder"),
        placeholderTextColor: theme.colors.primary,
    };

    const schoolListProps: SchoolListProps = {
        data: schools,
        navigation: navigation,
        text: text,
        setText: setText,
        setClicked: setClicked,
        refreshControl: <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    };

    return (
        <ScrollView {...scrollViewProps}>
            <Widget style={ss.container}>
                {!clicked && !text && (<BlockWidget {...blockWidgetProps} />)}
                <SearchBar {...searchBarProps} />
                {loading && (<Loading />)}
                {error && (<CustomText style={ss.searchErrorText}>{t("error_loading_data")}</CustomText>)}
                {!loading && schools?.length === 0 && debouncedText !== "" && (
                    <CustomText style={ss.searchNoResult}>{t("no_school_alter")} « {debouncedText} »</CustomText>
                )}
                <SchoolList {...schoolListProps} />
            </Widget>
        </ScrollView>
    );
}

export default SchoolSearchContent;