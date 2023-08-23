import { RouteObject } from "react-router-dom";
import Auth from "../features/Auth";
import ConfirmEmail from "../features/Auth/ConfirmEmail";
import HomePage from "../features/Home/HomePage";
import Layout from "../features/Layout";
import GetUserData from "../features/Auth/GetUserData.tsx";
import ChangePassword from "../features/Auth/ChangePassword.tsx";

const routes: RouteObject[] = [
    {
        element: <Layout/>,
        path: "/",
        children: [
            {
                index: true,
                element: <HomePage/>,
            },
            {
                path: "auth",
                element: <Auth/>,
            },
            {
                path: "confirm-email/:id",
                element: <ConfirmEmail/>,
            },
            {
                path: "get-user/:id",
                element: <GetUserData/>,
            },
            {
                path: "change-password",
                element: <ChangePassword/>
            }
        ],
    },
];

export default routes;
