import { PaginationParams } from "../models/common";
import {
  AddEditExpense,
  Expense,
  ExpensePagedList,
  ExpenseStat,
  ExpensesFilters,
} from "../models/expenseModels";
import agent from "./agent";

const expensesService = {
  getAll: (paginationParams: PaginationParams, filters?: ExpensesFilters) =>
    agent.get<ExpensePagedList>("/Expenses", {
      params: {
        ...paginationParams,
        categories: filters?.categories?.length
          ? JSON.stringify(filters?.categories)
          : null,
      },
    }),
  create: (expense: Partial<AddEditExpense>) => agent.post("/Expenses", expense),
  edit: (id: string, expense: Partial<AddEditExpense>) =>
    agent.put<Expense>(`/Expenses/${id}`, expense),
  delete: (id: string) => agent.delete<Expense>(`/Expenses/${id}`),
  getById: (id: string) => agent.get<Expense>(`/Expenses/${id}`),
  getStatistics: () => agent.get<ExpenseStat[]>("/Expenses/statistics"),
};

export default expensesService;
