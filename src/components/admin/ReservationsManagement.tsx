import { useEffect, useState } from "react";
import { ReservationDTO } from "../../api/reservation/ReservationDTO.ts";
import { ReservationApiAxios } from "../../api/reservation/ReservationApiAxios.ts";
import { Box, Typography, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import { EditReservationForm } from "../../api/reservation/EditReservationForm.ts";

const ReservationManagement = () => {
    const [reservations, setReservations] = useState<ReservationDTO[]>([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        const api = new ReservationApiAxios();
        const reservationsData = await api.getAllReservations();
        setReservations(reservationsData);
    };

    const handleConfirm = async (reservation: ReservationDTO) => {
        const api = new ReservationApiAxios();
        const updatedReservation: EditReservationForm = {
            startDate: reservation.startDate,
            endDate: reservation.endDate,
            confirmed: true
        };
        await api.editReservation(reservation.id, updatedReservation);
        fetchReservations();
    };

    const columns: GridColDef[] = [
        { field: "startDate", headerName: "Data rozpoczęcia", flex: 1 },
        { field: "endDate", headerName: "Data zakończenia", flex: 1 },
        { field: "fullPrice", headerName: "Cena", flex: 1 },
        { field: "confirmed", headerName: "Potwierdzone", flex: 1, renderCell: (params) => (params.value ? "Tak" : "Nie") },
        {
            field: "actions",
            headerName: "Akcje",
            flex: 1,
            renderCell: (params) => (
                !params.row.confirmed ? (
                    <IconButton color="primary" onClick={() => handleConfirm(params.row)}>
                        <CheckIcon />
                    </IconButton>
                ) : (
                    <Typography variant="body2" color="textSecondary">Zatwierdzone</Typography>
                )
            )
        }
    ];

    return (
        <Box>
            <Typography variant="h5">Rezerwacje</Typography>
            <DataGrid rows={reservations} columns={columns} autoHeight getRowId={(row) => row.id} disableRowSelectionOnClick/>
        </Box>
    );
};

export default ReservationManagement;
