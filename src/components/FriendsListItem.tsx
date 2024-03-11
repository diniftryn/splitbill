import { StyleSheet, Text, Pressable, View, Image, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import UserBalances from "./UserBalances";
import { useFriendGroup } from "../api/friends";
import { useAuth } from "../providers/AuthProvider";

export default function friendListItem({ friend }: any) {
  const { user } = useAuth();

  if (!user) throw new Error("no user");
  const { data: friendGroup, error: friendGroupError, isLoading: friendGroupIsLoading } = useFriendGroup(user.id, friend.id);
  if (friendGroupIsLoading) return <ActivityIndicator />;
  if (friendGroupError) return <Text>Failed to fetch friend group</Text>;

  return (
    <Link href={`/(tabs)/friends/${friend.username}?friendId=${friend.id}`} asChild>
      <Pressable style={styles.friendContainer}>
        <View style={styles.friendTitle}>
          <Image source={require("@/assets/images/default.png")} className="w-[50px] h-[50px] rounded-full" />
          <Text style={styles.friendName}>{friend.username}</Text>
        </View>

        {/* <View style={styles.friendSubtitle}>
          <Text style={styles.subValue}>settled</Text>
          <Text style={styles.subValue}>$0</Text>
        </View> */}
        {friendGroup && <UserBalances id={user.id as string} groupId={friendGroup[0].id} />}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  friendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#fff",
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 0,

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  friendTitle: { flexDirection: "row", alignItems: "center", gap: 20 },
  friendName: {
    fontSize: 17,
    fontWeight: "500"
  },
  friendSubtitle: {
    alignItems: "flex-end",
    color: "dimgray"
  },
  subValue: {
    // textTransform: "capitalize"
  }
});
