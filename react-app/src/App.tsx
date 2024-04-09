import "./App.css";
import UpcomingEvents from "./components/Events/UpcomingEvents/UpcomingEvents";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import NavBar from "./components/NavBar/NavBar";
import CreateEvent from "./components/Events/CreateEvent/CreateEvent";
import EditEvent from "./components/Events/EditEvent/EditEvent";
import Login from "./components/Login/Login";
import AuthSuccess from "./components/Login/LoginSuccess/LoginSuccess";
import AuthFailure from "./components/Login/LoginFailure/LoginFailure";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <AppRoutes />
      </div>
    </AuthProvider>
  );
};

const AppRoutes: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <UpcomingEvents /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/events"
        element={isLoggedIn ? <UpcomingEvents /> : <Navigate to="/login" />}
      />
      <Route
        path="/newEvent"
        element={isLoggedIn ? <CreateEvent /> : <Navigate to="/login" />}
      />
      <Route
        path="/editEvent/:eventId"
        element={isLoggedIn ? <EditEvent /> : <Navigate to="/login" />}
      />
      <Route path="/auth-success" element={<AuthSuccess />} />
      <Route path="/auth-failure" element={<AuthFailure />} />
    </Routes>
  );
};

export default App;
