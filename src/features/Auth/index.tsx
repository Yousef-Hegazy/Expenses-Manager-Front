import { Dialog, DialogTitle, Divider, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { AuthFormType } from "../../models/userModels.ts";
import ResetPasswordForm from "./ResetPasswordForm.tsx";

const formTitle = {
    register: "Register",
    login: "Login",
    forgotPass: "Enter your email address",
}

const Auth = () => {
    const [formType, setFormType] = useState<AuthFormType>("login");
    const setUser = useUserStore((s) => s.setUserData);
    const user = useUserStore((s) => s.user);
    const navigate = useNavigate();

    const toggleFormType = (formType: AuthFormType) =>
        setFormType(formType);

    useEffect(() => {
        if (user.token) navigate("/");
    }, [navigate, user.token]);

    const renderForm = useCallback((type: AuthFormType) => {
        switch (type) {
            case "login":
                return <LoginForm setUser={setUser} toggleFormType={toggleFormType}/>;
            case "register":
                return <RegisterForm setUser={setUser} toggleFormType={toggleFormType}/>;
            case "forgotPass":
                return <ResetPasswordForm toggleFormType={toggleFormType}/>;
            default:
                return <LoginForm setUser={setUser} toggleFormType={toggleFormType}/>;
        }
    }, [setUser])

    return (
        <>
            <Dialog open={true} maxWidth="sm" fullWidth>
                <DialogTitle
                    component={Stack}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography fontSize="1.2rem" variant="inherit">
                        {formTitle[formType]}
                    </Typography>
                </DialogTitle>

                <Divider/>

                {renderForm(formType)}
            </Dialog>
        </>
    );
};

export default Auth;
