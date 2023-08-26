import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwtDecode from  "jwt-decode";
import { logOut } from "../../redux/slices/authSlice";
import { useAppSelector } from "../../redux/hooks";

const AuthGuard = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const { token,  user } = auth; 

  const isValidToken = (): boolean => {
    if (!token && !user) return false;

    const expiry = (jwtDecode(token!) as any)?.exp;

    if (expiry * 1000 < Date.now()) {
      dispatch(logOut());
      return false;
    };

    return true;
  };

  return (
    user && token && isValidToken() ? (
      <Outlet />
    ) : (
      <Navigate to = "/signin" state = {{ from: location }} replace/>
    )
  )
};



export default AuthGuard;