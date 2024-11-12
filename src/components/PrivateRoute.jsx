import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = () => {
  const auth = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.userInfo?.info?.username) {
      navigate("/login");
    }
  }, [auth]);

  useEffect(() => {
    let token = sessionStorage.getItem("auth-tk-webchat");
    if (token) {
      let tokenExpiration = jwtDecode(token).exp;
      let dateNow = new Date();

      if (tokenExpiration < dateNow.getTime() / 1000) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [auth]);

  if (isAuthenticated === null) {
    return <></>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
