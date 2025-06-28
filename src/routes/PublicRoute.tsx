import { selectToken } from "@/features/auth/authSelectors";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }: { children: React.ReactNode }) {
  const token = useSelector(selectToken);
  if (token) {
    return <Navigate to='/users' replace />;
  }
  return <>{children}</>;
}

export default PublicRoute
