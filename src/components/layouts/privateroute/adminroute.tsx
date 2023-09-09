import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { User } from "../../../interfaces";

const AdminRoute = () => {
    const user = useAppSelector((state) => state.auth.user);
    const userData: User =  JSON.parse(user);
    const { role } = userData;

    return (
        role === "Admin" ? (
            <Outlet />
        ) :  (
            <Navigate to = "/" replace/>
        )
    )
};

export default AdminRoute;