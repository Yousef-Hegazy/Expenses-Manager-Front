"use client";

import { AddRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

const AddExpense = () => {
  const [formOpen, setFormOpen] = useState(false);

  const toggleFormOpen = () => setFormOpen((prev) => !prev);

  return (
    <>
      <Button
        onClick={toggleFormOpen}
        variant="contained"
        endIcon={<AddRounded color="inherit" />}
        color="inherit"
        sx={{ color: "primary.dark", bgcolor: "white" }}
        disableRipple
      >
        Add
      </Button>

      {formOpen && (
        <ExpenseForm
          key="AddExpense"
          open={formOpen}
          onClose={toggleFormOpen}
        />
      )}
    </>
  );
};

export default AddExpense;
