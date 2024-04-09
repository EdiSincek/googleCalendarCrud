import React from "react";
import "./Login.css";

const Login: React.FC = () => {
  const handleLogin = async () => {
    window.location.href = "http://localhost:3001/google/login";
  };

  return (
    <div className="Login">
      <h2>Simple google calendar crud app</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
