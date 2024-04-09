import React from "react";
import { Link } from "react-router-dom";

const AuthFailure: React.FC = () => {
  return (
    <div>
      <p>Login failed. Please try again.</p>
      <Link to="/login">Go back to Login</Link>
    </div>
  );
};

export default AuthFailure;
