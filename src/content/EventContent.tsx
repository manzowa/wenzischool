import { useTranslation } from 'react-i18next';
import { useState, useMemo } from "react";
import {
    ScrollView, ScrollViewProps,
    View, Pressable,
    Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useAppStyle } from "@/constants/Styles";
import { EventList } from "@/shared/event/EventList";
import { useEvents } from "@/hooks/useEvents";
import { ThemeProps } from "@/theme";
import { CustomText } from "@/components/custom";
import { Widget } from "@/components/common/widgets";

export type EventContentProps = {
    theme: ThemeProps;
    scrollViewProps?: ScrollViewProps;
    navigation?: null;
};

export default function EventContent({
    theme, scrollViewProps, navigation
}: EventContentProps) {
  
    const { t } = useTranslation();
    const ss = useAppStyle({ theme });

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTown, setSelectedTown] = useState<string>("all");
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (_event: any, date?: Date) => {
        setShowDatePicker(Platform.OS === "ios"); // keep picker open on iOS
        if (date) {
            setSelectedDate(date);
        }
    };
    const fDated = (date: string ) => {
        return new Date(date).toISOString().slice(0, 19).replace("T", " ");
    }
    const formattedDate = selectedDate ? fDated(selectedDate.toISOString()) : "any";
    const formattedTown = useMemo(() => {
        if (!selectedTown) return "all";
        return selectedTown;
    }, [selectedTown]);
    const { events, loading } = useEvents(formattedDate, formattedTown);

    return (
        <ScrollView {...scrollViewProps}>
            <Widget style={ss.container}>
                <View style={ss.filterContainer}>
                    <CustomText style={{ color: theme.colors.light }}>{t("event_filter_title")}</CustomText>
                    <View style={ss.eventFilterContent}>
                        <View style={ss.eventContentFilterDate}>
                            <Pressable onPress={() => setShowDatePicker(true)}>
                                <CustomText style={[{ color: theme.colors.secondary }, ss.small]}>
                                    {selectedDate ? selectedDate.toLocaleDateString(t("local")) + " " : t("choose_date")}
                                </CustomText>
                            </Pressable>
                            {showDatePicker && (
                                <DateTimePicker value={selectedDate || new Date()}
                                    mode="date" display="default"
                                    onChange={handleDateChange}
                                    locale={t("local")}
                                />
                            )}
                        </View>
                        <View style={ss.eventContentFilterTown}>
                            <Picker
                                selectedValue={selectedTown}
                                onValueChange={(itemValue) => setSelectedTown(itemValue)}
                                style={[{ color: theme.colors.secondary }]}
                            >
                                <Picker.Item style={ss.small} label={t("choose_town")} value="all" />
                                <Picker.Item style={ss.small} label={t("town_default")} value={t("town_default")} />
                            </Picker>
                        </View>
                    </View>
                </View>
                <EventList evenements={events} loading={loading} />
            </Widget>
        </ScrollView>
    );
}