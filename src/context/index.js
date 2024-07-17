import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Context = createContext();

export function ContextProvider(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLsLoading] = useState(false);
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("AdminToken")
  );
  const [userToken, setUserToken] = useState(localStorage.getItem("UserToken"));

  /** ************************** Assets States *******************/
  // Ips
  const [ips, setIps] = useState([]);
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

  /********************************** Dark Web Monitring ******************** */

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

  function saveAdminToken(token) {
    localStorage.setItem("AdminToken", token);
    setAdminToken(token);
  }

  function saveUserToken(token) {
    localStorage.setItem("UserToken", token);
    setUserToken(token);
  }

  //   login
  async function handleLogingIn(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        values
      );

      setIsLsLoading(false);

      if (response.status === 200) {
        const token = response.data.token;
        const role = response.data.data.role;

        if (role === "admin") {
          saveAdminToken(token);
        } else {
          saveUserToken(token);
        }

        toast.success("Logged in successfully", {
          position: "top-center",
        });
        navigate("/dashboard");
      } else {
        toast.error("Invalid Email Or Password", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // Helper function to get the appropriate headers
  const getAuthHeaders = () => {
    const token = adminToken || userToken;
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  /*********************** Assets ******************************/

  // add  new Ips
  async function addNewIp(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/assets/ips`,
        values,
        { headers: getAuthHeaders() }
      );

      if (response.status === 201) {
        toast.success("Ip Added Successfully");
        navigate("/assets/ips");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // fetch All IPs
  async function fetchAllIps() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/assets/ips`,
        { headers: getAuthHeaders() }
      );
      setIps(response.data.data);
      setIsLsLoading(false);
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // fetch One IP
  async function fetchOneIp(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/assets/ips/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
      setOneIp(response.data.data);
      return oneIp;
    } catch (error) {
      setIsLsLoading(false);
      throw error;
    }
  }

  // update IP
  async function updateIp(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/assets/ips/${id}`,
        values,
        { headers: getAuthHeaders() }
      );

      response.status === 200
        ? toast.success("Ip updated successfully")
        : toast.error("Ip not found");

      setIsLsLoading(false);
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 404) {
        toast.error("Ip Not Found");
      } else {
        toast.error("Server Error");
      }

      setIsLsLoading(false);
    }
  }

  // delete IP
  async function deleteIp(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/assets/ips/${id}`,
        {
          headers: getAuthHeaders(),
        }
      );
      setIsLsLoading(false);
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
        setIsLsLoading(false);
        toast.error("Ip Not Found");
      } else {
        toast.error("Server Error");
        setIsLsLoading(false);
      }
    }
  }

  // Domains

  // add  new Domains
  async function addNewDomain(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/assets/domains`,
        values,
        { headers: getAuthHeaders() }
      );

      if (response.status === 201) {
        toast.success("Domain Added successfully");
        navigate("/assets/domains");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }
  // fetch All Domains
  async function fetchAllDomains() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/assets/domains`,
        { headers: getAuthHeaders() }
      );
      setDomains(response.data.data);
      setIsLsLoading(false);
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  //  Fetch One Domain
  async function fetchOneDomain(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/assets/domains/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
      setOneDomain(response.data.data);
      return oneDomain;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // update  One Domain
  async function updateDomain(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/assets/domains/${id}`,
        values,
        { headers: getAuthHeaders() }
      );
      response.status === 200
        ? toast.success("Domain updated successfully")
        : toast.error("Domain not found");
    } catch (error) {
      console.log(error);
    }
  }

  // delete One Domain
  async function deleteDomain(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/assets/domains/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
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
        setIsLsLoading(false);
        toast.error("Domain Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  // Portals

  // add new Portals
  async function addNewPortal(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/assets/portals`,
        values,
        { headers: getAuthHeaders() }
      );
      if (response.status === 201) {
        toast.success("Portal Created Successfully");
        navigate("/assets/portals");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // fetch All Portals
  async function fetchAllPortals() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/assets/portals`,
        { headers: getAuthHeaders() }
      );
      setPortals(response.data.data);
      setIsLsLoading(false);
      return portals;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // Fetch One portal
  async function fetchOnePortal(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/assets/portals/${id}`,
        { headers: getAuthHeaders() }
      );
      setOnePortal(response.data.data);
      setIsLsLoading(false);
      return onePortal;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // update One Portal
  async function updatePortal(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/assets/portals/${id}`,
        values,
        { headers: getAuthHeaders() }
      );
      response.status === 200
        ? toast.success("Portal updated successfully")
        : toast.error("Portal not found");
    } catch (error) {
      console.log(error);
    }
  }

  // Delete One Portal
  async function deletePortal(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/assets/portals/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
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
        setIsLsLoading(false);
        toast.error("Portal Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  /*********************** threat intelligence ******************************/

  /***************** IOCS *******************/
  // add  new Iocs
  async function addNewIoc(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs`,
        values,
        { headers: getAuthHeaders() }
      );

      if (response.status === 201) {
        toast.success("Ioc Added Successfully");
        navigate("/threat-intelligence/iocs");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // fetch All IOCs
  async function fetchAllIocs() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs`,
        { headers: getAuthHeaders() }
      );

      setIocs(response.data.data);
      setIsLsLoading(false);
      return iocs;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // fetch One IOC
  async function fetchOneIoc(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
      setOneIoc(response.data.data);
      return oneIoc;
    } catch (error) {
      setIsLsLoading(false);
      throw error;
    }
  }

  // update IOC
  async function updateIoc(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs/${id}`,
        values,
        { headers: getAuthHeaders() }
      );

      response.status === 200
        ? toast.success("IOC updated successfully")
        : toast.error("IOC not found");

      setIsLsLoading(false);
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 404) {
        toast.error("IOC Not Found");
      } else {
        toast.error("Server Error");
      }

      setIsLsLoading(false);
    }
  }

  // delete IOCS
  async function deleteIoc(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/iocs/${id}`,
        {
          headers: getAuthHeaders(),
        }
      );
      setIsLsLoading(false);
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
        setIsLsLoading(false);
        toast.error("IOC Not Found");
      } else {
        toast.error("Server Error");
        setIsLsLoading(false);
      }
    }
  }

  /************* Suspicious IPs ************* */

  // add  new Suspicious IPs
  async function addNewSuspiciousIps(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips`,
        values,
        { headers: getAuthHeaders() }
      );

      if (response.status === 201) {
        toast.success("Suspicious ip Added Successfully");
        navigate("/threat-intelligence/suspicious-ips");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // fetch All suspicious-ips
  async function fetchAllSuspiciousIps() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips`,
        { headers: getAuthHeaders() }
      );
      setSuspiciousIps(response.data.data);
      setIsLsLoading(false);
      return suspiciousIps;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // fetch One IOC
  async function fetchOneSuspiciousIp(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
      setOneSuspiciousIp(response.data.data);
      return oneSuspiciousIp;
    } catch (error) {
      setIsLsLoading(false);
      throw error;
    }
  }

  // update IOC
  async function updateSuspiciousIp(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips/${id}`,
        values,
        { headers: getAuthHeaders() }
      );

      response.status === 200
        ? toast.success("suspicious Ip updated successfully")
        : toast.error("suspicious Ip not found");

      setIsLsLoading(false);
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 404) {
        toast.error("suspicious Ip Not Found");
      } else {
        toast.error("Server Error");
      }

      setIsLsLoading(false);
    }
  }

  // delete suspicious-ips
  async function deleteSuspiciousIp(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/suspicious-ips/${id}`,
        {
          headers: getAuthHeaders(),
        }
      );
      setIsLsLoading(false);
      if (response.status === 204) {
        toast.success("suspicious Ip Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLsLoading(false);
        toast.error("suspicious Ip Not Found");
      } else {
        toast.error("Server Error");
        setIsLsLoading(false);
      }
    }
  }
  /************* APTs Feeds ************* */

  // add  new APTs Feeds
  async function addNewAptFeeds(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/apt-feeds`,
        values,
        { headers: getAuthHeaders() }
      );

      if (response.status === 201) {
        toast.success("Apt Feed Added Successfully");
        navigate("/threat-intelligence/apt-feeds");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // fetch All APTs Feeds
  async function fetchAllAptFeeds() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/apt-feeds`,
        { headers: getAuthHeaders() }
      );
      setAptFeeds(response.data.data);
      setIsLsLoading(false);
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // fetch One APT Feed
  async function fetchOneAptFeed(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/apt-feeds/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
      setOneAptFeed(response.data.data);
      return oneAptFeed;
    } catch (error) {
      setIsLsLoading(false);
      throw error;
    }
  }

  // update IOC
  async function updateAptFeed(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/apt-feeds/${id}`,
        values,
        { headers: getAuthHeaders() }
      );

      response.status === 200
        ? toast.success("APT Feed updated successfully")
        : toast.error("APT Feed not found");

      setIsLsLoading(false);
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 404) {
        toast.error("APT Feed Not Found");
      } else {
        toast.error("Server Error");
      }

      setIsLsLoading(false);
    }
  }

  // delete apt-feeds
  async function deleteAptFeed(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/apt-feeds/${id}`,
        {
          headers: getAuthHeaders(),
        }
      );
      setIsLsLoading(false);
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
        setIsLsLoading(false);
        toast.error("Apt Feed Not Found");
      } else {
        toast.error("Server Error");
        setIsLsLoading(false);
      }
    }
  }

  /************* Threat Intelligence Feeds ************* */

  // add  new Threat Intelligence Feeds
  async function addNewThreatIntelligenceFeeds(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/threat-intelligence-feeds`,
        values,
        { headers: getAuthHeaders() }
      );

      if (response.status === 201) {
        toast.success("Threat intelligence Feed Added Successfully");
        navigate("/threat-intelligence/threat-intelligence-feeds");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // fetch All threatintelligences Feeds
  async function fetchAllthreatintelligenceFeeds() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/threat-intelligence-feeds`,
        { headers: getAuthHeaders() }
      );
      setThreatIntelligenceFeeds(response.data.data);
      setIsLsLoading(false);
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // fetch One threat intelligences Feed
  async function fetchOnethreatintelligenceFeed(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/threat-intelligence-feeds/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
      setOneThreatIntelligenceFeed(response.data.data);
      return oneThreatIntelligenceFeed;
    } catch (error) {
      setIsLsLoading(false);
      throw error;
    }
  }

  // update threat intelligences Feed
  async function updatethreatintelligenceFeed(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/threat-intelligence-feeds/${id}`,
        values,
        { headers: getAuthHeaders() }
      );

      response.status === 200
        ? toast.success("threatintelligence Feed updated successfully")
        : toast.error("threatintelligence Feed not found");

      setIsLsLoading(false);
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 404) {
        toast.error("threatintelligence Feed Not Found");
      } else {
        toast.error("Server Error");
      }

      setIsLsLoading(false);
    }
  }

  // delete threat intelligence feed
  async function deletethreatintelligenceFeed(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/threat-intelligence/threat-intelligence-feeds/${id}`,
        {
          headers: getAuthHeaders(),
        }
      );
      setIsLsLoading(false);
      if (response.status === 204) {
        toast.success("threatintelligence Feed Deleted successfully");
      } else if (response.status === "fail") {
        toast.error(response.message);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        setIsLsLoading(false);
        toast.error("threatintelligence Feed Not Found");
      } else {
        toast.error("Server Error");
        setIsLsLoading(false);
      }
    }
  }

  /**************************************** Dark Web Monitoring ***************************************** */

  //  Dark Web Mentions

  // add new Dark Web Mentions
  async function addNewDarkWebMentions(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/dark-web-mentions`,
        values,
        { headers: getAuthHeaders() }
      );
      if (response.status === 201) {
        toast.success("Dark Web Mention Created Successfully");
        navigate("/dark-web-monitoring/dark-web-mentions");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // fetch All DarkWebMentions
  async function fetchAllDarkWebMentions() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/dark-web-mentions`,
        { headers: getAuthHeaders() }
      );
      setDarkWebMentions(response.data.data);
      setIsLsLoading(false);
      return darkWebMentions;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // Fetch One DarkWebMention
  async function fetchOneDarkWebMention(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/dark-web-mentions/${id}`,
        { headers: getAuthHeaders() }
      );
      setOneDarkWebMention(response.data.data);
      setIsLsLoading(false);
      return oneDarkWebMention;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // update One DarkWebMention
  async function updateDarkWebMention(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/dark-web-mentions/${id}`,
        values,
        { headers: getAuthHeaders() }
      );
      response.status === 200
        ? toast.success("Dark Web Mention updated successfully")
        : toast.error("Dark Web Mention not found");
    } catch (error) {
      console.log(error);
    }
  }

  // Delete One DarkWebMention
  async function deleteDarkWebMention(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/dark-web-mentions/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
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
        setIsLsLoading(false);
        toast.error("Dark Web Mention Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  //  Leaked Credentials

  // add new Leaked Credentials
  async function addNewLeakedCredentials(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/leaked-credentials`,
        values,
        { headers: getAuthHeaders() }
      );
      if (response.status === 201) {
        toast.success("Leaked Credentials Created Successfully");
        navigate("/dark-web-monitoring/leaked-credentials");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // fetch All LeakedCredentials
  async function fetchAllLeakedCredentials() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/leaked-credentials`,
        { headers: getAuthHeaders() }
      );
      setLeakedCredentials(response.data.data);
      setIsLsLoading(false);
      return leakedCredentials;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // Fetch One LeakedCredentials
  async function fetchOneLeakedCredentials(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/leaked-credentials/${id}`,
        { headers: getAuthHeaders() }
      );
      setOneLeakedCredential(response.data.data);
      setIsLsLoading(false);
      return oneLeakedCredential;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // update One LeakedCredentials
  async function updateLeakedCredentials(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/leaked-credentials/${id}`,
        values,
        { headers: getAuthHeaders() }
      );
      response.status === 200
        ? toast.success("Leaked Credentials updated successfully")
        : toast.error("Leaked Credentials not found");
    } catch (error) {
      console.log(error);
    }
  }

  // Delete One LeakedCredentials
  async function deleteLeakedCredentials(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/dark-web-monitoring/leaked-credentials/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
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
        setIsLsLoading(false);
        toast.error("Leaked Credentials Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  //  EDR XDR

  // add new EDR XDR
  async function addNewEdrXdr(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/detections/drxdr-detections`,
        values,
        { headers: getAuthHeaders() }
      );
      if (response.status === 201) {
        toast.success("EDR XDR Created Successfully");
        navigate("/detections/drxdr-detections");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // fetch All EdrXdr
  async function fetchAllEdrXdr() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/detections/drxdr-detections`,
        { headers: getAuthHeaders() }
      );
      setEdrXdr(response.data.data);
      setIsLsLoading(false);
      return edrXdrs;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // Fetch One EdrXdr
  async function fetchOneEdrXdr(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/detections/drxdr-detections/${id}`,
        { headers: getAuthHeaders() }
      );
      setOneEdrXDR(response.data.data);
      setIsLsLoading(false);
      return oneEdrXDR;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // update One EdrXdr
  async function updateEdrXdr(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/detections/drxdr-detections/${id}`,
        values,
        { headers: getAuthHeaders() }
      );
      console.log(response);
      response.status === 200
        ? toast.success("EDR XDR updated successfully")
        : toast.error("EDR XDR not found");
    } catch (error) {
      console.log(error);
    }
  }

  // Delete One EdrXdr
  async function deleteEdrXdr(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/detections/drxdr-detections/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
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
        setIsLsLoading(false);
        toast.error("EDR XDR Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  //  NDR

  // add new NDR
  async function addNewNdr(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/detections/ndr-detections`,
        values,
        { headers: getAuthHeaders() }
      );
      if (response.status === 201) {
        toast.success("NDR Created Successfully");
        navigate("/detections/ndr-detections");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // fetch All Ndr
  async function fetchAllNdr() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/detections/ndr-detections`,
        { headers: getAuthHeaders() }
      );
      setNdr(response.data.data);
      setIsLsLoading(false);
      return ndrs;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // Fetch One Ndr
  async function fetchOneNdr(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/detections/ndr-detections/${id}`,
        { headers: getAuthHeaders() }
      );
      setOneNdr(response.data.data);
      setIsLsLoading(false);
      return oneNdr;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // update One Ndr
  async function updateNdr(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/detections/ndr-detections/${id}`,
        values,
        { headers: getAuthHeaders() }
      );
      console.log(response);
      response.status === 200
        ? toast.success("NDR updated successfully")
        : toast.error("NDR not found");
    } catch (error) {
      console.log(error);
    }
  }

  // Delete One Ndr
  async function deleteNdr(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/detections/ndr-detections/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
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
        setIsLsLoading(false);
        toast.error("NDR Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  //  ATO

  // add new ATO
  async function addNewATO(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/account-take-over`,
        values,
        { headers: getAuthHeaders() }
      );
      if (response.status === 201) {
        toast.success("ATO Created Successfully");
        navigate("/account-take-over");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // fetch All ATO
  async function fetchAllATOs() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/account-take-over`,
        { headers: getAuthHeaders() }
      );
      setATOs(response.data.data);
      setIsLsLoading(false);
      return atos;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // Fetch One ATO
  async function fetchOneATO(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/account-take-over/${id}`,
        { headers: getAuthHeaders() }
      );
      setOneATO(response.data.data);
      setIsLsLoading(false);
      return oneATO;
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // update One ATO
  async function updateATO(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/account-take-over/${id}`,
        values,
        { headers: getAuthHeaders() }
      );
      console.log(response);
      response.status === 200
        ? toast.success("ATO updated successfully")
        : toast.error("ATO not found");
    } catch (error) {
      console.log(error);
    }
  }

  // Delete One ATO
  async function deleteATO(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/account-take-over/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
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
        setIsLsLoading(false);
        toast.error("ATO Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  // Attck Surface
  // add new Attck Surface
  async function addNewAttckSurface(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/attack-surface`,
        values,
        { headers: getAuthHeaders() }
      );
      if (response.status === 201) {
        toast.success("Attack Surface Created Successfully");
        navigate("/attack-surface");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }
  // fetch All Attck Surfaces
  async function fetchAllAttckSurfaces() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/attack-surface`,
        { headers: getAuthHeaders() }
      );
      setAttackSurfaces(response.data.data);
      setIsLsLoading(false);
      return attackSurfaces;
    } catch (error) {
      setIsLsLoading(false);
    }
  }
  // Fetch One Attck Surface
  async function fetchOneAttckSurface(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/attack-surface/${id}`,
        { headers: getAuthHeaders() }
      );
      setOneAttackSurface(response.data.data);
      setIsLsLoading(false);
      return oneAttackSurface;
    } catch (error) {
      setIsLsLoading(false);
    }
  }
  // update One Attck Surface
  async function updateAttckSurface(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/attack-surface/${id}`,
        values,
        { headers: getAuthHeaders() }
      );
      console.log(response);
      response.status === 200
        ? toast.success("Attack Surface updated successfully")
        : toast.error("Attack Surface not found");
      setIsLsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLsLoading(false);
    }
  }
  // Delete One Attck Surface
  async function deleteAttckSurface(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/attack-surface/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
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
        setIsLsLoading(false);
        toast.error("Attack Surface Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  // Brand reputation
  // add new Brand reputation
  async function addNewBrandReputation(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/brand-reputation`,
        values,
        { headers: getAuthHeaders() }
      );
      if (response.status === 201) {
        toast.success("Brand Reputation Created Successfully");
        navigate("/brand-reputation");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // fetch All Brand Reputations
  async function fetchAllBrandReputations() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/brand-reputation`,
        { headers: getAuthHeaders() }
      );
      setBrandReputations(response.data.data);
      setIsLsLoading(false);
      return brandReputations;
    } catch (error) {
      setIsLsLoading(false);
    }
  }
  // Fetch One Brand Reputation
  async function fetchOneBrandReputation(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/brand-reputation/${id}`,
        { headers: getAuthHeaders() }
      );
      setOneBrandReputation(response.data.data);
      setIsLsLoading(false);
      return oneBrandReputation;
    } catch (error) {
      setIsLsLoading(false);
    }
  }
  // update One Brand Reputation
  async function updateBrandReputation(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/brand-reputation/${id}`,
        values,
        { headers: getAuthHeaders() }
      );
      console.log(response);
      response.status === 200
        ? toast.success("Brand Reputation updated successfully")
        : toast.error("Brand Reputation not found");
      setIsLsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLsLoading(false);
    }
  }

  // Delete One Brand Reputation
  async function deleteBrandReputation(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/brand-reputation/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
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
        setIsLsLoading(false);
        toast.error("Brand Reputation Not Found");
      } else {
        toast.error("Server Error");
      }
    }
  }

  // vulnerabilities intelligences
  // add new Vulnerabilities Intelligence
  async function addNewVulnerabilitiesIntelligence(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/vulnerabilities-intelligence`,
        values,
        { headers: getAuthHeaders() }
      );
      if (response.status === 201) {
        toast.success("Vulnerabilities Intelligence Created Successfully");
        navigate("/vulnerabilities-intelligence");
        setIsLsLoading(false);
      }
      setIsLsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLsLoading(false);
    }
  }

  // fetch All Vulnerabilities Intelligences
  async function fetchAllVulnerabilitiesIntelligences() {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/vulnerabilities-intelligence`,
        { headers: getAuthHeaders() }
      );
      setVulnerabilitiesIntelligences(response.data.data);
      setIsLsLoading(false);
      return vulnerabilitiesIntelligences;
    } catch (error) {
      setIsLsLoading(false);
    }
  }
  // Fetch One Vulnerabilities Intelligence
  async function fetchOneVulnerabilitiesIntelligence(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/vulnerabilities-intelligence/${id}`,
        { headers: getAuthHeaders() }
      );
      setOneVulnerabilitiesIntelligence(response.data.data);
      setIsLsLoading(false);
      return oneVulnerabilitiesIntelligence;
    } catch (error) {
      setIsLsLoading(false);
    }
  }
  // update One Vulnerabilities Intelligence
  async function updateVulnerabilitiesIntelligence(id, values) {
    try {
      setIsLsLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/vulnerabilities-intelligence/${id}`,
        values,
        { headers: getAuthHeaders() }
      );
      console.log(response);
      response.status === 200
        ? toast.success("Vulnerabilities Intelligence updated successfully")
        : toast.error("Vulnerabilities Intelligence not found");
      setIsLsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLsLoading(false);
    }
  }
  // Delete One Vulnerabilities Intelligence
  async function deleteVulnerabilitiesIntelligence(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/vulnerabilities-intelligence/${id}`,
        { headers: getAuthHeaders() }
      );
      setIsLsLoading(false);
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
        setIsLsLoading(false);
        toast.error("Vulnerabilities Intelligence Not Found");
      } else {
        toast.error("Server Error");
      }
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
  };

  useEffect(() => {
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
  }, [adminToken, userToken]);

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
        isLoading,
        adminToken,
        userToken,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
