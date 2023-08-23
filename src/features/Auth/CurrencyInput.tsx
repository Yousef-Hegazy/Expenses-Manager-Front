import { Autocomplete, TextField } from "@mui/material";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import currencies from "../../helpers/currencies";

interface Props {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  label: string;
}

const CurrencyInput = ({ field, fieldState, label }: Props) => {
  return (
    <Autocomplete
      options={currencies || []}
      {...field}
      value={field.value || null}
      getOptionLabel={(opt) => `${opt.code} - ${opt.countryName}`}
      isOptionEqualToValue={(opt, val) => opt.countryName === val.countryName}
      //   renderOption={(props, option) => (
      //     <ListItem {...props}>
      //       <ListItemText primary={option.code} secondary={option.countryName} />
      //     </ListItem>
      //   )}
      onChange={(_, val) => field.onChange(val)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default CurrencyInput;
