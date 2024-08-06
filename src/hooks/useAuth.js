// import { useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// export default function useAuth(navigate) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [adminToken, setAdminToken] = useState(
//     localStorage.getItem("AdminToken")
//   );
//   const [userToken, setUserToken] = useState(localStorage.getItem("UserToken"));
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   function saveAdminToken(token) {
//     localStorage.setItem("AdminToken", token);
//     setAdminToken(token);
//   }

//   function saveUserToken(token) {
//     localStorage.setItem("UserToken", token);
//     setUserToken(token);
//   }

//   async function handleLogingIn(values) {
//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
//         values
//       );
//       setIsLoading(false);

//       if (response.status === 200) {
//         const { token } = response.data;
//         const { role } = response.data.data;
//         if (role === "admin") {
//           saveAdminToken(token);
//         } else if (role === "user") {
//           saveUserToken(token);
//         }
//         navigate("/dashboard");
//         setIsLoggedIn(true);
//         toast.success("Logged in successfully", { position: "top-center" });
//       } else {
//         toast.error("Invalid Email Or Password", {
//           position: toast.POSITION.TOP_CENTER,
//         });
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setIsLoading(false);
//     }
//   }

//   const getAuthAdminHeaders = () => {
//     return { Authorization: `Bearer ${adminToken}` };
//   };

//   const getAuthUserHeaders = () => {
//     return { Authorization: `Bearer ${userToken}` };
//   };

//   const getAuthHeaders = () => {
//     if (adminToken) {
//       return { Authorization: `Bearer ${adminToken}` };
//     } else if (userToken) {
//       return { Authorization: `Bearer ${userToken}` };
//     } else {
//       return {};
//     }
//   };

//   return {
//     adminToken,
//     userToken,
//     isLoggedIn,
//     handleLogingIn,
//     saveAdminToken,
//     saveUserToken,
//     getAuthHeaders,
//     getAuthAdminHeaders,
//     getAuthUserHeaders,
//     isLoading,
//   };
// }
