import {
    AddRounded,
    CancelRounded,
    CloseRounded,
    EditRounded,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Skeleton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import expensesService from "../../api/expensesService";
import { ExpenseCategory } from "../../models/expenseModels";
import useExpensesStore from "../../store/useExpensesStore";
import ExpenseCategoryInput from "./ExpenseCategoryInput";

export interface ExpenseFormValues {
    date?: dayjs.Dayjs;
    amount: number;
    category: ExpenseCategory;
    description: string;
}

const ExpenseForm = ({
                         open,
                         onClose,
                         id = undefined,
                     }: {
    open: boolean;
    onClose: () => void;
    id?: string;
}) => {
    const queryClient = useQueryClient();
    const editExpense = useExpensesStore((state) => state.editExpense);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ExpenseFormValues>({
        mode: "all",
    });

    const query = useQuery({
        enabled: !!id,
        queryKey: ["getQueryDefaults"],
        queryFn: async () => {
            const { data } = await expensesService.getById(id || "");
            return data;
        },
        meta: {
            errorMessage: "Something went wrong",
        },
        refetchOnMount: true,
    });

    useEffect(() => {
        if (id && query.data) {
            reset({
                description: query.data.description,
                date: dayjs(query.data.date),
                amount: query.data.amount,
                category: query.data.category,
            });
        } else {
            reset();
        }
    }, [query.data, reset, id]);

    const getReqData = (data: ExpenseFormValues) => {
        const date = data?.date?.format?.("YYYY-MM-DDT00:00:00.000Z");

        const reqData = {
            date,
            amount: data.amount,
            categoryId: data.category?.id,
            description: data.description,
        };

        return reqData;
    };

    const addMutation = useMutation({
        mutationKey: ["addExpense"],
        mutationFn: async (data: ExpenseFormValues) => {
            const reqData = getReqData(data);
            return await expensesService.create(reqData);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(["expenses"]);
            await queryClient.invalidateQueries(["expensesStatistics"]);
            toast.success("Expense add successfully");
        },
        onError: (err) => {
            toast.error("Something went wrong");
            console.log(err);
        },
    });

    const editMutation = useMutation({
        mutationKey: ["editExpense"],
        mutationFn: async (data: ExpenseFormValues) => {
            const reqData = getReqData(data);

            return await expensesService.edit(id!, reqData);
        },
        onSuccess: (res) => {
            toast.success("Expense updated successfully");
            editExpense(res.data);
        },
        onError: (err) => {
            toast.error("Something went wrong");
            console.log(err);
        },
    });

    const onSubmit = async (data: ExpenseFormValues) => {
        if (id) {
            await editMutation.mutateAsync(data);
        } else {
            await addMutation.mutateAsync(data);
        }

        onClose();
    };

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle
                component={Stack}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography fontSize="1.2rem" variant="inherit">
                    {id ? "Edit an New Expense" : "Add a New Expense"}
                </Typography>
                <IconButton onClick={onClose} size="small" color="error">
                    <CloseRounded fontSize="small"/>
                </IconButton>
            </DialogTitle>

            <Divider/>

            {id && query.isFetching ? (
                <DialogContent>
                    <Stack direction="column" spacing={2}>
                        {Array.from(Array(4)).map((_, i) => (
                            <Skeleton key={i} variant="rounded" height={50}/>
                        ))}
                    </Stack>
                </DialogContent>
            ) : (
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack direction="column" spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    {...register("description", { required: true })}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />

                                <TextField
                                    fullWidth
                                    type="text"
                                    label="Amount"
                                    {...register("amount", {
                                        required: true,
                                        min: { value: 0, message: "The minimum value is 0" },
                                        valueAsNumber: true,
                                    })}
                                    error={!!errors.amount}
                                    helperText={errors.amount?.message}
                                />

                                <Controller
                                    control={control}
                                    name="date"
                                    rules={{ required: true }}
                                    render={({ field, fieldState: { error } }) => (
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            label="Date"
                                            views={["year", "month", "day"]}
                                            value={field.value || null}
                                            onChange={(val: dayjs.Dayjs | null) => {
                                                field.onChange(val);
                                            }}
                                            slotProps={{
                                                textField: {
                                                    error: !!error,
                                                    helperText: error?.message,
                                                },
                                            }}
                                            disableFuture
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="category"
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <ExpenseCategoryInput
                                            field={field}
                                            fieldState={fieldState}
                                        />
                                    )}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </DialogContent>

                    <Divider/>

                    <DialogActions>
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            width="100%"
                            px={2}
                            py={1}
                        >
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                startIcon={id ? <EditRounded/> : <AddRounded/>}
                                loading={
                                    addMutation.isLoading ||
                                    editMutation.isLoading ||
                                    queryClient.isFetching(["expenses"]) > 0
                                }
                                loadingPosition="start"
                            >
                                {id ? "Edit" : "Add"}
                            </LoadingButton>

                            <Button
                                type="button"
                                fullWidth
                                variant="text"
                                color="secondary"
                                startIcon={<CancelRounded/>}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </DialogActions>
                </Box>
            )}
        </Dialog>
    );
};

export default ExpenseForm;

{
    /* @ts-ignore */
}
