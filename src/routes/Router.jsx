import { createBrowserRouter, Navigate } from "react-router-dom";
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
import Unauthorized from "../pages/error/Unauthorized";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ViewPayments from "../pages/dashboard/admin/ViewPayments";
import ManageClubs from "../pages/dashboard/admin/ManageClubs";
import MyClubs from "../pages/dashboard/manager/MyClubs";
import CreateClub from "../pages/dashboard/manager/CreateClub";
import ClubMembers from "../pages/dashboard/manager/ClubMembers";
import EventsManagement from "../pages/dashboard/manager/EventsManagement";
import MyMemberships from "../pages/dashboard/member/MyMemberships";
import MyEvents from "../pages/dashboard/member/MyEvents";
import PaymentHistory from "../pages/dashboard/member/PaymentHistory";
import PaymentSuccess from "../pages/dashboard/member/PaymentSuccess";

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
        element:<Clubs />
      },
      {
        path: '/clubs/:id',
        element: <ClubDetails />
      },
      {
        path:"/payment-success", element:<PaymentSuccess />
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
        path: '/unauthorized',
        element: <Unauthorized />
    },
  {
    path:'/dashboard',
    element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
    children:[
         
        {path:'admin/home',  element: <PrivateRoute requiredRole="admin"><AdminDashboard/></PrivateRoute> },
        {
        path: 'admin/users',
        element: <PrivateRoute requiredRole="admin"><ManageUsers /></PrivateRoute>
      },
      {
        path: 'admin/clubs',
        element: <PrivateRoute requiredRole="admin"><ManageClubs /></PrivateRoute>
      },
      {
        path: 'admin/payments',
        element: <PrivateRoute requiredRole="admin"><ViewPayments /></PrivateRoute>
      },
        {path:'clubManager/home', element:<PrivateRoute requiredRole="clubManager"><ManagerDashboard/></PrivateRoute>},
        {
        path: 'clubManager/myClubs',
        element: <PrivateRoute requiredRole="clubManager"><MyClubs /></PrivateRoute>
      },
      {
        path: 'clubManager/createClub',
        element: <PrivateRoute requiredRole="clubManager"><CreateClub /></PrivateRoute>
      },
     
      {
        path: 'clubManager/members/:clubId',
        element: <PrivateRoute requiredRole="clubManager"><ClubMembers /></PrivateRoute>
      },
      {
        path: 'clubManager/events',
        element: <PrivateRoute requiredRole="clubManager"><EventsManagement /></PrivateRoute>
      },
      
        {path:'member/home', element:<PrivateRoute requiredRole="member"> <MemberDashboard/></PrivateRoute>},
         {
        path: 'member/clubs',
        element: <PrivateRoute requiredRole="member"><MyMemberships /></PrivateRoute>
      },
      {
        path: 'member/events',
        element: <PrivateRoute requiredRole="member"><MyEvents /></PrivateRoute>
      },
      {
        path: 'member/payments',
        element: <PrivateRoute requiredRole="member"><PaymentHistory /></PrivateRoute>
      }
    ]
  }
])
export default router