import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox, Chip,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography, useMediaQuery, useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import categoriesService from "../../api/categoriesService";
import { ExpenseCategory } from "../../models/expenseModels";
import useExpensesStore from "../../store/useExpensesStore";
import { CloseRounded, FilterAltRounded } from "@mui/icons-material";
import { useState } from "react";

const Filters = () => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [menuOpen, setMenuOpen] = useState(false);
    const filters = useExpensesStore((s) => s.filters);
    const setFilters = useExpensesStore((s) => s.setFilters);

    const { data: categories } = useQuery({
        queryKey: ["filters"],
        queryFn: async () => {
            const { data } = await categoriesService.getAll();
            return data;
        },
    });

    const handleCatClick = (cat?: ExpenseCategory) => {
        if (!cat) return;

        const existingCat = filters.categories.indexOf(cat.id);

        if (existingCat === -1)
            setFilters({ ...filters, categories: [...filters.categories, cat.id] });
        else
            setFilters({
                ...filters,
                categories: filters.categories.filter((cId) => cId !== cat.id),
            });
    };

    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (!sm ? <Card elevation={10} sx={{ borderRadius: 2, }}>
                <CardHeader
                    title="Filters"
                    titleTypographyProps={{ variant: "h6" }}
                    sx={{
                        p: 2,
                        bgcolor: "primary.dark",
                        color: "primary.contrastText",
                    }}
                />
                <Divider/>
                <CardContent>
                    {categories?.length ? (
                        <List>
                            {categories.map((cat) => (
                                <ListItemButton key={cat.id} onClick={() => handleCatClick(cat)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            disableRipple
                                            checked={filters.categories.indexOf(cat.id) > -1}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={cat.title}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    ) : (
                        <Typography>Filters</Typography>
                    )}
                </CardContent>
            </Card> :

            <>
                <Box sx={{
                    mt: 2,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    display: filters.categories?.length ? 'flex' : 'none'
                }}>
                    {filters.categories?.map((id: string) => {
                        const category = categories?.find(c => c.id === id);

                        return <Chip color='success' key={id} label={category?.title}
                                     onDelete={() => handleCatClick(category)}
                                     sx={{ m: 1 }}/>
                    })}
                </Box>

                <Button fullWidth variant='contained' endIcon={<FilterAltRounded/>} onClick={toggleMenu}
                        sx={{ my: 2 }}>Filter</Button>

                <Drawer open={menuOpen} anchor='left' onClose={toggleMenu}>
                    <Box sx={{ p: 2, width: '250px', maxWidth: '100%' }}>
                        <Stack direction='row' spacing={1.5} justifyContent='space-between' alignItems='center'>
                            <Typography variant='h6' color='primary.dark'>
                                Filters
                            </Typography>

                            <IconButton color='error' onClick={toggleMenu}>
                                <CloseRounded/>
                            </IconButton>
                        </Stack>

                        {categories?.length ? (
                            <List disablePadding>
                                {categories.map((cat) => (
                                    <ListItemButton sx={{ pl: 0 }} key={cat.id} onClick={() => handleCatClick(cat)}>
                                        <ListItemIcon>
                                            <Checkbox
                                                disableRipple
                                                checked={filters.categories.indexOf(cat.id) > -1}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={cat.title}
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        ) : (
                            <Typography>Filters</Typography>
                        )}
                    </Box>
                </Drawer>
            </>
    );
};

export default Filters;
