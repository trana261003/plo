// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar1 from '../components/Navbar1';
// import { motion } from 'framer-motion'; // Import motion from framer-motion

// const CreateApplication = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [teacherId, setTeacherId] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const studentId = '671a4d5849de7f43907753c6'; // Replace with the actual student ID

//         try {
//             const response = await fetch('http://localhost:5000/api/applications', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({
//                     studentId,
//                     teacherId,
//                     title,
//                     content,
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 console.error('Error Data:', errorData);
//                 throw new Error(errorData.message || 'An error occurred');
//             }

//             if (response.status === 201) {
//                 toast.success('Application created successfully!', {
//                     autoClose: 3000,
//                 });

//                 setTimeout(() => {
//                     navigate('/student-dashboard');
//                 }, 4000);
//             }
//         } catch (err) {
//             console.error(err);
//             setError(err.message);
//         }
//     };

//     return (
//         <div>
//             <Navbar1 />
//             <motion.div
//                 className="container mx-auto p-4"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <h2 className="text-3xl font-bold mb-4 text-center">Create Application</h2>
//                 {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//                 <motion.form onSubmit={handleSubmit} className="space-y-6">
//                     <motion.div
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <label htmlFor="title" className="block mb-1 font-semibold">Title</label>
//                         <input
//                             type="text"
//                             id="title"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                             required
//                         />
//                     </motion.div>

//                     <motion.div
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <label htmlFor="content" className="block mb-1 font-semibold">Content</label>
//                         <textarea
//                             id="content"
//                             value={content}
//                             onChange={(e) => setContent(e.target.value)}
//                             className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                             required
//                         ></textarea>
//                     </motion.div>

//                     <motion.div
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <label htmlFor="teacherId" className="block mb-1 font-semibold">Teacher ID</label>
//                         <input
//                             type="text"
//                             id="teacherId"
//                             value={teacherId.name}
//                             onChange={(e) => setTeacherId(e.target.value)}
//                             className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                             required
//                         />
//                     </motion.div>

//                     <motion.button
//                         type="submit"
//                         className="w-full bg-yellow-400 text-black p-3 rounded hover:bg-yellow-300 transition duration-200"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                     >
//                         Create Application
//                     </motion.button>
//                 </motion.form>
//             </motion.div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default CreateApplication;







// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar1 from '../components/Navbar1';
// import { motion } from 'framer-motion';

// const CreateApplication = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [teacherId, setTeacherId] = useState('');
//     const [error, setError] = useState(null);
//     const [applications, setApplications] = useState([]);
//     const [isCreating, setIsCreating] = useState(true); // Toggle between creating and viewing applications
//     const [selectedStatus, setSelectedStatus] = useState(null); // State to hold the status of the selected application
//     const navigate = useNavigate();

//     // Fetch student and teacher data
//     const fetchUserData = async () => {
//         const studentId = '671a4d5849de7f43907753c6'; // Replace with the actual student ID
//         try {
//             const response = await fetch(`http://localhost:5000/api/users/${studentId}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             const studentData = await response.json();

//             // Assuming you want to fetch the teacher's data based on some criteria
//             const teacherResponse = await fetch(`http://localhost:5000/api/users/teachers`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             const teacherData = await teacherResponse.json();

//             // Set the teacher ID to the first teacher's ID (you can customize this as needed)
//             setTeacherId(teacherData[0]._id); // Adjust as necessary based on your data structure

//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             setError(error.message);
//         }
//     };

//     const fetchUserApplications = async () => {
//         const studentId = '671a4d5849de7f43907753c6'; // Replace with the actual student ID
//         try {
//             const response = await fetch(`http://localhost:5000/api/applications/applications/${studentId}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             const data = await response.json();
//             setApplications(data);
//         } catch (error) {
//             console.error('Error fetching applications:', error);
//             setError(error.message);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const studentId = '671a4d5849de7f43907753c6'; // Replace with the actual student ID

//         try {
//             const response = await fetch('http://localhost:5000/api/applications', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({
//                     studentId,
//                     teacherId,
//                     title,
//                     content,
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 console.error('Error Data:', errorData);
//                 throw new Error(errorData.message || 'An error occurred');
//             }

