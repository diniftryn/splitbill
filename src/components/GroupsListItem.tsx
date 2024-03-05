import { StyleSheet, Text, Pressable, View, Image, Alert, TouchableOpacity, Animated, ActivityIndicator } from "react-native";
import { Link, useRouter } from "expo-router";
import { imageMap } from "@/assets/images";
import { Swipeable } from "react-native-gesture-handler";
import { supabase } from "../lib/supabase";
import { useDeleteGroup, useGroupList } from "../api/groups";

export default function groupsListItem({ group }: any) {
  const router = useRouter();
  const { mutate: deleteGroup } = useDeleteGroup();

  const imagePath = imageMap[group.imageUrl];

  const renderRightActions = (dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [0, 0.5, 1]
    });

    const handleDelete = async (group: Group) => {
      deleteGroup(group, {
        onSuccess: () => {
          router.replace("/(tabs)/groups");
        }
      });
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
