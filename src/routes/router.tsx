import {
    Navigate,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";
  
  import App from "../App";
  import Login from "../screens/Login";
  import Users from "../screens/Users";
  
  export const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Navigate to="/users" />} />
        <Route path="/home" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </>
    )
  );
