import React from "react";
import {CarDTO} from "../../api/car/CarDTO.ts";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import {AuthStorage} from "../../config/AuthStorage.ts";

const CarCard: React.FC<{ car: CarDTO }> = ({ car }) => {
    const navigate = useNavigate();
    const isAuthenticated = AuthStorage.isAuthenticated();

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
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/default_car.jpg";
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
                <Button size="small" disabled={!isAuthenticated} onClick={() => {navigate(`/reserve/${car.id}`)}}>
                    {isAuthenticated ? "Wypożycz" : "Zaloguj się, aby wypożyczyć"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default CarCard;