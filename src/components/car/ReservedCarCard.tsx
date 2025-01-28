import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import {CarDTO} from "../../api/car/CarDTO.ts";
import {ReservationDTO} from "../../api/reservation/ReservationDTO.ts";

const ReservedCarCard: React.FC<{ car: CarDTO, reservation: ReservationDTO }> = ({ car, reservation }) => {

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
                    Kategoria: {car.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Cena za dzień: {car.pricePerDay}zł
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Cena za wypożyczenie: {reservation.fullPrice}zł
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rozpoczęcie wypożyczenia: {reservation.startDate.toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Zakończenie wypożyczenia: {reservation.endDate.toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Potwierdzona rezewacja: {reservation.confirmed ? "TAK" : "NIE"}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ReservedCarCard;