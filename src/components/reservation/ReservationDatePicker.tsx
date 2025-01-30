import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {ReservationApiAxios} from "../../api/reservation/ReservationApiAxios.ts";


interface Props {
    carId: string;
    startDate: Dayjs | null;
    setStartDate: (date: Dayjs | null) => void;
    endDate: Dayjs | null;
    setEndDate: (date: Dayjs | null) => void;
}

const ReservationDatePicker = ({ carId, startDate, setStartDate, endDate, setEndDate }: Props) => {
    const [unavailableDates, setUnavailableDates] = useState<Dayjs[]>([]);
    const reservationApi = new ReservationApiAxios();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await reservationApi.getReservedDatesForCar(carId);

                const blockedDates: Dayjs[] = [];
                response.forEach(({ startDate, endDate }) => {
                    let currentDate = dayjs(startDate);
                    const lastDate = dayjs(endDate);

                    while (currentDate.isBefore(lastDate) || currentDate.isSame(lastDate, "day")) {
                        blockedDates.push(currentDate);
                        currentDate = currentDate.add(1, "day");
                    }
                });

                setUnavailableDates(blockedDates);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        if (carId) {
            fetchReservations();
        }
    }, [carId]);

    const isDateUnavailable = (date: Dayjs) => {
        return unavailableDates.some((unavailableDate) => date.isSame(unavailableDate, "day"));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                label="Wybierz datę początkową"
                minDate={dayjs()}
                shouldDisableDate={isDateUnavailable}
                slotProps={{
                    textField: { fullWidth: true },
                }}
            />
            <DatePicker
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                label="Wybierz datę końcową"
                minDate={startDate || undefined}
                shouldDisableDate={isDateUnavailable}
                slotProps={{
                    textField: { fullWidth: true },
                }}
            />
        </LocalizationProvider>
    );
};

export default ReservationDatePicker;
