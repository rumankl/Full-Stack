import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

const UserRoutes = () => {

  const { user } = useSelector((state) => state.userSlice);
  const location = useLocation();


  return user ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet />;



}
export default UserRoutes