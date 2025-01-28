import {CarDTO} from "../../api/car/CarDTO.ts";
import {useEffect, useState} from "react";
import {CreateReservationForm} from "../../api/reservation/CreateReservationForm.ts";
import {ReservationApiAxios} from "../../api/reservation/ReservationApiAxios.ts";
import {Box, Button, Card, CardContent, CardMedia, Container, Typography} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from "@mui/x-date-pickers";
import {useParams} from "react-router";
import {CarApiAxios} from "../../api/car/CarApiAxios.ts";
import {Dayjs} from "dayjs";
import NavBar from "../../components/navbar/NavBar.tsx";
import { getUserId } from "../../config/AuthStorage.ts"
import dayjs from 'dayjs'

const CarReservation = () => {
    const { carId } = useParams<{ carId: string}>()
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [car, setCar] = useState<CarDTO | null>(null);

    const calculatePrice = () => {
        if (startDate && endDate) {
            const dayCount = Math.ceil((endDate.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24));
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
                const carFound = await carApi.getCarById(carId!);
                console.log("Car fetched:", carFound);
                setCar(carFound);
            } catch (error) {
                console.error("Failed to fetch car", error);
            }
        };

        fetchCar();
    }, [carId]);

    const handleReservation = async () => {
        const currentUserId = getUserId();
        if (startDate && endDate && totalPrice) {
            const reservationForm: CreateReservationForm = {
                startDate: startDate.toDate(),
                endDate: endDate.toDate(),
                appUserId: currentUserId!,
                carId: carId!,
                fullPrice: totalPrice,
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
        <>
            <NavBar />
                <Container maxWidth="md" sx={{ marginTop: "100px" }}>
                    {car ? (
                        <Card sx={{ display: "flex", flexDirection: "column", padding: "16px" }}>
                            <CardMedia
                                component="img"
                                image={`/${car.model.toLowerCase()}.jpg`}
                                alt={car.model}
                                sx={{
                                    height: "300px",
                                    width: "500px",
                                    objectFit: "cover",
                                    marginBottom: "16px",
                                    alignSelf: "center",
                                    borderRadius: 2
                                }}
                            />
                            <CardContent>
                                <Typography variant="h4" component="div">
                                    {car.make} {car.model}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Rok: {car.year}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Cena za dzień: {car.pricePerDay}zł
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: "16px" }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        value={startDate}
                                        onChange={(newValue) => setStartDate(newValue)}
                                        label="Wybierz datę początkową"
                                        minDate={dayjs()}
                                        slotProps={{
                                            textField: { fullWidth: true },
                                        }}
                                    />
                                    <DatePicker
                                        value={endDate}
                                        onChange={(newValue) => setEndDate(newValue)}
                                        label="Wybierz datę końcową"
                                        minDate={startDate || undefined}
                                        slotProps={{
                                            textField: { fullWidth: true },
                                        }}
                                    />
                                </LocalizationProvider>
                                <Button variant="contained" onClick={calculatePrice}>
                                    Oblicz cenę
                                </Button>
                                {totalPrice !== null && (
                                    <Typography variant="h6">Całkowita cena: {totalPrice}zł</Typography>
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
                    ) : (
                        <Typography variant="h5" sx={{ textAlign: "center", marginTop: "20px" }}>
                            Ładowanie samochodu...
                        </Typography>
                    )}
                </Container>
        </>
    );

};

export default CarReservation;
