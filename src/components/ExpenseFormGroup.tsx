import { Text, ActivityIndicator } from "react-native";
import React from "react";
import ExpenseForm from "./ExpenseForm";
import { useGroupUsers } from "../api/groups";

export default function ExpenseFormGroup({ user, selectedFriendOrGroup }: { user: User; selectedFriendOrGroup: Group }) {
  const { data: groupUsers, error: groupUsersError, isLoading: groupUsersIsLoading } = useGroupUsers(selectedFriendOrGroup.userIds as string[]);
  if (groupUsersIsLoading) return <ActivityIndicator />;
  if (groupUsersError) return <Text>Failed to fetch group users</Text>;

  const group = selectedFriendOrGroup;
  const users = groupUsers as User[];
  const numberOfParticipants = group.userIds.length;
  const splitPercentage = Array(numberOfParticipants).fill(100 / numberOfParticipants);
  const initialSplitAmt = Array(numberOfParticipants).fill(0);

  return <ExpenseForm userId={user.id as string} participants={users} group={group} percentage={splitPercentage} initialSplitAmt={initialSplitAmt} />;
}
