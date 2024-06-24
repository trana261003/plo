import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdSpaceDashboard, MdAssignmentAdd } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { GrNotes } from "react-icons/gr";
import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from "react-router-dom";

const SideNavBar = () => {
  const menus = [
    { name: "Dashboard", link: "/", icon: MdSpaceDashboard },
    { name: "Assignment", link: "/assignment", icon: MdAssignmentAdd },
    { name: "Application", link: "/application", icon: GrNotes },
    { name: "Result", link: "/result", icon: CgNotes },
    { name: "Fees", link: "/fees", icon: GiTakeMyMoney },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={`bg-red-500 min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4`}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative font-gelasio">
        {menus.map((menu, i) => (
          <Link
            to={menu.link}
            key={i}
            className="group flex items-center text-xl gap-3.5 font-semibold p-2 hover:bg-white hover:text-black rounded-3xl"
          >
            <div>{React.createElement(menu.icon, { size: "20" })}</div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-transparent font-semibold whitespace-pre text-gray-600 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
            >
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNavBar;
