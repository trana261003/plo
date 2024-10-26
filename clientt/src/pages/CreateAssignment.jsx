// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { ToastContainer, toast } from 'react-toastify';
// import { motion } from 'framer-motion'; // Import motion from framer-motion
// import 'react-toastify/dist/ReactToastify.css';

// const CreateAssignment = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [studentId, setStudentId] = useState('');
//     const [assignments, setAssignments] = useState([]);
//     const [error, setError] = useState(null);
//     const [isCreating, setIsCreating] = useState(true);
//     const [selectedAssignment, setSelectedAssignment] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editTitle, setEditTitle] = useState('');
//     const [editContent, setEditContent] = useState('');
//     const navigate = useNavigate();

//     // Fetch assignments
//     useEffect(() => {
//         const fetchAssignments = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/assignments', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.message || 'Failed to fetch assignments');
//                 }

//                 const data = await response.json();
//                 setAssignments(data);
//             } catch (err) {
//                 console.error(err);
//                 setError(err.message);
//             }
//         };

//         fetchAssignments();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const teacherId = '66f25b8f8e0e8acfad420896';

//         try {
//             const response = await fetch('http://localhost:5000/api/assignments', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({
//                     teacherId,
//                     studentId,
//                     title,
//                     content,
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'An error occurred');
//             }

//             if (response.status === 201) {
//                 toast.success('Assignment created successfully!', { autoClose: 3000 });
//                 setTimeout(() => navigate('/teacher-dashboard'), 4000);
//             }
//         } catch (err) {
//             console.error(err);
//             setError(err.message);
//         }
//     };

//     const handleAssignmentClick = (assignment) => {
//         setSelectedAssignment(assignment);
//         setEditTitle(assignment.title);
//         setEditContent(assignment.content);
//         setIsEditing(false);
//     };

//     const closeModal = () => {
//         setSelectedAssignment(null);
//         setIsEditing(false);
//     };

//     const handleEdit = () => {
//         setIsEditing(true);
//     };

//     const handleEditSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch(`http://localhost:5000/api/assignments/${selectedAssignment._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({
//                     title: editTitle,
//                     content: editContent,
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'An error occurred while updating');
//             }

//             toast.success('Assignment updated successfully!', { autoClose: 3000 });
//             setAssignments(assignments.map(a => a._id === selectedAssignment._id ? { ...a, title: editTitle, content: editContent } : a));
//             closeModal();
//         } catch (err) {
//             console.error(err);
//             setError(err.message);
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <motion.div // Added motion.div here
//                 initial={{ opacity: 0, y: 50 }} 
//                 animate={{ opacity: 1, y: 0 }} 
//                 transition={{ duration: 0.5 }} 
//                 className="min-h-screen flex flex-col bg-gray-50 p-6"
//             >
//                 <div className="container mx-auto p-4">
//                     <h2 className="text-3xl font-bold mb-6 text-center">Manage Assignments</h2>
//                     <div className="flex justify-center mb-6">
//                         <button
//                             className={`px-4 py-2 font-semibold ${isCreating ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200'} rounded-l-lg hover:bg-yellow-300`}
//                             onClick={() => setIsCreating(true)}
//                         >
//                             Create Assignment
//                         </button>
//                         <button
//                             className={`px-4 py-2 font-semibold ${!isCreating ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200'} rounded-r-lg hover:bg-yellow-300`}
//                             onClick={() => setIsCreating(false)}
//                         >
//                             Uploaded Assignments
//                         </button>
//                     </div>

