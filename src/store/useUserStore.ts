import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User } from "../models/userModels";

interface UserState {
  user: Partial<User>;
}

interface UserActions {
  setUserData: (user: Partial<User>) => void;
  // addBill: (bill: Bill) => void;
  // editBill: (billId: string, newBill: Bill) => void;
  // removeBill: (billId: string) => void;
  // addDebt: (debt: Debt) => void;
  // editDebt: (debtId: string, newDebt: Debt) => void;
  // removeDebt: (debtId: string) => void;
}

const useUserStore = create<UserState & UserActions>()(
  persist(
    immer<UserState & UserActions>((set) => ({
      user: {},
      setUserData: (user) =>
        set((state) => {
          state.user = user;
        }),
      // addBill: (bill) =>
      //   set((state) => {
      //     state.user.bills?.push(bill);
      //   }),
      // editBill: (billId, newBill) =>
      //   set((state) => {
      //     const billIndex = state.user.bills?.findIndex((b) => b.id === billId);
      //
      //     if (billIndex && billIndex !== -1)
      //       state.user.bills?.splice(billIndex, 1, newBill);
      //   }),
      // removeBill: (billId) =>
      //   set((state) => {
      //     const index = state.user.bills?.findIndex((b) => b.id === billId);
      //
      //     if (index && index !== -1) state.user.bills?.splice(index, 1);
      //   }),
      // addDebt: (debt) =>
      //   set((state) => {
      //     state.user.debts?.push(debt);
      //   }),
      // editDebt: (debtId, newDebt) =>
      //   set((state) => {
      //     const debtIndex = state.user.debts?.findIndex((d) => d.id === debtId);
      //
      //     if (debtIndex && debtIndex !== -1)
      //       state.user.debts?.splice(debtIndex, 1, newDebt);
      //   }),
      // removeDebt: (debtId) =>
      //   set((state) => {
      //     const index = state.user.debts?.findIndex((b) => b.id === debtId);
      //
      //     if (index && index !== -1) state.user.debts?.splice(index, 1);
      //   }),
    })),
    {
      name: "userData",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
