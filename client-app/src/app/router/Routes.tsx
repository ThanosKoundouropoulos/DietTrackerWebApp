import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginForm from "../userForms/LoginForm";



export const routes: RouteObject[] = [
    {
       path: '/',
       element:<App />,
       children:[
        {path: 'login', element:<LoginForm/>},
        ]
    }
]

export const router = createBrowserRouter(routes);