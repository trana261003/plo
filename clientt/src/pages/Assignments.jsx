// import React, { useEffect, useState } from 'react';

// const Assignments = () => {
//   const [assignments, setAssignments] = useState([]); // Initialize with an empty array

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Fetch token from localStorage

//         if (!token) {
//           throw new Error('No token found');
//         }

//         const response = await fetch('http://localhost:5000/api/assignments', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`, // Include token in the Authorization header
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }

//         const data = await response.json(); // Parse the response as JSON
//         console.log('API response:', data); // Debugging line

//         // Ensure that the response is an array
//         if (Array.isArray(data)) {
//           setAssignments(data); // Set data if it's an array
//         } else {
//           console.error('Response is not an array:', data);
//           setAssignments([]); // Set to empty array if response is not an array
//         }
//       } catch (error) {
//         console.error('Error fetching assignments:', error);
//         setAssignments([]); // Ensure assignments is an array even on error
//       }
//     };

//     fetchAssignments();
//   }, []);

//   return (
//     <div>
//       <h1>Assignments</h1>
//       {assignments.length > 0 ? (
//         <ul>
//           {assignments.map((assignment) => (
//             <li key={assignment._id}>{assignment.title}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No assignments found</p>
//       )}
//     </div>
//   );
// };

// export default Assignments;





// import React, { useEffect, useState } from 'react';

// const Assignments = () => {
//   const [assignments, setAssignments] = useState([]); // Initialize with an empty array

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Fetch token from localStorage

//         if (!token) {
//           throw new Error('No token found');
//         }

//         const response = await fetch('http://localhost:5000/api/assignments', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`, // Include token in the Authorization header
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }

//         const data = await response.json(); // Parse the response as JSON
//         console.log('API response:', data); // Debugging line

//         // Ensure that the response is an array
//         if (Array.isArray(data)) {
//           setAssignments(data); // Set data if it's an array
//         } else {
//           console.error('Response is not an array:', data);
//           setAssignments([]); // Set to empty array if response is not an array
//         }
//       } catch (error) {
//         console.error('Error fetching assignments:', error);
//         setAssignments([]); // Ensure assignments is an array even on error
//       }
//     };

//     fetchAssignments();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-5">
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-8 text-center text-blue-500">Your Assignments</h1>

//         {assignments.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {assignments.map((assignment) => (
//               <div 
//                 key={assignment._id} 
//                 className="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white"
//               >
//                 <h2 className="text-xl font-semibold mb-3 text-gray-800">{assignment.title}</h2>
//                 <p className="text-gray-600 mb-4">{assignment.content.slice(0, 100)}...</p>
//                 <span className="block text-gray-500 text-sm">Assigned by: {assignment.name}</span>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No assignments found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Assignments;






// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // For navigation

// const Assignments = () => {
//   const [assignments, setAssignments] = useState([]);
//   const navigate = useNavigate(); // Initialize navigate function

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const token = localStorage.getItem('token');

//         if (!token) {
//           throw new Error('No token found');
//         }

//         const response = await fetch('http://localhost:5000/api/assignments', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }

//         const data = await response.json();
//         if (Array.isArray(data)) {
//           setAssignments(data);
//         } else {
//           setAssignments([]);
//         }
//       } catch (error) {
//         console.error('Error fetching assignments:', error);
//         setAssignments([]);
//       }
//     };

//     fetchAssignments();
//   }, []);

//   const handleAssignmentClick = (assignmentId) => {
//     // Navigate to the assignment detail page with the selected assignment ID
//     navigate(`/assignments/${assignmentId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-5">
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-8 text-center text-blue-500">Your Assignments</h1>

