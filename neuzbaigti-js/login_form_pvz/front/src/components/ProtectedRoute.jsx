import { Navigate} from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading){
        return <div>Loading...</div>
    }

    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;