//                     {isCreating ? (
//                         <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
//                             {error && <p className="text-red-500">{error}</p>}
//                             <div>
//                                 <label htmlFor="title" className="block mb-1">Title</label>
//                                 <input
//                                     type="text"
//                                     id="title"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="content" className="block mb-1">Content</label>
//                                 <textarea
//                                     id="content"
//                                     value={content}
//                                     onChange={(e) => setContent(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded"
//                                     required
//                                 ></textarea>
//                             </div>
//                             <div>
//                                 <label htmlFor="studentId" className="block mb-1">Student ID</label>
//                                 <input
//                                     type="text"
//                                     id="studentId"
//                                     value={studentId}
//                                     onChange={(e) => setStudentId(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded"
//                                     required
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="bg-yellow-400 text-gray-800 p-2 rounded hover:bg-yellow-300 w-full"
//                             >
//                                 Create Assignment
//                             </button>
//                         </form>
//                     ) : (
//                         <div className="bg-white p-6 rounded-lg shadow-md">
//                             <h3 className="text-xl font-semibold mb-4">Uploaded Assignments</h3>
//                             {assignments.length > 0 ? (
//                                 <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                                     {assignments.map((assignment) => (
//                                         <li
//                                             key={assignment._id}
//                                             className="border p-4 my-2 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
//                                             onClick={() => handleAssignmentClick(assignment)}
//                                         >
//                                             <h4 className="font-bold">{assignment.title}</h4>
//                                             <p>{assignment.content.substring(0, 50)}...</p>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p className="mt-2 text-gray-500">No assignments available.</p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//                 <ToastContainer />
//                 {selectedAssignment && !isEditing && ( // Modal for assignment details
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//                             <h3 className="text-2xl font-bold mb-2">{selectedAssignment.title}</h3>
//                             <p className="mb-4">{selectedAssignment.content}</p>
//                             <button
//                                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
//                                 onClick={handleEdit} // Handle edit click
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                                 onClick={closeModal}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 )}
//                 {isEditing && ( // Modal for editing assignment
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                         <form onSubmit={handleEditSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//                             <h3 className="text-2xl font-bold mb-4">Edit Assignment</h3>
//                             <div>
//                                 <label htmlFor="editTitle" className="block mb-1">Title</label>
//                                 <input
//                                     type="text"
//                                     id="editTitle"
//                                     value={editTitle}
//                                     onChange={(e) => setEditTitle(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="editContent" className="block mb-1">Content</label>
//                                 <textarea
//                                     id="editContent"
//                                     value={editContent}
//                                     onChange={(e) => setEditContent(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded"
//                                     required
//                                 ></textarea>
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="bg-yellow-400 text-gray-800 p-2 rounded hover:bg-yellow-300 w-full"
//                             >
//                                 Update Assignment
//                             </button>
//                         </form>
//                     </div>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default CreateAssignment;


// -----working-------.......v

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { ToastContainer, toast } from 'react-toastify';
// import { motion } from 'framer-motion';
// import 'react-toastify/dist/ReactToastify.css';

// const CreateAssignment = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [semester, setSemester] = useState(''); // New state for semester
//     const [assignments, setAssignments] = useState([]);
//     const [error, setError] = useState(null);
//     const [isCreating, setIsCreating] = useState(true);
//     const [selectedAssignment, setSelectedAssignment] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editTitle, setEditTitle] = useState('');
//     const [editContent, setEditContent] = useState('');
//     const navigate = useNavigate();

//     // Fetch assignments
//     useEffect(() => {
//         const fetchAssignments = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/assignments', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.message || 'Failed to fetch assignments');
//                 }

//                 const data = await response.json();
//                 setAssignments(data);
//             } catch (err) {
//                 console.error(err);
//                 setError(err.message);
//             }
//         };

//         fetchAssignments();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const teacherId = '66f25b8f8e0e8acfad420896'; // Use the appropriate teacherId from context or auth

//         try {
//             const response = await fetch('http://localhost:5000/api/assignments', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({
//                     teacherId,
//                     title,
//                     content,
//                     semester, // Send semester data to the backend
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'An error occurred');
//             }

//             if (response.status === 201) {
//                 toast.success('Assignment created successfully!', { autoClose: 3000 });
//                 setTimeout(() => navigate('/teacher-dashboard'), 4000);
//             }
//         } catch (err) {
//             console.error(err);
//             setError(err.message);
//         }
//     };

