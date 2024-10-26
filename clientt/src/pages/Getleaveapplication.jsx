// src/components/LeaveApplications.js

import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoNotificationsCircle } from 'react-icons/io5';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import HodNavbar from '../components/HodNavbar';

const LeaveApplications = () => {
    const [leaveApplications, setLeaveApplications] = useState([]);
    const [error, setError] = useState('');
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchLeaveApplications = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/leave-applications', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch leave applications');
                }

                const data = await response.json();
                setLeaveApplications(data);
            } catch (error) {
                console.error('Error fetching leave applications:', error);
                setError('Error fetching leave applications');
            }
        };

        fetchLeaveApplications();
    }, []);

    const handleApplicationClick = (application) => {
        setSelectedApplication(application);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedApplication(null);
    };

    const handleDeleteApplication = async () => {
        if (!selectedApplication) return;

        try {
            const response = await fetch(`http://localhost:5000/api/leave-applications/${selectedApplication._id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete leave application');
            }

            setLeaveApplications((prevApplications) => prevApplications.filter((app) => app._id !== selectedApplication._id));
            handleCloseModal();
        } catch (error) {
            console.error('Error deleting leave application:', error);
            setError('Error deleting leave application');
        }
    };

    return (
        <div>
            <HodNavbar />
            <motion.div
                className="min-h-screen flex flex-col bg-gray-50 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Leave Applications</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {leaveApplications.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {leaveApplications.map((application) => (
                            <motion.div
                                key={application._id}
                                className="p-4 border border-blue-600 rounded-lg shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => handleApplicationClick(application)}
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                                    <IoNotificationsCircle className="mr-2 text-blue-600" /> {application.title}
                                </h3>
                                <p className="text-gray-600">{application.content}</p>
                                <p className="text-sm text-blue-800">Submitted by: {application.staffId.name}</p>
                                <p className="text-xs text-blue-800">Leave Start Date: {new Date(application.leaveStartDate).toLocaleDateString()}</p>
                                <p className="text-xs text-blue-800">Leave End Date: {new Date(application.leaveEndDate).toLocaleDateString()}</p>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No leave applications available</p>
                )}

                {isModalOpen && selectedApplication && (
                    <motion.div
                        className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                <IoNotificationsCircle className="mr-2 text-blue-600" /> {selectedApplication.title}
                            </h2>
                            <p className="mb-4">{selectedApplication.content}</p>
                            <p className="text-sm text-blue-900">Submitted by: {selectedApplication.staffId.name}</p>
                            <p className="text-xs text-blue-900">Leave Start Date: {new Date(selectedApplication.leaveStartDate).toLocaleDateString()}</p>
                            <p className="text-xs text-blue-900">Leave End Date: {new Date(selectedApplication.leaveEndDate).toLocaleDateString()}</p>

                            <div className="flex justify-end mt-4">
                                <button
                                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 mr-2"
                                    onClick={handleDeleteApplication}
                                >
                                    <FaTrash className="mr-1" /> Delete Application
                                </button>
                                <button
                                    className="flex items-center px-4 py-2 bg-yellow-400 text-black rounded hover:bg-gradient-to-l transition duration-200"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
            <ToastContainer />
        </div>
    );
};

export default LeaveApplications;



// src/components/LeaveApplications.js

// import React, { useEffect, useState } from 'react';
// import { FaTrash } from 'react-icons/fa';
// import { IoNotificationsCircle } from 'react-icons/io5';
// import Navbar from '../components/Navbar';
// import { motion } from 'framer-motion';
// import { ToastContainer, toast } from 'react-toastify';
// import HodNavbar from '../components/HodNavbar';
// import 'react-toastify/dist/ReactToastify.css';

// const LeaveApplications = () => {
//     const [leaveApplications, setLeaveApplications] = useState([]);
//     const [error, setError] = useState('');
//     const [selectedApplication, setSelectedApplication] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newStatus, setNewStatus] = useState('');

//     useEffect(() => {
//         const fetchLeaveApplications = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/leave-applications', {
//                     method: 'GET',
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch leave applications');
//                 }

//                 const data = await response.json();
//                 setLeaveApplications(data);
//             } catch (error) {
//                 console.error('Error fetching leave applications:', error);
//                 setError('Error fetching leave applications');
//             }
//         };

//         fetchLeaveApplications();
//     }, []);

//     const handleApplicationClick = (application) => {
//         setSelectedApplication(application);
//         setNewStatus(application.status); // Set current status
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setSelectedApplication(null);
//     };

//     const handleDeleteApplication = async () => {
//         if (!selectedApplication) return;

//         try {
//             const response = await fetch(`http://localhost:5000/api/leave-applications/${selectedApplication._id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete leave application');
//             }

//             setLeaveApplications((prevApplications) => prevApplications.filter((app) => app._id !== selectedApplication._id));
//             handleCloseModal();
//             toast.success('Leave application deleted successfully');
//         } catch (error) {
//             console.error('Error deleting leave application:', error);
//             setError('Error deleting leave application');
//         }
//     };

//     const handleChangeStatus = async () => {
//         if (!selectedApplication || !newStatus) return;

//         try {
//             const response = await fetch(`http://localhost:5000/api/leave-applications/${selectedApplication._id}/status`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({ status: newStatus }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to update status');
//             }

//             const updatedApplication = await response.json();
//             setLeaveApplications((prevApplications) =>
//                 prevApplications.map((app) =>
//                     app._id === selectedApplication._id ? { ...app, status: newStatus } : app
//                 )
//             );
//             handleCloseModal();
//             toast.success('Status updated successfully');
//         } catch (error) {
//             console.error('Error updating status:', error);
//             setError('Error updating status');
//         }
//     };

//     return (
//         <div>
//             <HodNavbar />
//             <motion.div
//                 className="min-h-screen flex flex-col bg-gray-50 p-6"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Leave Applications</h1>
//                 {error && <p className="text-red-500 mb-4">{error}</p>}

//                 {leaveApplications.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {leaveApplications.map((application) => (
//                             <motion.div
//                                 key={application._id}
//                                 className="p-4 border border-blue-600 rounded-lg shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
//                                 onClick={() => handleApplicationClick(application)}
//                                 initial={{ scale: 1 }}
//                                 whileHover={{ scale: 1.05 }}
//                             >
//                                 <h3 className="text-xl font-semibold text-gray-800 flex items-center">
//                                     <IoNotificationsCircle className="mr-2 text-blue-600" /> {application.title}
//                                 </h3>
//                                 <p className="text-gray-600">{application.content}</p>
//                                 <p className="text-sm text-blue-800">Submitted by: {application.staffId.name}</p>
//                                 <p className="text-xs text-blue-800">Leave Start Date: {new Date(application.leaveStartDate).toLocaleDateString()}</p>
//                                 <p className="text-xs text-blue-800">Leave End Date: {new Date(application.leaveEndDate).toLocaleDateString()}</p>
//                                 <p className="text-xs font-bold mt-2">Status: {application.status}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-gray-500">No leave applications available</p>
//                 )}

//                 {isModalOpen && selectedApplication && (
//                     <motion.div
//                         className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg">
//                             <h2 className="text-2xl font-bold mb-4 text-gray-800">
//                                 <IoNotificationsCircle className="mr-2 text-blue-600" /> {selectedApplication.title}
//                             </h2>
//                             <p className="mb-4">{selectedApplication.content}</p>
//                             <p className="text-sm text-blue-900">Submitted by: {selectedApplication.staffId.name}</p>
//                             <p className="text-xs text-blue-900">Leave Start Date: {new Date(selectedApplication.leaveStartDate).toLocaleDateString()}</p>
//                             <p className="text-xs text-blue-900">Leave End Date: {new Date(selectedApplication.leaveEndDate).toLocaleDateString()}</p>
//                             <div className="mt-4">
//                                 <label className="block font-semibold">Change Status:</label>
//                                 <select
//                                     value={newStatus}
//                                     onChange={(e) => setNewStatus(e.target.value)}
//                                     className="w-full border border-gray-300 rounded px-2 py-1"
//                                 >
//                                     <option value="pending">Pending</option>
//                                     <option value="approved">Approved</option>
//                                     <option value="rejected">Rejected</option>
//                                 </select>
//                             </div>
//                             <div className="flex justify-end mt-4">
//                                 <button
//                                     className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 mr-2"
//                                     onClick={handleChangeStatus}
//                                 >
//                                     Update Status
//                                 </button>
//                                 <button
//                                     className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 mr-2"
//                                     onClick={handleDeleteApplication}
//                                 >
//                                     <FaTrash className="mr-1" /> Delete Application
//                                 </button>
//                                 <button
//                                     className="flex items-center px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition duration-200"
//                                     onClick={handleCloseModal}
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </motion.div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default LeaveApplications;
