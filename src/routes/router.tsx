import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../App";
import Login from "../screens/Login";
import Users from "../screens/Users";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Navigate to='/users' />} />
      <Route
        path='/login'
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route element={<App />}>
        <Route
          path='/users'
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  )
);
