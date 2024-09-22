import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/ResetPassword";
import NoPage from "./pages/NoPage";
import WebSocketProvider from "./components/WebSocketProvider";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NoPage />} /> */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <WebSocketProvider>
                <Dashboard />
              </WebSocketProvider>
            }
          />
        </Route>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
