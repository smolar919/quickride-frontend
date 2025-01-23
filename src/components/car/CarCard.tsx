import React from "react";
import {CarDTO} from "../../api/car/CarDTO.ts";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate} from "react-router";

const CarCard: React.FC<{ car: CarDTO }> = ({ car }) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ display: "flex", flexDirection: "column", height: "100%"}}>
            <CardMedia
                component="img"
                image={`/${car.model.toLowerCase()}.jpg`}
                alt={car.model}
                sx={{
                    height: "250px",
                    width: "400px",
                    objectFit: "cover",
                    marginBottom: "16px",
                }}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {car.make} {car.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rok: {car.year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Cena za dzień: {car.pricePerDay}zł
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Kategoria: {car.category}
                </Typography>
            </CardContent>
            <CardActions sx={{alignSelf: "center"}}>
                <Button size="small" disabled={!car.available} onClick={() => {navigate(`/reserve/${car.id}`)}}>
                    {car.available ? "Wypożycz" : "Niedostępne"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default CarCard;