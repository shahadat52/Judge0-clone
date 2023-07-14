import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main";
import Home from "./home";
import Login from "./login";
import SignUp from "./signUp";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            }
        ]
    }
])