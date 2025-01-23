import {createBrowserRouter} from "react-router";
import Error from "../pages/error/error.tsx";
import HomePage from "../pages/home/home.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        errorElement: <Error/>
    }
]);