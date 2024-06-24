import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const UserNavigationPanel = () => {
  return (
    <AnimatePresence>
      <div className="bg-white absolute right-0 top-14 border border-grey w-60 duration-200 rounded-lg shadow-lg">
        <Link to="/profile" className="block pl-4 py-2 hover:bg-gray-200">
          Profile
        </Link>
        <Link to="/dashboard" className="block pl-4 py-2 hover:bg-gray-200">
          Dashboard
        </Link>
        <Link to="/settings/edit-profile" className="block pl-4 py-2 hover:bg-gray-200">
          Settings
        </Link>
        <div className="border-t border-gray-200 my-2"></div>
        <button className="w-full text-left pl-4 py-2 hover:bg-gray-200">
          <h1 className="font-bold text-lg">Sign Out</h1>
          <p className="text-gray-600">@username</p>
        </button>
      </div>
    </AnimatePresence>
  );
};

export default UserNavigationPanel;
