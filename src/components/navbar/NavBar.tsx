import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router";

const NavBar = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit", alignSelf: "flex-end" }}>
                        QuickRide
                    </Link>
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button color="inherit" component={Link} to="/cars">
                        Samochody
                    </Button>
                    <Button color="inherit" component={Link} to="/about">
                        O nas
                    </Button>
                    <Button color="inherit" component={Link} to="/contact">
                        Kontakt
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;