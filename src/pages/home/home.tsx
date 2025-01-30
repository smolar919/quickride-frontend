import CarCard from "../../components/car/CarCard.tsx";
import {useEffect, useState} from "react";
import {CarDTO} from "../../api/car/CarDTO.ts";
import {CarApiAxios} from "../../api/car/CarApiAxios.ts";
import {CircularProgress, Container} from "@mui/material";
import Grid from '@mui/material/Grid2';
import NavBar from "../../components/navbar/NavBar.tsx";

const HomePage = () => {
    const [cars, setCars] = useState<CarDTO[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const carApi = new CarApiAxios();
                const allCars = await carApi.getAllCars();
                setCars(allCars);
            } catch (error) {
                console.error("Failed to fetch cars", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (loading) {
        return (
            <Container sx={{ textAlign: "center", marginTop: "50px" }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <>
            <NavBar />
            <Container maxWidth={false} sx={{ marginTop: "100px", padding: "16px" }}>
                <Grid container spacing={4}>
                    {cars && cars.map((car) => (
                        <Grid item xs={12} sm={6} md={4} key={car.id}>
                            <CarCard car={car} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default HomePage;