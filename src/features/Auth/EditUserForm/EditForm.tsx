import { Controller, useForm } from "react-hook-form";
import useUserStore from "../../../store/useUserStore.ts";
import { useMutation } from "@tanstack/react-query";
import usersService from "../../../api/usersService.ts";
import { toast } from "react-toastify";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { CancelRounded, CloseRounded, SaveRounded, SendRounded } from "@mui/icons-material";
import CurrencyInput from "../CurrencyInput.tsx";
import { LoadingButton } from "@mui/lab";
import { Currency, EditProfile } from "../../../models/userModels.ts";
import currencies from "../../../helpers/currencies.ts";
import { emailValidator } from "../../../helpers/validators.ts";
import { AxiosError } from "axios";

const getCurrency = (code?: string): Currency | null => {
    if (code) {
        return currencies.find((c) => c.code === code) || null;
    }
    return null;
};

type ProfileFields = EditProfile & {
    currency: Currency | null;
};

const EditForm = ({ open, onClose }: { open: boolean; onClose: () => void; }) => {
    const user = useUserStore((s) => s.user);
    const setUserData = useUserStore((s) => s.setUserData);

    const {
        register,
        handleSubmit,
        control,
        formState: { isDirty, isValid, errors },
    } = useForm<ProfileFields>({
        defaultValues: {
            email: user.email,
            username: user.username,
            // @ts-ignore
            currency: getCurrency(user.currency),
        },
    });

    const confirmEmailMutation = useMutation({
        mutationFn: async (link: string) =>
            await usersService.sendConfirmationEmail(link),
        onError: (error: AxiosError) => {
            toast.error(error.response?.data?.toString() || "Something went wrong, please try again later");
            console.log(error);
        },
        onSuccess: () => {
            toast.success(
                "A confirmation email has been sent to your Email Address."
            );
        },
    });

    const submitMutation = useMutation({
        mutationFn: async (data: ProfileFields) => {
            return await usersService.editProfile({
                email: data.email,
                username: data.username,
                currency: data.currency.code,
                link: `${window.location.origin}/confirm-email`,
            });
        },
        onSuccess: (res) => {
            if (res.data.email !== user.email) toast.info("A confirmation mail has been sent to your new email address");
            else toast.success("Your data has been updated successfully");
            setUserData(res.data);
            onClose();
        },
        onError: (err) => {
            toast.error("Something went wrong while updating your profile");
            console.log(err);
        }
    });

    const onFormSubmit = async (data: ProfileFields) => {
        await submitMutation.mutateAsync(data);
    };

    const handleEmailConfirmation = async () => await confirmEmailMutation.mutateAsync(`${window.location.origin}/confirm-email`);

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle
                component={Stack}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography fontSize="1.2rem" variant="inherit">
                    Edit your profile
                </Typography>

                <IconButton onClick={onClose} size="small" color="error">
                    <CloseRounded fontSize="small"/>
                </IconButton>
            </DialogTitle>

            <Divider/>

            <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
                <DialogContent>
                    <Stack
                        direction="column"
                        spacing={2}
                        justifyContent="center"
                        alignItems="stretch"
                    >
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

                        {user.emailConfirmed ? (
                            <>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    type="text"
                                    {...register("username", { required: true })}
                                />

                                <Controller
                                    control={control}
                                    name="currency"
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <CurrencyInput
                                            label="Currency"
                                            field={field}
                                            fieldState={fieldState}
                                        />
                                    )}
                                />
                            </>
                        ) : (
                            <LoadingButton
                                onClick={handleEmailConfirmation}
                                loading={confirmEmailMutation.isLoading}
                                startIcon={<SendRounded/>}
                                loadingPosition='start'
                                variant='contained'
                            >
                                Confirm Email
                            </LoadingButton>
                        )}
                    </Stack>
                </DialogContent>

                <Divider/>

                <DialogActions>
                    <Stack
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                        spacing={2}
                        width="100%"
                        px={2}
                        py={1}
                    >
                        <LoadingButton
                            color="success"
                            variant="contained"
                            startIcon={<SaveRounded/>}
                            type="submit"
                            loading={submitMutation.isLoading}
                            loadingPosition="start"
                            disabled={!isDirty || !isValid}
                        >
                            Save Changes
                        </LoadingButton>

                        <Button
                            color="error"
                            variant="outlined"
                            startIcon={<CancelRounded/>}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default EditForm;
