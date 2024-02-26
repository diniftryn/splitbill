type User = {
  id: string | number;
  username: string;
  friendIds: [] | null;
  groupIds: [] | null;
};

type Group = {
  id: string | number;
  name: string;
  imageUrl: string;
  userIds: string[] | number[];
  expenseIds: string[] | number[];
};

type Expense = {
  id: string | number;
  description: string;
  amount: number;
  createdAt: string;
  payerId: string | number;
  groupId: string | number;
};

type Participant = {
  id: string | number;
  userId: string | number;
  amount: number;
  expenseId: string | number;
};

type Payment = {
  id: string | number;
  payerId: string | number;
  payeeId: string | number;
  amount: string | number;
};
