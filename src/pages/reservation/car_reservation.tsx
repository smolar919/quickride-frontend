import {CarDTO} from "../../api/car/CarDTO.ts";
import {useEffect, useState} from "react";
import {CreateReservationForm} from "../../api/reservation/CreateReservationForm.ts";
import {ReservationApiAxios} from "../../api/reservation/ReservationApiAxios.ts";
import {Box, Button, Card, CardContent, CardMedia, Container, Typography} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {useParams} from "react-router";
import {CarApiAxios} from "../../api/car/CarApiAxios.ts";

const CarReservation = () => {
    const { carId } = useParams<{ carId: string}>()
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [car, setCar] = useState<CarDTO | null>(null);

    const calculatePrice = () => {
        if (startDate && endDate) {
            const dayCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            if (dayCount > 0) {
                setTotalPrice(dayCount * car!.pricePerDay);
            } else {
                setTotalPrice(null);
            }
        }
    };

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const carApi = new CarApiAxios();
                if (carId) {
                    const carFound = await carApi.getCarById(carId);
                    if (carFound) {
                        setCar(carFound);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch car", error);
            }
        };

        fetchCar();
    }, [carId]);

    const handleReservation = async () => {
        if (startDate && endDate && totalPrice) {
            const reservationForm: CreateReservationForm = {
                startDate,
                endDate,
                userId: "f84eaadc-f49f-4ca8-8ad2-7295afc356d0",
                carId: carId!,
            };

            try {
                const reservationApi = new ReservationApiAxios();
                const createdReservation = await reservationApi.createReservation(reservationForm);
                setMessage(`Rezerwacja utworzona! ID: ${createdReservation.id}`);
            } catch (error) {
                console.error("Failed to create reservation", error);
                setMessage("Nie udało się utworzyć rezerwacji. Spróbuj ponownie.");
            }
        }
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: "20px" }}>
            <Card sx={{ display: "flex", flexDirection: "column", padding: "16px" }}>
{/*                <CardMedia
                    component="img"
                    image={`./${car!.model.toLowerCase()}.jpg`}
                    alt={car!.model}
                    sx={{ height: "300px", objectFit: "cover" }}
                />*/}
                <CardContent>
                    <Typography variant="h4" component="div">
                        {car.make} {car.model}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Rok: {car!.year}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Cena za dzień: ${car!.pricePerDay}
                    </Typography>
                </CardContent>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: "16px" }}>
                    <DatePicker
                        selected={startDate as Date}
                        onChange={(date: Date | null) => setStartDate(date || undefined)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Wybierz datę początkową"
                    />
                    <DatePicker
                        selected={endDate as Date}
                        onChange={(date: Date | null) => setEndDate(date || undefined)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="Wybierz datę końcową"
                    />
                    <Button variant="contained" onClick={calculatePrice}>
                        Oblicz cenę
                    </Button>
                    {totalPrice !== null && (
                        <Typography variant="h6">Całkowita cena: ${totalPrice}</Typography>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!startDate || !endDate || totalPrice === null}
                        onClick={handleReservation}
                    >
                        Zarezerwuj
                    </Button>
                    {message && <Typography variant="body2" color="text.secondary">{message}</Typography>}
                </Box>
            </Card>
        </Container>
    );
};

export default CarReservation;
