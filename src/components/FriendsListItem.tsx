import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import { Link } from "expo-router";
import { Avatar } from "tamagui";

export default function expenseListItem({ item }: any) {
  return (
    <Link href={`/(tabs)/friends/${item.name}`} asChild>
      <Pressable style={styles.expenseContainer}>
        <View style={styles.expenseTitle}>
          <Avatar circular size="$4">
            <Avatar.Image src={item.imageUrl} />
            <Avatar.Fallback bc="grey" />
          </Avatar>
          <Text style={styles.expenseName}>{item.name}</Text>
        </View>

        <View style={styles.expenseSubtitle}>
          <Text style={styles.subValue}>{item.status}</Text>
          <Text style={styles.subValue}>${item.amount}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  expenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#fff",
    padding: 6,
    paddingHorizontal: 20,
    marginHorizontal: 2,

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
  expenseTitle: { flexDirection: "row", alignItems: "center", gap: 20 },
  expenseName: {
    fontSize: 16,
    fontWeight: "500"
  },
  expenseSubtitle: {
    alignItems: "flex-end",
    color: "dimgray"
  },
  subValue: {
    // textTransform: "capitalize"
  }
});