//     const handleAssignmentClick = (assignment) => {
//         setSelectedAssignment(assignment);
//         setEditTitle(assignment.title);
//         setEditContent(assignment.content);
//         setIsEditing(false);
//     };

//     const closeModal = () => {
//         setSelectedAssignment(null);
//         setIsEditing(false);
//     };

//     const handleEdit = () => {
//         setIsEditing(true);
//     };

//     const handleEditSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch(`http://localhost:5000/api/assignments/${selectedAssignment._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({
//                     title: editTitle,
//                     content: editContent,
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'An error occurred while updating');
//             }

//             toast.success('Assignment updated successfully!', { autoClose: 3000 });
//             setAssignments(assignments.map(a => a._id === selectedAssignment._id ? { ...a, title: editTitle, content: editContent } : a));
//             closeModal();
//         } catch (err) {
//             console.error(err);
//             setError(err.message);
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="min-h-screen flex flex-col bg-gray-50 p-6"
//             >
//                 <div className="container mx-auto p-4">
//                     <h2 className="text-3xl font-bold mb-6 text-center">Manage Assignments</h2>
//                     <div className="flex justify-center mb-6">
//                         <button
//                             className={`px-4 py-2 font-semibold ${isCreating ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200'} rounded-l-lg hover:bg-yellow-300`}
//                             onClick={() => setIsCreating(true)}
//                         >
//                             Create Assignment
//                         </button>
//                         <button
//                             className={`px-4 py-2 font-semibold ${!isCreating ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200'} rounded-r-lg hover:bg-yellow-300`}
//                             onClick={() => setIsCreating(false)}
//                         >
//                             Uploaded Assignments
//                         </button>
//                     </div>

