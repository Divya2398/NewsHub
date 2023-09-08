import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectRoute = ({ children }) => {
  const authUser = useSelector((state) => state.auth.userToken);
  if (!authUser) {
    // not logged in so redirect to login
    return <Navigate to="/" />;
    // with return url
    // state={{ from: history.location }}
  }
  // authorized so return child components
  return children;
};
