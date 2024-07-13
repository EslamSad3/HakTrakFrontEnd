import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
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

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Home />} />
              <Route
                path="/admin/actions/assets/ips"
                forceRefresh={true}
                element={
                  <ProtectedRoute>
                    <CreateIps />
                  </ProtectedRoute>
                }
              />
              <Route path="/assets/ips" element={<IPs />} />
              <Route path="/assets/domains" element={<Domains />} />
              <Route path="/assets/portals" element={<Portals />} />
            </Route>

            {/* <Route
                path="/customers/:id"
                element={
                  <ProtectedRoute>
                    <CustomerDetailsPage />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/technicians/:id"
                element={
                  <ProtectedRoute>
                    <TechnicianDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/availabletechnicians"
                element={
                  <ProtectedRoute>
                    <Availtechnicians />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/availabletechnicians/:id"
                element={
                  <ProtectedRoute>
                    <AvailableTechnicianDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coupons"
                element={
                  <ProtectedRoute>
                    <Coupons />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coupons/:id"
                element={
                  <ProtectedRoute>
                    <CouponDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addCoupons"
                element={
                  <ProtectedRoute>
                    <AddNewCoupon />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/configuration"
                element={
                  <ProtectedRoute>
                    <Configuration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <NotificationsToAll />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addtech"
                element={
                  <ProtectedRoute>
                    <AddNewTech />
                  </ProtectedRoute>
                }
              />
            </Route> */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </ContextProvider>
      </ThemeProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
