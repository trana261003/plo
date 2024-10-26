// import { Link, useNavigate } from "react-router-dom";
// import { useState, useRef, useEffect } from "react";
// import { GoBell } from "react-icons/go";
// import logo from '../assets/Group 32.png';
// import userImage from '../assets/image.png'; // Adjust with your user image path

// const Navbar1 = () => {
//   const [userNavPanel, setUserNavPanel] = useState(false);
//   const userNavRef = useRef(null);
//   const navigate = useNavigate();

//   const handleUserNavPanel = () => {
//     setUserNavPanel((currentVal) => !currentVal);
//   };

//   const handleLogout = () => {
//     // Clear user data from localStorage (or wherever it's stored)
//     localStorage.removeItem("token");
//     // Redirect to the login page or homepage after logging out
//     navigate("/");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userNavRef.current && !userNavRef.current.contains(event.target)) {
//         setUserNavPanel(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <nav className="z-10 flex items-center justify-between w-full px-6 py-4 bg-gray-900 shadow-lg">
//       {/* Logo */}
//       <Link to="/student-dashboard">
//         <img
//           src={logo}
//           alt="Logo"
//           className="h-12 w-12 object-cover"
//         />
//       </Link>

//       {/* Navigation Links */}
//       <div className="flex items-center space-x-6">
//         <Link to="/student-dashboard" className="text-white hover:text-yellow-300">
//           Dashboard
//         </Link>
//         <Link to="/assignments" className="text-white hover:text-yellow-300">
//           Assignment
//         </Link>
//         <Link to="/studentapplication" className="text-white hover:text-yellow-300">
//           Application
//         </Link>
//         <Link to="/under-construction" className="text-white hover:text-yellow-300">
//           Attendance
//         </Link>
//         <Link to="/student-notice" className="text-white hover:text-yellow-300">
//           Notice
//         </Link>
//       </div>

//       <div className="flex items-center gap-6">
//         <p className="text-yellow-300 font-gelasio hidden md:block">Hello, User</p>
//         <>
//           <Link to="/dashboard/notification">
//             <button className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-300 relative hover:bg-gray-600 transition duration-200">
//               <GoBell className="text-gray-800 text-2xl" /> {/* Centering the bell icon */}
//             </button>
//           </Link>
//           <div className="relative" ref={userNavRef} onClick={handleUserNavPanel}>
//             <button className="w-12 h-12">
//               <img
//                 src={userImage} // Using imported user image
//                 alt="User"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </button>

//             {/* Dropdown Menu */}
//             {userNavPanel && (
//               <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg transition-opacity duration-200">
//                 <Link
//                   to="/studentprofile"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Profile
//                 </Link>
//                 <Link
//                   to="/settings"
//                   className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Settings
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </>
//       </div>
//     </nav>
//   );
// };

// export default Navbar1;







import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { GoBell } from "react-icons/go";
import { toast } from 'react-toastify';
import logo from '../assets/Group 32.png';
import userImage from '../assets/image.png'; // Adjust with your user image path

const Navbar1 = () => {
  const [userNavPanel, setUserNavPanel] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const userNavRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user data (including username)
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user details');
      }

      const data = await response.json();
      setUsername(data.name); // Set the username from the response
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error(error.message);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
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

  return (
    <nav className="z-10 flex items-center justify-between w-full px-6 py-4 bg-gray-900 shadow-lg">
      {/* Logo */}
      <Link to="/student-dashboard">
        <img src={logo} alt="Logo" className="h-12 w-12 object-cover" />
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link to="/student-dashboard" className="text-white hover:text-yellow-300">
          Dashboard
        </Link>
        <Link to="/assignments" className="text-white hover:text-yellow-300">
          Assignment
        </Link>
        <Link to="/studentapplication" className="text-white hover:text-yellow-300">
          Application
        </Link>
        <Link to="/under-construction" className="text-white hover:text-yellow-300">
          Attendance
        </Link>
        <Link to="/student-notice" className="text-white hover:text-yellow-300">
          Notice
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {!loading && (
          <p className="text-yellow-300 font-gelasio hidden md:block">
            Hello, {username ? username : 'User'}
          </p>
        )}
        <>
          <Link to="/dashboard/notification">
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-300 relative hover:bg-gray-600 transition duration-200">
              <GoBell className="text-gray-800 text-2xl" />
            </button>
          </Link>
          <div className="relative" ref={userNavRef} onClick={handleUserNavPanel}>
            <button className="w-12 h-12">
              <img
                src={userImage} // Using imported user image
                alt="User"
                className="w-full h-full object-cover rounded-full"
              />
            </button>

            {/* Dropdown Menu */}
            {userNavPanel && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg transition-opacity duration-200">
                <Link to="/studentprofile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
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
        </>
      </div>
    </nav>
  );
};

export default Navbar1;