//             if (response.status === 201) {
//                 toast.success('Application created successfully!', {
//                     autoClose: 3000,
//                 });

//                 // Refresh the applications after creating a new one
//                 fetchUserApplications();
//                 setIsCreating(false); // Switch to the application sent view
//                 setTitle('');
//                 setContent('');
//             }
//         } catch (err) {
//             console.error(err);
//             setError(err.message);
//         }
//     };

//     const toggleView = () => {
//         setIsCreating((prev) => !prev);
//         if (isCreating) {
//             fetchUserApplications(); // Fetch applications only when switching to the view mode
//         }
//     };

//     const handleApplicationClick = (app) => {
//         // Fetch the status for the clicked application (if not already available)
//         setSelectedStatus(app.status); // Assuming app.status is the property that holds the status
//     };

//     useEffect(() => {
//         fetchUserData();
//     }, []);

//     return (
//         <div>
//             <Navbar1 />
//             <motion.div
//                 className="container mx-auto p-4"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <h2 className="text-3xl font-bold mb-4 text-center">{isCreating ? 'Create Application' : 'Sent Applications'}</h2>
//                 {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
//                 {isCreating ? (
//                     <motion.form onSubmit={handleSubmit} className="space-y-6">
//                         <motion.div
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.5 }}
//                         >
//                             <label htmlFor="title" className="block mb-1 font-semibold">Title</label>
//                             <input
//                                 type="text"
//                                 id="title"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                                 required
//                             />
//                         </motion.div>

//                         <motion.div
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.5 }}
//                         >
//                             <label htmlFor="content" className="block mb-1 font-semibold">Content</label>
//                             <textarea
//                                 id="content"
//                                 value={content}
//                                 onChange={(e) => setContent(e.target.value)}
//                                 className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                                 required
//                             ></textarea>
//                         </motion.div>

//                         <motion.div
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.5 }}
//                         >
//                             <label htmlFor="teacherId" className="block mb-1 font-semibold">Teacher ID</label>
//                             <input
//                                 type="text"
//                                 id="teacherId"
//                                 value={teacherId} // Use teacherId directly
//                                 onChange={(e) => setTeacherId(e.target.value)}
//                                 className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                                 required
//                             />
//                         </motion.div>

//                         <motion.button
//                             type="submit"
//                             className="w-full bg-yellow-400 text-black p-3 rounded hover:bg-yellow-300 transition duration-200"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             Create Application
//                         </motion.button>
//                     </motion.form>
//                 ) : (
//                     <div className="space-y-4">
//                         {applications.length === 0 ? (
//                             <p className="text-center text-gray-600">No applications sent yet.</p>
//                         ) : (
//                             applications.map((app) => (
//                                 <div 
//                                     key={app._id} 
//                                     className="border p-4 rounded shadow cursor-pointer"
//                                     onClick={() => handleApplicationClick(app)} // Add click handler
//                                 >
//                                     <h3 className="font-semibold">{app.title}</h3>
//                                     <p>{app.content}</p>
//                                     <p className="text-gray-500">Submitted on: {new Date(app.createdAt).toLocaleDateString()}</p>
//                                     {/* Display status when an application is clicked */}
//                                     {selectedStatus && selectedStatus === app.status && (
//                                         <p className="mt-2 text-blue-600">Status: {app.status}</p>
//                                     )}
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 )}

//                 <div className="text-center mt-4">
//                     <button
//                         onClick={toggleView}
//                         className="text-blue-500 hover:underline"
//                     >
//                         {isCreating ? 'View Sent Applications' : 'Create New Application'}
//                     </button>
//                 </div>
//             </motion.div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default CreateApplication;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar1 from '../components/Navbar1';
// import { motion } from 'framer-motion';

// const CreateApplication = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [teacherId] = useState('YOUR_TEACHER_ID_HERE'); // Set the teacher ID directly
//     const [error, setError] = useState(null);
//     const [applications, setApplications] = useState([]);
//     const [isCreating, setIsCreating] = useState(true); // Toggle between creating and viewing applications
//     const [selectedStatus, setSelectedStatus] = useState(null); // State to hold the status of the selected application
//     const navigate = useNavigate();

