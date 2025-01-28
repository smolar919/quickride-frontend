import { AppBar, Box, Button, Divider, Toolbar, Typography } from "@mui/material";
import {AuthStorage} from "../../config/AuthStorage.ts";
import {useNavigate} from "react-router";

const NavBar = () => {
    const navigate = useNavigate();
    const isAuthenticated = AuthStorage.isAuthenticated();

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
                <Box display="flex" alignItems="center" sx={{ display: "flex", gap: 1 }}>
                    <Button
                        color="inherit"
                        onClick={() => navigate("/")}
                        sx={{ mx: 1, "&:hover": { bgcolor: "rgba(255, 255, 255, 0.5)" }, whiteSpace: "nowrap" }}
                    >
                        Samochody
                    </Button>
                    <Divider orientation="vertical" variant={"middle"} flexItem sx={{ bgcolor: "white", mx: 1 }} />
                    {isAuthenticated ? (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => navigate("/reservations")}
                                sx={{ mx: 1, "&:hover": { bgcolor: "rgba(255, 255, 255, 0.5)" }, whiteSpace: "nowrap" }}
                            >
                                Rezerwacje
                            </Button>
                            <Divider orientation="vertical" variant={"middle"} flexItem sx={{ bgcolor: "white", mx: 1 }} />
                            <Button
                                color="inherit"
                                onClick={handleLogout}
                                sx={{ mx: 1, "&:hover": { bgcolor: "rgba(255, 255, 255, 0.5)" }, whiteSpace: "nowrap" }}
                            >
                                Wyloguj się
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => navigate("/login")}
                                sx={{ mx: 1, "&:hover": { bgcolor: "rgba(255, 255, 255, 0.5)" }, whiteSpace: "nowrap" }}
                            >
                                Zaloguj się
                            </Button>
                            <Divider orientation="vertical" variant={"middle"} flexItem sx={{ bgcolor: "white", mx: 1 }} />
                            <Button
                                color="inherit"

                                onClick={() => navigate("/register")}
                                sx={{ mx: 1, "&:hover": { bgcolor: "rgba(255, 255, 255, 0.5)" }, whiteSpace: "nowrap"}}
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

