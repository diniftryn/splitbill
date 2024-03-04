type User = {
  id: string | number;
  username: string;
  phone: string;
  friends_phone: string[] | null;
  groupIds: string[] | null;
};

type Group = {
  id: string | number;
  name: string;
  imageUrl: string;
  userIds: string[] | number[] | (string | number)[];
  expenseIds: string[] | number[];
};

type Expense = {
  id: string | number;
  description: string;
  amount: number;
  createdAt: string;
  payerId: string | number;
  groupId: string | number;
  image: string;
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
