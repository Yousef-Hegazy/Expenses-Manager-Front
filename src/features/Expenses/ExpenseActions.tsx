import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import expensesService from "../../api/expensesService";
import { Expense } from "../../models/expenseModels";
import useExpensesStore from "../../store/useExpensesStore";
import ExpenseForm from "./ExpenseForm";

const ExpenseActions = ({ expense }: { expense: Expense }) => {
  const queryClient = useQueryClient();
  const deleteExpense = useExpensesStore((st) => st.deleteExpense);

  const [formOpen, setFormOpen] = useState(false);

  const toggleFormOpen = () => setFormOpen((prev) => !prev);

  const restoreMutation = useMutation({
    mutationFn: async (data: Expense) =>
      await expensesService.create({
        date: data.date,
        amount: data.amount,
        categoryId: data.category?.id,
        description: data.description,
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries(["expenses"]),
        queryClient.invalidateQueries(["expensesStatistics"]),
      ]);
      toast.dismiss();
      toast.success("Expense restored successfully");
    },
    onError: (err) => {
      toast.error("Something went wrong while restoring expense");
      console.log(err);
    },
  });

  const handleUndo = async (
    e: React.MouseEvent<HTMLButtonElement>,
    data: Expense
  ) => {
    e.stopPropagation();
    await restoreMutation.mutateAsync(data);
  };

  const deleteMutation = useMutation({
    mutationFn: async (_: React.MouseEvent<HTMLButtonElement>) =>
      await expensesService.delete(expense.id),
    onSuccess: async (res) => {
      toast.dismiss();
      toast.success(() => (
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography>Expense removed successfully</Typography>

          <LoadingButton
            loading={
              restoreMutation.isLoading ||
              queryClient.isFetching(["expenses"]) > 0
            }
            onClick={(e) => handleUndo(e, res.data)}
          >
            Undo
          </LoadingButton>
        </Stack>
      ));
      deleteExpense(expense);
      await queryClient.invalidateQueries(["expensesStatistics"]);
    },
  });

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton color="success" size="small" onClick={toggleFormOpen}>
        <EditRounded fontSize="small" />
      </IconButton>

      {deleteMutation.isLoading ? (
        <IconButton color="secondary" size="small">
          <CircularProgress size={15} />
        </IconButton>
      ) : (
        <IconButton
          onClick={deleteMutation.mutateAsync}
          color="error"
          size="small"
        >
          <DeleteRounded fontSize="small" />
        </IconButton>
      )}

      {formOpen && (
        <ExpenseForm
          key="EditExpense"
          open={formOpen}
          onClose={toggleFormOpen}
          id={expense.id}
        />
      )}
    </Stack>
  );
};

export default ExpenseActions;
