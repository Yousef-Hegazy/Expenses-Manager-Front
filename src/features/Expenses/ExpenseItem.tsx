import {
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Expense } from "../../models/expenseModels";
import ExpenseActions from "./ExpenseActions";

const ExpenseItem = ({
  expense,
  currency,
}: {
  expense: Expense;
  currency: string;
}) => {
  return (
    <ListItem
      component={Paper}
      elevation={2}
      sx={{
        ":hover": { bgcolor: "secondary.lighter" },
        mb: 1.5,
        outline: (theme) => `1px solid ${theme.palette.secondary.light}`,
      }}
    >
      <ListItemText
        primary={expense?.description}
        primaryTypographyProps={{
          gutterBottom: true,
        }}
        secondary={
          <Stack component="span" direction="column" spacing={0}>
            <Typography variant="inherit" component="span">
              {currency}&nbsp;{expense?.amount?.toFixed?.(2)}
            </Typography>
            <Typography variant="inherit" component="span">
              {expense?.category?.title}
            </Typography>
          </Stack>
        }
        secondaryTypographyProps={{
          variant: "body2",
          fontSize: "0.8rem",
        }}
      />
      <ExpenseActions expense={expense} />
      {/* <ListItemSecondaryAction></ListItemSecondaryAction> */}
    </ListItem>
  );
};

export default ExpenseItem;
