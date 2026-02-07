import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import BrowseListings from "./pages/BrowseListings";
import CreateListing from "./pages/CreateListing";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/browse" element={<BrowseListings />} />
        <Route path="/create" element={<CreateListing />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </div>
  );
};

export default App;
