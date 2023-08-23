import { Box, Button, DialogActions, DialogContent, Divider, Stack, TextField } from "@mui/material";
import { emailValidator } from "../../helpers/validators.ts";
import { LoadingButton } from "@mui/lab";
import { AppRegistrationRounded, SendRounded } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { AuthFormType } from "../../models/userModels.ts";
import { useMutation } from "@tanstack/react-query";
import usersService from "../../api/usersService.ts";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface Props {
    toggleFormType: (type: AuthFormType) => void;
}

const ResetPasswordForm = ({ toggleFormType }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty, },
    } = useForm({
        defaultValues: {
            email: ""
        },
        mode: 'all'
    });

    const sendMailMutation = useMutation({
        mutationFn: async (data: { email: string }) => {
            return await usersService.sendPasswordEmail(data.email, `${window.location.origin}/get-user`);
        },
        onSuccess: () => {
            toast.success("Please check your address for reset password email.");
        },
        onError: (err: AxiosError<any>) => {
            console.log(err);
            if (err.response?.status === 404) {
                toast.error(err.response?.data);
            } else {
                toast.error("Something went wrong, please try again later.");
            }
        }
    });

    const onSubmit = async (data: { email: string }) => {
        await sendMailMutation.mutateAsync(data);
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
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
            </DialogContent>

            <Divider/>

            <DialogActions>
                <Stack direction="column" spacing={1} width="100%">
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <LoadingButton
                            fullWidth
                            type='submit'
                            variant="contained"
                            startIcon={<SendRounded/>}
                            loading={sendMailMutation.isLoading}
                            loadingPosition="start"
                            disabled={!isValid || !isDirty}
                        >
                            Send Email
                        </LoadingButton>

                        <Button
                            fullWidth
                            color="info"
                            variant="text"
                            startIcon={<AppRegistrationRounded/>}
                            onClick={() => toggleFormType("login")}
                        >
                            Login
                        </Button>
                    </Stack>

                </Stack>
            </DialogActions>
        </Box>
    );
};

export default ResetPasswordForm;