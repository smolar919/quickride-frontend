import {AppBar, Box, Button, Divider, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router";

const NavBar = () => {
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
                    <Button color="inherit" component={Link} to="/" sx={{ mx: 1, "&:hover": { bgcolor: "rgba(255, 255, 255, 0.5)" } }}>
                        Samochody
                    </Button>
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: "white", mx: 1 }} />
                    <Button color="inherit" component={Link} to="/about" sx={{ mx: 1, "&:hover": { bgcolor: "rgba(255, 255, 255, 0.5)" } }}>
                        Rezerwacje
                    </Button>
                    <Divider orientation="vertical" flexItem sx={{ bgcolor: "white", mx: 1 }} />
                    <Button color="inherit" component={Link} to="/contact" sx={{ mx: 1, "&:hover": { bgcolor: "rgba(255, 255, 255, 0.5)" } }}>
                        Kontakt
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;