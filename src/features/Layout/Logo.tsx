import { Typography } from "@mui/material";
import { teal } from "@mui/material/colors";

const Logo = () => {
  return (
    <Typography
      sx={{
        color: "transparent",
        backgroundClip: "text",
        backgroundImage: (theme) =>
          `linear-gradient(to bottom right, ${theme.palette.primary.dark}, ${teal[600]}, ${theme.palette.secondary.dark})`,
      }}
      fontWeight="bold"
      variant="h5"
      fontStyle="italic"
      fontFamily="monospace"
    >
      ExpenseManager
    </Typography>
  );
};

export default Logo;
