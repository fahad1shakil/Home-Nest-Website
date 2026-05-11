import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "./LoadingScreen";

const ProtectedRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to={"/login"} state={location.pathname} replace />;
  }

  return children;
};

export default ProtectedRoute;
