import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwtDecode from  "jwt-decode";
import { logOut } from "../../../redux/slices/authSlice";
import { useAppSelector } from "../../../redux/hooks";
import { useToast } from "../../../hooks/useToast";
import { User } from "../../../interfaces";

const AuthGuard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const userData: User = JSON.parse(user);
  const { is_activated } = userData;
  const dispatch = useDispatch();
  const location = useLocation();
  const { showWarning } = useToast();

  const isValidToken = (): boolean => {
    if (!token || !user || !is_activated) {
      showWarning("Session token is invalid or your account is not activated.");
      dispatch(logOut());
      return false;
    }

    const expiry = (jwtDecode(token!) as any)?.exp;

    if (expiry * 1000 < Date.now()) {
      showWarning("Session token has expired.");
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