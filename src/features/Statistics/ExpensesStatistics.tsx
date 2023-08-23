import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Tooltip as MuiTooltip,
    Paper,
    Stack,
    Typography,
    colors,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import expensesService from "../../api/expensesService";
import { ExpenseCategory } from "../../models/expenseModels";
import useUserStore from "../../store/useUserStore";

interface StatInterface {
    category: string;

    [key: number]: string;
}

type StatExpenses = {
    [key: string]: number;
};

type Stat = StatInterface;

const getColor = () => {
    try {
        const colorObjs = [
            colors.amber,
            colors.blue,
            colors.blueGrey,
            colors.brown,
            colors.cyan,
            colors.deepOrange,
            colors.deepPurple,
            colors.green,
            colors.grey,
            colors.indigo,
            colors.lightBlue,
            colors.lightGreen,
            colors.lime,
            colors.orange,
            colors.pink,
            colors.purple,
            colors.red,
            colors.teal,
            colors.yellow,
        ];

        const randomNum = Math.round(Math.random() * colorObjs.length);

        const color = colorObjs[randomNum][600];

        return color;
    } catch (error) {
        return colors.teal[600];
    }
};

const TooltipContent = ({ active, payload, label, currency, }: {
    active: boolean;
    payload:
        | Payload<string | number | (string | number)[], string | number>[]
        | undefined;
    label: string;
    currency: string;
}) => {
    if (active)
        return (
            <Stack
                py={2}
                px={3}
                direction="column"
                spacing={1}
                bgcolor={"white"}
                borderRadius={2}
                boxShadow={(theme) => theme.shadows[10]}
                border={(theme) => `1px solid ${theme.palette.secondary.light}`}
            >
                <Typography variant="subtitle1" align="center" fontWeight="bold">
                    {label}
                </Typography>
                {payload?.slice(0, 5).map((p) => (
                    <Typography key={p.dataKey} variant="body2">
                        <Typography component="span" variant="body1">
                            {p.name}:
                        </Typography>
                        &nbsp;
                        <Typography component="span" variant="body2">
                            {p.value}
                        </Typography>
                    </Typography>
                ))}
                {payload && payload.length > 5 ? (
                    <Typography align="center">...</Typography>
                ) : (
                    ""
                )}
                <Typography fontWeight="bold" variant="subtitle2" align="center">
                    Total = {currency}&nbsp;
                    {payload?.reduce((acc, curr) => acc + Number(curr?.value), 0)}
                </Typography>
            </Stack>
        );
};

interface TopCategory {
    category: Partial<ExpenseCategory>;
    totalAmount: number;
}

const ExpensesStatistics = () => {
    const [topCategory, setTopCategory] = useState<TopCategory | null>(null);
    const [statistics, setStatistics] = useState<Stat[]>([]);

    const currency = useUserStore((s) => s.user.currency);

    const {
        data: res,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["expensesStatistics"],
        queryFn: async () => {
            const res = await expensesService.getStatistics();
            return res.data;
        },
        refetchOnMount: true,
    });

    useEffect(() => {
        if (res) {
            let topCat: TopCategory = {
                category: {},
                totalAmount: 0,
            };

            for (const cat of res) {
                if (cat.totalAmount > topCat.totalAmount) {
                    topCat = {
                        category: cat.category,
                        totalAmount: cat.totalAmount
                    }
                }
            }

            setTopCategory(topCat);

            const formattedData = res.map((item) => {
                const expenses = item.expenses.reduce((acc, expense) => {
                    acc[expense.description] = expense.amount;
                    return acc;
                }, {} as StatExpenses);
                return { category: item.category.title, ...expenses };
            });

            setStatistics(formattedData);
        } else {
            setStatistics([]);
        }
    }, [res]);

    return !isLoading && !error && statistics.length ? (
        <Stack
            direction={{ xs: 'column', sm: "column", md: "row" }}
            my={2}
            spacing={{ sm: 1.5, md: 1.5 }}
            justifyContent="start"
            alignItems="start"
            width="100%"
            borderRadius={2}
        >
            <Stack
                direction={{ sm: "row", md: "column" }}
                spacing={1.5}
                justifyContent="start"
                alignItems="start"
                flex={1}
                flexWrap="wrap"
            >
                <Box component={Paper} elevation={10} py={2} px={3}>
                    <Typography>
                        Your highest expenditure was on{" "}
                        <MuiTooltip
                            title={
                                <Typography component="span">
                                    {topCategory?.category.description}
                                </Typography>
                            }
                        >
                            <Typography
                                component="span"
                                fontWeight="bold"
                                sx={{
                                    textDecoration: "underline",
                                    textUnderlineOffset: 4,
                                    textDecorationStyle: "dashed",
                                }}
                            >
                                {topCategory?.category.title}
                            </Typography>
                        </MuiTooltip>
                        &nbsp; category
                    </Typography>
                </Box>
            </Stack>

            <Card
                sx={(theme) => ({
                    borderRadius: 2,
                    flex: 3,
                    [theme.breakpoints.down("md")]: { flex: "auto", width: "100%" },
                })}
                elevation={10}
            >
                <CardHeader
                    sx={{ bgcolor: "primary.dark", color: "primary.contrastText" }}
                    title="Expenditure per Category Bar Chart"
                />

                <Divider/>

                <CardContent>
                    {statistics.length > 0 ? (
                        <ResponsiveContainer height={400} width="100%">
                            <BarChart
                                title="Expense per Category"
                                width={500}
                                height={300}
                                data={statistics}
                            >
                                <XAxis
                                    tickCount={statistics.length}
                                    dataKey="category"
                                    // padding={{ left: 10, right: 10 }}
                                    padding="no-gap"
                                    // angle={-45}
                                />

                                <YAxis/>

                                <Tooltip
                                    cursor={{ fill: "transparent" }}
                                    content={({ active, label, payload }) => (
                                        <TooltipContent
                                            active={active || false}
                                            payload={payload}
                                            label={label}
                                            currency={currency || ""}
                                        />
                                    )}
                                />

                                <CartesianGrid strokeDasharray="3 3"/>

                                {statistics.map((stat) => {
                                    return Object.keys(stat).map((key) => {
                                        if (key === "category") return null;

                                        const filling = getColor();

                                        return (
                                            <Bar
                                                key={key}
                                                stackId={stat.category}
                                                dataKey={key}
                                                fill={filling}
                                                // fillOpacity={0.8}
                                            />
                                        );
                                    });
                                })}
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <Typography>
                            Please add expenses to see your expense statistics
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Stack>
    ) : null;
};

export default ExpensesStatistics;
