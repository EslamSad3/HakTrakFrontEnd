import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

import Login from "./components/Login";
import Layout from "./components/LayOut";
import { themeSettings } from "./theme";
import { ContextProvider } from "./context";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import CreateIps from "./Actions/assets/CreateIps";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import IPs from "./components/Assets/IPs";
import Domains from "./components/Assets/Domains";
import Portals from "./components/Assets/Portals";
import AuthRoute from "./components/ProtectedRoute/AuthRoute";
import PublicRoute from "./components/ProtectedRoute/PublicRoute";
import AdminAcions from "./Actions";
import CreateDomains from "./Actions/assets/CreateDomains";
import CreatePortals from "./Actions/assets/CreatePortals";
import Iocs from "./components/Threatintelligence/Iocs";
import CreateIocs from "./Actions/ThreatIntelligence/CreateIocs";
import CreateSuspiciousIps from "./Actions/ThreatIntelligence/CreateSuspiciousIps";
import SuspiciousIps from "./components/Threatintelligence/SuspiciousIps";
import CreateAptFeeds from "./Actions/ThreatIntelligence/CreateAptFeeds";
import AptFeeds from "./components/Threatintelligence/AptFeeds";
import ThreatIntelligenceFeeds from "./components/Threatintelligence/ThreatIntelligenceFeeds";
import CreateThreatIntelligenceFeeds from "./Actions/ThreatIntelligence/CreateThreatIntelligenceFeeds";
import CreateDarkWebMentions from "./Actions/Dark Web Monitoring/CreateDarkWebMentions";
import DarkWebMentions from "./components/Dark Web Monitoring/DarkWebMentions";
import LeakedCredentials from "./components/Dark Web Monitoring/LeakedCredentials";
import CreateLeakedCredentials from "./Actions/Dark Web Monitoring/CreateLeakedCredentials";
import EdrXdr from "./components/Detections/EdrXdr";
import CreateEdrXdrDetections from "./Actions/Detections/CreateEdrXdrDetections";
import CreateNdrDetections from "./Actions/Detections/CreateNdrDetections";
import Ndr from "./components/Detections/NDR";
import ATOs from "./components/Atos";
import CreateATO from "./Actions/CreateATO";
import BrandReputation from "./components/BrandReputation";
import CreateBrandReputation from "./Actions/CreateBrandReputation";
import VulnerabilitiesIntelligences from "./components/VulnerabilitiesIntelligences";
import CreateVulnerabilitiesIntelligences from "./Actions/CreateVulnerabilitiesIntelligences";
import AttackSurface from "./components/AttackSurface";
import CreateAttackSurface from "./Actions/CreateAttackSurface";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <AuthRoute>
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Home />} />

                {/* Assets Actions Routes */}
                <Route
                  path="/admin/actions/assets/ips"
                  forceRefresh={true}
                  element={
                    <ProtectedRoute>
                      <CreateIps />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/actions/assets/domains"
                  forceRefresh={true}
                  element={
                    <ProtectedRoute>
                      <CreateDomains />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/actions/assets/portals"
                  forceRefresh={true}
                  element={
                    <ProtectedRoute>
                      <CreatePortals />
                    </ProtectedRoute>
                  }
                />

                {/* Threat intelligence Actions Routes */}

                <Route
                  path="/admin/actions/threat-intelligence/iocs"
                  forceRefresh={true}
                  element={<ProtectedRoute>{<CreateIocs />}</ProtectedRoute>}
                />
                <Route
                  path="/admin/actions/threat-intelligence/suspicious-ips"
                  forceRefresh={true}
                  element={
                    <ProtectedRoute>{<CreateSuspiciousIps />}</ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/actions/threat-intelligence/apt-feeds"
                  forceRefresh={true}
                  element={
                    <ProtectedRoute>{<CreateAptFeeds />}</ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/actions/threat-intelligence/threat-intelligence-feeds"
                  forceRefresh={true}
                  element={
                    <ProtectedRoute>
                      {<CreateThreatIntelligenceFeeds />}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/actions/dark-web-monitoring/dark-web-mentions"
                  forceRefresh={true}
                  element={
                    <ProtectedRoute>{<CreateDarkWebMentions />}</ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/actions/dark-web-monitoring/leaked-credentials"
                  forceRefresh={true}
                  element={
                    <ProtectedRoute>
                      {<CreateLeakedCredentials />}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/actions/detections/edrxdr-detections"
                  forceRefresh={true}
                  element={
                    <ProtectedRoute>
                      {<CreateEdrXdrDetections />}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/actions/detections/ndr-detections"
                  forceRefresh={true}
                  element={
                    <ProtectedRoute>{<CreateNdrDetections />}</ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/actions/account-take-over"
                  forceRefresh={true}
                  element={<ProtectedRoute>{<CreateATO />}</ProtectedRoute>}
                />
                <Route
                  path="/admin/actions/brand-reputation"
                  forceRefresh={true}
                  element={
                    <ProtectedRoute>{<CreateBrandReputation />}</ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/actions/vulnerabilities-intelligences"
                  forceRefresh={true}
                  element={
                    <ProtectedRoute>
                      {<CreateVulnerabilitiesIntelligences />}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/actions/attack-surface"
                  forceRefresh={true}
                  element={
                    <ProtectedRoute>{<CreateAttackSurface />}</ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/actions"
                  forceRefresh={true}
                  element={
                    <ProtectedRoute>
                      <AdminAcions />
                    </ProtectedRoute>
                  }
                />

                {/* Assets Routes */}
                <Route path="/assets/ips" element={<IPs />} />
                <Route path="/assets/domains" element={<Domains />} />
                <Route path="/assets/portals" element={<Portals />} />

                {/* Threat intelligence Routes */}
                <Route path="/threat-intelligence/iocs" element={<Iocs />} />
                <Route
                  path="/threat-intelligence/suspicious-ips"
                  element={<SuspiciousIps />}
                />
                <Route
                  path="/threat-intelligence/apt-feeds"
                  element={<AptFeeds />}
                />
                <Route
                  path="/threat-intelligence/threat-intelligence-feeds"
                  element={<ThreatIntelligenceFeeds />}
                />

                {/* Dark Web Montring routes */}
                <Route
                  path="/dark-web-monitoring/dark-web-mentions"
                  element={<DarkWebMentions />}
                />
                <Route
                  path="/dark-web-monitoring/leaked-credentials"
                  element={<LeakedCredentials />}
                />
                {/* Detections */}
                <Route
                  path="/detections/edrxdr-detections"
                  element={<EdrXdr />}
                />
                <Route path="/detections/ndr-detections" element={<Ndr />} />
                <Route path="/account-take-over" element={<ATOs />} />
                <Route path="/brand-reputation" element={<BrandReputation />} />
                <Route
                  path="/vulnerabilities-intelligences"
                  element={<VulnerabilitiesIntelligences />}
                />
                <Route path="/attack-surface" element={<AttackSurface />} />
              </Route>
            </Routes>
          </AuthRoute>
        </ContextProvider>
      </ThemeProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
