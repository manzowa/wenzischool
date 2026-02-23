import {
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  View,
} from "react-native";
import { SchoolItem } from "@/shared/school";
import { CustomText } from "@/components/custom";
import { SchoolType, RootStackParamList } from "@/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppStyle } from "@/constants";
import { useTheme } from "@/hooks";
import { Widget } from "@/components/common/widgets/Widget";

export type SchoolWidgetProps = {
  data: SchoolType[];
  title?: string;
  message?: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "App">;

export function SchoolWidget({ data , title, message}: SchoolWidgetProps) {
  const { theme } = useTheme();
  const ss = useAppStyle({theme});
  const navigation = useNavigation<NavigationProp>();
  const renderItem: ListRenderItem<SchoolType> = ({ item }) => (
    <TouchableOpacity
      key={item.id.toString()}
      activeOpacity={0.7}
      onPress={() => navigation.navigate("School", { schoolid: item.id.toString() })}
      testID={`school-item-${item.id}`}
    >
      <SchoolItem {...item} />
    </TouchableOpacity>
  );
  return (
    <Widget style={ss.widgetContainer}>
      <CustomText style={{color: theme.colors.secondary}}>{title}</CustomText>
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false} // car probablement dans un ScrollView parent
        />
      ) : (
        <View style={ss.widgetEmptyContainer}>
          <CustomText style={{color: theme.colors.secondary}}>{message}</CustomText>
        </View>
      )}
    </Widget>
  );
}