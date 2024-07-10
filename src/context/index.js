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
  let adminheaders = {
    Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
  };

  /** ************************** Assets States *******************/
  // Ips
  const [ips, setIps] = useState([]);
  const [oneIp, setOneIp] = useState({});

  // Domains
  const [domains, setDomains] = useState([]);
  const [oneDomain, setOneDomain] = useState({});

  // poerals
  const [portals, setPortals] = useState([]);
  const [onePortal, setOnePortal] = useState({});

  function saveAdminToken() {
    setAdminToken(localStorage.getItem("AdminToken"));
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
      if (response.data.data.role === "admin") {
        localStorage.setItem("AdminToken", response.data.token);
      } else {
        localStorage.setItem("UserToken", response.data.token);
      }
      if (response.status === 200) {
        toast.success("Logged in successfully", {
          position: "top-center",
        });
        if (response.data.data.role === "admin") {
          navigate("/admin/actions/assets/ips");
        } else navigate("/dashboard");
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

  // IPs

  // add  new Ips
  async function addNewIp(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/assets/ips`,
        values,
        { headers: { ...adminheaders } }
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
        `${process.env.REACT_APP_BASE_URL}/api/assets/ips`
      );

      setIps(response.data.data);
      console.log(ips)
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
        { headers: { ...adminheaders } }
      );
      setOneIp(response.data.data);

      setIsLsLoading(false);
    } catch (error) {
      setIsLsLoading(false);
    }
  }
  // // update  Customer
  // async function updateIp(id, verified, active) {
  //   try {
  //     setIsLsLoading(true);
  //     const response = await axios.patch(
  //       `${process.env.REACT_APP_BASE_URL}/api/assets/ips/${id}`,
  //       { id, verified, active },
  //       { headers: {  ...adminheaders } }
  //     );

  //     if (response.status === 200) {
  //       toast.success(response.data.message);
  //     } else {
  //       toast.error("Failed to update IP");
  //     }

  //     setIsLsLoading(false);
  //   } catch (error) {
  //     console.error("Error:", error);

  //     if (error.response && error.response.status === 404) {
  //       toast.error("Customer Not Found");
  //     } else {
  //       toast.error("Server Error");
  //     }

  //     setIsLsLoading(false);
  //   }
  // }

  // delete IP
  async function deleteIp(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/assets/ips/${id}`,
        {
          headers: { ...adminheaders },
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
        { headers: { ...adminheaders } }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
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
        { headers: { ...adminheaders } }
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
        { headers: { ...adminheaders } }
      );
      setOneDomain(response.data.data);
      setIsLsLoading(false);
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  // // update  One Domain
  // async function updateDomain(id, verified, active) {
  //   try {
  //     setIsLsLoading(true);
  //     const response = await axios.patch(
  //       `${process.env.REACT_APP_BASE_URL}/api/assets/domains/${id}`,
  //       { id, verified, active },
  //       { headers: {  ...adminheaders } }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // delete One Domain
  async function deleteDomain(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/assets/domains/${id}`,
        { headers: { ...adminheaders } }
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

  // Portsals

  // add  new Portals
  async function addNewPortal(values) {
    try {
      setIsLsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/assets/portals`,
        values,
        { headers: { ...adminheaders } }
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
        { headers: { ...adminheaders } }
      );
      setPortals(response.data.data);
      setIsLsLoading(false);
    } catch (error) {
      setIsLsLoading(false);
    }
  }

  //  Fetch One portal
  async function fetchOnePortal(id) {
    try {
      isLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/assets/portals/${id}`,
        { headers: { ...adminheaders } }
      );
      setOnePortal(response.data.data);
      isLoading(false);
    } catch (error) {
      isLoading(false);
    }
  }

  // // update  One Domain

  // async function updateDomain(id, verified, active) {
  //   try {
  //     setIsLsLoading(true);
  //     const response = await axios.patch(
  //       `${process.env.REACT_APP_BASE_URL}/api/assets/domains/${id}`,
  //       { id, verified, active },
  //       { headers: {  ...adminheaders } }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // Delete One Portal
  async function deletePortal(id) {
    try {
      setIsLsLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/assets/portals/${id}`,
        { headers: { ...adminheaders } }
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
    saveAdminToken();
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
        addNewDomain,
        fetchAllDomains,
        fetchOneDomain,
        deleteDomain,
        addNewPortal,
        fetchAllPortals,
        fetchOnePortal,
        deletePortal,
        ips,
        oneIp,
        domains,
        oneDomain,
        portals,
        onePortal,
        isLoading,
        adminToken,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
