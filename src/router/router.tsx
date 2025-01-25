import {createBrowserRouter} from "react-router";
import Error from "../pages/error/error.tsx";
import HomePage from "../pages/home/home.tsx";
import {LoginFormComponent} from "../components/auth/login.tsx";
import {RegisterFormComponent} from "../components/auth/register.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        errorElement: <Error/>
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
    }
]);