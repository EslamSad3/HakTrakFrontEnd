import { Navigate } from "react-router-dom";

function AuthRoute(props) {
  const storedAdminToken = localStorage.getItem("AdminToken");
  const storedUserToken = localStorage.getItem("UserToken");

  console.log(storedAdminToken, "storedAdminToken");
  console.log(storedUserToken, "storedUserToken");

  if (!(storedAdminToken || storedUserToken)) {
    return <Navigate to={"/login"} />;
  } else {
    return props.children;
  }
}

export default AuthRoute;
