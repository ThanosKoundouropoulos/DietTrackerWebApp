import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginForm from "../userForms/LoginForm";
import TrackerView from "../tracker/TrackerView";
import Calculator from "../calculator/Calculator";






export const routes: RouteObject[] = [
    {
       path: '/',
       element:<App />,
       children:[
        {path: 'login', element:<LoginForm/>},
        {path: 'tracker', element:<TrackerView/>},
        {path: 'calculator', element:<Calculator/>},
       
        ]
    }
]

export const router = createBrowserRouter(routes);