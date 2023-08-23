import {
  Autocomplete,
  CircularProgress,
  InputAdornment,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import categoriesService from "../../api/categoriesService";

interface Props {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
}

const ExpenseCategoryInput = ({ field, fieldState }: Props) => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    placeholderData: [],
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await categoriesService.getAll();
      return data;
    },
  });

  // useEffect(() => {
  //   if (defaultId) {
  //     const defCat = categories?.find((c) => c.id === defaultId);

  //     setValue("category", defCat);
  //   }
  // }, [categories, defaultId, setValue]);

  return (
    <Autocomplete
      fullWidth
      disabled={isLoading}
      {...field}
      value={field.value || null}
      options={categories || []}
      getOptionLabel={(opt) => opt.title}
      isOptionEqualToValue={(o, v) => o.id === v.id}
      onChange={(_, val) => field.onChange(val!)}
      renderInput={(props) => (
        <TextField
          {...props}
          label="Category"
          error={!!error}
          helperText={fieldState.error?.message}
          InputProps={{
            ...props.InputProps,
            endAdornment: isLoading ? (
              <InputAdornment position="end">
                <CircularProgress size={16} />
              </InputAdornment>
            ) : (
              props.InputProps.endAdornment
            ),
          }}
        />
      )}
      renderOption={(props, option, state) => (
        // @ts-ignore
        <ListItemButton {...props} selected={state.selected} key={option.id}>
          <ListItemText primary={option.title} secondary={option.description} />
        </ListItemButton>
      )}
    />
  );
};

export default ExpenseCategoryInput;
