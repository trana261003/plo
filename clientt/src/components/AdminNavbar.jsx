import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { GoBell } from "react-icons/go";
import logo from '../assets/Group 32.png';
import userImage from '../assets/image.png';

const AdminNavbar = () => {
  const [userNavPanel, setUserNavPanel] = useState(false);
  const userNavRef = useRef(null);
  const navigate = useNavigate();

  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };

  const handleLogout = () => {
    // Clear user data from localStorage (or wherever it's stored)
    localStorage.removeItem("token");
    // Redirect to the login page or homepage after logging out
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userNavRef.current && !userNavRef.current.contains(event.target)) {
        setUserNavPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Example: Fetch the user's name from localStorage (or state management)
  const userName = localStorage.getItem('userName') || 'User'; // Change this as per your implementation

  return (
    <nav className="z-10 flex items-center justify-between w-full px-6 py-4 bg-gray-900 shadow-lg">
      {/* Logo */}
      <Link to="/teacher-dashboard">
        <img src={logo} alt="Logo" className="h-12 w-12 object-cover" />
      </Link>

      {/* Centered Navigation Links */}
      <div className="flex-1 flex justify-center space-x-6">
        <Link to="/admin" className="text-white hover:text-yellow-300 transition duration-200">
          Dashboard
        </Link>
        <Link to="/graphs" className="text-white hover:text-yellow-300 transition duration-200">
          Data Overview
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <p className="text-yellow-300 font-gelasio hidden md:block">Hello, {userName}</p>
        <Link to="/dashboard/notification" aria-label="Notifications">
          <button className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-300 relative hover:bg-gray-600 transition duration-200">
            <GoBell className="text-gray-800 text-2xl" />
          </button>
        </Link>
        <div className="relative" ref={userNavRef} onClick={handleUserNavPanel}>
          <button className="w-12 h-12" aria-label="User Menu">
            <img src={userImage} alt="User" className="w-full h-full object-cover rounded-full" />
          </button>

          {/* Dropdown Menu */}
          {userNavPanel && (
            <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg transition-opacity duration-200">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
