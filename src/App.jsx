import { Route, Routes } from "react-router-dom"
import AssignmentPage from "./pages/assignment.page"
import ApplicationPage from "./pages/application.page"
import Assignment from "./component/assignment.component"
import Dashboard from "./component/dashboard.component"
import React from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "./component/sideNavBar.component"; 
import Application from "./component/application.component"
import Navbar from "./component/navBar.component"; 

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <SideNavBar />
        <div className="flex-grow p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};


const App = () => {

  return (
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="assignment" element={<AssignmentPage />}>
            <Route index element={<Assignment />} />
          </Route>
          <Route path="application" element={<ApplicationPage />}>
            <Route index element={<Application />} />
          </Route>
        </Route>
       
      </Routes>
  )
}

export default App;
