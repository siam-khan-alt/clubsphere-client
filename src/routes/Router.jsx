import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Clubs from "../pages/Clubs";
import ClubDetails from "../pages/ClubDetails";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router =createBrowserRouter([
    {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/clubs',
        element: <Clubs />
      },
      {
        path: '/clubs/:id',
        element: <ClubDetails />
      },
      {
        path: '/events',
        element: <Events />
      },
      {
        path: '/events/:id',
        element: <EventDetails />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  },
])
export default router