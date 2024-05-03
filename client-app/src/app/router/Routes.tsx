import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginForm from "../userForms/LoginForm";
import TrackerView from "../tracker/TrackerView";
import Progress from "../progress/Progress";
import Calculator from "../calculator/Calculator";






export const routes: RouteObject[] = [
    {
       path: '/',
       element:<App />,
       children:[
        {path: 'login', element:<LoginForm/>},
        {path: 'tracker', element:<TrackerView/>},
        {path: 'calculator', element:<Calculator/>},
        {path: 'progress', element:<Progress/>}
       
        ]
    }
]

export const router = createBrowserRouter(routes);