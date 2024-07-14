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
      console.log(response);
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

  /*********************** Assets ******************************/

  // Helper function to get the appropriate headers
  const getAuthHeaders = () => {
    const token = adminToken || userToken;
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // add  new Ips
  async function addNewIp(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/assets/ips`,
        values,
        { headers: getAuthHeaders() }
      );
      console.log(response);
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
      console.log(response)
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
      if (response.status === 200) {
        toast.success(response.data.message);
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

  const refreshData = () => {
    fetchAllDomains();
    fetchAllIps();
    fetchAllPortals();
    // Add other data fetching functions as needed
  };

  useEffect(() => {
    fetchAllDomains();
    fetchAllIps();
    fetchAllPortals();
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
        saveAdminToken,
        saveUserToken,
        ips,
        oneIp,
        domains,
        oneDomain,
        portals,
        onePortal,
        isLoading,
        adminToken,
        userToken,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
