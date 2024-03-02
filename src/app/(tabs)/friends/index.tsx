import { Text } from "react-native";
import { ActivityIndicator } from "react-native";
import Friends from "@/src/components/Friends";
import { useFriendList } from "@/src/api/friends";

export default function IndexScreen() {
  const { data: friends, error, isLoading } = useFriendList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch friends</Text>;
  }

  return <Friends friends={friends as User[]} />;
}