//                     {isCreating ? (
//                         <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
//                             {error && <p className="text-red-500">{error}</p>}
//                             <div>
//                                 <label htmlFor="title" className="block mb-1">Title</label>
//                                 <input
//                                     type="text"
//                                     id="title"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="content" className="block mb-1">Content</label>
//                                 <textarea
//                                     id="content"
//                                     value={content}
//                                     onChange={(e) => setContent(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded"
//                                     required
//                                 ></textarea>
//                             </div>
//                             <div>
//                                 <label htmlFor="semester" className="block mb-1">Semester</label>
//                                 <input
//                                     type="text"
//                                     id="semester"
//                                     value={semester}
//                                     onChange={(e) => setSemester(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded"
//                                     required
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="bg-yellow-400 text-gray-800 p-2 rounded hover:bg-yellow-300 w-full"
//                             >
//                                 Create Assignment
//                             </button>
//                         </form>
//                     ) : (
//                         <div className="bg-white p-6 rounded-lg shadow-md">
//                             <h3 className="text-xl font-semibold mb-4">Uploaded Assignments</h3>
//                             {assignments.length > 0 ? (
//                                 <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                                     {assignments.map((assignment) => (
//                                         <li
//                                             key={assignment._id}
//                                             className="border p-4 my-2 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
//                                             onClick={() => handleAssignmentClick(assignment)}
//                                         >
//                                             <h4 className="font-bold">{assignment.title}</h4>
//                                             <p>{assignment.content.substring(0, 50)}...</p>
//                                             <p><strong>Semester:</strong> {assignment.semester}</p> {/* Display semester */}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p className="mt-2 text-gray-500">No assignments available.</p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//                 <ToastContainer />
//                 {selectedAssignment && !isEditing && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//                             <h3 className="text-2xl font-bold mb-2">{selectedAssignment.title}</h3>
//                             <p className="mb-4">{selectedAssignment.content}</p>
//                             <p><strong>Semester:</strong> {selectedAssignment.semester}</p> {/* Display semester in modal */}
//                             <button
//                                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
//                                 onClick={handleEdit}
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                                 onClick={closeModal}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 )}
//                 {selectedAssignment && isEditing && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//                             <h3 className="text-2xl font-bold mb-2">Edit Assignment</h3>
//                             <form onSubmit={handleEditSubmit} className="space-y-4">
//                                 <div>
//                                     <label htmlFor="editTitle" className="block mb-1">Title</label>
//                                     <input
//                                         type="text"
//                                         id="editTitle"
//                                         value={editTitle}
//                                         onChange={(e) => setEditTitle(e.target.value)}
//                                         className="w-full border border-gray-300 p-2 rounded"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="editContent" className="block mb-1">Content</label>
//                                     <textarea
//                                         id="editContent"
//                                         value={editContent}
//                                         onChange={(e) => setEditContent(e.target.value)}
//                                         className="w-full border border-gray-300 p-2 rounded"
//                                     ></textarea>
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
//                                 >
//                                     Save Changes
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default CreateAssignment;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const CreateAssignment = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [semester, setSemester] = useState(''); // State for semester
    const [dueDate, setDueDate] = useState(''); // State for due date
    const [points, setPoints] = useState(100); // State for points
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);
    const [isCreating, setIsCreating] = useState(true);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const navigate = useNavigate();

    // Fetch assignments
    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/assignments', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch assignments');
                }

                const data = await response.json();
                setAssignments(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };

        fetchAssignments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const teacherId = '66f25b8f8e0e8acfad420896'; // Use the appropriate teacherId from context or auth

        try {
            const response = await fetch('http://localhost:5000/api/assignments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    teacherId,
                    title,
                    content,
                    semester,
                    dueDate,  // Pass due date to the backend
                    points,   // Pass points to the backend
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }

            if (response.status === 201) {
                toast.success('Assignment created successfully!', { autoClose: 3000 });
                setTimeout(() => navigate('/teacher-dashboard'), 4000);
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div>
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen flex flex-col bg-gray-50 p-6"
            >
                <div className="container mx-auto p-4">
                    <h2 className="text-3xl font-bold mb-6 text-center">Create Assignment</h2>
                    {/* <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                        {error && <p className="text-red-500">{error}</p>}
                        <div>
                            <label htmlFor="title" className="block mb-1">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block mb-1">Content</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded"
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="semester" className="block mb-1">Semester</label>
                            <input
                                type="text"
                                id="semester"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="dueDate" className="block mb-1">Due Date</label>
                            <input
                                type="date"
                                id="dueDate"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="points" className="block mb-1">Points</label>
                            <input
                                type="number"
                                id="points"
                                value={points}
                                onChange={(e) => setPoints(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-yellow-400 text-gray-800 p-2 rounded hover:bg-yellow-300 w-full"
                        >
                            Create Assignment
                        </button>
                    </form> */}
                    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                        {error && <p className="text-red-500">{error}</p>}

                        <div className="flex flex-col space-y-4">
                            {/* Flex container to align title, dueDate, and points in a row */}
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label htmlFor="title" className="block mb-1 font-semibold">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full border border-gray-300 p-2 rounded"
                                        required
                                    />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="dueDate" className="block mb-1 font-semibold">Due Date</label>
                                    <input
                                        type="date"
                                        id="dueDate"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        className="w-full border border-gray-300 p-2 rounded"
                                        required
                                    />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="points" className="block mb-1 font-semibold">Points</label>
                                    <input
                                        type="number"
                                        id="points"
                                        value={points}
                                        onChange={(e) => setPoints(e.target.value)}
                                        className="w-full border border-gray-300 p-2 rounded"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="content" className="block mb-1 font-semibold">Content</label>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label htmlFor="semester" className="block mb-1 font-semibold">Semester</label>
                                <input
                                    type="text"
                                    id="semester"
                                    value={semester}
                                    onChange={(e) => setSemester(e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-yellow-400 text-gray-800 p-2 rounded hover:bg-yellow-300 w-full"
                            >
                                Create Assignment
                            </button>
                        </div>
                    </form>

                </div>
                <ToastContainer />
            </motion.div>
        </div>
    );
};

export default CreateAssignment;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { ToastContainer, toast } from 'react-toastify';
// import { motion } from 'framer-motion';
// import 'react-toastify/dist/ReactToastify.css';

// const CreateAssignment = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [studentId, setStudentId] = useState('');
//     const [dueDate, setDueDate] = useState(''); // New due date state
//     const [points, setPoints] = useState(''); // New points state
//     const [assignments, setAssignments] = useState([]);
//     const [error, setError] = useState(null);
//     const [isCreating, setIsCreating] = useState(true);
//     const [selectedAssignment, setSelectedAssignment] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editTitle, setEditTitle] = useState('');
//     const [editContent, setEditContent] = useState('');
//     const navigate = useNavigate();

//     // Fetch assignments
//     useEffect(() => {
//         const fetchAssignments = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/assignments', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.message || 'Failed to fetch assignments');
//                 }

//                 const data = await response.json();
//                 setAssignments(data);
//             } catch (err) {
//                 console.error(err);
//                 setError(err.message);
//             }
//         };

//         fetchAssignments();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const teacherId = '66f25b8f8e0e8acfad420896';

//         try {
//             const response = await fetch('http://localhost:5000/api/assignments', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({
//                     teacherId,
//                     studentId,
//                     title,
//                     content,
//                     dueDate, // Include due date
//                     points, // Include points
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'An error occurred');
//             }

//             if (response.status === 201) {
//                 toast.success('Assignment created successfully!', { autoClose: 3000 });
//                 setTimeout(() => navigate('/teacher-dashboard'), 4000);
//             }
//         } catch (err) {
//             console.error(err);
//             setError(err.message);
//         }
//     };

//     const handleAssignmentClick = (assignment) => {
//         setSelectedAssignment(assignment);
//         setEditTitle(assignment.title);
//         setEditContent(assignment.content);
//         setIsEditing(false);
//     };

//     const closeModal = () => {
//         setSelectedAssignment(null);
//         setIsEditing(false);
//     };

//     const handleEdit = () => {
//         setIsEditing(true);
//     };

//     const handleEditSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch(`http://localhost:5000/api/assignments/${selectedAssignment._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({
//                     title: editTitle,
//                     content: editContent,
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'An error occurred while updating');
//             }

