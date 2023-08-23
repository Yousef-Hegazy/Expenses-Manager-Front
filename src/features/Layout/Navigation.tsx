import { AppBar, Link as MUILink, Stack, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import Logo from "./Logo";
import UserDropdown from "../Auth/UserDropdown";

const Navigation = () => {
  const user = useUserStore((s) => s.user);

  return (
    <AppBar
      color="transparent"
      position="sticky"
      elevation={10}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <MUILink underline="none" component={Link} to="/">
            <Logo />
          </MUILink>

          {/* {token ? <SideMenu /> : <Auth />} */}
          {user.token ? <UserDropdown user={user} /> : null}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
