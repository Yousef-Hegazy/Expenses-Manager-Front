import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import React, { ReactNode } from "react";

interface MenuItemProps {
  icon: ReactNode;
  text: string;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

const ExpenseMenuItem = ({ icon, text, onClick }: MenuItemProps) => (
  <MenuItem
    onClick={onClick}
    sx={{
      borderRadius: 2,
      transition: "all 0.15s linear",
      "&:hover": {
        boxShadow: "0 0.2rem 0.4rem 0.1rem rgba(0, 0, 0, 0.15)",
        transform: "translateY(-0.3rem)",
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        "& .MuiListItemIcon-root": {
          color: "primary.contrastText",
        },
      },
    }}
  >
    <ListItemIcon>{icon}</ListItemIcon>

    <ListItemText primary={text} />
  </MenuItem>
);

export default ExpenseMenuItem;