//             toast.success('Assignment updated successfully!', { autoClose: 3000 });
//             setAssignments(assignments.map(a => a._id === selectedAssignment._id ? { ...a, title: editTitle, content: editContent } : a));
//             closeModal();
//         } catch (err) {
//             console.error(err);
//             setError(err.message);
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="min-h-screen flex flex-col bg-gray-50 p-6"
//             >
//                 <div className="container mx-auto p-4">
//                     <h2 className="text-3xl font-bold mb-6 text-center">Manage Assignments</h2>
//                     <div className="flex justify-center mb-6">
//                         <button
//                             className={`px-4 py-2 font-semibold ${isCreating ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200'} rounded-l-lg hover:bg-yellow-300`}
//                             onClick={() => setIsCreating(true)}
//                         >
//                             Create Assignment
//                         </button>
//                         <button
//                             className={`px-4 py-2 font-semibold ${!isCreating ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200'} rounded-r-lg hover:bg-yellow-300`}
//                             onClick={() => setIsCreating(false)}
//                         >
//                             Uploaded Assignments
//                         </button>
//                     </div>

//                     {isCreating ? (
//                         <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
//                             {error && <p className="text-red-500">{error}</p>}
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Grid layout */}
//                                 <div>
//                                     <label htmlFor="title" className="block mb-1">Title</label>
//                                     <input
//                                         type="text"
//                                         id="title"
//                                         value={title}
//                                         onChange={(e) => setTitle(e.target.value)}
//                                         className="w-full border border-gray-300 p-2 rounded"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="points" className="block mb-1">Points</label>
//                                     <input
//                                         type="number"
//                                         id="points"
//                                         value={points}
//                                         onChange={(e) => setPoints(e.target.value)}
//                                         className="w-full border border-gray-300 p-2 rounded"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="dueDate" className="block mb-1">Due Date</label>
//                                     <input
//                                         type="date"
//                                         id="dueDate"
//                                         value={dueDate}
//                                         onChange={(e) => setDueDate(e.target.value)}
//                                         className="w-full border border-gray-300 p-2 rounded"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                             <div>
//                                 <label htmlFor="content" className="block mb-1">Content</label>
//                                 <textarea
//                                     id="content"
//                                     value={content}
//                                     onChange={(e) => setContent(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded"
//                                     required
//                                 ></textarea>
//                             </div>
//                             <div>
//                                 <label htmlFor="studentId" className="block mb-1">Semester</label>
//                                 <input
//                                     type="text"
//                                     id="studentId"
//                                     value={studentId}
//                                     onChange={(e) => setStudentId(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded"
//                                     required
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="bg-yellow-400 text-gray-800 p-2 rounded hover:bg-yellow-300 w-full"
//                             >
//                                 Create Assignment
//                             </button>
//                         </form>
//                     ) : (
//                         <div className="bg-white p-6 rounded-lg shadow-md">
//                             <h3 className="text-xl font-semibold mb-4">Uploaded Assignments</h3>
//                             {assignments.length > 0 ? (
//                                 <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                                     {assignments.map((assignment) => (
//                                         <li
//                                             key={assignment._id}
//                                             className="border p-4 my-2 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
//                                             onClick={() => handleAssignmentClick(assignment)}
//                                         >
//                                             <h4 className="font-bold">{assignment.title}</h4>
//                                             <p>{assignment.content.substring(0, 50)}...</p>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p className="mt-2 text-gray-500">No assignments available.</p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//                 <ToastContainer />
//                 {selectedAssignment && !isEditing && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                         <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
//                             <h3 className="text-xl font-semibold mb-4">Assignment Details</h3>
//                             <p><strong>Title:</strong> {selectedAssignment.title}</p>
//                             <p><strong>Content:</strong> {selectedAssignment.content}</p>
//                             <p><strong>Due Date:</strong> {selectedAssignment.dueDate}</p>
//                             <p><strong>Points:</strong> {selectedAssignment.points}</p>
//                             <div className="flex justify-between mt-4">
//                                 <button
//                                     onClick={handleEdit}
//                                     className="bg-yellow-400 text-gray-800 p-2 rounded hover:bg-yellow-300"
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     onClick={closeModal}
//                                     className="bg-red-500 text-white p-2 rounded hover:bg-red-400"
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//                 {selectedAssignment && isEditing && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                         <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
//                             <h3 className="text-xl font-semibold mb-4">Edit Assignment</h3>
//                             <form onSubmit={handleEditSubmit} className="space-y-4">
//                                 <div>
//                                     <label htmlFor="editTitle" className="block mb-1">Title</label>
//                                     <input
//                                         type="text"
//                                         id="editTitle"
//                                         value={editTitle}
//                                         onChange={(e) => setEditTitle(e.target.value)}
//                                         className="w-full border border-gray-300 p-2 rounded"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="editContent" className="block mb-1">Content</label>
//                                     <textarea
//                                         id="editContent"
//                                         value={editContent}
//                                         onChange={(e) => setEditContent(e.target.value)}
//                                         className="w-full border border-gray-300 p-2 rounded"
//                                         required
//                                     ></textarea>
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     className="bg-yellow-400 text-gray-800 p-2 rounded hover:bg-yellow-300 w-full"
//                                 >
//                                     Update Assignment
//                                 </button>
//                             </form>
//                             <button
//                                 onClick={closeModal}
//                                 className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-400 w-full"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </motion.div>
//         </div>
//     );
// };