//     // Fetch student applications
//     const fetchUserApplications = async () => {
//         const studentId = '671a4d5849de7f43907753c6'; // Replace with the actual student ID
//         try {
//             const response = await fetch(`http://localhost:5000/api/applications/applications/${studentId}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             const data = await response.json();
//             setApplications(data);
//         } catch (error) {
//             console.error('Error fetching applications:', error);
//             setError(error.message);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const studentId = '671a4d5849de7f43907753c6'; // Replace with the actual student ID

//         try {
//             const response = await fetch('http://localhost:5000/api/applications', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({
//                     studentId,
//                     teacherId, // Use the set teacher ID directly
//                     title,
//                     content,
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 console.error('Error Data:', errorData);
//                 throw new Error(errorData.message || 'An error occurred');
//             }

//             if (response.status === 201) {
//                 toast.success('Application created successfully!', {
//                     autoClose: 3000,
//                 });

//                 // Refresh the applications after creating a new one
//                 fetchUserApplications();
//                 setIsCreating(false); // Switch to the application sent view
//                 setTitle('');
//                 setContent('');
//             }
//         } catch (err) {
//             console.error(err);
//             setError(err.message);
//         }
//     };

//     const toggleView = () => {
//         setIsCreating((prev) => !prev);
//         if (isCreating) {
//             fetchUserApplications(); // Fetch applications only when switching to the view mode
//         }
//     };

//     const handleApplicationClick = (app) => {
//         // Fetch the status for the clicked application (if not already available)
//         setSelectedStatus(app.status); // Assuming app.status is the property that holds the status
//     };

//     useEffect(() => {
//         fetchUserApplications(); // You can remove this if you don't want to fetch applications on component mount
//     }, []);

//     return (
//         <div>
//             <Navbar1 />
//             <motion.div
//                 className="container mx-auto p-4"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <h2 className="text-3xl font-bold mb-4 text-center">{isCreating ? 'Create Application' : 'Sent Applications'}</h2>
//                 {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
//                 {isCreating ? (
//                     <motion.form onSubmit={handleSubmit} className="space-y-6">
//                         <motion.div
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.5 }}
//                         >
//                             <label htmlFor="title" className="block mb-1 font-semibold">Title</label>
//                             <input
//                                 type="text"
//                                 id="title"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                                 required
//                             />
//                         </motion.div>

//                         <motion.div
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.5 }}
//                         >
//                             <label htmlFor="content" className="block mb-1 font-semibold">Content</label>
//                             <textarea
//                                 id="content"
//                                 value={content}
//                                 onChange={(e) => setContent(e.target.value)}
//                                 className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                                 required
//                             ></textarea>
//                         </motion.div>

//                         <motion.button
//                             type="submit"
//                             className="w-full bg-yellow-400 text-black p-3 rounded hover:bg-yellow-300 transition duration-200"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             Create Application
//                         </motion.button>
//                     </motion.form>
//                 ) : (
//                     <div className="space-y-4">
//                         {applications.length === 0 ? (
//                             <p className="text-center text-gray-600">No applications sent yet.</p>
//                         ) : (
//                             applications.map((app) => (
//                                 <div 
//                                     key={app._id} 
//                                     className="border p-4 rounded shadow cursor-pointer"
//                                     onClick={() => handleApplicationClick(app)} // Add click handler
//                                 >
//                                     <h3 className="font-semibold">{app.title}</h3>
//                                     <p>{app.content}</p>
//                                     <p className="text-gray-500">Submitted on: {new Date(app.createdAt).toLocaleDateString()}</p>
//                                     {/* Display status when an application is clicked */}
//                                     {selectedStatus && selectedStatus === app.status && (
//                                         <p className="mt-2 text-blue-600">Status: {app.status}</p>
//                                     )}
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 )}

