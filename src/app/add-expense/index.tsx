import { View, Text } from "react-native";
import React from "react";
import ExpenseForm from "@/src/components/ExpenseForm";

export default function AddExpenseModal() {
  let group = { id: "43", name: "Coffee lover", imageUrl: "", userIds: ["1", "2"], expenseIds: [] };
  let splitPercentage: number[] = [];
  let users = [
    { id: "1", username: "Dini", friendIds: null, groupIds: ["43"] },
    { id: "2", username: "Anne", friendIds: null, groupIds: ["43"] }
  ];

  splitPercentage = Array(group.userIds.length).fill(100 / group.userIds.length);

  return <ExpenseForm participants={users} group={group} percentage={splitPercentage} />;
}
