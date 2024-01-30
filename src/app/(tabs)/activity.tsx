import { FlatList } from "react-native";
import { View } from "tamagui";
import { activities } from "../../../constants/Data";
import ActivityListItem from "../../components/ActivityListItem";

export default function ActivityScreen() {
  return (
    <View>
      <FlatList data={activities} contentContainerStyle={{ gap: 5 }} style={{ padding: 10 }} keyExtractor={(item, index) => item.lineOne + index} renderItem={({ item }) => <ActivityListItem item={item} />} onEndReachedThreshold={1} contentInsetAdjustmentBehavior="automatic" />
    </View>
  );
}
