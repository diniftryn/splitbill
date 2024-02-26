import { StyleSheet, Text, Pressable, View } from "react-native";
import { Link } from "expo-router";
// import { Avatar } from "tamagui";

export default function groupsListItem({ group }: any) {
  return (
    <Link href={`/(tabs)/groups/${group.name}`} asChild>
      <Pressable style={styles.groupContainer}>
        <View style={styles.groupTitle}>
          <Text style={styles.groupName}>{group.name}</Text>
        </View>

        <View style={styles.groupSubtitle}>
          {/* <Text style={styles.subValue}>{group.status}</Text>
          <Text style={styles.subValue}>${group.amount}</Text> */}
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  groupContainer: {
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
  groupTitle: { flexDirection: "row", alignItems: "center", gap: 20 },
  groupName: {
    fontSize: 17,
    fontWeight: "500"
  },
  groupSubtitle: {
    alignItems: "flex-end",
    color: "dimgray"
  },
  subValue: {
    // textTransform: "capitalize"
  }
});
