import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import { Link } from "expo-router";
import { imageMap } from "@/assets/images";

export default function groupsListItem({ group }: any) {
  const imagePath = imageMap[group.imageUrl];

  return (
    <Link href={`/(tabs)/groups/${group.name}?groupId=${group.id}`} asChild>
      <Pressable style={styles.groupContainer}>
        <View style={styles.groupTitle}>
          <Image source={imagePath} className="w-[50px] h-[50px] rounded-full" />
          <Text style={styles.groupName}>{group.name}</Text>
        </View>

        <View style={styles.groupSubtitle}>
          <Text style={styles.subValue}>owed</Text>
          <Text style={styles.subValue}>$0</Text>
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
