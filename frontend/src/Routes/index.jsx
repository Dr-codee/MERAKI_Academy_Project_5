import { createBrowserRouter } from "react-router-dom";
// import NavBar from "../layouts/NaveBar/NavBar";
import User from "../pages/User/User"
import Main from "../pages/Main/index";
export const router = createBrowserRouter([
  {
    path: "*",
    element: <Main />,
  },
  {
    path: "/",
    element: <Main />,
    children: [{ path: "/User", element: <User /> }],
  },
]);
