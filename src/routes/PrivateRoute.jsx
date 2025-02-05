import { Navigate, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const {user, loading } = useAuth();
    if (loading) {
        return <div className="flex justify-center mt-60 md:mt-72 xl:mt-96">
            <span className="loader"></span>
        </div>
    }
    if(user){
        return children;
    }

    return <Navigate state={location?.pathname} to='/login' replace={true}></Navigate>
};

export default PrivateRoute;