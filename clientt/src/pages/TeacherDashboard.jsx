// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // const TeacherDashboard = () => {
// //   return (
// //     <div>
// //       <h1>Teacher Dashboard</h1>
// //       <Link to="/assignments">Manage Assignments</Link>
// //       <Link to="/applications">Review Applications</Link>
// //     </div>
// //   );
// // };

// // export default TeacherDashboard;




// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaBell, FaExclamationTriangle, FaCheckCircle, FaArrowRight, FaBook, FaPencilAlt } from 'react-icons/fa';
// import Navbar from '../components/Navbar';

// const notifications = [
//     { id: 1, type: 'info', message: 'New assignments have been uploaded.' },
//     { id: 2, type: 'warning', message: 'Please review the latest quiz submissions.' },
//     { id: 3, type: 'success', message: 'Your recent updates have been saved successfully.' }
// ];

// const Counter = ({ value }) => {
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         let start = 0;
//         const end = (value,15);
//         const duration = 0.75; // duration in seconds

//         const stepTime = Math.abs(Math.floor(duration * 1000 / (end - start)));
//         let timer = setInterval(() => {
//             start += 1;
//             setCount(start);
//             if (start === end) {
//                 clearInterval(timer);
//             }
//         }, stepTime);

//         return () => clearInterval(timer);
//     }, [value]);

//     return <span className="text-3xl font-bold">{count}</span>;
// };

// const StaffDashboard = () => {
//     const [activeAssignments, setActiveAssignments] = useState(0);
//     const [upcomingQuizzes, setUpcomingQuizzes] = useState(0);
//     const [pendingGrades, setPendingGrades] = useState(0);

//     // useEffect(() => {
//     //     // Fetch dynamic data from your backend
//     //     fetch('/api/staff/dashboard-data') // Update this URL as necessary
//     //         .then(response => response.json())
//     //         .then(data => {
//     //             setActiveAssignments(data.activeAssignments);
//     //             setUpcomingQuizzes(data.upcomingQuizzes);
//     //             setPendingGrades(data.pendingGrades);
//     //         })
//     //         .catch(error => console.error('Error fetching data:', error));
//     // }, []);

//     return (
          
//         <div>
//           <Navbar/>
//           <div className="min-h-screen flex flex-col bg-gray-50 p-6">
//             <motion.div 
//                 initial={{ opacity: 0, y: 50 }} 
//                 animate={{ opacity: 1, y: 0 }} 
//                 transition={{ duration: 0.5 }} 
//                 className="flex-1 bg-white p-8 border border-gray-200 rounded-lg shadow-lg"
//             >
//                 <h1 className="text-3xl font-bold text-gray-800 mb-8">Staff Dashboard</h1>

//                 {/* Notifications */}
//                 <div className="mb-8">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>
//                     <div className="space-y-4">
//                         {notifications.map(notification => (
//                             <motion.div 
//                                 key={notification.id} 
//                                 initial={{ opacity: 0, x: -20 }} 
//                                 animate={{ opacity: 1, x: 0 }} 
//                                 transition={{ duration: 0.3, delay: notification.id * 0.1 }} 
//                                 className={`p-4 rounded-lg shadow-lg ${notification.type === 'info' ? 'bg-blue-100 text-blue-800' : notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
//                             >
//                                 <div className="flex items-center">
//                                     <div className={`mr-3 w-8 h-8 rounded-full flex items-center justify-center ${notification.type === 'info' ? 'bg-blue-300' : notification.type === 'warning' ? 'bg-yellow-300' : 'bg-green-300'}`}>
//                                         {notification.type === 'info' ? <FaBell className="w-5 h-5 text-blue-700" /> : 
//                                          notification.type === 'warning' ? <FaExclamationTriangle className="w-5 h-5 text-yellow-700" /> : 
//                                          <FaCheckCircle className="w-5 h-5 text-green-700" />}
//                                     </div>
//                                     <p>{notification.message}</p>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Summary Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                     <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
//                         <div>
//                             <h3 className="text-lg font-semibold">Active Assignments</h3>
//                             <Counter value={activeAssignments} />
//                         </div>
//                         <div className="bg-blue-700 p-4 rounded-full">
//                             <FaArrowRight className="w-12 h-12" />
//                         </div>
//                     </div>
//                     <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
//                         <div>
//                             <h3 className="text-lg font-semibold">Upcoming Quizzes</h3>
//                             <Counter value={upcomingQuizzes} />
//                         </div>
//                         <div className="bg-green-700 p-4 rounded-full">
//                             <FaBook className="w-12 h-12" />
//                         </div>
//                     </div>
//                     <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
//                         <div>
//                             <h3 className="text-lg font-semibold">Pending Grades</h3>
//                             <Counter value={pendingGrades} />
//                         </div>
//                         <div className="bg-yellow-700 p-4 rounded-full">
//                             <FaPencilAlt className="w-12 h-12" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Navigation Links */}
//                 <div className="mb-8">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <Link to="/staffAssignment" className="bg-blue-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-blue-700 transition">
//                             <div>
//                                 <h3 className="text-xl font-semibold">Assignments</h3>
//                                 <p className="text-gray-200">View and manage assignments</p>
//                             </div>
//                             <FaArrowRight className="w-10 h-10 text-white" />
//                         </Link>
//                         <Link to="/staffAssignment" className="bg-red-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-red-700 transition">
//                             <div>
//                                 <h3 className="text-xl font-semibold">Quizzes</h3>
//                                 <p className="text-gray-200">View and manage quizzes</p>
//                             </div>
//                             <FaArrowRight className="w-10 h-10 text-white" />
//                         </Link>
//                         <Link to="/staff/students" className="bg-green-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-green-700 transition">
//                             <div>
//                                 <h3 className="text-xl font-semibold">Students</h3>
//                                 <p className="text-gray-200">Track student progress</p>
//                             </div>
//                             <FaArrowRight className="w-10 h-10 text-white" />
//                         </Link>
//                         <Link to="/staff/reports" className="bg-purple-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-purple-700 transition">
//                             <div>
//                                 <h3 className="text-xl font-semibold">Reports</h3>
//                                 <p className="text-gray-200">View detailed reports</p>
//                             </div>
//                             <FaArrowRight className="w-10 h-10 text-white" />
//                         </Link>
//                     </div>
//                 </div>

