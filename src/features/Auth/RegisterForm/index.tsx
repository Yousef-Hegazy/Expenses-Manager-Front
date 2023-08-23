import {
    AppRegistrationRounded,
    ArrowForwardRounded,
    LoginRounded,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    Divider,
    Stack,
    Step,
    StepLabel,
    Stepper,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import usersService from "../../../api/usersService";
import { AuthFormType, Currency, User, UserRegister } from "../../../models/userModels";
import AccountDetails from "./AccountDetails";
import UserDetails from "./UserDetails";

const steps = ["Step 1", "Step 2"];

export type UserRegisterForm = UserRegister & {
    confirmPassword: string;
    currency: Currency;
};

const RegisterForm = ({
                          setUser,
                          toggleFormType,
                      }: {
    setUser: (user: Partial<User>) => void;
    toggleFormType: (type: AuthFormType) => void;
}) => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        trigger,
    } = useForm<UserRegisterForm>({
        mode: "all",
    });

    const registerMutation = useMutation({
        mutationKey: ["register"],
        mutationFn: async (data: UserRegisterForm) =>
            await usersService.register({
                email: data.email,
                username: data.username,
                password: data.password,
                currency: data.currency.code,
                link: `${window.location.origin}/confirm-email`,
                // salary: data.salary,
                // savingPercentage: data.savingPercentage,
                // savingInNumber: 0,
            }),
        onError: (error: AxiosError) => {
            toast.error(error.response?.data?.toString());
            console.log(error);
        },
        onSuccess: (res) => {
            setUser(res.data);
            toast.success(
                "A confirmation email has been sent to the provided Email Address."
            );
            navigate("/", { state: { from: 'login' } });
        },
    });

    const changeStep = (index: number) => setActiveStep(index);

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <AccountDetails register={register} errors={errors}/>;
            case 1:
                return (
                    <UserDetails
                        // watch={watch}
                        register={register}
                        errors={errors}
                        control={control}
                        handleBack={() => changeStep(0)}
                    />
                );
        }
    };

    const handleNext = async () => {
        const isValid = await trigger(["email", "username"]);

        if (isValid) {
            if (activeStep + 1 === steps.length) {
                setActiveStep(0);
            } else {
                setActiveStep(activeStep + 1);
            }
        }
    };

    const onSubmit = async (data: UserRegisterForm) => {
        await registerMutation.mutateAsync(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
                <Stack direction="column" spacing={2}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((step, index) => (
                            <Step key={step} active={activeStep === index}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {getStepContent(activeStep)}
                </Stack>
            </DialogContent>

            <Divider/>

            <DialogActions sx={{ px: 2 }}>
                <Stack direction="column" spacing={1} width="100%">
                    {activeStep + 1 === steps.length ? (
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            startIcon={<AppRegistrationRounded/>}
                            loading={registerMutation.isLoading}
                            loadingPosition="start"
                        >
                            Register
                        </LoadingButton>
                    ) : (
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<ArrowForwardRounded/>}
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    )}

                    <Divider sx={{ color: "secondary.main" }}>
                        Already have an account?
                    </Divider>

                    <Button
                        fullWidth
                        color="info"
                        variant="text"
                        startIcon={<LoginRounded/>}
                        sx={{ mb: 2 }}
                        onClick={() => toggleFormType("login")}
                    >
                        Login
                    </Button>
                </Stack>
            </DialogActions>
        </Box>
    );
};

export default RegisterForm;
