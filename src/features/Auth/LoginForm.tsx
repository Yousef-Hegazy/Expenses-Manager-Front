import { AppRegistrationRounded, LockResetRounded, LoginRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, DialogActions, DialogContent, Divider, Stack, TextField, } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import usersService from "../../api/usersService";
import { emailValidator } from "../../helpers/validators";
import { AuthFormType, User, UserLogin } from "../../models/userModels";
import PasswordInput from "./PasswordInput";

interface Props {
    setUser: (user: Partial<User>) => void;
    toggleFormType: (type: AuthFormType) => void;
}

const LoginForm = ({ setUser, toggleFormType, }: Props) => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = useForm<UserLogin>({
        mode: "all",
    });

    const loginMutation = useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: UserLogin) => await usersService.login(data),
        onError: (error: AxiosError<any>) => {
            if (error.response?.data?.title === "Unauthorized")
                toast.error("Please check your credentials");
            else {
                toast.error(error.response?.data ? error.response?.data : "Something went wrong");
            }
            console.log(error);
        },
        onSuccess: async (res) => {
            setUser(res.data);
            navigate("/", { state: { from: 'login' } });
        },
    });

    const onSubmit = async (data: UserLogin) => {
        await loginMutation.mutateAsync(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <Stack direction="column" spacing={2}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: (val) => (emailValidator(val) ? true : "Invalid Email"),
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <PasswordInput
                        variant="outlined"
                        label="Password"
                        {...register("password", { required: true })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </Stack>
            </DialogContent>

            <Divider/>

            <DialogActions>
                <Stack direction="column" spacing={1} width="100%">
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        alignItems={{ xs: 'stretch', sm: 'center' }}
                    >
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            startIcon={<LoginRounded/>}
                            loading={loginMutation.isLoading}
                            loadingPosition="start"
                            disabled={!isValid || !isDirty}
                        >
                            Login
                        </LoadingButton>

                        <LoadingButton
                            fullWidth
                            variant="text"
                            sx={{ textDecoration: 'underline' }}
                            startIcon={<LockResetRounded/>}
                            loading={loginMutation.isLoading}
                            loadingPosition="start"
                            onClick={() => toggleFormType("forgotPass")}
                        >
                            Forgot Password ?
                        </LoadingButton>
                    </Stack>

                    <Divider sx={{ color: "secondary.main" }}>New user ?</Divider>

                    <Button
                        fullWidth
                        color="info"
                        variant="text"
                        startIcon={<AppRegistrationRounded/>}
                        onClick={() => toggleFormType("register")}
                    >
                        Register
                    </Button>
                </Stack>
            </DialogActions>
        </Box>
    );
};

export default LoginForm;
