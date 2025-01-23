import {createBrowserRouter} from "react-router";
import Error from "../pages/error/error.tsx";
import HomePage from "../pages/home/home.tsx";
import CarReservation from "../pages/reservation/car_reservation.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        errorElement: <Error/>
    },
    {
        path: "/reserve/:carId",
        element: <CarReservation/>,
        errorElement: <Error />
    }
]);