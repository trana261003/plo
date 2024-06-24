import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import UserNavigationPanel from "./user-navigation.component";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);
  const userNavRef = useRef(null);
  let navigate = useNavigate();

  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };

  const handleSearch = (e) => {
    let query = e.target.value;
    if (e.keyCode === 13 && query.length) {
      navigate(`/search/${query}`);
    }
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
    <nav className="z-10 flex items-center w-full px-4 py-5 h-[80px] border-b border-gray-300 bg-red-500">
      {/* Logo */}
      <Link to="/">
        <img
          src="path-to-your-logo.jpg" // Replace with your logo path
          alt="Logo"
          className="h-10 w-10 object-cover"
        />
      </Link>

      {/* Search Box */}
      <div
        className={
          "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-4 md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto rounded-3xl " +
          (searchBoxVisibility ? "show" : "hide")
        }
      >
        <input
          type="text"
          placeholder="Search"
          className="w-full h-5 md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          onKeyDown={handleSearch}
        />
        <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
      </div>

      <div className="flex items-center gap-5 md:gap-6 ml-auto">
        {/* Mobile Search Button */}
        <button
          className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
          onClick={() => setSearchBoxVisibility((currentValue) => !currentValue)}
        >
          <i className="fi fi-rr-search text-xl"></i>
        </button>
        <p className="text-white font-gelasio hidden md:block">Hello, user</p>
        <>
          <Link to="/dashboard/notification">
            <button className="w-12 text-white h-12 rounded-full bg-grey relative hover:bg-black/30">
              <i className="fi fi-rr-bell text-2xl block mt-1"></i>
            </button>
          </Link>
          <div className="relative" ref={userNavRef} onClick={handleUserNavPanel}>
            <button className="w-12 h-12 mt-1">
              <img
                src="path-to-your-image.jpg" // Replace with your image path
                alt="User"
                className="w-full h-full object-cover rounded-full"
              />
            </button>
            {userNavPanel && <UserNavigationPanel />}
          </div>
        </>
      </div>
    </nav>
  );
};

export default Navbar;
