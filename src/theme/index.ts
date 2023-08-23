import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",
      light: "#bfe1ff",
      lighter: "#e6f3ff",
      dark: "#005cbf",
      darker: "#00418c",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#808080",
      light: "#cccccc",
      lighter: "#f2f2f2",
      dark: "#666666",
      darker: "#4d4d4d",
      contrastText: "#ffffff",
    },
    info: {
      main: "#0099cc",
      light: "#bfebff",
      lighter: "#e6f8ff",
      dark: "#007da4",
      darker: "#00627c",
      contrastText: "#ffffff",
    },
    success: {
      main: "#28a745",
      light: "#bffbff",
      lighter: "#e6ffe6",
      dark: "#1e7333",
      darker: "#144221",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ff9300",
      light: "#ffdbbf",
      lighter: "#fff0e6",
      dark: "#cc7300",
      darker: "#994c00",
      contrastText: "#ffffff",
    },
    error: {
      main: "#dc3545",
      light: "#ff9999",
      lighter: "#ffe6e6",
      dark: "#aa1919",
      darker: "#780d0d",
      contrastText: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "1rem",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(3px)",
        },
        invisible: {
          backgroundColor: "transparent",
          backdropFilter: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "1.3rem",
          transition: "all 0.25s linear",
          "&.Mui-focused": {
            boxShadow: "0 0.5rem 1rem 0.1rem rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiPopper: {
      defaultProps: {
        sx: {
          "& .MuiPaper-root": {
            boxShadow: "0 0.5rem 1rem 0.1rem rgba(0, 0, 0, 0.3)",
            borderRadius: "1rem",
          },
        },
      },
    },
  },
});

export default theme;
