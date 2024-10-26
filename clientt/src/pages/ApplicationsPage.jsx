// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { GiStabbedNote } from "react-icons/gi";
// import Navbar from '../components/Navbar';

// const ApplicationsPage = () => {
//   const [applications, setApplications] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [error, setError] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true); // Loading state

//   useEffect(() => {
//     const fetchApplications = async () => {
//       const token = localStorage.getItem('token');

//       try {
//         const response = await fetch('http://localhost:5000/api/applications', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch applications');
//         }

//         const data = await response.json();
//         setApplications(data);
//       } catch (error) {
//         setError('Failed to fetch applications');
//         console.error(error);
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchApplications();
//   }, []);

//   const handleOpenModal = (application) => {
//     setSelectedApplication(application);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedApplication(null);
//   };

//   const handleStatusChange = async (newStatus) => {
//     if (!window.confirm(`Are you sure you want to change the status to ${newStatus}?`)) return;

//     const token = localStorage.getItem('token');

//     try {
//       const response = await fetch(`http://localhost:5000/api/applications/${selectedApplication._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update status');
//       }

//       const updatedApplication = await response.json();
//       setApplications((prevApplications) =>
//         prevApplications.map((app) =>
//           app._id === selectedApplication._id ? { ...app, status: updatedApplication.application.status } : app
//         )
//       );

//       setSelectedApplication((prev) => ({ ...prev, status: newStatus }));
//     } catch (error) {
//       setError('Failed to update status');
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <motion.div
//         className="min-h-screen flex flex-col bg-gray-50 p-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Applications</h1>
//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         {loading ? (
//           <p className="text-gray-500">Loading applications...</p>
//         ) : (
//           applications.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {applications.map((application) => (
//                 <motion.div
//                   key={application._id}
//                   className="p-4 border border-blue-600 rounded-lg shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
//                   onClick={() => handleOpenModal(application)}
//                   initial={{ scale: 1 }}
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <h3 className="text-xl font-semibold text-gray-800 flex items-center">
//                     <GiStabbedNote className="mr-2 text-blue-600" />
//                     Application from {application.studentId.name} to {application.teacherId.name}
//                   </h3>
//                   <p className={`text-gray-600 font-bold`}>
//                     Status: <span className={application.status === 'accepted' ? 'text-green-500' : application.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}>{application.status}</span>
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No applications found</p>
//           )
//         )}

//         {/* Modal */}
//         {isModalOpen && selectedApplication && (
//           <motion.div
//             className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg">
//               <h2 className="text-2xl font-bold mb-4 text-gray-800">
//                 Application Details
//               </h2>
//               <p><strong className="text-gray-800">Student Name:</strong> {selectedApplication.studentId.name}</p>
//               <p><strong className="text-gray-800">Teacher Name:</strong> {selectedApplication.teacherId.name}</p>
              
//               {/* Render content line by line */}
//               <div>
//                 <strong className="text-gray-800">Content:</strong>
//                 {selectedApplication.content.split('\n').map((line, index) => (
//                   <p key={index} className="text-gray-600">{line}</p>
//                 ))}
//               </div>
              
//               <p><strong className="text-gray-800">Created At:</strong> {new Date(selectedApplication.createdAt).toLocaleDateString()}</p>

//               {/* Status Change Dropdown */}
//               <div className="mt-4">
//                 <label className="block mb-2 font-semibold text-gray-800">Change Status:</label>
//                 <select
//                   value={selectedApplication.status}
//                   onChange={(e) => handleStatusChange(e.target.value)}
//                   className="p-2 border border-gray-300 rounded w-full"
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="accepted">Accepted</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </div>

//               <div className="flex justify-end mt-6">
//                 <button
//                   className="flex items-center px-4 py-2 bg-yellow-400 text-black rounded hover:bg-gradient-to-l transition duration-200"
//                   onClick={handleCloseModal}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default ApplicationsPage;

// -----------------------------^working


import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GiStabbedNote } from "react-icons/gi";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../components/Navbar';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:5000/api/applications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        setError('Failed to fetch applications');
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchApplications();
  }, []);

  const handleOpenModal = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  const handleStatusChange = async (newStatus) => {
    if (!window.confirm(`Are you sure you want to change the status to ${newStatus}?`)) return;

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/applications/${selectedApplication._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedApplication = await response.json();
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === selectedApplication._id ? { ...app, status: updatedApplication.application.status } : app
        )
      );

      setSelectedApplication((prev) => ({ ...prev, status: newStatus }));
    } catch (error) {
      setError('Failed to update status');
      console.error(error);
    }
  };

  // Navigate to create leave application page
  const handleCreateLeaveApplication = () => {
    navigate('/leaveapplication'); // Ensure this route exists
  };

  return (
    <div>
      <Navbar />
      <motion.div
        className="min-h-screen flex flex-col bg-gray-50 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Applications</h1>

        {/* Create Leave Application Button */}
        <button
          onClick={handleCreateLeaveApplication}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Create Leave Application
        </button>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? (
          <p className="text-gray-500">Loading applications...</p>
        ) : (
          applications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((application) => (
                <motion.div
                  key={application._id}
                  className="p-4 border border-blue-600 rounded-lg shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => handleOpenModal(application)}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    <GiStabbedNote className="mr-2 text-blue-600" />
                    Application from {application.studentId.name} to {application.teacherId.name}
                  </h3>
                  <p className={`text-gray-600 font-bold`}>
                    Status: <span className={application.status === 'accepted' ? 'text-green-500' : application.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}>{application.status}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No applications found</p>
          )
        )}

        {/* Modal */}
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
                Application Details
              </h2>
              <p><strong className="text-gray-800">Student Name:</strong> {selectedApplication.studentId.name}</p>
              <p><strong className="text-gray-800">Teacher Name:</strong> {selectedApplication.teacherId.name}</p>
              
              {/* Render content line by line */}
              <div>
                <strong className="text-gray-800">Content:</strong>
                {selectedApplication.content.split('\n').map((line, index) => (
                  <p key={index} className="text-gray-600">{line}</p>
                ))}
              </div>
              
              <p><strong className="text-gray-800">Created At:</strong> {new Date(selectedApplication.createdAt).toLocaleDateString()}</p>

              {/* Status Change Dropdown */}
              <div className="mt-4">
                <label className="block mb-2 font-semibold text-gray-800">Change Status:</label>
                <select
                  value={selectedApplication.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full"
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="flex justify-end mt-6">
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
    </div>
  );
};

export default ApplicationsPage;


