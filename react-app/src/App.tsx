import "./App.css";
import UpcomingEvents from "./components/Events/UpcomingEvents/UpcomingEvents";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/events" element={<UpcomingEvents />} />
      </Routes>
    </div>
  );
}

export default App;
