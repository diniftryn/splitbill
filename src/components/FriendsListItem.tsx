import { StyleSheet, Text, Pressable, View } from "react-native";
import { Link } from "expo-router";

export default function expenseListItem({ item }: any) {
  return (
    <Link href={`/(tabs)/friends/${item.name}`} asChild>
      <Pressable style={styles.expenseContainer}>
        <Text style={styles.expenseName}>{item.name}</Text>

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
    padding: 10,
    borderRadius: 10,
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
  expenseName: {
    fontSize: 20,
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
