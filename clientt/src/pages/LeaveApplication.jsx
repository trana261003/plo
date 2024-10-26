// import React, { useState } from 'react';

// const CreateLeaveApplication = () => {
//     const [formData, setFormData] = useState({
//         title: '',
//         content: '',
//         leaveStartDate: '',
//         leaveEndDate: '',
//     });
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');

//     // Handle form input change
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage('');

//         try {
//             const response = await fetch('http://localhost:5000/api/leave-applications', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // Include Authorization header if using JWT
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(formData),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage(data.message || 'Error creating leave application');
//             }
//         } catch (error) {
//             setMessage('Error creating leave application');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Create Leave Application</h2>

//             <form onSubmit={handleSubmit}>
//                 {/* Title */}
//                 <div className="mb-4">
//                     <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
//                         Title
//                     </label>
//                     <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded"
//                         placeholder="Enter leave application title"
//                     />
//                 </div>

//                 {/* Content */}
//                 <div className="mb-4">
//                     <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
//                         Content
//                     </label>
//                     <textarea
//                         id="content"
//                         name="content"
//                         value={formData.content}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded"
//                         placeholder="Enter leave application content"
//                         rows="4"
//                     />
//                 </div>

//                 {/* Leave Start Date */}
//                 <div className="mb-4">
//                     <label htmlFor="leaveStartDate" className="block text-gray-700 font-bold mb-2">
//                         Leave Start Date
//                     </label>
//                     <input
//                         type="date"
//                         id="leaveStartDate"
//                         name="leaveStartDate"
//                         value={formData.leaveStartDate}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded"
//                     />
//                 </div>

//                 {/* Leave End Date */}
//                 <div className="mb-4">
//                     <label htmlFor="leaveEndDate" className="block text-gray-700 font-bold mb-2">
//                         Leave End Date
//                     </label>
//                     <input
//                         type="date"
//                         id="leaveEndDate"
//                         name="leaveEndDate"
//                         value={formData.leaveEndDate}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded"
//                     />
//                 </div>

//                 {/* Submit Button */}
//                 <div className="mb-4">
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
//                     >
//                         {loading ? 'Submitting...' : 'Submit Leave Application'}
//                     </button>
//                 </div>
//             </form>

//             {/* Success or Error Message */}
//             {message && <p className="text-center text-red-500">{message}</p>}
//         </div>
//     );
// };

// export default CreateLeaveApplication;


// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { motion } from 'framer-motion'; // Import framer-motion for animations
// import Navbar from '../components/Navbar';

// const CreateLeaveApplication = () => {
//     const [formData, setFormData] = useState({
//         title: '',
//         content: '',
//         leaveStartDate: '',
//         leaveEndDate: '',
//     });
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');

//     // Get token from localStorage (assuming token is stored there after login)
//     const token = localStorage.getItem('token');

//     // Handle form input change
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage('');

//         try {
//             const response = await fetch('http://localhost:5000/api/leave-applications', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`, // Authorization header with JWT
//                 },
//                 body: JSON.stringify(formData),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 toast.success('Leave application created successfully!');
//                 // Reset form fields
//                 setFormData({
//                     title: '',
//                     content: '',
//                     leaveStartDate: '',
//                     leaveEndDate: '',
//                 });
//             } else {
//                 toast.error(data.message || 'Error creating leave application');
//             }
//         } catch (error) {
//             console.error('Error creating leave application:', error);
//             toast.error('Error creating leave application.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <Navbar/>
//             <div className="min-h-screen bg-gray-50 py-8">
//             <motion.div
//                 className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg"
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
//                     Create Leave Application
//                 </h2>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="grid grid-cols-1 gap-6">
//                         {/* Title */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Title</label>
//                             <input
//                                 type="text"
//                                 name="title"
//                                 value={formData.title}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 placeholder="Enter leave application title"
//                             />
//                         </div>

//                         {/* Content */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Content</label>
//                             <textarea
//                                 name="content"
//                                 value={formData.content}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 rows="6"
//                                 placeholder="Enter leave application content"
//                             ></textarea>
//                         </div>

