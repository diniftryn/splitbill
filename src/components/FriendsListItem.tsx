import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import { Link } from "expo-router";

export default function friendListItem({ friend }: any) {
  return (
    <Link href={`/(tabs)/friends/${friend.username}?friendId=${friend.id}`} asChild>
      <Pressable style={styles.friendContainer}>
        <View style={styles.friendTitle}>
          <Image source={require("@/assets/images/default.png")} className="w-[50px] h-[50px] rounded-full" />
          <Text style={styles.friendName}>{friend.username}</Text>
        </View>

        <View style={styles.friendSubtitle}>
          <Text style={styles.subValue}>settled</Text>
          <Text style={styles.subValue}>$0</Text>
        </View>
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