//         {assignments.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {assignments.map((assignment) => (
//               <div
//                 key={assignment._id}
//                 className="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white cursor-pointer"
//                 onClick={() => handleAssignmentClick(assignment._id)} // Handle click event
//               >
//                 <h2 className="text-xl font-semibold mb-3 text-gray-800">{assignment.title}</h2>
//                 <p className="text-gray-600 mb-4">{assignment.content.slice(0, 100)}...</p>
//                 <span className="block text-gray-500 text-sm">Assigned by: {assignment.teacherName}</span>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No assignments found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Assignments;





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Assignments = () => {
//   const [assignments, setAssignments] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('No token found');

//         const response = await fetch('http://localhost:5000/api/assignments', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) throw new Error(`Error: ${response.status}`);
//         const data = await response.json();
//         setAssignments(data);
//       } catch (error) {
//         console.error('Error fetching assignments:', error);
//       }
//     };

//     fetchAssignments();
//   }, []);

//   const handleAssignmentClick = (assignmentId) => {
//     navigate(`/assignments/${assignmentId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-5">
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-8 text-center text-blue-500">Your Assignments</h1>
//         {assignments.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {assignments.map((assignment) => (
//               <div
//                 key={assignment._id}
//                 className="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white cursor-pointer"
//                 onClick={() => handleAssignmentClick(assignment._id)}
//               >
//                 <h2 className="text-xl font-semibold mb-3 text-gray-800">{assignment.title}</h2>
//                 <p className="text-gray-600 mb-4">{assignment.content.slice(0, 100)}...</p>
//                 <span className="block text-gray-500 text-sm">Assigned by: {assignment.teacherId.name}</span>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No assignments found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Assignments;




// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Assignments = () => {
//   const [assignments, setAssignments] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('No token found');

//         const response = await fetch('http://localhost:5000/api/assignments', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) throw new Error(`Error: ${response.status}`);
//         const data = await response.json();
//         setAssignments(data);
//       } catch (error) {
//         console.error('Error fetching assignments:', error);
//       }
//     };

//     fetchAssignments();
//   }, []);

//   const handleAssignmentClick = (assignmentId) => {
//     navigate(`/assignments/${assignmentId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-5">
//       <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Your Assignments</h1>
//         {assignments.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {assignments.map((assignment) => (
//               <div
//                 key={assignment._id}
//                 className="p-5 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white cursor-pointer transform hover:scale-105"
//                 onClick={() => handleAssignmentClick(assignment._id)}
//               >
//                 <h2 className="text-xl font-semibold mb-3 text-gray-800">{assignment.title}</h2>
//                 <p className="text-gray-600 mb-4">{assignment.content.slice(0, 100)}...</p>
//                 <span className="block text-gray-500 text-sm">Assigned by: {assignment.teacherId.name}</span>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No assignments found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Assignments;




// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Navbar1 from '../components/Navbar1';

// const Assignments = () => {
//   const [assignments, setAssignments] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('No token found');

//         const response = await fetch('http://localhost:5000/api/assignments', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) throw new Error(`Error: ${response.status}`);
//         const data = await response.json();
//         setAssignments(data);
//       } catch (error) {
//         console.error('Error fetching assignments:', error);
//       }
//     };

//     fetchAssignments();
//   }, []);

//   const handleAssignmentClick = (assignmentId) => {
//     navigate(`/assignments/${assignmentId}`);
//   };

//   return (
//     <div>
//       <Navbar1/>
//       <div className="min-h-screen bg-gray-100 py-10 px-5">
//       <motion.div
//         className="max-w-full mx-auto bg-white shadow-lg rounded-lg p-6"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Your Assignments</h1>
//         {assignments.length > 0 ? (
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             {assignments.map((assignment) => (
//               <motion.div
//                 key={assignment._id}
//                 className="p-5 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white cursor-pointer transform hover:scale-105"
//                 onClick={() => handleAssignmentClick(assignment._id)}
//                 whileHover={{ scale: 1.05 }} // Scale on hover
//                 initial={{ opacity: 0, y: 10 }} // Initial state for cards
//                 animate={{ opacity: 1, y: 0 }} // Animate to visible
//                 transition={{ duration: 0.3 }} // Duration of the animation
//               >
//                 <h2 className="text-xl font-semibold mb-3 text-gray-800">{assignment.title}</h2>
//                 <p className="text-gray-600 mb-4">{assignment.content.slice(0, 100)}...</p>
//                 <span className="block text-gray-500 text-sm">Assigned by: {assignment.teacherId.name}</span>
//               </motion.div>
//             ))}
//           </motion.div>
//         ) : (
//           <p className="text-center text-gray-500">No assignments found.</p>
//         )}
//       </motion.div>
//     </div>
//     </div>
//   );
// };

// export default Assignments;





import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsPersonWorkspace } from "react-icons/bs";
import Navbar1 from '../components/Navbar1';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch('http://localhost:5000/api/assignments', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  const handleAssignmentClick = (assignmentId) => {
    navigate(`/assignments/${assignmentId}`);
  };

  return (
    <div>
      <Navbar1 />

      <div className="min-h-screen bg-gradient-to-br from-grey-100 to-grey-200 py-10 px-5">
        <motion.div
          className="max-w-full mx-auto bg-white shadow-lg rounded-lg p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Your Assignments</h1>
          {assignments.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* {assignments.map((assignment) => (
                <motion.div
                  key={assignment._id}
                  className="p-5 border border-blue-300 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => handleAssignmentClick(assignment._id)}
                  whileHover={{ scale: 1.05 }} // Scale on hover
                  initial={{ opacity: 0, y: 10 }} // Initial state for cards
                  animate={{ opacity: 1, y: 0 }} // Animate to visible
                  transition={{ duration: 0.3 }} // Duration of the animation
                >
                  <h2 className="text-xl font-semibold mb-3 text-blue-800">
                    <BsPersonWorkspace className='mr-2 text-xl'/>{assignment.title}</h2>
                  <p className="text-gray-700 mb-4">{assignment.content.slice(0, 100)}...</p>
                  <span className="block text-gray-600 text-sm">Assigned by: {assignment.teacherId.name}</span>
                </motion.div>
              ))} */}

              {assignments.map((assignment) => (
                <motion.div
                  key={assignment._id}
                  className="p-5 border border-blue-300 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => handleAssignmentClick(assignment._id)}
                  whileHover={{ scale: 1.05 }} // Scale on hover
                  initial={{ opacity: 0, y: 10 }} // Initial state for cards
                  animate={{ opacity: 1, y: 0 }} // Animate to visible
                  transition={{ duration: 0.3 }} // Duration of the animation
                >
                  <h2 className="text-xl font-semibold mb-3 text-blue-800 flex items-center">
                    <BsPersonWorkspace className='mr-2 text-xl' />
                    {assignment.title}
                  </h2>
                  <p className="text-gray-700 mb-4">{assignment.content.slice(0, 100)}...</p>
                  <span className="block text-gray-600 text-sm">Assigned by: {assignment.teacherId.name}</span>
                </motion.div>
              ))}

            </motion.div>
          ) : (
            <p className="text-center text-gray-600">No assignments found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Assignments;