//                 {/* Calendar/Timeline */}
//                 <div>
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Deadlines</h2>
//                     <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
//                         {/* Calendar component or timeline view */}
//                         <p className="text-gray-600">No upcoming deadlines</p>
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//         </div>
//     );
// };

// export default StaffDashboard;




// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaBell, FaExclamationTriangle, FaCheckCircle, FaArrowRight, FaBook, FaPencilAlt } from 'react-icons/fa';
// import Navbar from '../components/Navbar';

// const notifications = [
//     { id: 1, type: 'info', message: 'New assignments have been uploaded.' },
//     { id: 2, type: 'warning', message: 'Please review the latest quiz submissions.' },
//     { id: 3, type: 'success', message: 'Your recent updates have been saved successfully.' }
// ];

// const Counter = ({ value }) => {
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         let start = 0;
//         const end = value; // Use the value passed from props
//         const duration = 0.75; // Duration in seconds

//         const stepTime = Math.abs(Math.floor(duration * 1000 / (end - start)));
//         let timer = setInterval(() => {
//             start += 1;
//             setCount(start);
//             if (start === end) {
//                 clearInterval(timer);
//             }
//         }, stepTime);

//         return () => clearInterval(timer);
//     }, [value]);

//     return <span className="text-3xl font-bold">{count}</span>;
// };

// const StaffDashboard = () => {
//     const [activeAssignments, setActiveAssignments] = useState(0);
//     const [upcomingQuizzes, setUpcomingQuizzes] = useState(0);
//     const [pendingGrades, setPendingGrades] = useState(0);

//     useEffect(() => {
//         // Fetch dynamic data from your backend
//         fetch('/api/staff/assignments/count') // Update this URL as necessary
//             .then(response => response.json())
//             .then(data => {
//                 setActiveAssignments(data.count); // Assuming the backend sends the count in the response
//             })
//             .catch(error => console.error('Error fetching assignment count:', error));

//         // If you have other endpoints to fetch quizzes and grades, add them here as well.
//     }, []);

//     return (
//         <div>
//             <Navbar />
//             <div className="min-h-screen flex flex-col bg-gray-50 p-6">
//                 <motion.div 
//                     initial={{ opacity: 0, y: 50 }} 
//                     animate={{ opacity: 1, y: 0 }} 
//                     transition={{ duration: 0.5 }} 
//                     className="flex-1 bg-white p-8 border border-gray-200 rounded-lg shadow-lg"
//                 >
//                     <h1 className="text-3xl font-bold text-gray-800 mb-8">Staff Dashboard</h1>

