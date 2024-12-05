import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import AllCampaigns from "../pages/AllCampaigns";
import AddCampaign from "../pages/AddCampaign";
import MyCampaigns from "../pages/MyCampaigns";
import MyDonations from "../pages/MyDonations";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CampaignDetails from "../pages/CampaignDetails";
import UpdateCampaign from "../pages/UpdateCampaign";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/campaigns",
                element: <AllCampaigns />
            },
            {
                path: "/campaign/:id",
                element: <PrivateRoute><CampaignDetails /></PrivateRoute>
            },
            {
                path: "/update-campaign/:id",
                element: <PrivateRoute><UpdateCampaign /></PrivateRoute>
            },
            {
                path: "/add-campaign",
                element: <PrivateRoute><AddCampaign /></PrivateRoute>
            },
            {
                path: "/my-campaigns",
                element: <PrivateRoute><MyCampaigns /></PrivateRoute>
            },
            {
                path: "/my-donations",
                element: <PrivateRoute><MyDonations /></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

export default router;