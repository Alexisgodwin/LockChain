import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/wallet", label: "Wallet", icon: "💳" },
  { to: "/blockchain", label: "Blockchain", icon: "⛓️" },
  { to: "/tokens", label: "Tokens", icon: "🪙" },
  { to: "/governance", label: "Governance", icon: "🗳️" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
  { to: "/admin", label: "Admin", icon: "👤" },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <nav className={`
        fixed md:relative top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        glass-effect shadow-2xl
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg animate-pulse3d"></div>
              <span className="font-bold text-lg">TRON</span>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-2">
            {links.map(({ to, label, icon }, index) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 animate-slideInRight card-3d ${
                    isActive 
                      ? "gradient-bg text-white shadow-lg transform scale-105" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
                  }`
                }
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-xl">{icon}</span>
                <span className="font-medium">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
