import "./App.css";
import UpcomingEvents from "./components/Events/UpcomingEvents/UpcomingEvents";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CreateEvent from "./components/Events/CreateEvent/CreateEvent";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/events" element={<UpcomingEvents />} />
        <Route path="/newEvent" element={<CreateEvent />} />
      </Routes>
    </div>
  );
}

export default App;