// export default CreateAssignment;






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { ToastContainer, toast } from 'react-toastify';
// import { motion } from 'framer-motion';
// import 'react-toastify/dist/ReactToastify.css';

// const CreateAssignment = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [semester, setSemester] = useState(''); // New state for semester
//     const [dueDate, setDueDate] = useState(''); // New state for due date
//     const [assignments, setAssignments] = useState([]);
//     const [error, setError] = useState(null);
//     const [isCreating, setIsCreating] = useState(true);
//     const [selectedAssignment, setSelectedAssignment] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editTitle, setEditTitle] = useState('');
//     const [editContent, setEditContent] = useState('');
//     const [editDueDate, setEditDueDate] = useState(''); // State for editing due date
//     const navigate = useNavigate();

//     // Fetch assignments
//     useEffect(() => {
//         const fetchAssignments = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/assignments', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.message || 'Failed to fetch assignments');
//                 }

//                 const data = await response.json();
//                 setAssignments(data);
//             } catch (err) {
//                 console.error(err);
//                 setError(err.message);
//             }
//         };

//         fetchAssignments();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const teacherId = '66f25b8f8e0e8acfad420896'; // Use the appropriate teacherId from context or auth

//         try {
//             const response = await fetch('http://localhost:5000/api/assignments', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({
//                     teacherId,
//                     title,
//                     content,
//                     semester, // Send semester data to the backend
//                     dueDate, // Send due date to the backend
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'An error occurred');
//             }

