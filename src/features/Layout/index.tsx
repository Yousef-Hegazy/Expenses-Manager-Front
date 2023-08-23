import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "../../theme";
import Navigation from "./Navigation";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query?.meta?.errorMessage) {
        toast.error(query?.meta?.errorMessage.toString());
      }
      console.log(error)
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

const index = () => {
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <Navigation />
          <Container maxWidth="xl" sx={{ my: 2 }}>
            <Outlet />
          </Container>
        </QueryClientProvider>
      </ThemeProvider>

      <ToastContainer
        closeOnClick
        pauseOnHover
        autoClose={3000}
        position="bottom-right"
      />
    </>
  );
};

export default index;
