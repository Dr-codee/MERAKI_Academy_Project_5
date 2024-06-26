import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/index";
import "./App.css";
import Landing from "./pages/Landing/Landing";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
