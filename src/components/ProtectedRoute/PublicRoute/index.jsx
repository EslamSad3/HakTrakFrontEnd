
import { Navigate } from "react-router-dom";


function PublicRoute(props) {
  const storedAdminToken = localStorage.getItem("AdminToken");
  const storedUserToken = localStorage.getItem("UserToken");

  if (storedAdminToken || storedUserToken) {
    return <Navigate to={"/dashboard"} />;
  } else {
    return props.children;
  }
}

export default PublicRoute;
