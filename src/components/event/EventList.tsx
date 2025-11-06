import React, { useCallback } from "react";
import { View, FlatList, RefreshControl, RefreshControlProps} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EventItem } from "./EventItem";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@/utils/types/types";
import Empty from "@/utils/Empty";
import { EventType } from "@/utils/types";

type EventListProps = {
  evenements:  EventType[];
  navigation?: any;
  text?: string;
  setText?: Function;
  setClicked?: Function;
  loading?: boolean;
  refreshControl?: React.ReactElement<RefreshControlProps, typeof RefreshControl>;
}

type NavigationProp = NativeStackNavigationProp<AppStackParamList, "App">;

export const EventList = ({ evenements , loading}: EventListProps) => {
  const navigation = useNavigation<NavigationProp>();

  const goToEventDetail = useCallback(
    (eventId: string) => {
      navigation.navigate("EventDetail", { eventId });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: any) => (
      <EventItem
        {...item}
        onPress={() => goToEventDetail(item.id.toString())}
      />
    ),
    [goToEventDetail]
  );

  return (
    <View style={{ marginTop: 10}}>
      {evenements?.length > 0 ? (
        <FlatList
          data={evenements}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} />}
        />
      ) : (
        <Empty message="Aucun événement disponible" />
      )}
    </View>
  );
}