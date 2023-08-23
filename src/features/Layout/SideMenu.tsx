import { KeyboardDoubleArrowRightRounded, LogoutRounded, MenuOpenRounded, } from "@mui/icons-material";
import { Avatar, Box, Button, Drawer, IconButton, Stack, Typography, } from "@mui/material";
import { useState } from "react";
import useUserStore from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const user = useUserStore((s) => s.user);
    const setUserData = useUserStore((s) => s.setUserData);
    const navigate = useNavigate();

    const toggleMenuOpen = () => setMenuOpen((prev) => !prev);

    const handleLogout = async () => {
        setUserData({});
        navigate('/auth');
    };

    return (
        <>
            <IconButton onClick={toggleMenuOpen} color="default" disableRipple>
                <MenuOpenRounded/>
            </IconButton>

            <Drawer anchor="right" open={menuOpen} onClose={toggleMenuOpen}>
                <Box
                    component={Stack}
                    direction="column"
                    justifyContent="space-between"
                    maxWidth="100%"
                    width="300px"
                    height="100%"
                    p={2}
                    spacing={2}
                >
                    <Stack direction="column">
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <IconButton onClick={toggleMenuOpen} color="secondary">
                                <KeyboardDoubleArrowRightRounded color="secondary"/>
                            </IconButton>

                            <Stack direction="row" spacing={1.5} alignItems="center">
                                <Typography>{user.username}</Typography>
                                <Avatar>{user.username?.[0]?.toUpperCase()}</Avatar>
                            </Stack>
                        </Stack>

                        {/* other content */}
                    </Stack>

                    <Button
                        onClick={handleLogout}
                        startIcon={<LogoutRounded/>}
                        variant="outlined"
                        color="secondary"
                    >
                        Logout
                    </Button>
                </Box>
            </Drawer>
        </>
    );
};

export default SideMenu;
