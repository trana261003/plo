import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import HODDashboard from './pages/HODDashboard';
import Applications from './pages/Applications';
// import Assignments from './pages/Assignments';
import ProtectedRoute from './components/ProtectedRoute';
import CreateApplication from './pages/StudentApplication';
import CreateAssignment from './pages/CreateAssignment';
import ApplicationsPage from './pages/ApplicationsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import StudentList from './pages/StudentList';
import UnderConstruction from './pages/UnderConstruction';
import NotFoundPage from './pages/NotFoundPage';
import Assignments from './pages/Assignments';
import AssignmentDetail from './pages/AssignmentDetail';
import SubmittedStudentsCount from './pages/SubmittedStudentsCount';
import Profile from './pages/Profile';
import AdminDashboard from './pages/Admin';
import Graph from './pages/Graphs';
import HodNotice from './pages/HodNotice';
import NoticeList from './pages/GetNotice';
import NoticeList1 from './pages/GetNotice1';
import HodStudentList from './pages/HodStudentList';
import StudentProfile from './pages/StudentProfile';
import CreateLeaveApplication from './pages/LeaveApplication';
import LeaveApplications from './pages/Getleaveapplication';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/student-dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
      <Route path="/teacher-dashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/hod-dashboard" element={<ProtectedRoute><HODDashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} />
      <Route path="/applications" element={<ProtectedRoute><ApplicationsPage /></ProtectedRoute>} />
      <Route path="/studentassignment" element={<ProtectedRoute><AssignmentsPage /></ProtectedRoute>} />
      <Route path='/createassignment' element={<ProtectedRoute><CreateAssignment/></ProtectedRoute>}/>
      <Route path='/studentapplication' element={<ProtectedRoute><CreateApplication/></ProtectedRoute>}/>
      <Route path='/studentlist' element={<ProtectedRoute><StudentList/></ProtectedRoute>}/>
      <Route path='/hod-studentlist' element={<ProtectedRoute><HodStudentList/></ProtectedRoute>}/>
      <Route path='/under-construction' element={<ProtectedRoute><UnderConstruction/></ProtectedRoute>}/>
      <Route path='*' element={<ProtectedRoute><NotFoundPage/></ProtectedRoute>}/>
      <Route path='/assignments' element={<ProtectedRoute><Assignments/></ProtectedRoute>}/>
      <Route path='/assignments/:assignmentId' element={<ProtectedRoute><AssignmentDetail/></ProtectedRoute>}/>
      <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      <Route path='/studentprofile' element={<ProtectedRoute><StudentProfile/></ProtectedRoute>}/>
      <Route path='/submit' element={<ProtectedRoute><SubmittedStudentsCount/></ProtectedRoute>}/>
      <Route path='/graphs' element={<ProtectedRoute><Graph/></ProtectedRoute>}/>
      <Route path='/hod-notice' element={<ProtectedRoute><HodNotice/></ProtectedRoute>}/>
      <Route path='/getnotice' element={<ProtectedRoute><NoticeList/></ProtectedRoute>}/>
      <Route path='/student-notice' element={<ProtectedRoute><NoticeList1/></ProtectedRoute>}/>
      <Route path='/leaveapplication' element={<ProtectedRoute><CreateLeaveApplication/></ProtectedRoute>}/>
      <Route path='/getleaveapplication' element={<ProtectedRoute><LeaveApplications/></ProtectedRoute>}/>
      {/* <Route path='/studentapplication' element={<ProtectedRoute><SubmitApplication/></ProtectedRoute>}/> */}
    </Routes>
  );
}

export default App;