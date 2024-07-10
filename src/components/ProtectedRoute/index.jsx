import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../context";
function ProtectedRoute(props) {
  const { adminToken } = useContext(Context);

  if (!adminToken) {
    return <Navigate to={"/dashboard"} />;
  } else {
    return props.children;
  }
}

export default ProtectedRoute;
