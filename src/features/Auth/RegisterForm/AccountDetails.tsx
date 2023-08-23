import { TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UserRegisterForm } from ".";
import { emailValidator } from "../../../helpers/validators";

interface Props {
  register: UseFormRegister<UserRegisterForm>;
  errors: FieldErrors<UserRegisterForm>;
}

const AccountDetails = ({ register, errors }: Props) => {
  const email = register("email", {
    required: true,
    validate: (val) => (emailValidator(val) ? true : "Invalid Email"),
  });

  const username = register("username", {
    required: true,
    pattern: {
      value: /^\S*$/,
      message: "Username can not have white spaces",
    },
  });

  return (
    <>
      <TextField
        fullWidth
        label="Email"
        type="email"
        {...email}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        fullWidth
        label="Username"
        type="text"
        {...username}
        error={!!errors.username}
        helperText={errors.username?.message}
      />
    </>
  );
};

export default AccountDetails;
