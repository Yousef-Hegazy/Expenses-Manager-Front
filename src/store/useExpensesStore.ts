import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { PaginationParams } from "../models/common";
import { Expense, ExpensesFilters } from "../models/expenseModels";

interface State {
  expenses: Expense[];
  filters: ExpensesFilters;
  paginationParams: PaginationParams;
  totalAmount: number;
}

interface Actions {
  setExpenses: (expenses: Expense[], totalAmount: number) => void;
  addExpense: (expense: Expense) => void;
  editExpense: (expense: Expense) => void;
  deleteExpense: (expense: Expense) => void;
  setFilters: (filters: Partial<ExpensesFilters>) => void;
  setPagination: (params: Partial<PaginationParams>) => void;
  setTotalAmount: (amount: number) => void;
}

const useExpensesStore = create<State & Actions>()(
  immer<State & Actions>((set) => ({
    expenses: [],
    totalAmount: 0,
    filters: {
      categories: [],
    },
    paginationParams: {
      page: 1,
      pageSize: 8,
    },
    setTotalAmount: (amount) =>
      set((state) => {
        state.totalAmount = amount;
      }),
    setPagination: (params) =>
      set((state) => {
        state.paginationParams = {
          page: params.page || state.paginationParams.page,
          pageSize: params.pageSize || state.paginationParams.pageSize,
        };
      }),
    setFilters: (filters) =>
      set((state) => {
        state.filters.categories = filters.categories || [];
        state.paginationParams = {
          page: 1,
          pageSize: state.paginationParams.pageSize,
        };
      }),
    setExpenses: (expenses, totalAmount) =>
      set((state) => {
        state.expenses = expenses;
        state.totalAmount = totalAmount;
      }),
    addExpense: (expense) =>
      set((state) => {
        state.expenses.push(expense);
      }),
    editExpense: (expense) =>
      set((state) => {
        const index = state.expenses.findIndex((e) => e.id === expense.id);

        if (index !== -1) {
          const diff = state.expenses[index].amount - expense.amount;
          state.totalAmount -= diff;
          state.expenses[index] = expense;
        }
      }),
    deleteExpense: (expense) =>
      set((state) => {
        const index = state.expenses.findIndex((e) => e.id === expense.id);

        if (index !== -1) {
          state.expenses.splice(index, 1);
          state.totalAmount -= expense.amount;
        }
      }),
  }))
);

export default useExpensesStore;
