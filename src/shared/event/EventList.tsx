import { useTranslation } from 'react-i18next';
import React, { useCallback } from "react";
import { View, FlatList, RefreshControl, RefreshControlProps} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { EventItem } from "@/shared/event/EventItem";
import { Empty } from "@/components/common/Empty";
import { 
  RootStackParamList, EventType, 
} from "@/types";

export type EventListProps = {
  evenements:  EventType[];
  navigation?: any;
  text?: string;
  setText?: Function;
  setClicked?: Function;
  loading?: boolean;
  refreshControl?: React.ReactElement<RefreshControlProps, typeof RefreshControl>;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "App">;

export const EventList = ({ evenements , loading}: EventListProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();

  const goToEventDetail = useCallback(
    (eventId: string) => { navigation.navigate("EventDetail", { eventId });},
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: any) => (<EventItem {...item} onPress={() => goToEventDetail(item.id.toString())}/>),
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
        <Empty message={t("no_event")} />
      )}
    </View>
  );
}