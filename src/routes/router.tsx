import {
    Navigate,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";
  
  import App from "../App";
  
  export const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home" element={<App />} />
        </>
    )
  );
