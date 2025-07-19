import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Blockchain from "./pages/Blockchain";
import Tokens from "./pages/Tokens";
import Governance from "./pages/Governance";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <div className="flex flex-col flex-1 min-w-0">
            <Header onMobileMenuToggle={toggleSidebar} />
            <main className="flex-grow p-4 md:p-6 overflow-auto">
              <div className="animate-fadeInUp">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/blockchain" element={<Blockchain />} />
                  <Route path="/tokens" element={<Tokens />} />
                  <Route path="/governance" element={<Governance />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}
