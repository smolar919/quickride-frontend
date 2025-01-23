import React from "react";
import {CarDTO} from "../../api/car/CarDTO.ts";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

const CarCard: React.FC<{ car: CarDTO }> = ({ car }) => {
    return (
        <Card sx={{ display: "flex", flexDirection: "column", height: "100%"}}>
            <CardMedia
                component="img"
                height="250"
                image={`/bmw_seria3.jpg`} // Assuming car images follow this naming convention
                alt={car.model}
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
            <CardActions>
                <Button size="small" disabled={!car.available} sx={{ marginTop: "auto", alignSelf: "center"}}>
                    {car.available ? "Wypożycz teraz!" : "Niedostępne"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default CarCard;