// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function useAssets(adminToken, userToken) {
//   const [ips, setIps] = useState([]);
//   const [domains, setDomains] = useState([]);
//   const [portals, setPortals] = useState([]);

//   const getAuthAdminHeaders = () => ({ Authorization: `Bearer ${adminToken}` });
//   const getAuthUserHeaders = () => ({ Authorization: `Bearer ${userToken}` });

//   async function addNewIp(values) {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/ips`,
//         values,
//         { headers: getAuthAdminHeaders() }
//       );
//       if (response.status === 201) {
//         toast.success("Ip Added Successfully");
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   async function fetchAllIps() {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/ips`,
//         { headers: { ...getAuthAdminHeaders(), ...getAuthUserHeaders() } }
//       );
//       setIps(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch IPs");
//     }
//   }

//   async function fetchOneIp(id) {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/ips/${id}`,
//         { headers: { ...getAuthAdminHeaders(), ...getAuthUserHeaders() } }
//       );
//       return response.data.data;
//     } catch (error) {
//       toast.error("Failed to fetch IP");
//     }
//   }

//   async function updateIp(id, values) {
//     try {
//       const response = await axios.patch(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/ips/${id}`,
//         values,
//         { headers: getAuthAdminHeaders() }
//       );
//       response.status === 200
//         ? toast.success("Ip updated successfully")
//         : toast.error("Ip not found");
//     } catch (error) {
//       toast.error("Failed to update IP");
//     }
//   }

//   async function deleteIp(id) {
//     try {
//       const response = await axios.delete(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/ips/${id}`,
//         { headers: getAuthAdminHeaders() }
//       );
//       response.status === 204
//         ? toast.success("Ip Deleted successfully")
//         : toast.error("Failed to delete IP");
//     } catch (error) {
//       toast.error("Failed to delete IP");
//     }
//   }

//   async function addNewDomain(values) {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/domains`,
//         values,
//         { headers: getAuthAdminHeaders() }
//       );
//       if (response.status === 201) {
//         toast.success("Domain Added successfully");
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   async function fetchAllDomains() {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/domains`,
//         { headers: { ...getAuthAdminHeaders(), ...getAuthUserHeaders() } }
//       );
//       setDomains(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch domains");
//     }
//   }

//   async function fetchOneDomain(id) {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/domains/${id}`,
//         { headers: { ...getAuthAdminHeaders(), ...getAuthUserHeaders() } }
//       );
//       return response.data.data;
//     } catch (error) {
//       toast.error("Failed to fetch domain");
//     }
//   }

//   async function updateDomain(id, values) {
//     try {
//       const response = await axios.patch(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/domains/${id}`,
//         values,
//         { headers: getAuthAdminHeaders() }
//       );
//       response.status === 200
//         ? toast.success("Domain updated successfully")
//         : toast.error("Domain not found");
//     } catch (error) {
//       toast.error("Failed to update domain");
//     }
//   }

//   async function deleteDomain(id) {
//     try {
//       const response = await axios.delete(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/domains/${id}`,
//         { headers: getAuthAdminHeaders() }
//       );
//       response.status === 204
//         ? toast.success("Domain Deleted successfully")
//         : toast.error("Failed to delete domain");
//     } catch (error) {
//       toast.error("Failed to delete domain");
//     }
//   }

//   async function addNewPortal(values) {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/portals`,
//         values,
//         { headers: getAuthAdminHeaders() }
//       );
//       if (response.status === 201) {
//         toast.success("Portal Added successfully");
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   async function fetchAllPortals() {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/portals`,
//         { headers: { ...getAuthAdminHeaders(), ...getAuthUserHeaders() } }
//       );
//       setPortals(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch portals");
//     }
//   }

//   async function fetchOnePortal(id) {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/portals/${id}`,
//         { headers: { ...getAuthAdminHeaders(), ...getAuthUserHeaders() } }
//       );
//       return response.data.data;
//     } catch (error) {
//       toast.error("Failed to fetch portal");
//     }
//   }

//   async function updatePortal(id, values) {
//     try {
//       const response = await axios.patch(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/portals/${id}`,
//         values,
//         { headers: getAuthAdminHeaders() }
//       );
//       response.status === 200
//         ? toast.success("Portal updated successfully")
//         : toast.error("Portal not found");
//     } catch (error) {
//       toast.error("Failed to update portal");
//     }
//   }

//   async function deletePortal(id) {
//     try {
//       const response = await axios.delete(
//         `${process.env.REACT_APP_BASE_URL}/api/assets/portals/${id}`,
//         { headers: getAuthAdminHeaders() }
//       );
//       response.status === 204
//         ? toast.success("Portal Deleted successfully")
//         : toast.error("Failed to delete portal");
//     } catch (error) {
//       toast.error("Failed to delete portal");
//     }
//   }

//   return {
//     ips,
//     domains,
//     portals,
//     addNewIp,
//     fetchAllIps,
//     fetchOneIp,
//     updateIp,
//     deleteIp,
//     addNewDomain,
//     fetchAllDomains,
//     fetchOneDomain,
//     updateDomain,
//     deleteDomain,
//     addNewPortal,
//     fetchAllPortals,
//     fetchOnePortal,
//     updatePortal,
//     deletePortal,
//   };
// }
