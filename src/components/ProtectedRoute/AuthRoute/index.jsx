import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../../context";

function AuthRoute(props) {
  const { adminToken, userToken } = useContext(Context);

  if (!adminToken && !userToken) {
    return <Navigate to={"/login"} />;
  } else {
    return props.children;
  }
}

export default AuthRoute;
