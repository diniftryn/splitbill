import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useUserBalances } from "../api/balance";

export default function UserBalances({ id, groupId }: { id: string; groupId: string }) {
  const { data: balance, error, isLoading } = useUserBalances(groupId);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch balance</Text>;
  }

  return (
    <View style={styles.groupSubtitle}>
      {balance && balance.group && balance.group[0].userIds.every((userId: any) => balance.owedAmounts[userId] === 0) ? (
        <Text>All settled</Text>
      ) : (
        balance &&
        balance.group[0].userIds.map((userId: any) => {
          if (userId === id) {
            return (
              <>
                <Text key={userId} style={styles.subValue}>
                  {/* {balance.users && balance.users.find(user => user.id === userId).username} */}
                  {balance.owedAmounts[userId] < 0 ? "you are owed" : "you owe"}
                </Text>
                <Text key={userId} style={styles.subValue}>
                  {balance.owedAmounts[userId] < 0 ? `$${balance.owedAmounts[userId] * -1}` : `$${balance.owedAmounts[userId]}`}
                </Text>
              </>
            );
          }
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  groupSubtitle: {
    alignItems: "flex-end",
    color: "dimgray"
  },
  subValue: {
    // textTransform: "capitalize"
  }
});
