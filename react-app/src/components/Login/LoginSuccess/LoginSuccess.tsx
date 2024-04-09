import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const AuthSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoggedIn, setToken } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      setToken(token);
      setLoggedIn(true);
      navigate("/events");
    } else {
      navigate("/login");
    }
  }, [navigate, location, setLoggedIn, setToken]);

  return <div>Authenticating...</div>;
};

export default AuthSuccess;
