import { Text } from "react-native";
import { ActivityIndicator } from "react-native";
import Friends from "@/src/components/Friends";
import { useFriendList } from "@/src/api/friends";
import { gql, useQuery } from "@apollo/client";
import { GET_GROUPS } from "@/src/lib/queries";

export default function IndexScreen() {
  // const { data: friends, error, isLoading } = useFriendList();
  const { data: friends, error } = useQuery(GET_GROUPS);

  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }

  if (error) {
    return <Text>Failed to fetch friends {error.message}</Text>;
  }

  return <Text>{JSON.stringify(friends)}</Text>;

  // return <Friends friends={friends as User[]} />;
}
