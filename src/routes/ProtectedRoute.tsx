import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSelectors";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useSelector(selectToken);
  if (!token) {
    return <Navigate to='/login' replace />;
  }
  return <>{children}</>;
}

export default ProtectedRoute