//                     {/* Notifications */}
//                     <div className="mb-8">
//                         <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>
//                         <div className="space-y-4">
//                             {notifications.map(notification => (
//                                 <motion.div 
//                                     key={notification.id} 
//                                     initial={{ opacity: 0, x: -20 }} 
//                                     animate={{ opacity: 1, x: 0 }} 
//                                     transition={{ duration: 0.3, delay: notification.id * 0.1 }} 
//                                     className={`p-4 rounded-lg shadow-lg ${notification.type === 'info' ? 'bg-blue-100 text-blue-800' : notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
//                                 >
//                                     <div className="flex items-center">
//                                         <div className={`mr-3 w-8 h-8 rounded-full flex items-center justify-center ${notification.type === 'info' ? 'bg-blue-300' : notification.type === 'warning' ? 'bg-yellow-300' : 'bg-green-300'}`}>
//                                             {notification.type === 'info' ? <FaBell className="w-5 h-5 text-blue-700" /> : 
//                                              notification.type === 'warning' ? <FaExclamationTriangle className="w-5 h-5 text-yellow-700" /> : 
//                                              <FaCheckCircle className="w-5 h-5 text-green-700" />}
//                                         </div>
//                                         <p>{notification.message}</p>
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Summary Cards */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                         <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
//                             <div>
//                                 <h3 className="text-lg font-semibold">Active Assignments</h3>
//                                 <Counter value={activeAssignments} />
//                             </div>
//                             <div className="bg-blue-700 p-4 rounded-full">
//                                 <FaArrowRight className="w-12 h-12" />
//                             </div>
//                         </div>
//                         <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
//                             <div>
//                                 <h3 className="text-lg font-semibold">Upcoming Quizzes</h3>
//                                 <Counter value={upcomingQuizzes} />
//                             </div>
//                             <div className="bg-green-700 p-4 rounded-full">
//                                 <FaBook className="w-12 h-12" />
//                             </div>
//                         </div>
//                         <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
//                             <div>
//                                 <h3 className="text-lg font-semibold">Pending Grades</h3>
//                                 <Counter value={pendingGrades} />
//                             </div>
//                             <div className="bg-yellow-700 p-4 rounded-full">
//                                 <FaPencilAlt className="w-12 h-12" />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Navigation Links */}
//                     <div className="mb-8">
//                         <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <Link to="/staffAssignment" className="bg-blue-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-blue-700 transition">
//                                 <div>
//                                     <h3 className="text-xl font-semibold">Assignments</h3>
//                                     <p className="text-gray-200">View and manage assignments</p>
//                                 </div>
//                                 <FaArrowRight className="w-10 h-10 text-white" />
//                             </Link>
//                             <Link to="/staffAssignment" className="bg-red-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-red-700 transition">
//                                 <div>
//                                     <h3 className="text-xl font-semibold">Quizzes</h3>
//                                     <p className="text-gray-200">View and manage quizzes</p>
//                                 </div>
//                                 <FaArrowRight className="w-10 h-10 text-white" />
//                             </Link>
//                             <Link to="/staff/students" className="bg-green-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-green-700 transition">
//                                 <div>
//                                     <h3 className="text-xl font-semibold">Students</h3>
//                                     <p className="text-gray-200">Track student progress</p>
//                                 </div>
//                                 <FaArrowRight className="w-10 h-10 text-white" />
//                             </Link>
//                             <Link to="/staff/reports" className="bg-purple-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-purple-700 transition">
//                                 <div>
//                                     <h3 className="text-xl font-semibold">Reports</h3>
//                                     <p className="text-gray-200">View detailed reports</p>
//                                 </div>
//                                 <FaArrowRight className="w-10 h-10 text-white" />
//                             </Link>
//                         </div>
//                     </div>

//                     {/* Calendar/Timeline */}
//                     <div>
//                         <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Deadlines</h2>
//                         <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
//                             {/* Calendar component or timeline view */}
//                             <p className="text-gray-500">No upcoming deadlines at this moment.</p>
//                         </div>
//                     </div>
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// export default StaffDashboard;





import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBell, FaExclamationTriangle, FaCheckCircle, FaArrowRight, FaBook, FaPencilAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const notifications = [
    { id: 1, type: 'info', message: 'New assignments have been uploaded.' },
    { id: 2, type: 'warning', message: 'Please review the latest quiz submissions.' },
    { id: 3, type: 'success', message: 'Your recent updates have been saved successfully.' }
];

