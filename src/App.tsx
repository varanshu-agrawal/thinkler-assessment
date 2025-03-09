import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import './App.css'
import AssessmentDetail from "./components/Assessment/Assessment";

const App = () => (
  <Router>
    <div className="app">
      <Sidebar />
      <div className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assessment" element={<AssessmentDetail />} />
          <Route path="/bookings" element={<div>Bookings Page</div>} />
          <Route path="/messages" element={<div>Messages Page</div>} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App