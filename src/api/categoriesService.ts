import { ExpenseCategory } from "../models/expenseModels";
import agent from "./agent";

const categoriesService = {
  getAll: () => agent.get<ExpenseCategory[]>("/Categories"),
};

export default categoriesService;