const Counter1 = ({ value }) => {
    const [count, setCount1] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = (value,1); // Use the value passed from props
        const duration = 0.75; // Duration in seconds

        const stepTime = Math.abs(Math.floor(duration * 1000 / (end - start)));
        let timer = setInterval(() => {
            start += 1;
            setCount1(start);
            if (start === end) {
                clearInterval(timer);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [value]);

    return <span className="text-3xl font-bold">0</span>;
};

const Counter = ({ value }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = (value,32); // Use the value passed from props
        const duration = 0.75; // Duration in seconds

        const stepTime = Math.abs(Math.floor(duration * 1000 / (end - start)));
        let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) {
                clearInterval(timer);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [value]);

    return <span className="text-3xl font-bold">{count}</span>;
};


const StaffDashboard = () => {
    const [activeAssignments, setActiveAssignments] = useState(0);
    const [upcomingQuizzes, setUpcomingQuizzes] = useState(0);
    const [pendingGrades, setPendingGrades] = useState(0);

    // useEffect(() => {
    //     // Fetch dynamic data from your backend
    //     const fetchCounts = async () => {
    //         try {
    //             const assignmentResponse = await fetch('/api/staff/assignments/count'); // Adjust as necessary
    //             const assignmentData = await assignmentResponse.json();
    //             setActiveAssignments(assignmentData.count); // Assuming the backend sends the count in the response

    //             const quizResponse = await fetch('/api/staff/quizzes/count'); // Adjust to your quizzes endpoint
    //             const quizData = await quizResponse.json();
    //             setUpcomingQuizzes(quizData.count); // Assuming similar structure

    //             const gradeResponse = await fetch('/api/staff/grades/count'); // Adjust to your grades endpoint
    //             const gradeData = await gradeResponse.json();
    //             setPendingGrades(gradeData.count); // Assuming similar structure
    //         } catch (error) {
    //             console.error('Error fetching counts:', error);
    //         }
    //     };

    //     fetchCounts();
    // }, []);

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex flex-col bg-gray-50 p-6">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }} 
                    className="flex-1 bg-white p-8 border border-gray-200 rounded-lg shadow-lg"
                >
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Staff Dashboard</h1>

                    {/* Notifications */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>
                        <div className="space-y-4">
                            {notifications.map(notification => (
                                <motion.div 
                                    key={notification.id} 
                                    initial={{ opacity: 0, x: -20 }} 
                                    animate={{ opacity: 1, x: 0 }} 
                                    transition={{ duration: 0.3, delay: notification.id * 0.1 }} 
                                    className={`p-4 rounded-lg shadow-lg ${notification.type === 'info' ? 'bg-blue-100 text-blue-800' : notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
                                >
                                    <div className="flex items-center">
                                        <div className={`mr-3 w-8 h-8 rounded-full flex items-center justify-center ${notification.type === 'info' ? 'bg-blue-300' : notification.type === 'warning' ? 'bg-yellow-300' : 'bg-green-300'}`}>
                                            {notification.type === 'info' ? <FaBell className="w-5 h-5 text-blue-700" /> : 
                                             notification.type === 'warning' ? <FaExclamationTriangle className="w-5 h-5 text-yellow-700" /> : 
                                             <FaCheckCircle className="w-5 h-5 text-green-700" />}
                                        </div>
                                        <p>{notification.message}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">Active Assignments</h3>
                                <Counter value={activeAssignments} />
                            </div>
                            <div className="bg-blue-700 p-4 rounded-full">
                                <FaArrowRight className="w-12 h-12" />
                            </div>
                        </div>
                        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">Upcoming Quizzes</h3>
                                {/* <Counter value={upcomingQuizzes} /> */}
                                <Counter1 value=""/>
                            </div>
                            <div className="bg-green-700 p-4 rounded-full">
                                <FaBook className="w-12 h-12" />
                            </div>
                        </div>
                        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">Pending Grades</h3>
                                <Counter1 value={pendingGrades} />
                            </div>
                            <div className="bg-yellow-700 p-4 rounded-full">
                                <FaPencilAlt className="w-12 h-12" />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Link to="/createassignment" className="bg-blue-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-blue-700 transition">
                                <div>
                                    <h3 className="text-xl font-semibold">Assignments</h3>
                                    <p className="text-gray-200">View and manage assignments</p>
                                </div>
                                <FaArrowRight className="w-10 h-10 text-white" />
                            </Link>
                            <Link to="/staffAssignment" className="bg-red-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-red-700 transition">
                                <div>
                                    <h3 className="text-xl font-semibold">Quizzes</h3>
                                    <p className="text-gray-200">View and manage quizzes</p>
                                </div>
                                <FaArrowRight className="w-10 h-10 text-white" />
                            </Link>
                            <Link to="/staff/students" className="bg-green-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-green-700 transition">
                                <div>
                                    <h3 className="text-xl font-semibold">Students</h3>
                                    <p className="text-gray-200">Track student progress</p>
                                </div>
                                <FaArrowRight className="w-10 h-10 text-white" />
                            </Link>
                            <Link to="/staff/reports" className="bg-purple-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-purple-700 transition">
                                <div>
                                    <h3 className="text-xl font-semibold">Reports</h3>
                                    <p className="text-gray-200">View detailed reports</p>
                                </div>
                                <FaArrowRight className="w-10 h-10 text-white" />
                            </Link>
                        </div>
                    </div>

                    {/* Calendar/Timeline */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Deadlines</h2>
                        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                            {/* Calendar component or timeline view */}
                            <p className="text-gray-500">No upcoming deadlines at this moment.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default StaffDashboard;
