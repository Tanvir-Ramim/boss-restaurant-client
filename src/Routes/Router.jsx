
import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import MainMenu from "../pages/Menu/MainMenu/MainMenu";
import Order from "../pages/order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Secret from "../Shared/secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import Allusers from "../pages/Dashboard/Allusers/Allusers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoutes from "./AdminRoutes";
import ManageItem from "../pages/Dashboard/ManageItem/ManageItem";
import UpdateItem from "../pages/Dashboard/ManageItem/UpdateItem/UpdateItem";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
           index: true,
           element: <Home></Home>
        },
        {
          path: 'menu',
          element: <MainMenu></MainMenu>
        },
        {
          path: 'order/:category',
          element: <Order></Order>
        },{
          path:'login',
          element:<Login></Login>
        }
        ,{
          path:'signup',
          element:<SignUp></SignUp>
        },
        {
          path:'secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        }
      ]
    },
    {
       path:'/dashboard',
       element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
       children:[
          {
            path:'cart',
            element:<Cart></Cart>
          },
          // admin routes
          {
             path:'users',
             element: <AdminRoutes><Allusers></Allusers></AdminRoutes>
          },{
             path: 'addItems',
             element: <AdminRoutes><AddItems></AddItems></AdminRoutes>
          },{
            path: 'manageItems',
            element: <AdminRoutes><ManageItem></ManageItem></AdminRoutes>
          },{
             path: 'updateItem/:id',
             element:<AdminRoutes><UpdateItem></UpdateItem></AdminRoutes>,
             loader: ({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
          }
       ]
    }
  ]);