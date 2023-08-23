import { Box, CircularProgress } from "@mui/material";

interface Props {
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";
  size?: number;
}

const Loader = ({ size = 50, color = "primary" }: Props) => {
  return (
    <Box sx={{ mx: "auto", width: "max-content" }}>
      <CircularProgress color={color} size={size} />
    </Box>
  );
};

export default Loader;
