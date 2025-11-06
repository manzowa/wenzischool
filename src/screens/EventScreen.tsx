import React, { useState, useMemo } from "react";
import {
  ScrollView,
  ImageBackground,
  View,
  Pressable,
  Platform,
  StyleSheet
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Colors, AppImages, AppStyle } from "@/constants";
import { EventList } from "@/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Widget } from "@/utils/widget";
import { TextCustom } from "@/utils/custom";
import { useEvents } from "@/hooks";

export function EventScreen() {
  const insets = useSafeAreaInsets();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTown, setSelectedTown] = useState<string>("all");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (_event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === "ios"); // keep picker open on iOS
    if (date) {
      setSelectedDate(date);
    }
  };

  const formattedDate = selectedDate
  ? new Date(selectedDate).toISOString().slice(0, 19).replace("T", " ")
  : "any";
  
  const formattedTown = useMemo(() => {
    if (!selectedTown) return "all";
    return selectedTown;
  }, [selectedTown]);

  const { events, loading } = useEvents(formattedDate, formattedTown);
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={AppStyle.safeArea}>
        <ImageBackground
          source={AppImages.background}
          resizeMode="cover"
          style={AppStyle.bg}
        >
          <ScrollView
            contentContainerStyle={{
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            }}
          >
            <Widget style={AppStyle.widgetContainer}>
              <View style={s.containerEvent}>
                <View style={[s.filterContainer]}>
                  <TextCustom color="light">Filtrer les évènements</TextCustom>
                  <View style={s.filterContent}>
                    <View style={s.filterDate}>
                      <Pressable onPress={() => setShowDatePicker(true)}>
                        <TextCustom type="caption" color="secondary">
                          {selectedDate
                            ? selectedDate.toLocaleDateString("fr-FR") + " "
                            : "Choisir une date"}
                        </TextCustom>
                      </Pressable>
                      {showDatePicker && (
                        <DateTimePicker
                          value={selectedDate || new Date()}
                          mode="date"
                          display="default"
                          onChange={handleDateChange}
                          locale="fr-FR"
                        />
                      )}
                    </View>
                    <View style={s.filterTown}>
                      <Picker
                        selectedValue={selectedTown}
                        onValueChange={(itemValue) => setSelectedTown(itemValue)}
                        style={[{ color: Colors.secondary }]}
                      >
                        <Picker.Item style={AppStyle.caption} label="Tous les villes" value="all" />
                        <Picker.Item style={AppStyle.caption} label="kinshasa" value="kinshasa" />
                      </Picker>
                    </View>
                  </View>
                </View>
                <EventList evenements={events} loading={loading} />
              </View>
            </Widget>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({

  containerEvent: {
    marginBottom: 20,
    marginTop: 10
  },
  content: {
    padding: 8,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 6
  },
  contentFilter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2
  },
  filterDate: {
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 12,
    backgroundColor: Colors.light,
    marginRight: 10,
  },
  filterTown: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: Colors.light,
  },
  filterContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5
  },
  filterContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }
});