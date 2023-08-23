import { CheckCircleRounded } from "@mui/icons-material";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import usersService from "../../api/usersService";
import useUserStore from "../../store/useUserStore";

const ConfirmEmail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const user = useUserStore((s) => s.user);
    const setUserData = useUserStore((s) => s.setUserData);

    const confirmEmail = useMutation({
        mutationKey: ["confirm-email"],
        mutationFn: async (token: string) => await usersService.confirmEmail(token),
        onSuccess: (res) => {
            setUserData(res.data);
            toast.success("Email Confirmed Successfully");
            navigate('/');
        },
        onError: (err) => {
            console.log(err);
            toast.error(
                "Something unexpected happened please try again later."
            );
            navigate('/auth');
        },
    });

    const idLogin = useMutation({
        mutationFn: async () => {
            return await usersService.idLogin(id!);
        },
        onSuccess: async (res) => {
            await confirmEmail.mutateAsync(res.data.token || "");
        },
        onError: (err) => {
            toast.error("Something went wrong, please try again later");
            console.log(err);
        }
    });

    useEffect(() => {
        if (user?.emailConfirmed) {
            navigate("/");
        } else if (id) {
            idLogin.mutateAsync();
        } else {
            navigate("/");
        }
    }, [id, navigate, user.emailConfirmed]);

    return (
        <Box
            component={Paper}
            mx="auto"
            my={10}
            p={4}
            elevation={10}
            borderRadius={4}
            border={(theme) => `1px solid ${theme.palette.secondary.main}`}
        >
            {idLogin.isIdle || idLogin.isLoading ? (
                <Stack
                    direction="column"
                    mx="auto"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography>
                        Please wait while we confirm your email and do not close this page
                    </Typography>
                    <CircularProgress size={10} color="secondary"/>
                </Stack>
            ) : !idLogin.isError ? (
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <CheckCircleRounded color="success"/>
                    <Typography>
                        Your email has been confirmed successfully. You can now use the full
                        features of Expense Manager.
                    </Typography>
                </Stack>
            ) : (
                ""
            )}
        </Box>
    );
};

export default ConfirmEmail;