//             if (response.status === 201) {
//                 toast.success('Assignment created successfully!', { autoClose: 3000 });
//                 setTimeout(() => navigate('/teacher-dashboard'), 4000);
//             }
//         } catch (err) {
//             console.error(err);
//             setError(err.message);
//         }
//     };

//     const handleAssignmentClick = (assignment) => {
//         setSelectedAssignment(assignment);
//         setEditTitle(assignment.title);
//         setEditContent(assignment.content);
//         setEditDueDate(assignment.dueDate); // Set due date when clicking an assignment
//         setIsEditing(false);
//     };

//     const closeModal = () => {
//         setSelectedAssignment(null);
//         setIsEditing(false);
//     };

//     const handleEdit = () => {
//         setIsEditing(true);
//     };

//     const handleEditSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch(`http://localhost:5000/api/assignments/${selectedAssignment._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({
//                     title: editTitle,
//                     content: editContent,
//                     dueDate: editDueDate, // Update due date when editing
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'An error occurred while updating');
//             }

//             toast.success('Assignment updated successfully!', { autoClose: 3000 });
//             setAssignments(assignments.map(a => a._id === selectedAssignment._id ? { ...a, title: editTitle, content: editContent, dueDate: editDueDate } : a));
//             closeModal();
//         } catch (err) {
//             console.error(err);
//             setError(err.message);
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="min-h-screen flex flex-col bg-gray-50 p-6"
//             >
//                 <div className="container mx-auto p-4">
//                     <h2 className="text-3xl font-bold mb-6 text-center">Manage Assignments</h2>
//                     <div className="flex justify-center mb-6">
//                         <button
//                             className={`px-4 py-2 font-semibold ${isCreating ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200'} rounded-l-lg hover:bg-yellow-300`}
//                             onClick={() => setIsCreating(true)}
//                         >
//                             Create Assignment
//                         </button>
//                         <button
//                             className={`px-4 py-2 font-semibold ${!isCreating ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200'} rounded-r-lg hover:bg-yellow-300`}
//                             onClick={() => setIsCreating(false)}
//                         >
//                             Uploaded Assignments
//                         </button>
//                     </div>

