// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function useThreatIntelligence(adminToken, userToken) {
//   const [iocs, setIocs] = useState([]);
//   const [suspiciousIps, setSuspiciousIps] = useState([]);
//   const [aptFeeds, setAptFeeds] = useState([]);
//   const [darkWebMentions, setDarkWebMentions] = useState([]);
//   const [leakedCredentials, setLeakedCredentials] = useState([]);
//   const [edrXdrs, setEdrXdrs] = useState([]);
//   const [ndrs, setNdrs] = useState([]);
//   const [atos, setAtos] = useState([]);
//   const [attackSurfaces, setAttackSurfaces] = useState([]);
//   const [brandReputations, setBrandReputations] = useState([]);
//   const [vulnerabilitiesIntelligences, setVulnerabilitiesIntelligences] =
//     useState([]);

//   const getAuthAdminHeaders = () => ({ Authorization: `Bearer ${adminToken}` });
//   const getAuthUserHeaders = () => ({ Authorization: `Bearer ${userToken}` });

//   async function addNewIoc(values) {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs`,
//         values,
//         { headers: getAuthAdminHeaders() }
//       );
//       if (response.status === 201) {
//         toast.success("IOC Added Successfully");
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   async function fetchAllIocs() {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs`,
//         { headers: { ...getAuthAdminHeaders(), ...getAuthUserHeaders() } }
//       );
//       setIocs(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch IOCs");
//     }
//   }

//   async function fetchOneIoc(id) {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs/${id}`,
//         { headers: { ...getAuthAdminHeaders(), ...getAuthUserHeaders() } }
//       );
//       return response.data.data;
//     } catch (error) {
//       toast.error("Failed to fetch IOC");
//     }
//   }

//   async function updateIoc(id, values) {
//     try {
//       const response = await axios.patch(
//         `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs/${id}`,
//         values,
//         { headers: getAuthAdminHeaders() }
//       );
//       response.status === 200
//         ? toast.success("IOC updated successfully")
//         : toast.error("IOC not found");
//     } catch (error) {
//       toast.error("Failed to update IOC");
//     }
//   }

//   async function deleteIoc(id) {
//     try {
//       const response = await axios.delete(
//         `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs/${id}`,
//         { headers: getAuthAdminHeaders() }
//       );
//       response.status === 204
//         ? toast.success("IOC Deleted successfully")
//         : toast.error("Failed to delete IOC");
//     } catch (error) {
//       toast.error("Failed to delete IOC");
//     }
//   }

//   async function addNewSuspiciousIps(values) {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips`,
//         values,
//         { headers: getAuthAdminHeaders() }
//       );
//       if (response.status === 201) {
//         toast.success("Suspicious IP Added Successfully");
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   async function fetchAllSuspiciousIps() {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips`,
//         { headers: { ...getAuthAdminHeaders(), ...getAuthUserHeaders() } }
//       );
//       setSuspiciousIps(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch suspicious IPs");
//     }
//   }

//   async function fetchOneSuspiciousIp(id) {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips/${id}`,
//         { headers: { ...getAuthAdminHeaders(), ...getAuthUserHeaders() } }
//       );
//       return response.data.data;
//     } catch (error) {
//       toast.error("Failed to fetch suspicious IP");
//     }
//   }

//   async function updateSuspiciousIp(id, values) {
//     try {
//       const response = await axios.patch(
//         `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips/${id}`,
//         values,
//         { headers: getAuthAdminHeaders() }
//       );
//       response.status === 200
//         ? toast.success("Suspicious IP updated successfully")
//         : toast.error("Suspicious IP not found");
//     } catch (error) {
//       toast.error("Failed to update suspicious IP");
//     }
//   }

//   async function deleteSuspiciousIp(id) {
//     try {
//       const response = await axios.delete(
//         `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips/${id}`,
//         { headers: getAuthAdminHeaders() }
//       );
//       response.status === 204
//         ? toast.success("Suspicious IP Deleted successfully")
//         : toast.error("Failed to delete suspicious IP");
//     } catch (error) {
//       toast.error("Failed to delete suspicious IP");
//     }
//   }

//   const fetchAllAptFeeds = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/apt-feeds`,
//         {
//           headers: { Authorization: `Bearer ${adminToken || userToken}` },
//         }
//       );
//       setAptFeeds(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch APT Feeds");
//     }
//   };

//   const fetchAllDarkWebMentions = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/dark-web-mentions`,
//         {
//           headers: { Authorization: `Bearer ${adminToken || userToken}` },
//         }
//       );
//       setDarkWebMentions(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch Dark Web Mentions");
//     }
//   };

//   const fetchAllLeakedCredentials = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/leaked-credentials`,
//         {
//           headers: { Authorization: `Bearer ${adminToken || userToken}` },
//         }
//       );
//       setLeakedCredentials(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch Leaked Credentials");
//     }
//   };

//   const fetchAllEdrXdr = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/edr-xdrs`,
//         {
//           headers: { Authorization: `Bearer ${adminToken || userToken}` },
//         }
//       );
//       setEdrXdrs(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch EDR/XDR");
//     }
//   };

//   const fetchAllNdr = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/ndrs`,
//         {
//           headers: { Authorization: `Bearer ${adminToken || userToken}` },
//         }
//       );
//       setNdrs(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch NDR");
//     }
//   };

//   const fetchAllATOs = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/atos`,
//         {
//           headers: { Authorization: `Bearer ${adminToken || userToken}` },
//         }
//       );
//       setAtos(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch ATOs");
//     }
//   };

//   const fetchAllAttackSurfaces = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/attack-surfaces`,
//         {
//           headers: { Authorization: `Bearer ${adminToken || userToken}` },
//         }
//       );
//       setAttackSurfaces(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch Attack Surfaces");
//     }
//   };

//   const fetchAllBrandReputations = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/brand-reputations`,
//         {
//           headers: { Authorization: `Bearer ${adminToken || userToken}` },
//         }
//       );
//       setBrandReputations(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch Brand Reputations");
//     }
//   };

//   const fetchAllVulnerabilitiesIntelligences = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/vulnerabilities-intelligences`,
//         {
//           headers: { Authorization: `Bearer ${adminToken || userToken}` },
//         }
//       );
//       setVulnerabilitiesIntelligences(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch Vulnerabilities Intelligences");
//     }
//   };

//   return {
//     iocs,
//     suspiciousIps,
//     aptFeeds,
//     darkWebMentions,
//     leakedCredentials,
//     edrXdrs,
//     ndrs,
//     atos,
//     attackSurfaces,
//     brandReputations,
//     vulnerabilitiesIntelligences,
//     addNewIoc,
//     fetchAllIocs,
//     fetchOneIoc,
//     updateIoc,
//     deleteIoc,
//     addNewSuspiciousIps,
//     fetchAllSuspiciousIps,
//     fetchOneSuspiciousIp,
//     updateSuspiciousIp,
//     deleteSuspiciousIp,
//     fetchAllAptFeeds,
//     fetchAllDarkWebMentions,
//     fetchAllLeakedCredentials,
//     fetchAllEdrXdr,
//     fetchAllNdr,
//     fetchAllATOs,
//     fetchAllAttackSurfaces,
//     fetchAllBrandReputations,
//     fetchAllVulnerabilitiesIntelligences,
//   };
// }
