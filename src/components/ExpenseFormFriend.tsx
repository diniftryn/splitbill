import { Text, ActivityIndicator } from "react-native";
import React from "react";
import { useFriendGroup } from "../api/friends";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseFormFriend({ user, selectedFriendOrGroup }: { user: User; selectedFriendOrGroup: User }) {
  const { data: friendGroup, error: friendGroupError, isLoading: friendGroupIsLoading } = useFriendGroup(user.id, selectedFriendOrGroup.id);
  if (friendGroupIsLoading) return <ActivityIndicator />;
  if (friendGroupError) return <Text>Failed to fetch friend group</Text>;

  let group = { id: "", name: "", imageUrl: "", userIds: [], expenseIds: [] };
  if (friendGroup) group = friendGroup[0];
  const users = [user, selectedFriendOrGroup];
  const splitPercentage = [50, 50];
  const initialSplitAmt = [0, 0];

  return <ExpenseForm userId={user.id as string} participants={users} group={group} percentage={splitPercentage} initialSplitAmt={initialSplitAmt} />;
}