//                     {isCreating ? (
//                         <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
//                             {error && <p className="text-red-500">{error}</p>}
//                             <div>
//                                 <label htmlFor="title" className="block mb-1">Title</label>
//                                 <input
//                                     type="text"
//                                     id="title"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="content" className="block mb-1">Content</label>
//                                 <textarea
//                                     id="content"
//                                     value={content}
//                                     onChange={(e) => setContent(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded"
//                                     required
//                                 ></textarea>
//                             </div>
//                             <div>
//                                 <label htmlFor="semester" className="block mb-1">Semester</label>
//                                 <input
//                                     type="text"
//                                     id="semester"
//                                     value={semester}
//                                     onChange={(e) => setSemester(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="dueDate" className="block mb-1">Due Date</label>
//                                 <input
//                                     type="date"
//                                     id="dueDate"
//                                     value={dueDate}
//                                     onChange={(e) => setDueDate(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded"
//                                     required
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="bg-yellow-400 text-gray-800 p-2 rounded hover:bg-yellow-300 w-full"
//                             >
//                                 Create Assignment
//                             </button>
//                         </form>
//                     ) : (
//                         <div className="bg-white p-6 rounded-lg shadow-md">
//                             <h3 className="text-xl font-semibold mb-4">Uploaded Assignments</h3>
//                             {assignments.length > 0 ? (
//                                 <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                                     {assignments.map((assignment) => (
//                                         <li
//                                             key={assignment._id}
//                                             className="border p-4 my-2 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
//                                             onClick={() => handleAssignmentClick(assignment)}
//                                         >
//                                             <h4 className="font-bold">{assignment.title}</h4>
//                                             <p>{assignment.content.substring(0, 50)}...</p>
//                                             <p><strong>Semester:</strong> {assignment.semester}</p> {/* Display semester */}
//                                             <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p> {/* Display due date */}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p className="mt-2 text-gray-500">No assignments available.</p>
//                             )}
//                         </div>
//                     )}

//                     {/* Modal for Assignment details and edit */}
//                     {selectedAssignment && (
//                         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                             <div className="bg-white p-6 rounded-lg w-1/2">
//                                 <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Assignment' : 'Assignment Details'}</h3>

//                                 {!isEditing ? (
//                                     <div>
//                                         <p><strong>Title:</strong> {selectedAssignment.title}</p>
//                                         <p><strong>Content:</strong> {selectedAssignment.content}</p>
//                                         <p><strong>Semester:</strong> {selectedAssignment.semester}</p>
//                                         <p><strong>Due Date:</strong> {new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
//                                         <button
//                                             className="mt-4 bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-300"
//                                             onClick={handleEdit}
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
//                                             onClick={closeModal}
//                                         >
//                                             Close
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     <form onSubmit={handleEditSubmit}>
//                                         <div>
//                                             <label htmlFor="editTitle" className="block mb-1">Title</label>
//                                             <input
//                                                 type="text"
//                                                 id="editTitle"
//                                                 value={editTitle}
//                                                 onChange={(e) => setEditTitle(e.target.value)}
//                                                 className="w-full border border-gray-300 p-2 rounded"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label htmlFor="editContent" className="block mb-1">Content</label>
//                                             <textarea
//                                                 id="editContent"
//                                                 value={editContent}
//                                                 onChange={(e) => setEditContent(e.target.value)}
//                                                 className="w-full border border-gray-300 p-2 rounded"
//                                                 required
//                                             ></textarea>
//                                         </div>
//                                         <div>
//                                             <label htmlFor="editDueDate" className="block mb-1">Due Date</label>
//                                             <input
//                                                 type="date"
//                                                 id="editDueDate"
//                                                 value={editDueDate}
//                                                 onChange={(e) => setEditDueDate(e.target.value)}
//                                                 className="w-full border border-gray-300 p-2 rounded"
//                                                 required
//                                             />
//                                         </div>
//                                         <div className="mt-4">
//                                             <button
//                                                 type="submit"
//                                                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
//                                             >
//                                                 Save Changes
//                                             </button>
//                                             <button
//                                                 type="button"
//                                                 className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
//                                                 onClick={closeModal}
//                                             >
//                                                 Cancel
//                                             </button>
//                                         </div>
//                                     </form>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </motion.div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default CreateAssignment;
