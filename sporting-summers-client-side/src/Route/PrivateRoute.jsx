import { Navigate, useLocation } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import useAuth from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
};

export default PrivateRoute;
