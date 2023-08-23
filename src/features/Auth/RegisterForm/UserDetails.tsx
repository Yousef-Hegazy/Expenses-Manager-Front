import { ArrowBackRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { UserRegisterForm } from ".";
import CurrencyInput from "../CurrencyInput";
import PasswordInput from "../PasswordInput";

interface Props {
  register: UseFormRegister<UserRegisterForm>;
  errors: FieldErrors<UserRegisterForm>;
  control: Control<UserRegisterForm, any>;
  handleBack: () => void;
  // watch: UseFormWatch<UserRegisterForm>;
}

const UserDetails = ({
  register,
  errors,
  control,
  handleBack,
}: // watch,
Props) => {
  // const [savingAmount, setSavingAmount] = useState<string>("");

  // const salary = register("salary", {
  //   required: true,
  //   valueAsNumber: true,
  //   min: {
  //     value: 10,
  //     message: "Minimum salary is 10",
  //   },
  // });

  // const wSalary = watch("salary");
  // const wCurrency = watch("currency");

  // const saving = register("savingPercentage", {
  //   valueAsNumber: true,
  //   min: {
  //     value: 0,
  //     message: "Minimum saving is 0",
  //   },
  //   max: {
  //     value: 90,
  //     message: "Maximum saving is 90%",
  //   },
  // });

  // const handleSavingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   saving.onChange(e);

  //   if (wSalary)
  //     setSavingAmount(
  //       ((Number(e.currentTarget.value) * wSalary) / 100).toFixed(2)
  //     );
  // };

  const password = register("password", { required: true });

  const confirmPassword = register("confirmPassword", {
    required: true,
    validate: (value, values) =>
      value === values.password ? true : "Passwords do not match",
  });

  return (
    <>
      <PasswordInput
        variant="outlined"
        label="Password"
        {...password}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <PasswordInput
        variant="outlined"
        label="Confirm Password"
        {...confirmPassword}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <Controller
        name="currency"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <CurrencyInput
            field={field}
            fieldState={fieldState}
            label="Currency"
          />
        )}
      />

      {/* <TextField
        fullWidth
        label="Salary (Monthly)"
        type="number"
        {...salary}
        error={!!errors.salary}
        helperText={errors.salary?.message}
      />

      <TextField
        fullWidth
        label="Saving Percentage"
        type="number"
        {...saving}
        onChange={handleSavingChange}
        error={!!errors.savingPercentage}
        helperText={errors.savingPercentage?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography>{`${
                wCurrency?.code || ""
              } ${savingAmount}`}</Typography>
            </InputAdornment>
          ),
        }}
      />  */}

      <Button
        sx={{ width: "max-content" }}
        startIcon={<ArrowBackRounded />}
        onClick={handleBack}
      >
        Back
      </Button>
    </>
  );
};

export default UserDetails;
