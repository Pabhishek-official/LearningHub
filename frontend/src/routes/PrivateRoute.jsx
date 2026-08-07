import { Navigate, Outlet} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function PrivateRoute(){
    const { loggedIn } = useContext(AuthContext);
    return loggedIn ? <Outlet/> : <Navigate to="/login" replace />;
}

export default PrivateRoute;