//                         {/* Leave Start Date */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Leave Start Date</label>
//                             <input
//                                 type="date"
//                                 name="leaveStartDate"
//                                 value={formData.leaveStartDate}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         {/* Leave End Date */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Leave End Date</label>
//                             <input
//                                 type="date"
//                                 name="leaveEndDate"
//                                 value={formData.leaveEndDate}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         {/* Submit Button */}
//                         <motion.button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:bg-gray-400"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             {loading ? 'Submitting...' : 'Submit Leave Application'}
//                         </motion.button>
//                     </div>
//                 </form>
//             </motion.div>

//             {/* Toast for success/error messages */}
//             <ToastContainer />
//         </div>
//         </div>
//     );
// };

// export default CreateLeaveApplication;



// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { motion } from 'framer-motion';
// import Navbar from '../components/Navbar';

// const CreateLeaveApplication = () => {
//     const [formData, setFormData] = useState({
//         title: '',
//         content: '',
//         leaveStartDate: '',
//         leaveEndDate: '',
//     });
//     const [loading, setLoading] = useState(false);

//     const token = localStorage.getItem('token');

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const response = await fetch('http://localhost:5000/api/leave-applications', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(formData),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 toast.success('Leave application created successfully!');
//                 setFormData({
//                     title: '',
//                     content: '',
//                     leaveStartDate: '',
//                     leaveEndDate: '',
//                 });
                
//             } else {
//                 toast.error(data.message || 'Error creating leave application');
//             }
//         } catch (error) {
//             toast.error('Error creating leave application.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <Navbar/>
//             <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-12">
//                 <motion.div
//                     className="bg-white p-8 rounded-xl shadow-lg w-full md:w-10/12 lg:w-8/12 xl:w-6/12 mx-auto"
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
//                         Create Leave Application
//                     </h2>

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="grid grid-cols-1 gap-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">Title</label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     value={formData.title}
//                                     onChange={handleChange}
//                                     required
//                                     className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     placeholder="Enter leave application title"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">Content</label>
//                                 <textarea
//                                     name="content"
//                                     value={formData.content}
//                                     onChange={handleChange}
//                                     required
//                                     className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     rows="6"
//                                     placeholder="Enter leave application content"
//                                 ></textarea>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">Leave Start Date</label>
//                                 <input
//                                     type="date"
//                                     name="leaveStartDate"
//                                     value={formData.leaveStartDate}
//                                     onChange={handleChange}
//                                     required
//                                     className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">Leave End Date</label>
//                                 <input
//                                     type="date"
//                                     name="leaveEndDate"
//                                     value={formData.leaveEndDate}
//                                     onChange={handleChange}
//                                     required
//                                     className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>

//                             <motion.button
//                                 type="submit"
//                                 disabled={loading}
//                                 className="w-full bg-yellow-400 text-black py-3 rounded-lg font-medium shadow-md hover:bg-yellow-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:bg-gray-400"
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                             >
//                                 {loading ? 'Submitting...' : 'Submit Leave Application'}
//                             </motion.button>
//                         </div>
//                     </form>
//                 </motion.div>

//                 <ToastContainer />
//             </div>
//         </div>
//     );
// };

// export default CreateLeaveApplication;




import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../components/Navbar';

const CreateLeaveApplication = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        leaveStartDate: '',
        leaveEndDate: '',
    });
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/leave-applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Leave application created successfully!');
                setFormData({
                    title: '',
                    content: '',
                    leaveStartDate: '',
                    leaveEndDate: '',
                });
                setTimeout(() => navigate('/teacher-dashboard'), 3000); // Redirect to dashboard after successful submission
            } else {
                toast.error(data.message || 'Error creating leave application');
            }
        } catch (error) {
            toast.error('Error creating leave application.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-12">
                <motion.div
                    className="bg-white p-8 rounded-xl shadow-lg w-full md:w-10/12 lg:w-8/12 xl:w-6/12 mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
                        Create Leave Application
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter leave application title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="6"
                                    placeholder="Enter leave application content"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Leave Start Date</label>
                                <input
                                    type="date"
                                    name="leaveStartDate"
                                    value={formData.leaveStartDate}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Leave End Date</label>
                                <input
                                    type="date"
                                    name="leaveEndDate"
                                    value={formData.leaveEndDate}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-yellow-400 text-black py-3 rounded-lg font-medium shadow-md hover:bg-yellow-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:bg-gray-400"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {loading ? 'Submitting...' : 'Submit Leave Application'}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>

                <ToastContainer />
            </div>
        </div>
    );
};

export default CreateLeaveApplication;
