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
import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import ManagerDashboard from "../pages/dashboard/manager/ManagerDashboard";
import MemberDashboard from "../pages/dashboard/member/MemberDashboard";
import PrivateRoute from "./PrivateRoute";

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
        element:<PrivateRoute><Clubs /></PrivateRoute> 
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
  {
    path:'/dashboard',
    element:<DashboardLayout/>,
    children:[
        {path:'admin', element: <AdminDashboard/>},
        {path:'manager', element: <ManagerDashboard/>},
        {path:'member', element: <MemberDashboard/>},
    ]
  }
])
export default router