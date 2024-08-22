import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Context = createContext();

export function ContextProvider(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("AdminToken")
  );
  const [userToken, setUserToken] = useState(localStorage.getItem("UserToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /** ************************** Assets States *******************/
  // Ips
  const [ips, setIps] = useState([]);
  console.log(ips);
  const [oneIp, setOneIp] = useState({});

  // Domains
  const [domains, setDomains] = useState([]);
  const [oneDomain, setOneDomain] = useState({});

  // Portals
  const [portals, setPortals] = useState([]);
  const [onePortal, setOnePortal] = useState({});

  /** ************************** threat intelligence *******************/
  // IOCs
  const [iocs, setIocs] = useState([]);
  const [oneIoc, setOneIoc] = useState({});

  // Suspicious ips
  const [suspiciousIps, setSuspiciousIps] = useState([]);
  const [oneSuspiciousIp, setOneSuspiciousIp] = useState({});

  // APT Feeds
  const [aptFeeds, setAptFeeds] = useState([]);
  const [oneAptFeed, setOneAptFeed] = useState({});

  // Threat Intelligence Feeds
  const [threatIntelligenceFeeds, setThreatIntelligenceFeeds] = useState([]);
  const [oneThreatIntelligenceFeed, setOneThreatIntelligenceFeed] = useState(
    {}
  );

  /********************************** Dark Web Monitoring ******************** */

  // Dark Web Mentions
  const [darkWebMentions, setDarkWebMentions] = useState([]);
  const [oneDarkWebMention, setOneDarkWebMention] = useState({});

  // Leaked Credentials
  const [leakedCredentials, setLeakedCredentials] = useState([]);
  const [oneLeakedCredential, setOneLeakedCredential] = useState({});

  // Edr XDR
  const [edrXdrs, setEdrXdr] = useState([]);
  const [oneEdrXDR, setOneEdrXDR] = useState({});

  // NDR
  const [ndrs, setNdr] = useState([]);
  const [oneNdr, setOneNdr] = useState({});

  // ATO
  const [atos, setATOs] = useState([]);
  const [oneATO, setOneATO] = useState({});

  // Attack surface
  const [attackSurfaces, setAttackSurfaces] = useState([]);
  const [oneAttackSurface, setOneAttackSurface] = useState({});

  // Brand reputation
  const [brandReputations, setBrandReputations] = useState([]);
  const [oneBrandReputation, setOneBrandReputation] = useState({});

  // vulnerabilities intelligences
  const [vulnerabilitiesIntelligences, setVulnerabilitiesIntelligences] =
    useState([]);
  const [oneVulnerabilitiesIntelligence, setOneVulnerabilitiesIntelligence] =
    useState({});

  /*****************Executive Dashboard *******************************/

  // noncompliancegapsoverview
  const [noncompliancegapsoverview, setNonComplianceGapsOverview] = useState(
    []
  );
  const [oneNoncompliancegapsoverview, setOneNoncompliancegapsoverview] =
    useState({});

  // threatCompositionOverview
  const [threatCompositionOverview, setThreatCompositionOverview] = useState(
    []
  );
  const [oneThreatCompositionOverview, setOneThreatCompositionOverview] =
    useState({});

  // Security Posture Score
  const [securityPostureScore, setSecurityPostureScore] = useState([]);
  const [oneSecurityPostureScore, setOneSecurityPostureScore] = useState({});

  // Security Breach Indicators
  const [securityBreachIndicators, setSecurityBreachIndicators] = useState([]);
  const [oneSecurityBreachIndicators, setOneSecurityBreachIndicators] =
    useState({});

  // Quarterly Incident
  const [quarterlyIncident, setQuarterlyIncident] = useState([]);
  const [oneQuarterlyIncident, setOneQuarterlyIncident] = useState({});

  // TTDTTR
  const [TtdTtrs, setTtdTtrs] = useState([]);
  const [oneTtdTtr, setOneTtdTtr] = useState({});

  // Digital Risk Intelligence
  const [digitalRiskIntelligences, setDigitalRiskIntelligences] = useState([]);
  const [oneDigitalRiskIntelligence, setOneDigitalRiskIntelligence] = useState(
    {}
  );

  /************************* Attack Scenarios *********************/

  // mitre attacks
  const [mitreAttacks, setMitreAttacks] = useState([]);
  const [oneMitreAttack, setOneMitreAttack] = useState({});

  // cyber kill chain
  const [cyberKillChains, setCyberKillChains] = useState([]);
  const [oneCyberKillChain, setOneCyberKillChain] = useState({});
  function saveAdminToken(token) {
    localStorage.setItem("AdminToken", token);
    setAdminToken(token);
  }

  function saveUserToken(token) {
    localStorage.setItem("UserToken", token);
    setUserToken(token);
  }

  // Login
  async function handleLogingIn(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        values
      );
      setIsLoading(false);

      console.log(response, "login response");

      if (response.status === 200) {
        const token = response?.data?.token;
        const role = response?.data?.data?.role;
        if (role === "admin") {
          saveAdminToken(token);
        } else if (role === "user") {
          saveUserToken(token);
        }
        navigate("/dashboard");
        setIsLoggedIn(true);
        toast.success("Logged in successfully", { position: "top-center" });
      } else {
        toast.error("Invalid Email Or Password", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Helper function to get the appropriate headers
  const getAuthAdminHeaders = () => {
    return {
      Authorization: `Bearer ${adminToken}`,
    };
  };

  console.log(adminToken, "adminToken");

  const getAuthUserHeaders = () => {
    return {
      Authorization: `Bearer ${userToken}`,
    };
  };

  const getAuthHeaders = () => {
    if (adminToken) {
      return { Authorization: `Bearer ${adminToken}` };
    } else if (userToken) {
      return { Authorization: `Bearer ${userToken}` };
    } else {
      return {};
    }
  };

  /*********************** Assets ******************************/
  // Add new IP
  async function addNewIp(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/assets/ips`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("Ip Added Successfully");
        navigate("/assets/ips");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all IPs
  async function fetchAllIps() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/assets/ips`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setIps(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one IP
  async function fetchOneIp(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/assets/ips/${id}`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setIsLoading(false);
      setOneIp(response.data.data);
      return oneIp;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  // Update IP
  async function updateIp(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/assets/ips/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );

      response.status === 200
        ? toast.success("Ip updated successfully")
        : toast.error("Ip not found");

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 404) {
        toast.error("Ip Not Found");
      } else {
        toast.error("Server Error");
      }

      setIsLoading(false);
    }
  }

  // Delete IP
  async function deleteIp(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/assets/ips/${id}`,
        {
          headers: getAuthAdminHeaders(),
        }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Ip Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Ip Not Found");
      } else {
        toast.error("Server Error");
        setIsLoading(false);
      }
    }
  }

  // Domains
  // Add new domain
  async function addNewDomain(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/assets/domains`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );

      if (response.status === 201) {
        toast.success("Domain Added successfully");
        navigate("/assets/domains");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all domains
  async function fetchAllDomains() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/assets/domains`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setDomains(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one domain
  async function fetchOneDomain(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/assets/domains/${id}`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setIsLoading(false);
      setOneDomain(response.data.data);
      return oneDomain;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Update domain
  async function updateDomain(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/assets/domains/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      response.status === 200
        ? toast.success("Domain updated successfully")
        : toast.error("Domain not found");
    } catch (error) {
      console.log(error);
    }
  }

  // Delete domain
  async function deleteDomain(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/assets/domains/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Domain Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Domain Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  // Portals
  // Add new portal
  async function addNewPortal(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/assets/portals`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("Portal Created Successfully");
        navigate("/assets/portals");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all portals
  async function fetchAllPortals() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/assets/portals`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setPortals(response.data.data);
      setIsLoading(false);
      return portals;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one portal
  async function fetchOnePortal(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/assets/portals/${id}`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setOnePortal(response.data.data);
      setIsLoading(false);
      return onePortal;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Update portal
  async function updatePortal(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/assets/portals/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      response.status === 200
        ? toast.success("Portal updated successfully")
        : toast.error("Portal not found");
    } catch (error) {
      console.log(error);
    }
  }

  // Delete portal
  async function deletePortal(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/assets/portals/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Portal Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Portal Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  /*********************** Threat Intelligence ******************************/

  /***************** IOCs *******************/
  // Add new IOC
  async function addNewIoc(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );

      if (response.status === 201) {
        toast.success("Ioc Added Successfully");
        navigate("/threat-intelligence/iocs");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all IOCs
  async function fetchAllIocs() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );

      setIocs(response.data.data);
      setIsLoading(false);
      return iocs;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one IOC
  async function fetchOneIoc(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs/${id}`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setIsLoading(false);
      setOneIoc(response.data.data);
      return oneIoc;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  // Update IOC
  async function updateIoc(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );

      response.status === 200
        ? toast.success("IOC updated successfully")
        : toast.error("IOC not found");

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 404) {
        toast.error("IOC Not Found");
      } else {
        toast.error("Server Error");
      }

      setIsLoading(false);
    }
  }

  // Delete IOC
  async function deleteIoc(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs/${id}`,
        {
          headers: getAuthAdminHeaders(),
        }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("IOC Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("IOC Not Found");
      } else {
        toast.error("Server Error");
        setIsLoading(false);
      }
    }
  }

  /************* Suspicious IPs ************* */

  // Add new Suspicious IPs
  async function addNewSuspiciousIps(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );

      if (response.status === 201) {
        toast.success("Suspicious ip Added Successfully");
        navigate("/threat-intelligence/suspicious-ips");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all suspicious IPs
  async function fetchAllSuspiciousIps() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setSuspiciousIps(response.data.data);
      setIsLoading(false);
      return suspiciousIps;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one suspicious IP
  async function fetchOneSuspiciousIp(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      setOneSuspiciousIp(response.data.data);
      return oneSuspiciousIp;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  // Update suspicious IP
  async function updateSuspiciousIp(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );

      response.status === 200
        ? toast.success("Suspicious Ip updated successfully")
        : toast.error("Suspicious Ip not found");

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 404) {
        toast.error("Suspicious Ip Not Found");
      } else {
        toast.error("Server Error");
      }

      setIsLoading(false);
    }
  }

  // Delete suspicious IP
  async function deleteSuspiciousIp(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips/${id}`,
        {
          headers: getAuthAdminHeaders(),
        }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Suspicious Ip Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Suspicious Ip Not Found");
      } else {
        toast.error("Server Error");
        setIsLoading(false);
      }
    }
  }

  /************* APT Feeds ************* */

  // Add new APT Feeds
  async function addNewAptFeeds(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/apt-feeds`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );

      if (response.status === 201) {
        toast.success("Apt Feed Added Successfully");
        navigate("/threat-intelligence/apt-feeds");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all APT Feeds
  async function fetchAllAptFeeds() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/apt-feeds`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setAptFeeds(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one APT Feed
  async function fetchOneAptFeed(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/apt-feeds/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      setOneAptFeed(response.data.data);
      return oneAptFeed;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  // Update APT Feed
  async function updateAptFeed(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/apt-feeds/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );

      response.status === 200
        ? toast.success("APT Feed updated successfully")
        : toast.error("APT Feed not found");

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 404) {
        toast.error("APT Feed Not Found");
      } else {
        toast.error("Server Error");
      }

      setIsLoading(false);
    }
  }

  // Delete APT Feed
  async function deleteAptFeed(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/apt-feeds/${id}`,
        {
          headers: getAuthAdminHeaders(),
        }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Apt Feed Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Apt Feed Not Found");
      } else {
        toast.error("Server Error");
        setIsLoading(false);
      }
    }
  }

  /************* Threat Intelligence Feeds ************* */

  // Add new Threat Intelligence Feeds
  async function addNewThreatIntelligenceFeeds(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/threat-intelligence-feeds`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );

      if (response.status === 201) {
        toast.success("Threat intelligence Feed Added Successfully");
        navigate("/threat-intelligence/threat-intelligence-feeds");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all threat intelligence Feeds
  async function fetchAllthreatintelligenceFeeds() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/threat-intelligence-feeds`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setThreatIntelligenceFeeds(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one threat intelligence Feed
  async function fetchOnethreatintelligenceFeed(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/threat-intelligence-feeds/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      setOneThreatIntelligenceFeed(response.data.data);
      return oneThreatIntelligenceFeed;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  // Update threat intelligence Feed
  async function updatethreatintelligenceFeed(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/threat-intelligence-feeds/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );

      response.status === 200
        ? toast.success("Threat Intelligence Feed updated successfully")
        : toast.error("Threat Intelligence Feed not found");

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 404) {
        toast.error("Threat Intelligence Feed Not Found");
      } else {
        toast.error("Server Error");
      }

      setIsLoading(false);
    }
  }

  // Delete threat intelligence Feed
  async function deletethreatintelligenceFeed(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/threat-intelligence-feeds/${id}`,
        {
          headers: getAuthAdminHeaders(),
        }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Threat Intelligence Feed Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Threat Intelligence Feed Not Found");
      } else {
        toast.error("Server Error");
        setIsLoading(false);
      }
    }
  }

  /**************************************** Dark Web Monitoring ***************************************** */

  // Dark Web Mentions
  // Add new Dark Web Mentions
  async function addNewDarkWebMentions(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/dark-web-mentions`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("Dark Web Mention Created Successfully");
        navigate("/dark-web-monitoring/dark-web-mentions");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all Dark Web Mentions
  async function fetchAllDarkWebMentions() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/dark-web-mentions`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setDarkWebMentions(response.data.data);
      setIsLoading(false);
      return darkWebMentions;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one Dark Web Mention
  async function fetchOneDarkWebMention(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/dark-web-mentions/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneDarkWebMention(response.data.data);
      setIsLoading(false);
      return oneDarkWebMention;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Update Dark Web Mention
  async function updateDarkWebMention(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/dark-web-mentions/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      response.status === 200
        ? toast.success("Dark Web Mention updated successfully")
        : toast.error("Dark Web Mention not found");
    } catch (error) {
      console.log(error);
    }
  }

  // Delete Dark Web Mention
  async function deleteDarkWebMention(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/dark-web-mentions/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Dark Web Mention Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Dark Web Mention Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  // Leaked Credentials
  // Add new Leaked Credentials
  async function addNewLeakedCredentials(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/leaked-credentials`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("Leaked Credentials Created Successfully");
        navigate("/dark-web-monitoring/leaked-credentials");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all Leaked Credentials
  async function fetchAllLeakedCredentials() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/leaked-credentials`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setLeakedCredentials(response.data.data);
      setIsLoading(false);
      return leakedCredentials;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one Leaked Credential
  async function fetchOneLeakedCredentials(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/leaked-credentials/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneLeakedCredential(response.data.data);
      setIsLoading(false);
      return oneLeakedCredential;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Update Leaked Credentials
  async function updateLeakedCredentials(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/leaked-credentials/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      response.status === 200
        ? toast.success("Leaked Credentials updated successfully")
        : toast.error("Leaked Credentials not found");
    } catch (error) {
      console.log(error);
    }
  }

  // Delete Leaked Credentials
  async function deleteLeakedCredentials(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/leaked-credentials/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Leaked Credentials Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Leaked Credentials Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  // EDR XDR
  // Add new EDR XDR
  async function addNewEdrXdr(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/detections/drxdr-detections`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("EDR XDR Created Successfully");
        navigate("/detections/drxdr-detections");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all EDR XDR
  async function fetchAllEdrXdr() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/detections/drxdr-detections`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setEdrXdr(response.data.data);
      setIsLoading(false);
      return edrXdrs;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one EDR XDR
  async function fetchOneEdrXdr(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/detections/drxdr-detections/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneEdrXDR(response.data.data);
      setIsLoading(false);
      return oneEdrXDR;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Update EDR XDR
  async function updateEdrXdr(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/detections/drxdr-detections/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      console.log(response);
      response.status === 200
        ? toast.success("EDR XDR updated successfully")
        : toast.error("EDR XDR not found");
    } catch (error) {
      console.log(error);
    }
  }

  // Delete EDR XDR
  async function deleteEdrXdr(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/detections/drxdr-detections/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("EDR XDR Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("EDR XDR Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  // NDR
  // Add new NDR
  async function addNewNdr(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/detections/ndr-detections`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("NDR Created Successfully");
        navigate("/detections/ndr-detections");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all NDR
  async function fetchAllNdr() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/detections/ndr-detections`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setNdr(response.data.data);
      setIsLoading(false);
      return ndrs;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one NDR
  async function fetchOneNdr(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/detections/ndr-detections/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneNdr(response.data.data);
      setIsLoading(false);
      return oneNdr;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Update NDR
  async function updateNdr(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/detections/ndr-detections/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      console.log(response);
      response.status === 200
        ? toast.success("NDR updated successfully")
        : toast.error("NDR not found");
    } catch (error) {
      console.log(error);
    }
  }

  // Delete NDR
  async function deleteNdr(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/detections/ndr-detections/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("NDR Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("NDR Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  // ATO
  // Add new ATO
  async function addNewATO(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/account-take-over`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      console.log(response, "ato response");
      if (response.status === 201) {
        toast.success("ATO Created Successfully");
        navigate("/account-take-over");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all ATO
  async function fetchAllATOs() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/account-take-over`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setATOs(response.data.data);
      setIsLoading(false);
      return atos;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one ATO
  async function fetchOneATO(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/account-take-over/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneATO(response.data.data);
      setIsLoading(false);
      return oneATO
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Update ATO
  async function updateATO(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/account-take-over/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      console.log(response);
      response.status === 200
        ? toast.success("ATO updated successfully")
        : toast.error("ATO not found");
    } catch (error) {
      console.log(error);
    }
  }

  // Delete ATO
  async function deleteATO(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/account-take-over/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("ATO Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("ATO Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  // Attack Surface
  // Add new Attack Surface
  async function addNewAttckSurface(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/attack-surface`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("Attack Surface Created Successfully");
        navigate("/attack-surface");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all Attack Surfaces
  async function fetchAllAttckSurfaces() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/attack-surface`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setAttackSurfaces(response.data.data);
      setIsLoading(false);
      return attackSurfaces;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one Attack Surface
  async function fetchOneAttckSurface(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/attack-surface/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneAttackSurface(response.data.data);
      setIsLoading(false);
      return oneAttackSurface;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Update Attack Surface
  async function updateAttckSurface(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/attack-surface/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      console.log(response);
      response.status === 200
        ? toast.success("Attack Surface updated successfully")
        : toast.error("Attack Surface not found");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  // Delete Attack Surface
  async function deleteAttckSurface(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/attack-surface/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Attack Surface Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Attack Surface Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  // Brand Reputation
  // Add new Brand Reputation
  async function addNewBrandReputation(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/brand-reputation`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("Brand Reputation Created Successfully");
        navigate("/brand-reputation");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all Brand Reputations
  async function fetchAllBrandReputations() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/brand-reputation`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setBrandReputations(response.data.data);
      setIsLoading(false);
      return brandReputations;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one Brand Reputation
  async function fetchOneBrandReputation(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/brand-reputation/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneBrandReputation(response.data.data);
      setIsLoading(false);
      return oneBrandReputation;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Update Brand Reputation
  async function updateBrandReputation(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/brand-reputation/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      console.log(response);
      response.status === 200
        ? toast.success("Brand Reputation updated successfully")
        : toast.error("Brand Reputation not found");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  // Delete Brand Reputation
  async function deleteBrandReputation(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/brand-reputation/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Brand Reputation Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Brand Reputation Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  // Vulnerabilities Intelligence
  // Add new Vulnerabilities Intelligence
  async function addNewVulnerabilitiesIntelligence(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/vulnerabilities-intelligences`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("Vulnerabilities Intelligence Created Successfully");
        navigate("/vulnerabilities-intelligences");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Fetch all Vulnerabilities Intelligences
  async function fetchAllVulnerabilitiesIntelligences() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/vulnerabilities-intelligences`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setVulnerabilitiesIntelligences(response.data.data);
      setIsLoading(false);
      return vulnerabilitiesIntelligences;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Fetch one Vulnerabilities Intelligence
  async function fetchOneVulnerabilitiesIntelligence(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/vulnerabilities-intelligences/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneVulnerabilitiesIntelligence(response.data.data);
      setIsLoading(false);
      return oneVulnerabilitiesIntelligence;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Update Vulnerabilities Intelligence
  async function updateVulnerabilitiesIntelligence(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/vulnerabilities-intelligences/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      console.log(response);
      response.status === 200
        ? toast.success("Vulnerabilities Intelligence updated successfully")
        : toast.error("Vulnerabilities Intelligence not found");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  // Delete Vulnerabilities Intelligence
  async function deleteVulnerabilitiesIntelligence(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/vulnerabilities-intelligences/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Vulnerabilities Intelligence Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Vulnerabilities Intelligence Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  {
    /************************ExeCutive Dashboard********************************* */
  }

  // Fetch all Non-Compliance Gaps Overview
  async function fetchAllnoncompliancegapsoverview() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/non-compliance-gaps-overview`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setNonComplianceGapsOverview(response.data.data);
      setIsLoading(false);
      return noncompliancegapsoverview;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Add New Non-Compliance Gaps Overview
  async function addNewNoncompliancegapsoverview(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/non-compliance-gaps-overview`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("Non-Compliance Gaps Overview Created Successfully");
        refreshData();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // Get One Non-Compliance Gaps Overview
  async function fetchOneNoncompliancegapsoverview(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/non-compliance-gaps-overview/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneNoncompliancegapsoverview(response.data.data);
      setIsLoading(false);
      return oneNoncompliancegapsoverview;
    } catch (error) {
      setIsLoading(false);
    }
  }
  // Delete One Non-Compliance Gaps Overview
  async function deleteNoncompliancegapsoverview(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/non-compliance-gaps-overview/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Non-Compliance Gaps Overview Deleted successfully");
        refreshData();
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Non-Compliance Gaps");
      }
    }
  }
  // Update Non-Compliance Gaps Overview
  async function updateNoncompliancegapsoverview(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/non-compliance-gaps-overview/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      response.status === 200
        ? toast.success("Non-Compliance Gaps Overview updated successfully")
        : toast.error("Non-Compliance Gaps Overview not found");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  // Add New  Threat Composition Overview
  async function addNewThreatCompositionOverview(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/threat-composition-overview`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success(" Threat Composition Overview Created Successfully");
        refreshData();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  // fetch all ThreatCompositionOverview
  async function fetchAllThreatCompositionOverview() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/threat-composition-overview`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setThreatCompositionOverview(response.data.data);
      setIsLoading(false);
      return threatCompositionOverview;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Get One  Threat Composition Overview
  async function fetchOneThreatCompositionOverview(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/threat-composition-overview/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneThreatCompositionOverview(response.data.data);
      setIsLoading(false);
      return oneThreatCompositionOverview;
    } catch (error) {
      setIsLoading(false);
    }
  }
  // Delete One  Threat Composition Overview
  async function deleteThreatCompositionOverview(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/threat-composition-overview/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success(" Threat Composition Overview Deleted successfully");
        refreshData();
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Non-Compliance Gaps");
      }
    }
  }
  // Update  Threat Composition Overview
  async function updateThreatCompositionOverview(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/threat-composition-overview/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      response.status === 200
        ? toast.success(" Threat Composition Overview updated successfully")
        : toast.error(" Threat Composition Overview not found");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  // Security Posture Score

  // Add New Security Posture Score
  async function addNewSecurityPostureScore(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/security-posture-score`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("Security Posture Score Created Successfully");
        refreshData();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }
  // fetch all Security Posture Score
  async function fetchAllSecurityPostureScore() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/security-posture-score`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setSecurityPostureScore(response.data.data);
      setIsLoading(false);
      return securityPostureScore;
    } catch (error) {
      setIsLoading(false);
    }
  }
  // Get One Security Posture Score
  async function fetchOneSecurityPostureScore(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/security-posture-score/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneSecurityPostureScore(response.data.data);
      setIsLoading(false);
      return oneSecurityPostureScore;
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Delete One Security Posture Score
  async function deleteSecurityPostureScore(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/security-posture-score/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Security Posture Score Deleted successfully");
        refreshData();
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Security Posture Score");
      }
    }
  }
  // Update Security Posture Score
  async function updateSecurityPostureScore(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/security-posture-score/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      response.status === 200
        ? toast.success("Security Posture Score updated successfully")
        : toast.error("Security Posture Score not found");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  // Delete Security Posture Score
  async function deleteSecurityPostureScore(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/security-posture-score/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Security Posture Score Deleted successfully");
        refreshData();
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Security Posture Score");
      }
    }
  }

  // Security Breach Indicators

  // Add New Security Breach Indicators
  async function addNewSecurityBreachIndicators(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/security-breach-indicators`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("Security Breach Indicators Created Successfully");
        refreshData();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }
  // fetch all Security Breach Indicators
  async function fetchAllSecurityBreachIndicators() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/security-breach-indicators`,
        {
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      setSecurityBreachIndicators(response.data.data);
      setIsLoading(false);
      return securityBreachIndicators;
    } catch (error) {
      setIsLoading(false);
    }
  }
  // Get One Security Breach Indicators
  async function fetchOneSecurityBreachIndicators(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/security-breach-indicators/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneSecurityBreachIndicators(response.data.data);
      setIsLoading(false);
      return oneSecurityBreachIndicators;
    } catch (error) {
      setIsLoading(false);
    }
  }
  // Delete One Security Breach Indicators
  async function deleteSecurityBreachIndicators(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/security-breach-indicators/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Security Breach Indicators Deleted successfully");
        refreshData();
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Security Breach Indicators");
      }
    }

    // Update Security Breach Indicators
    async function updateSecurityBreachIndicators(id, values) {
      try {
        setIsLoading(true);
        const response = await axios.patch(
          `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/security-breach-indicators/${id}`,
          values,
          { headers: { ...getAuthAdminHeaders() } }
        );
        response.status === 200
          ? toast.success("Security Breach Indicators updated successfully")
          : toast.error("Security Breach Indicators not found");
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  }
  // Update One Security Breach Indicators
  async function updateSecurityBreachIndicators(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/security-breach-indicators/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      response.status === 200
        ? toast.success("Security Breach Indicators updated successfully")
        : toast.error("Security Breach Indicators not found");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  // Quarterly Incident
  // Add New Quarterly Incident
  async function addNewQuarterlyIncident(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/quarterly-incident`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("Quarterly Incident Created Successfully");
        refreshData();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }
  // fetch all Quarterly Incident
  async function fetchAllQuarterlyIncident() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/quarterly-incident`,
        { headers: { ...getAuthHeaders() } }
      );
      console.log(response, "quarterlyIncident");
      setQuarterlyIncident(response.data.data);
      setIsLoading(false);
      return quarterlyIncident;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  // Get One Quarterly Incident
  async function fetchOneQuarterlyIncident(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/quarterly-incident/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneQuarterlyIncident(response.data.data);
      setIsLoading(false);
      return oneQuarterlyIncident;
    } catch (error) {
      setIsLoading(false);
    }
  }
  // Delete One Quarterly Incident
  async function deleteQuarterlyIncident(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/quarterly-incident/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Quarterly Incident Deleted successfully");
        refreshData();
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLoading(false);
        toast.error("Quarterly Incident Error");
      }
    }
  }
  // Update One Quarterly Incident
  async function updateQuarterlyIncident(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/quarterly-incident/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      response.status === 200
        ? toast.success("Quarterly Incident updated successfully")
        : toast.error("Quarterly Incident not found");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  // ttd ttr
  // Add New ttd ttr
  async function addNewTtdTtr(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/ttd-ttr`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("ttd ttr Created Successfully");
        refreshData();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }
  // fetch all ttd ttr
  async function fetchAllTtdTtr() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/ttd-ttr`,
        { headers: { ...getAuthHeaders() } }
      );
      setTtdTtrs(response.data.data);
      setIsLoading(false);
      return TtdTtrs;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  // Get One ttd ttr
  async function fetchOneTtdTtr(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/ttd-ttr/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneTtdTtr(response.data.data);
      setIsLoading(false);
      return oneTtdTtr;
    } catch (error) {
      setIsLoading(false);
    }
  }
  // Delete One ttd ttr
  async function deleteTtdTtr(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/ttd-ttr/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("ttd ttr Deleted successfully");
        refreshData();
      } else {
        toast.error("ttd ttr Delettion Faild");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  // Update One ttd ttr
  async function updateTtdTtr(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/ttd-ttr/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      response.status === 200
        ? toast.success("ttd ttr updated successfully")
        : toast.error("ttd ttr not found");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  // Digital Risk Intelligence
  // Add New Digital Risk Intelligence
  async function addNewDigitalRiskIntelligence(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/digital-risk-intelligence`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("Digital Risk Intelligence Created Successfully");
        refreshData();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }
  // fetch all Digital Risk Intelligence
  async function fetchAllDigitalRiskIntelligence() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/digital-risk-intelligence`,
        { headers: { ...getAuthHeaders() } }
      );
      setDigitalRiskIntelligences(response.data.data);
      setIsLoading(false);
      return digitalRiskIntelligences;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  // Get One Digital Risk Intelligence

  async function fetchOneDigitalRiskIntelligence(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/digital-risk-intelligence/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneDigitalRiskIntelligence(response.data.data);
      setIsLoading(false);
      return oneDigitalRiskIntelligence;
    } catch (error) {
      setIsLoading(false);
    }
  }
  // Delete One Digital Risk Intelligence
  async function deleteDigitalRiskIntelligence(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/digital-risk-intelligence/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Digital Risk Intelligence Deleted successfully");
        refreshData();
      } else {
        toast.error("Digital Risk Intelligence Delettion Faild");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  // Update One Digital Risk Intelligence
  async function updateDigitalRiskIntelligence(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/executive-dashboard/digital-risk-intelligence/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      response.status === 200
        ? toast.success("digital risk intelligence updated successfully")
        : toast.error("digital risk intelligence not found");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  /******************************** Attack Scenarios **********************************/
  // miter attacks
  // Add New Miter Attack
  async function addNewMiterAttack(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/attack-scenarios/miter-attacks`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("Miter Attack Created Successfully");
        refreshData();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }
  // fetch all miter attacks
  async function fetchAllMiterAttacks() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/attack-scenarios/miter-attacks`,
        { headers: { ...getAuthHeaders() } }
      );
      setMitreAttacks(response.data.data);
      setIsLoading(false);
      return mitreAttacks;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  // Get One Miter Attack
  async function fetchOneMiterAttack(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/attack-scenarios/miter-attacks/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneMitreAttack(response.data.data);
      setIsLoading(false);
      return oneMitreAttack;
    } catch (error) {
      setIsLoading(false);
    }
  }
  // Delete One Miter Attack
  async function deleteMiterAttack(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/attack-scenarios/miter-attacks/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Miter Attack Deleted successfully");
        refreshData();
      } else {
        toast.error("Miter Attack Delettion Faild");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  // Update One Miter Attack
  async function updateMiterAttack(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/attack-scenarios/miter-attacks/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      response.status === 200
        ? toast.success("Miter Attack updated successfully")
        : toast.error("Miter Attack not found");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  // cyber kill chain
  // Add New Cyber Kill Chain
  async function addNewCyberKillChain(values) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/attack-scenarios/cyber-kill-chain`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      if (response.status === 201) {
        toast.success("Cyber Kill Chain Created Successfully");
        refreshData();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }
  // fetch all cyber kill chains
  async function fetchAllCyberKillChains() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/attack-scenarios/cyber-kill-chain`,
        { headers: { ...getAuthHeaders() } }
      );
      setCyberKillChains(response.data.data);
      setIsLoading(false);
      return cyberKillChains;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  // Get One Cyber Kill Chain
  async function fetchOneCyberKillChain(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/attack-scenarios/cyber-kill-chain/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setOneCyberKillChain(response.data.data);
      setIsLoading(false);
      return oneCyberKillChain;
    } catch (error) {
      setIsLoading(false);
    }
  }
  // Delete One Cyber Kill Chain
  async function deleteCyberKillChain(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/attack-scenarios/cyber-kill-chain/${id}`,
        { headers: { ...getAuthAdminHeaders() } }
      );
      setIsLoading(false);
      if (response.status === 204) {
        toast.success("Cyber Kill Chain Deleted successfully");
        refreshData();
      } else {
        toast.error("Cyber Kill Chain Delettion Faild");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  // Update One Cyber Kill Chain
  async function updateCyberKillChain(id, values) {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/attack-scenarios/cyber-kill-chain/${id}`,
        values,
        { headers: { ...getAuthAdminHeaders() } }
      );
      response.status === 200
        ? toast.success("Cyber Kill Chain updated successfully")
        : toast.error("Cyber Kill Chain not found");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const refreshData = () => {
    fetchAllDomains();
    fetchAllIps();
    fetchAllPortals();
    fetchAllIocs();
    fetchAllSuspiciousIps();
    fetchAllAptFeeds();
    fetchAllthreatintelligenceFeeds();
    fetchAllDarkWebMentions();
    fetchAllLeakedCredentials();
    fetchAllEdrXdr();
    fetchAllNdr();
    fetchAllATOs();
    fetchAllAttckSurfaces();
    fetchAllBrandReputations();
    fetchAllVulnerabilitiesIntelligences();
    fetchAllnoncompliancegapsoverview();
    fetchAllThreatCompositionOverview();
    fetchAllSecurityPostureScore();
    fetchAllSecurityBreachIndicators();
    getAuthUserHeaders();
    getAuthAdminHeaders();
    fetchAllQuarterlyIncident();
    fetchAllTtdTtr();
    fetchAllDigitalRiskIntelligence();
    fetchAllMiterAttacks();
    fetchAllCyberKillChains();
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <Context.Provider
      value={{
        refreshData,
        handleLogingIn,
        addNewIp,
        fetchAllIps,
        fetchOneIp,
        deleteIp,
        updateIp,
        addNewDomain,
        fetchAllDomains,
        fetchOneDomain,
        deleteDomain,
        updateDomain,
        addNewPortal,
        fetchAllPortals,
        fetchOnePortal,
        updatePortal,
        deletePortal,
        addNewIoc,
        fetchAllIocs,
        fetchOneIoc,
        updateIoc,
        deleteIoc,
        addNewSuspiciousIps,
        fetchAllSuspiciousIps,
        fetchOneSuspiciousIp,
        updateSuspiciousIp,
        deleteSuspiciousIp,
        addNewAptFeeds,
        fetchAllAptFeeds,
        fetchOneAptFeed,
        updateAptFeed,
        deleteAptFeed,
        addNewThreatIntelligenceFeeds,
        fetchAllthreatintelligenceFeeds,
        fetchOnethreatintelligenceFeed,
        updatethreatintelligenceFeed,
        deletethreatintelligenceFeed,
        addNewDarkWebMentions,
        fetchAllDarkWebMentions,
        fetchOneDarkWebMention,
        updateDarkWebMention,
        deleteDarkWebMention,
        addNewLeakedCredentials,
        fetchAllLeakedCredentials,
        fetchOneLeakedCredentials,
        updateLeakedCredentials,
        deleteLeakedCredentials,
        addNewEdrXdr,
        fetchAllEdrXdr,
        fetchOneEdrXdr,
        updateEdrXdr,
        deleteEdrXdr,
        addNewNdr,
        fetchAllNdr,
        fetchOneNdr,
        updateNdr,
        deleteNdr,
        addNewATO,
        fetchAllATOs,
        fetchOneATO,
        updateATO,
        deleteATO,
        addNewAttckSurface,
        fetchAllAttckSurfaces,
        fetchOneAttckSurface,
        updateAttckSurface,
        deleteAttckSurface,
        addNewBrandReputation,
        fetchAllBrandReputations,
        fetchOneBrandReputation,
        updateBrandReputation,
        deleteBrandReputation,
        addNewVulnerabilitiesIntelligence,
        fetchAllVulnerabilitiesIntelligences,
        fetchOneVulnerabilitiesIntelligence,
        updateVulnerabilitiesIntelligence,
        deleteVulnerabilitiesIntelligence,
        fetchAllnoncompliancegapsoverview,
        addNewNoncompliancegapsoverview,
        fetchOneNoncompliancegapsoverview,
        deleteNoncompliancegapsoverview,
        updateNoncompliancegapsoverview,
        addNewThreatCompositionOverview,
        fetchAllThreatCompositionOverview,
        fetchOneThreatCompositionOverview,
        deleteThreatCompositionOverview,
        updateThreatCompositionOverview,
        addNewSecurityPostureScore,
        fetchAllSecurityPostureScore,
        fetchOneSecurityPostureScore,
        updateSecurityPostureScore,
        deleteSecurityPostureScore,
        addNewSecurityBreachIndicators,
        fetchAllSecurityBreachIndicators,
        fetchOneSecurityBreachIndicators,
        deleteSecurityBreachIndicators,
        updateSecurityBreachIndicators,
        addNewQuarterlyIncident,
        fetchAllQuarterlyIncident,
        fetchOneQuarterlyIncident,
        deleteQuarterlyIncident,
        updateQuarterlyIncident,
        addNewDigitalRiskIntelligence,
        fetchAllDigitalRiskIntelligence,
        fetchOneDigitalRiskIntelligence,
        deleteDigitalRiskIntelligence,
        updateDigitalRiskIntelligence,
        addNewMiterAttack,
        fetchAllMiterAttacks,
        fetchOneMiterAttack,
        deleteMiterAttack,
        updateMiterAttack,
        addNewCyberKillChain,
        fetchAllCyberKillChains,
        fetchOneCyberKillChain,
        deleteCyberKillChain,
        updateCyberKillChain,
        addNewTtdTtr,
        fetchAllTtdTtr,
        fetchOneTtdTtr,
        deleteTtdTtr,
        updateTtdTtr,
        saveAdminToken,
        saveUserToken,
        ips,
        oneIp,
        domains,
        oneDomain,
        portals,
        onePortal,
        iocs,
        oneIoc,
        suspiciousIps,
        oneSuspiciousIp,
        aptFeeds,
        oneAptFeed,
        threatIntelligenceFeeds,
        oneThreatIntelligenceFeed,
        darkWebMentions,
        oneDarkWebMention,
        leakedCredentials,
        oneLeakedCredential,
        edrXdrs,
        oneEdrXDR,
        ndrs,
        oneNdr,
        atos,
        oneATO,
        attackSurfaces,
        oneAttackSurface,
        brandReputations,
        oneBrandReputation,
        vulnerabilitiesIntelligences,
        oneVulnerabilitiesIntelligence,
        noncompliancegapsoverview,
        noncompliancegapsoverview,
        oneNoncompliancegapsoverview,
        threatCompositionOverview,
        oneThreatCompositionOverview,
        securityPostureScore,
        oneSecurityPostureScore,
        securityBreachIndicators,
        oneSecurityBreachIndicators,
        quarterlyIncident,
        oneQuarterlyIncident,
        TtdTtrs,
        oneTtdTtr,
        digitalRiskIntelligences,
        oneDigitalRiskIntelligence,
        mitreAttacks,
        oneMitreAttack,
        cyberKillChains,
        oneCyberKillChain,
        isLoading,
        adminToken,
        userToken,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
