import {createBrowserRouter} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../LogIn/Login/Login";
import Register from "../LogIn/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import InstructorHome from "../Pages/Dashboard/InstructorHome/InstructorHome";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import MyClass from "../Pages/Dashboard/MyClass/MyClass";
import UpdateClass from "../Pages/Dashboard/UpdateClass/UpdateClass";
import ManageClass from "../Pages/Dashboard/ManageClass/ManageClass";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import Classes from "../Pages/Classes/Classes";
import Instructors from "../Pages/Instructors/Instructors"
import MySelectedClass from "../Pages/Dashboard/MySelectedClass/MySelectedClass";
import MyEnrolledClasses from "../Pages/Dashboard/MyEnrolledClasses/MyEnrolledClasses"
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory"
import PrivateRoute from "./PrivateRoute"
import AdminRoute from "./AdminRoute";
import InstructorsRoute from "./InstructorsRoute"
import ErrorPage from "../component/error/error-page"
const router = createBrowserRouter([
    {
        path:'/',
        element: <Main></Main>,
        errorElement: <ErrorPage />,
        children:[
            {
               path:"/",
               element:<Home></Home>,
            },
            {
               path:"login",
               element:<Login></Login>,
            },
            {
               path:"register",
               element:<Register></Register>,
            },
            {
               path:"classes",
               element:<Classes></Classes>,
            },
            {
               path:"instructors",
               element:<Instructors></Instructors>,
            },
            
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute> ,
        errorElement: <ErrorPage />,
        children:[
            {
               path:"userHome",
               element:<UserHome></UserHome>,
            },
            {
               path:"adminHome",
               element:<AdminRoute><AdminHome></AdminHome></AdminRoute>,
            },
            {
               path:"instructorHome",
               element:<InstructorsRoute><InstructorHome></InstructorHome></InstructorsRoute>,
            },
            {
               path:"addClass",
               element: <AddClass></AddClass>,
            },
            {
               path:"myClass",
               element: <MyClass></MyClass>,
            },
            {
               path:"update/:id",
               element: <UpdateClass></UpdateClass>,
            },
            {
               path:"manageClass",
               element: <ManageClass></ManageClass>,
            },
            {
               path:"manageUsers",
               element: <ManageUsers></ManageUsers>,
            },
            {
               path:"mySelectedClass",
               element: <MySelectedClass></MySelectedClass>,
            },
            {
               path:"myEnrolledClasses",
               element: <MyEnrolledClasses></MyEnrolledClasses>,
            },
            {
               path:"payment/:id",
               element: <Payment></Payment>,
               
            },
            {
               path:"paymentHistory",
               element:<PaymentHistory></PaymentHistory>,
            },

            
        ]
    }
])

export default router;