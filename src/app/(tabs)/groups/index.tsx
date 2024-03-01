import { ActivityIndicator, Text } from "react-native";
import Groups from "@/src/components/Groups";
import { useGroupList } from "@/src/api/groups";

export default function IndexScreen() {
  const { data: groups, error, isLoading } = useGroupList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch groups</Text>;
  }

  return <Groups groups={groups as Group[]} />;
}
