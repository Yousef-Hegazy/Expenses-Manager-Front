import { LogoutRounded } from "@mui/icons-material";
import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/userModels";
import useUserStore from "../../store/useUserStore";
import EditUserForm from "./EditUserForm";
import ExpenseMenuItem from "./ExpenseMenuItem";

const UserDropdown = ({ user }: { user: Partial<User> }) => {
  const [menuOpen, setMenuOpen] = useState<null | HTMLElement>(null);
  const setUserData = useUserStore((s) => s.setUserData);
  const navigate = useNavigate();

  const handleMenuOpen = (e: React.MouseEvent<HTMLDivElement>) =>
    setMenuOpen(e.currentTarget);

  const closeMenu = () => setMenuOpen(null);

  const handleLogout = async () => {
    closeMenu();
    setUserData({});
    navigate("/auth");
  };

  return (
    <>
      <ListItemButton
        onClick={handleMenuOpen}
        sx={{ flexGrow: "initial" }}
        disableRipple
      >
        <ListItemIcon>
          <Avatar>{user.username?.[0]?.toUpperCase?.()}</Avatar>
        </ListItemIcon>

        <ListItemText
          primary="Welcome"
          primaryTypographyProps={{ variant: "body2", fontSize: 15 }}
          secondary={`${user.username}!`}
          secondaryTypographyProps={{
            fontSize: 20,
          }}
        />
      </ListItemButton>

      <Menu
        anchorEl={menuOpen}
        open={!!menuOpen}
        onClose={closeMenu}
        slotProps={{
          paper: {
            sx: {
              py: 2,
              px: 1.5,
              borderRadius: 2,
              "& .MuiList-root": {
                "& :not(:last-child)": {
                  "&.MuiMenuItem-root": {
                    mb: 1,
                  },
                },
              },
            },
          },
        }}
        disableScrollLock
      >
        <EditUserForm />

        <ExpenseMenuItem
          icon={<LogoutRounded fontSize="small" />}
          text="Logout"
          onClick={handleLogout}
        />
      </Menu>
    </>
  );
};

export default UserDropdown;
