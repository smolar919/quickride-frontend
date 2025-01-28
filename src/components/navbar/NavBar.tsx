import { AppBar, Box, Button, Divider, Toolbar, Typography } from "@mui/material";
import { AuthStorage, getUserId, isAdmin } from "../../config/AuthStorage.ts";
import { useNavigate } from "react-router";

const NavBar = () => {
    const navigate = useNavigate();
    const isAuthenticated = AuthStorage.isAuthenticated();
    const userId = getUserId();
    const isUserAdmin = isAuthenticated && isAdmin();

    const handleLogout = () => {
        AuthStorage.clearToken();
        navigate("/");
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        QuickRide
                    </Typography>
                </Box>
                <Box width="100%" />
                <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
                    <Button
                        color="inherit"
                        onClick={() => navigate("/")}
                        sx={{
                            whiteSpace: "nowrap",
                            px: 2,
                            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.5)" },
                        }}
                    >
                        Samochody
                    </Button>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: "white" }} />
                    {isAuthenticated ? (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => navigate(`/reservations/user/${userId}`)}
                                sx={{
                                    whiteSpace: "nowrap",
                                    px: 2,
                                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.5)" },
                                }}
                            >
                                Rezerwacje
                            </Button>
                            <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: "white" }} />
                            {isUserAdmin && (
                                <>
                                    <Button
                                        color="inherit"
                                        onClick={() => navigate("/admin/home")}
                                        sx={{
                                            whiteSpace: "nowrap",
                                            px: 2,
                                            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.5)" },
                                        }}
                                    >
                                        Panel Admina
                                    </Button>
                                    <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: "white" }} />
                                </>
                            )}
                            <Button
                                color="inherit"
                                onClick={handleLogout}
                                sx={{
                                    whiteSpace: "nowrap",
                                    px: 2,
                                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.5)" },
                                }}
                            >
                                Wyloguj się
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => navigate("/login")}
                                sx={{
                                    whiteSpace: "nowrap",
                                    px: 2,
                                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.5)" },
                                }}
                            >
                                Zaloguj się
                            </Button>
                            <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: "white" }} />
                            <Button
                                color="inherit"
                                onClick={() => navigate("/register")}
                                sx={{
                                    whiteSpace: "nowrap",
                                    px: 2,
                                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.5)" },
                                }}
                            >
                                Zarejestruj się
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;