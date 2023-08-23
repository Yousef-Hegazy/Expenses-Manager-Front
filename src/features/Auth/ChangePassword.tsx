import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Box, Card, CardActions, CardContent, CardHeader, Divider, Stack, TextField } from "@mui/material";
import PasswordInput from "./PasswordInput.tsx";
import { LoadingButton } from "@mui/lab";
import { SaveRounded } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import usersService from "../../api/usersService.ts";
import useUserStore from "../../store/useUserStore.ts";
import { toast } from "react-toastify";

interface ResetPasswordFormFields {
    email: string;
    newPass: string;
    confirmNewPass: string;
}

const ChangePassword = () => {
    const { state }: { state: { user?: { email: string; token: string; }, from?: string; } } = useLocation();
    const setUserData = useUserStore(s => s.setUserData);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty }
    } = useForm<ResetPasswordFormFields>({
        defaultValues: {
            email: state?.user?.email || '',
            newPass: '',
            confirmNewPass: ''
        }
    });

    useEffect(() => {
        if (state?.from !== 'getUserData') {
            navigate('/')
        }
    }, [navigate, state?.from]);

    const changePassMutation = useMutation({
        mutationFn: async (data: ResetPasswordFormFields) => {
            return await usersService.changePassword(data.newPass, state?.user?.token || "");
        },
        onSuccess: (res) => {
            setUserData(res.data);
            navigate('/', { replace: true, state: { from: 'login' } });
            toast.success("Password has changed successfully, please use the new password in your next log in");
        },
        onError: (err) => {
            toast.error("Something went wrong, please try again later 🙏");
            console.log(err);
        }
    });

    const onFormSubmit = async (data: ResetPasswordFormFields) => {
        await changePassMutation.mutateAsync(data);
    }

    return (
        <Box component='form' onSubmit={handleSubmit(onFormSubmit)} width='max-content' mx='auto' my={5}>
            <Card elevation={10} sx={{
                borderRadius: theme => theme.shape.borderRadius,
                width: theme => theme.breakpoints.values.sm,
                maxWidth: '100%'
            }}>
                <CardHeader title="Change your password" subheader="Please use the form below to change your password"/>

                <Divider/>

                <CardContent>
                    <Stack direction='column' spacing={2}>
                        <TextField label='Email' {...register('email')} disabled/>

                        <PasswordInput
                            variant='outlined'
                            {...register('newPass', { required: true })}
                            label="New Password"
                            error={!!errors.newPass}
                            helperText={errors.newPass?.message}
                        />

                        <PasswordInput
                            variant='outlined'
                            {...register('confirmNewPass', {
                                required: true,
                                validate: (value, formValues) => {
                                    return value === formValues.newPass ? true : "Passwords don't match";
                                }
                            })}
                            label="Confirm New Password"
                            error={!!errors.confirmNewPass}
                            helperText={errors.confirmNewPass?.message}
                        />
                    </Stack>
                </CardContent>

                <Divider/>

                <CardActions>
                    <Stack px={2} py={1} direction='row' spacing={2} justifyContent='start' alignItems='center'>
                        <LoadingButton
                            variant='contained'
                            startIcon={<SaveRounded/>}
                            color='primary'
                            loadingPosition='start'
                            type='submit'
                            loading={changePassMutation.isLoading}
                            disabled={!isValid || !isDirty}
                        >
                            Submit
                        </LoadingButton>
                    </Stack>
                </CardActions>
            </Card>
        </Box>
    );
};

export default ChangePassword;
