import {Container, Typography} from "@mui/material";

const Error = () => {
    return (
        <Container>
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                Wystąpił błąd :(
            </Typography>
        </Container>
    );
};

export default Error;