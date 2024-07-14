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
import AuthRoute from "./components/ProtectedRoute/AuthRoute";
import PublicRoute from "./components/ProtectedRoute/PublicRoute";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <CssBaseline />
          <AuthRoute>
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
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
            </Routes>
          </AuthRoute>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
        </ContextProvider>
      </ThemeProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
