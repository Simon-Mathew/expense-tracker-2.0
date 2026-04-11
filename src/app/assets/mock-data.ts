export type transactionType = 'Income' | 'Expense';

export type transactions = {
  id: string;
  date: string;
  merchant: string;
  category: string;
  type: transactionType;
  amount: number;
  note?: string;
};

export const categories = [
  'Groceries',
  'Health',
  'Transport',
  'Dinning',
  'Bills',
  'Shopping',
  'Entertainment',
  'Other',
];

export const MOCK_TRANSACTIONS: transactions[] = [
  {
    id: '1',
    date: '2026-02-11',
    merchant: 'Woolworths',
    category: 'Groceries',
    type: 'Expense',
    amount: 64.35,
    note: 'Weekly shop',
  },
  {
    id: '2',
    date: '2026-02-10',
    merchant: 'Uber',
    category: 'Transport',
    type: 'Expense',
    amount: 150,
  },
  {
    id: '3',
    date: '2026-02-10',
    merchant: 'Brisbane Capital',
    category: 'Salary',
    type: 'Income',
    amount: 3000,
    note: 'Internship pay',
  },
  {
    id: '4',
    date: '2025-02-10',
    merchant: 'Brisbane Capital',
    category: 'Salary',
    type: 'Income',
    amount: 1000,
    note: 'Internship pay',
  },
  {
    id: '5',
    date: '2026-02-09',
    merchant: 'Rent',
    category: 'Rent',
    type: 'Expense',
    amount: 520.0,
  },
  {
    id: '6',
    date: '2026-02-08',
    merchant: 'Netflix',
    category: 'Entertainment',
    type: 'Expense',
    amount: 16.99,
  },
  {
    id: '7',
    date: '2026-02-07',
    merchant: "Nando's",
    category: 'Dining',
    type: 'Expense',
    amount: 29.4,
  },
];
