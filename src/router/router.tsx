import {createBrowserRouter} from "react-router";
import Error from "../pages/error/error.tsx";
import HomePage from "../pages/home/home.tsx";
import CarReservation from "../pages/reservation/car_reservation.tsx";
import {LoginFormComponent} from "../components/auth/login.tsx";
import {RegisterFormComponent} from "../components/auth/register.tsx";

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
    },
    {
        path: "/login",
        element: <LoginFormComponent/>,
        errorElement: <Error/>
    },
    {
        path: "/register",
        element: <RegisterFormComponent/>,
        errorElement: <Error/>
    },
    {
        path: "/reservations/user/:userId",
        element: <HomePage />, // TODO
        errorElement: <Error />
    }
]);