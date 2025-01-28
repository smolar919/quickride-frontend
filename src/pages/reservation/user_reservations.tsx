import NavBar from "../../components/navbar/NavBar.tsx";
import Grid from '@mui/material/Grid2';
import {Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {ReservationDTO} from "../../api/reservation/ReservationDTO.ts";
import {ReservationApiAxios} from "../../api/reservation/ReservationApiAxios.ts";
import ReservedCarCard from "../../components/car/ReservedCarCard.tsx";

const UserReservationsPage = () => {
    const { userId } = useParams<{ userId: string }>();
    const [reservations, setReservations] = useState<ReservationDTO[] | null>(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const reservationApi = new ReservationApiAxios();
                const userReservations = await reservationApi.getUserReservations(userId!);

                const convertedReservations = userReservations.map((reservation) => ({
                    ...reservation,
                    startDate: new Date(reservation.startDate),
                    endDate: new Date(reservation.endDate),
                }));

                setReservations(convertedReservations);
            } catch (error) {
                console.error('Failed to fetch reservations', error);
            }
        };

        fetchReservations();
    }, []);

    return (
        <>
            <NavBar />
            <Typography component="h1" variant="h5" sx={{ mt: 15, ml: 3 }}>
                TWOJE REZERWACJE
            </Typography>
            <Container maxWidth={false} sx={{ marginTop: "50px", padding: "16px" }}>
                <Grid container spacing={4}>
                    {reservations &&
                        reservations.map((reservation) => (
                            <Grid item xs={12} sm={6} md={4} key={reservation.id}>
                                <ReservedCarCard car={reservation.car} reservation={reservation} />
                            </Grid>
                        ))}
                </Grid>
            </Container>
        </>
    );
}

export default UserReservationsPage