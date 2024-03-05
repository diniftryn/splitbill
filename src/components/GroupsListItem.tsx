import { StyleSheet, Text, Pressable, View, Image, Alert, TouchableOpacity, Animated } from "react-native";
import { Link } from "expo-router";
import { imageMap } from "@/assets/images";
import { Swipeable } from "react-native-gesture-handler";
import { supabase } from "../lib/supabase";

export default function groupsListItem({ group }: any) {
  const imagePath = imageMap[group.imageUrl];

  const renderRightActions = (dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [0, 0.5, 1]
    });

    const handleDelete = async (group: Group) => {
      const { data: deleteGroup, error: errorGroup } = await supabase.from("groups").delete().eq("id", group.id);
      const { data: expenses, error: errorExpenses } = await supabase.from("expenses").delete().in("id", group.expenseIds);

      group.userIds.map(async userId => {
        const { data: user, error: errorUser } = await supabase.from("users").select().eq("id", userId).single();
        const groupIdsToUpdate = user.groupIds.filter((id: string) => {
          return id !== group.id;
        });

        const { data: updateGroup, error: errorUpdateGroup } = await supabase.from("users").update({ groupIds: groupIdsToUpdate }).eq("id", userId).select();
        console.log("userId: " + userId + " groupIdsToUpdate: " + groupIdsToUpdate);
      });

      console.log(deleteGroup);
      if (!errorGroup && !errorExpenses) Alert.alert("delete button pressed! " + group.id);
    };

    return (
      <TouchableOpacity onPress={() => handleDelete(group)}>
        <View
          style={{
            flex: 1,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingHorizontal: 15
          }}
        >
          <Animated.Text
            style={{
              color: "white",
              fontWeight: "600",
              transform: [{ translateX: trans }]
            }}
          >
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="bg-white">
      <Swipeable renderRightActions={renderRightActions}>
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
      </Swipeable>
    </View>
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
    marginHorizontal: 0

    // shadow
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 2
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
