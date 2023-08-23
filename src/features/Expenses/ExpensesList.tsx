"use client";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import expensesService from "../../api/expensesService";
import { Expense } from "../../models/expenseModels";
import useExpensesStore from "../../store/useExpensesStore";
import useUserStore from "../../store/useUserStore";
import AddExpense from "./AddExpense";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = () => {
  // const [paginationParams, setPaginationParams] = useState<PaginationParams>({
  //   page: 1,
  //   pageSize: 10,
  // });

  const currency = useUserStore((u) => u.user.currency);
  const paginationParams = useExpensesStore((state) => state.paginationParams);
  const setPagination = useExpensesStore((state) => state.setPagination);
  const setExpenses = useExpensesStore((state) => state.setExpenses);
  const localExpenses = useExpensesStore((state) => state.expenses);
  const filters = useExpensesStore((state) => state.filters);
  const totalAmount = useExpensesStore((state) => state.totalAmount);

  const {
    data: res,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["expenses", paginationParams, filters],
    queryFn: async () =>
      await expensesService.getAll(paginationParams, filters),
  });

  useEffect(() => {
    if (res?.data) {
      setExpenses(res?.data?.items || [], res.data.totalAmount || 0);
    }
  }, [res?.data, setExpenses]);

  const handlePageChange = (page: number) => {
    if (page !== paginationParams.page) {
      setPagination({ page });
    }
  };

  const handlePageSizeChange = (e: SelectChangeEvent<number>) => {
    const pageSize = Number(e.target.value);

    if (pageSize !== paginationParams.pageSize) {
      setPagination({ page: 1, pageSize });
    }
  };

  return (
    <Card
      elevation={10}
      sx={{
        borderRadius: "0.5rem",
      }}
    >
      <CardHeader
        title="Your Expenses"
        titleTypographyProps={{
          variant: "h6",
        }}
        sx={{
          p: 2,
          backgroundColor: "primary.dark",
          color: "primary.contrastText",
        }}
        action={<AddExpense />}
      />

      <Divider />

      <CardContent>
        {isFetching && !error ? (
          <List>
            {Array.from(Array(5))?.map((_, i) => (
              <ListItem key={i}>
                <Skeleton
                  width="100%"
                  height={70}
                  variant="rounded"
                  sx={{ bgcolor: "white" }}
                  component={Paper}
                  elevation={10}
                />
              </ListItem>
            ))}
          </List>
        ) : localExpenses?.length ? (
          <List>
            {localExpenses?.map((exp: Expense) => (
              <ExpenseItem
                key={exp.id}
                expense={exp}
                currency={currency || ""}
              />
            ))}
          </List>
        ) : (
          <Typography align="center" variant="subtitle1">
            No expenses Yet
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ p: 0 }}>
        <Stack
          p={2}
          width="100%"
          component={Paper}
          elevation={10}
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>
            <strong>Total:</strong>{" "}
            <Typography component="span" variant="body2" color="secondary.main">
              {currency} {Math.fround(totalAmount).toFixed(2)}
            </Typography>
          </Typography>

          {res?.data?.totalPages && res?.data?.totalPages > 1 ? (
            <Pagination
              shape="rounded"
              page={paginationParams.page}
              count={res.data.totalPages}
              color="primary"
              onChange={(_, page) => handlePageChange(page)}
            />
          ) : (
            ""
          )}

          <FormControl sx={{ width: 90 }}>
            <InputLabel>Page size</InputLabel>
            <Select
              sx={{ height: 40 }}
              label="Page size"
              value={paginationParams.pageSize}
              onChange={handlePageSizeChange}
            >
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ExpensesList;
