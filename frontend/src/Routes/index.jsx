import { createBrowserRouter } from "react-router-dom";

import Map from "../pages/Map/Map";
import User from "../pages/User/User"
import Schedule from "../pages/Provider/Schedule"
import Notes from "../pages/Notes/Notes"
import RegisterPatient from "../pages/Register/RegisterPatient";
import PatientOrDoctor from "../pages/Register/PatientOrDoctor"
import About from "../pages/About/About"
import Appointment from "../pages/Appointment/Appointment"
import Appointments from "../pages/Provider/Appointment"
import ContactUs from "../pages/ContactUs/ContactUs"
import RegisterDoctor from "../pages/Register/RegisterDoctor";
import Login from "../pages/Login/Login";
import DocProvider from "../pages/Provider/Provider"
import NotFound from "../pages/NotFound/NotFound"
import Diagnosis from "../pages/Diagnosis/Diagnosis"
import Landing from "../pages/Landing/Landing"
import Main from "../layouts/Main";
import DrProvider from "../pages/Provider/Providers"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
  
  {
    path: "/Register",
    element: <PatientOrDoctor/>,
  },
  {
    path: "/Register_Provider",
      element: <RegisterDoctor/>,
    },
    {
      path: "/Register_patient",
        element: <RegisterPatient/>,
      },
{
  path: "/About",
    element: <About/>,
  },
  {
    path: "/Appointment",
      element: <Appointment/>,
    },
    {
      path: "/ContactUs",
        element: <ContactUs/>,
      },
      {
        path: "/Diagnosis",
          element: <Diagnosis/>,
        },
        {
          path: "/",
            element: <Landing/>,
          },
          {
            path: "/Login",
              element: <Login/>,
            },
            {
              path: "/Notes",
                element: <Notes/>,
              },
              {
                path: "/Schedule",
                  element: <Schedule/>,
                },
                {
                  path: "/Provider",
                    element: <DocProvider/>,
                  },
                  {
                    path: "/Providers",
                      element: <DrProvider/>,
                    },
                    {
                      path: "/Appointments",
                        element: <Appointments/>,
                      },
                  {
                    path: "/User",
                      element: <User/>,
                    },{
                      path: "/map",
                        element: <Map/>,
                      },
              {
                path: "*",
                  element: <NotFound/>,
                },]}])
