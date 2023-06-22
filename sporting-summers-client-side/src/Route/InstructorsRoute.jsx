import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useInstructor from "../hooks/useInstructor";



// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    const [isInstructor, isInstructorLoading] = useInstructor();

    const location = useLocation();

    if(loading || isInstructorLoading){
        return <progress className="progress w-56"></progress>
    }

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default AdminRoute;