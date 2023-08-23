import { PagedList } from "../api/agent";

export interface ExpenseCategory {
  id: string;
  title: string;
  description?: string;
}

export interface ExpensePagedList extends PagedList<Expense> {
  totalAmount: number;
}

export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
}

export interface ExpensesFilters {
  categories: string[];
}

export interface AddEditExpense {
  date?: string;
  amount: number;
  categoryId: string;
  description: string;
}

export interface ExpenseStat {
  category: ExpenseCategory;
  expenses: Expense[];
  totalAmount: number;
}
