import Grid2 from "@mui/material/Unstable_Grid2";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import usersService from "../../api/usersService";
import useUserStore from "../../store/useUserStore";
import ExpensesList from "../Expenses/ExpensesList";
import Filters from "../Filters";
import ExpensesStatistics from "../Statistics/ExpensesStatistics";
import Loader from "../UI/Loader";

const HomePage = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((s) => s.setUserData);
    const location = useLocation();

    const {
        isLoading,
        mutateAsync: getCurrentUser,
    } = useMutation({
        mutationFn: usersService.getCurrentUser,
        onError: (error) => {
            console.log(error);
            setUser({});
            navigate("/auth");
        },
        onSuccess: (res) => {
            setUser(res.data);
        }
    });

    useEffect(() => {
        if (location.state?.from !== 'login') {
            getCurrentUser();
        }
    }, [location.state?.from, navigate]);

    if (isLoading) return <Loader/>;

    return (
        <Grid2 container spacing={2} alignItems="start">
            <Grid2 xs={12} sm={4} lg={3}>
                <Filters/>
            </Grid2>

            <Grid2 xs={12} sm={8} lg={9}>
                <ExpensesList/>
            </Grid2>

            <Grid2 xs={12}>
                <ExpensesStatistics/>
            </Grid2>
        </Grid2>
    );
};

export default HomePage;