//                 <div className="text-center mt-4">
//                     <button
//                         onClick={toggleView}
//                         className="text-blue-500 hover:underline"
//                     >
//                         {isCreating ? 'View Sent Applications' : 'Create New Application'}
//                     </button>
//                 </div>
//             </motion.div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default CreateApplication;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar1 from '../components/Navbar1';
import { motion } from 'framer-motion';

const CreateApplication = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [teacherId, setTeacherId] = useState(''); // Keep this for user input
    const [error, setError] = useState(null);
    const [applications, setApplications] = useState([]);
    const [isCreating, setIsCreating] = useState(true); // Toggle between creating and viewing applications
    const [selectedStatus, setSelectedStatus] = useState(null); // State to hold the status of the selected application
    const navigate = useNavigate();

    // Fetch student applications
    const fetchUserApplications = async () => {
        const studentId = '671a4d5849de7f43907753c6'; // Replace with the actual student ID
        try {
            const response = await fetch(`http://localhost:5000/api/applications/applications/${studentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setApplications(data);
        } catch (error) {
            console.error('Error fetching applications:', error);
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const studentId = '671a4d5849de7f43907753c6'; // Replace with the actual student ID

        try {
            const response = await fetch('http://localhost:5000/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    studentId,
                    teacherId, // Send the manually entered teacherId
                    title,
                    content,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error Data:', errorData);
                throw new Error(errorData.message || 'An error occurred');
            }

            if (response.status === 201) {
                toast.success('Application created successfully!', {
                    autoClose: 3000,
                });

                // Refresh the applications after creating a new one
                fetchUserApplications();
                setIsCreating(false); // Switch to the application sent view
                setTitle('');
                setContent('');
                setTeacherId(''); // Clear the teacherId field after submission
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    const toggleView = () => {
        setIsCreating((prev) => !prev);
        if (isCreating) {
            fetchUserApplications(); // Fetch applications only when switching to the view mode
        }
    };

    const handleApplicationClick = (app) => {
        // Fetch the status for the clicked application (if not already available)
        setSelectedStatus(app.status); // Assuming app.status is the property that holds the status
    };

    useEffect(() => {
        // Only fetch user applications on mount
        fetchUserApplications();
    }, []);

    return (
        <div>
            <Navbar1 />
            <motion.div
                className="container mx-auto p-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-4 text-center">{isCreating ? 'Create Application' : 'Sent Applications'}</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                {isCreating ? (
                    <motion.form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <label htmlFor="title" className="block mb-1 font-semibold">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <label htmlFor="content" className="block mb-1 font-semibold">Content</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            ></textarea>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <label htmlFor="teacherId" className="block mb-1 font-semibold">Teacher ID</label>
                            <input
                                type="text"
                                id="teacherId"
                                value={teacherId} // Use teacherId directly
                                onChange={(e) => setTeacherId(e.target.value)}
                                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="w-full bg-yellow-400 text-black p-3 rounded hover:bg-yellow-300 transition duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Create Application
                        </motion.button>
                    </motion.form>
                ) : (
                    <div className="space-y-4">
                        {applications.length === 0 ? (
                            <p className="text-center text-gray-600">No applications sent yet.</p>
                        ) : (
                            applications.map((app) => (
                                <div 
                                    key={app._id} 
                                    className="border p-4 rounded shadow cursor-pointer"
                                    onClick={() => handleApplicationClick(app)} // Add click handler
                                >
                                    <h3 className="font-semibold">{app.title}</h3>
                                    <p>{app.content}</p>
                                    <p className="text-gray-500">Submitted on: {new Date(app.createdAt).toLocaleDateString()}</p>
                                    {/* Display status when an application is clicked */}
                                    {selectedStatus && selectedStatus === app.status && (
                                        <p className="mt-2 text-blue-600">Status: {app.status}</p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}

                <div className="text-center mt-4">
                    <button
                        onClick={toggleView}
                        className="text-blue-500 hover:underline"
                    >
                        {isCreating ? 'View Sent Applications' : 'Create New Application'}
                    </button>
                </div>
            </motion.div>
            <ToastContainer />
        </div>
    );
};

export default CreateApplication;
