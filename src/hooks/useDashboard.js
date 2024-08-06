// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function useDashboard(adminToken, userToken) {
//   const [noncompliancegapsoverview, setNonComplianceGapsOverview] = useState(
//     []
//   );
//   const [threatCompositionOverview, setThreatCompositionOverview] = useState(
//     []
//   );
//   const [securityPostureScore, setSecurityPostureScore] = useState([]);
//   const [securityBreachIndicators, setSecurityBreachIndicators] = useState([]);

//   const getAuthAdminHeaders = () => ({ Authorization: `Bearer ${adminToken}` });
//   const getAuthUserHeaders = () => ({ Authorization: `Bearer ${userToken}` });

//   async function fetchNonComplianceGapsOverview() {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/dashboard/noncompliance-gaps`,
//         { headers: { ...getAuthAdminHeaders(), ...getAuthUserHeaders() } }
//       );
//       setNonComplianceGapsOverview(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch Non-compliance Gaps Overview");
//     }
//   }

//   async function fetchThreatCompositionOverview() {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/dashboard/threat-composition`,
//         { headers: { ...getAuthAdminHeaders(), ...getAuthUserHeaders() } }
//       );
//       setThreatCompositionOverview(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch Threat Composition Overview");
//     }
//   }

//   async function fetchSecurityPostureScore() {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/dashboard/security-posture`,
//         { headers: { ...getAuthAdminHeaders(), ...getAuthUserHeaders() } }
//       );
//       setSecurityPostureScore(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch Security Posture Score");
//     }
//   }

//   async function fetchSecurityBreachIndicators() {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/api/dashboard/security-breach-indicators`,
//         { headers: { ...getAuthAdminHeaders(), ...getAuthUserHeaders() } }
//       );
//       setSecurityBreachIndicators(response.data.data);
//     } catch (error) {
//       toast.error("Failed to fetch Security Breach Indicators");
//     }
//   }

//   return {
//     noncompliancegapsoverview,
//     threatCompositionOverview,
//     securityPostureScore,
//     securityBreachIndicators,
//     fetchNonComplianceGapsOverview,
//     fetchThreatCompositionOverview,
//     fetchSecurityPostureScore,
//     fetchSecurityBreachIndicators,
//   };
// }
