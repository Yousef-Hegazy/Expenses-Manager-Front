import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedTextFieldProps, TextField, } from "@mui/material";
import { forwardRef, useState } from "react";

interface Props extends OutlinedTextFieldProps {
}

const PasswordInput = forwardRef<HTMLDivElement, Props>(
    ({ ...others }: Props, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const toggleShowPassword = () => setShowPassword((prev) => !prev);

        return (
            <TextField
                fullWidth
                ref={ref}
                type={showPassword ? "text" : "password"}
                {...others}
                InputProps={{
                    ...others.InputProps,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton size="small" onClick={toggleShowPassword}>
                                {showPassword ? (
                                    <VisibilityOffRounded fontSize="small"/>
                                ) : (
                                    <VisibilityRounded fontSize="small"/>
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        );
    }
);

export default PasswordInput;
