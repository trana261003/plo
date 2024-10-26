// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
// import Navbar from '../components/Navbar';
// import Modal from '../components/Model';
// import {
//     PieChart,
//     Pie,
//     Cell,
//     Tooltip,
//     Legend,
// } from 'recharts';
// import AdminNavbar from '../components/AdminNavbar';

// const AdminDashboard = () => {
//     const [users, setUsers] = useState([]);
//     const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: '' });
//     const [editUser, setEditUser] = useState(null);
//     const [isRegistering, setIsRegistering] = useState(true);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [userIdToDelete, setUserIdToDelete] = useState(null);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) throw new Error('No token found');

//                 const response = await fetch('http://localhost:5000/api/users', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error('Failed to fetch users');

//                 const data = await response.json();
//                 setUsers(data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };

//         fetchUsers();
//     }, []);

//     // Prepare data for the donut chart
//     const prepareChartData = () => {
//         const roleCounts = {};
//         users.forEach(user => {
//             roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
//         });

//         return Object.entries(roleCounts).map(([role, count]) => ({
//             name: role,
//             value: count,
//         }));
//     };

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch('http://localhost:5000/api/auth/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(newUser)
//             });

//             if (!response.ok) throw new Error('User registration failed');

//             const data = await response.json();
//             setUsers([...users, data]);
//             setNewUser({ name: '', email: '', password: '', role: '' });
//             window.location.reload();
//         } catch (error) {
//             console.error('Error registering user:', error);
//         }
//     };

//     const handleEdit = (user) => {
//         setEditUser(user);
//         setNewUser(user);
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         const updatedUsers = users.map((user) => (user._id === editUser._id ? newUser : user));
//         setUsers(updatedUsers);
//         setNewUser({ name: '', email: '', password: '', role: '' });
//         setEditUser(null);
//     };

//     const handleDeleteConfirmation = (id) => {
//         setUserIdToDelete(id);
//         setIsModalOpen(true);
//     };

//     const handleDelete = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`http://localhost:5000/api/users/${userIdToDelete}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (!response.ok) throw new Error('Failed to delete user');

//             setUsers(users.filter(user => user._id !== userIdToDelete));
//             setUserIdToDelete(null);
//             setIsModalOpen(false);
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     const DonutChart = ({ data }) => {
//         const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//         return (
//             <div className="flex justify-center mb-8">
//                 <PieChart width={400} height={400}> {/* Increased width and height */}
//                     <Pie
//                         data={data}
//                         cx={200} // Adjust cx to half of width for centering
//                         cy={200} // Adjust cy to half of height for centering
//                         innerRadius={100} // Adjust inner radius as needed
//                         outerRadius={150} // Adjust outer radius as needed
//                         fill="#8884d8"
//                         paddingAngle={5}
//                         dataKey="value"
//                     >
//                         {data.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                 </PieChart>
//             </div>
//         );
//     };

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <AdminNavbar/>
//             <div className="container mx-auto p-6">
//                 <motion.div
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="bg-white rounded-lg shadow-xl p-8 border border-gray-200"
//                 >
//                     <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

//                     {/* Toggle Buttons */}
//                     <div className="flex justify-center mb-6">
//                         <button
//                             className={`px-4 py-2 font-semibold ${isRegistering ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200'} rounded-l-lg hover:bg-yellow-300`}
//                             onClick={() => setIsRegistering(true)}
//                         >
//                             Register New Users
//                         </button>
//                         <button
//                             className={`px-4 py-2 font-semibold ${!isRegistering ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200'} rounded-r-lg hover:bg-yellow-300`}
//                             onClick={() => setIsRegistering(false)}
//                         >
//                             Registered Users
//                         </button>
//                     </div>

//                     {/* Conditionally render the registration form or the user list */}
//                     {isRegistering ? (
//                         <form onSubmit={editUser ? handleUpdate : handleRegister} className="mb-8">
//                             <h2 className="text-2xl font-semibold text-gray-700 mb-4">{editUser ? 'Edit User' : 'Register New User'}</h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                 <input
//                                     type="text"
//                                     placeholder="Name"
//                                     value={newUser.name}
//                                     onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//                                     required
//                                     className="border border-gray-300 rounded-lg p-3"
//                                 />
//                                 <input
//                                     type="email"
//                                     placeholder="Email"
//                                     value={newUser.email}
//                                     onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//                                     required
//                                     className="border border-gray-300 rounded-lg p-3"
//                                 />
//                                 <input
//                                     type="password"
//                                     placeholder="Password"
//                                     value={newUser.password || ''}
//                                     onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//                                     required
//                                     className="border border-gray-300 rounded-lg p-3"
//                                 />
//                                 <select
//                                     value={newUser.role}
//                                     onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//                                     required
//                                     className="border border-gray-300 rounded-lg p-3"
//                                 >
//                                     <option value="">Select Role</option>
//                                     <option value="student">Student</option>
//                                     <option value="teacher">Teacher</option>
//                                     <option value="hod">HOD</option>
//                                     <option value="admin">Admin</option>
//                                 </select>
//                             </div>
//                             <button type="submit" className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition">
//                                 {editUser ? 'Update User' : 'Register User'}
//                             </button>
//                         </form>
//                     ) : (
//                         <>
//                             <h2 className="text-2xl font-semibold text-gray-700 mb-4">Registered Users</h2>
//                             <div className="mb-8">
//                                 <DonutChart data={prepareChartData()} />
//                             </div>
//                             <table className="w-full bg-white rounded-lg shadow-md">
//                                 <thead>
//                                     <tr className="bg-gray-100">
//                                         <th className="py-2 px-4 text-left">Name</th>
//                                         <th className="py-2 px-4 text-left">Email</th>
//                                         <th className="py-2 px-4 text-left">Role</th>
//                                         <th className="py-2 px-4 text-left">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {users.map((user) => (
//                                         <tr key={user._id} className="border-b hover:bg-gray-100">
//                                             <td className="py-2 px-4">{user.name}</td>
//                                             <td className="py-2 px-4">{user.email}</td>
//                                             <td className="py-2 px-4">{user.role}</td>
//                                             <td className="py-2 px-4 flex space-x-2">
//                                                 <button
//                                                     onClick={() => handleEdit(user)}
//                                                     className="text-blue-500 hover:underline"
//                                                 >
//                                                     <FaRegEdit />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDeleteConfirmation(user._id)}
//                                                     className="text-red-500 hover:underline"
//                                                 >
//                                                     <FaTrashAlt />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </>
//                     )}

//                     {isModalOpen && (
//                         <Modal
//                             title="Delete User"
//                             onClose={() => setIsModalOpen(false)}
//                             onConfirm={handleDelete}
//                         >
//                             <p>Are you sure you want to delete this user?</p>
//                         </Modal>
//                     )}
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;










// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
// import Modal from '../components/Model';
// import {
//     PieChart,
//     Pie,
//     Cell,
//     Tooltip,
//     Legend,
// } from 'recharts';
// import AdminNavbar from '../components/AdminNavbar';

// const AdminDashboard = () => {
//     const [users, setUsers] = useState([]);
//     const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: '', semester: '', enrollmentNumber: '' });
//     const [editUser, setEditUser] = useState(null);
//     const [isRegistering, setIsRegistering] = useState(true);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [userIdToDelete, setUserIdToDelete] = useState(null);
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState(''); // Error message state

//     useEffect(() => {
//         const fetchUsers = async () => {
//             setLoading(true);
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) throw new Error('No token found');

//                 const response = await fetch('http://localhost:5000/api/users', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error('Failed to fetch users');

//                 const data = await response.json();
//                 setUsers(data);
//             } catch (error) {
//                 setError('Error fetching users: ' + error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUsers();
//     }, []);

//     const prepareChartData = () => {
//         const roleCounts = {};
//         users.forEach(user => {
//             roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
//         });

//         return Object.entries(roleCounts).map(([role, count]) => ({
//             name: role,
//             value: count,
//         }));
//     };

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch('http://localhost:5000/api/auth/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(newUser)
//             });

//             if (!response.ok) throw new Error('User registration failed');

//             const data = await response.json();
//             setUsers([...users, data]);
//             setNewUser({ name: '', email: '', password: '', role: '', semester: '', enrollmentNumber: '' });
//             window.location.reload();
//         } catch (error) {
//             setError('Error registering user: ' + error.message);
//         }
//     };

//     const handleEdit = (user) => {
//         setEditUser(user);
//         setNewUser(user);
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         const updatedUsers = users.map((user) => (user._id === editUser._id ? newUser : user));
//         setUsers(updatedUsers);
//         setNewUser({ name: '', email: '', password: '', role: '', semester: '', enrollmentNumber: '' });
//         setEditUser(null);
//     };

//     const handleDeleteConfirmation = (id) => {
//         setUserIdToDelete(id);
//         setIsModalOpen(true);
//     };

//     const handleDelete = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`http://localhost:5000/api/users/${userIdToDelete}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (!response.ok) throw new Error('Failed to delete user');

//             setUsers(users.filter(user => user._id !== userIdToDelete));
//             setUserIdToDelete(null);
//             setIsModalOpen(false);
//         } catch (error) {
//             setError('Error deleting user: ' + error.message);
//         }
//     };

//     const DonutChart = ({ data }) => {
//         const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//         return (
//             <div className="flex justify-center mb-8">
//                 <PieChart width={400} height={400}>
//                     <Pie
//                         data={data}
//                         cx={200}
//                         cy={200}
//                         innerRadius={100}
//                         outerRadius={150}
//                         fill="#8884d8"
//                         paddingAngle={5}
//                         dataKey="value"
//                     >
//                         {data.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                 </PieChart>
//             </div>
//         );
//     };

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <AdminNavbar />
//             <div className="container mx-auto p-6">
//                 <motion.div
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="bg-white rounded-lg shadow-xl p-8 border border-gray-200"
//                 >
//                     <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

//                     {/* Toggle Buttons */}
//                     <div className="flex justify-center mb-6">
//                         <button
//                             className={`px-4 py-2 font-semibold ${isRegistering ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200'} rounded-l-lg hover:bg-yellow-300`}
//                             onClick={() => setIsRegistering(true)}
//                         >
//                             Register New Users
//                         </button>
//                         <button
//                             className={`px-4 py-2 font-semibold ${!isRegistering ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200'} rounded-r-lg hover:bg-yellow-300`}
//                             onClick={() => setIsRegistering(false)}
//                         >
//                             Registered Users
//                         </button>
//                     </div>

//                     {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

//                     {loading ? ( // Loading state
//                         <p className="text-gray-700">Loading users...</p>
//                     ) : isRegistering ? (
//                         <form onSubmit={editUser ? handleUpdate : handleRegister} className="mb-8">
//                             <h2 className="text-2xl font-semibold text-gray-700 mb-4">{editUser ? 'Edit User' : 'Register New User'}</h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                 <input
//                                     type="text"
//                                     placeholder="Name"
//                                     value={newUser.name}
//                                     onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//                                     required
//                                     className="border border-gray-300 rounded-lg p-3"
//                                 />
//                                 <input
//                                     type="email"
//                                     placeholder="Email"
//                                     value={newUser.email}
//                                     onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//                                     required
//                                     className="border border-gray-300 rounded-lg p-3"
//                                 />
//                                 <input
//                                     type="password"
//                                     placeholder="Password"
//                                     value={newUser.password || ''}
//                                     onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//                                     required
//                                     className="border border-gray-300 rounded-lg p-3"
//                                 />
//                                 <select
//                                     value={newUser.role}
//                                     onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//                                     required
//                                     className="border border-gray-300 rounded-lg p-3"
//                                 >
//                                     <option value="">Select Role</option>
//                                     <option value="student">Student</option>
//                                     <option value="teacher">Teacher</option>
//                                     <option value="hod">HOD</option>
//                                     <option value="admin">Admin</option>
//                                 </select>

//                                 {newUser.role === 'student' && (
//                                     <>
//                                         <input
//                                             type="number"
//                                             placeholder="Semester"
//                                             value={newUser.semester}
//                                             onChange={(e) => setNewUser({ ...newUser, semester: e.target.value })}
//                                             required
//                                             className="border border-gray-300 rounded-lg p-3"
//                                         />
//                                         <input
//                                             type="text"
//                                             placeholder="Enrollment Number"
//                                             value={newUser.enrollmentNumber}
//                                             onChange={(e) => setNewUser({ ...newUser, enrollmentNumber: e.target.value })}
//                                             required
//                                             className="border border-gray-300 rounded-lg p-3"
//                                         />
//                                     </>
//                                 )}
//                             </div>
//                             <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
//                                 {editUser ? 'Update User' : 'Register User'}
//                             </button>
//                         </form>
//                     ) : (
//                         <div className="overflow-x-auto">
//                             <DonutChart data={prepareChartData()} />
//                             {/* <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
//                                 <thead>
//                                     <tr className="border-b bg-gray-200 text-gray-600">
//                                         <th className="p-4">Name</th>
//                                         <th className="p-4">Email</th>
//                                         <th className="p-4">Role</th>
//                                         <th className="p-4">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {users.map((user) => (
//                                         <tr key={user._id} className="border-b hover:bg-gray-100">
//                                             <td className="p-4">{user.name}</td>
//                                             <td className="p-4">{user.email}</td>
//                                             <td className="p-4">{user.role}</td>
//                                             <td className="p-4 flex space-x-2">
//                                                 <button onClick={() => handleEdit(user)} className="text-blue-500 hover:underline">
//                                                     <FaRegEdit />
//                                                 </button>
//                                                 <button onClick={() => handleDeleteConfirmation(user._id)} className="text-red-500 hover:underline">
//                                                     <FaTrashAlt />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table> */}

//                             {/* <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
//                                 <thead className="bg-gray-800 text-white">
//                                     <tr>
//                                         <th className="p-4 text-left text-sm font-bold">Name</th>
//                                         <th className="p-4 text-left text-sm font-bold">Email</th>
//                                         <th className="p-4 text-left text-sm font-bold">Role</th>
//                                         <th className="p-4 text-left text-sm font-bold">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {users.map((user) => (
//                                         <tr key={user._id} className="border-b hover:bg-gray-100 transition-colors duration-200">
//                                             <td className="p-4 text-gray-700">{user.name}</td>
//                                             <td className="p-4 text-gray-700">{user.email}</td>
//                                             <td className="p-4 text-gray-700">{user.role}</td>
//                                             <td className="p-4 flex space-x-2">
//                                                 <button
//                                                     onClick={() => handleEdit(user)}
//                                                     className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
//                                                 >
//                                                     <FaRegEdit />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDeleteConfirmation(user._id)}
//                                                     className="text-red-600 hover:text-red-800 transition-colors duration-200"
//                                                 >
//                                                     <FaTrashAlt />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table> */}

// <table className="min-w-full border border-gray-300">
//                                 <thead>
//                                     <tr className="bg-gray-200">
//                                         <th className="px-4 py-2 border">Name</th>
//                                         <th className="px-4 py-2 border">Email</th>
//                                         <th className="px-4 py-2 border">Role</th>
//                                         <th className="px-4 py-2 border">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {users.map((user) => (
//                                         <tr key={user._id} className="hover:bg-gray-100">
//                                             <td className="px-4 py-2 border">{user.name}</td>
//                                             <td className="px-4 py-2 border">{user.email}</td>
//                                             <td className="px-4 py-2 border">{user.role}</td>
//                                             <td className="px-4 py-2 border">
//                                                 <button onClick={() => handleEdit(user)} className="text-yellow-500 hover:underline mr-2">
//                                                     <FaRegEdit />
//                                                 </button>
//                                                 <button onClick={() => handleDeleteConfirmation(user._id)} className="text-red-500 hover:underline">
//                                                     <FaTrashAlt />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>

//                         </div>
//                     )}
//                 </motion.div>

//                 {/* Modal for delete confirmation */}
//                 <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleDelete}>
//                     <h2 className="text-lg font-semibold">Are you sure you want to delete this user?</h2>
//                 </Modal>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from '../components/Model'; // Ensure this is correctly imported
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from 'recharts';
import AdminNavbar from '../components/AdminNavbar';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: '', semester: '', enrollmentNumber: '' });
    const [editUser, setEditUser] = useState(null);
    const [isRegistering, setIsRegistering] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error message state

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const response = await fetch('http://localhost:5000/api/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch users');

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError('Error fetching users: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const prepareChartData = () => {
        const roleCounts = {};
        users.forEach(user => {
            roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
        });

        return Object.entries(roleCounts).map(([role, count]) => ({
            name: role,
            value: count,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) throw new Error('User registration failed');

            const data = await response.json();
            setUsers([...users, data]);
            setNewUser({ name: '', email: '', password: '', role: '', semester: '', enrollmentNumber: '' });
            window.location.reload();
        } catch (error) {
            setError('Error registering user: ' + error.message);
        }
    };

    // const handleEdit = (user) => {
    //     setEditUser(user);
    //     setNewUser(user);
    // };


    const handleEdit = (user) => {
        setEditUser(user);

        // Initialize newUser based on the user's role
        if (user.role === 'student') {
            setNewUser(user); // All fields are editable for students
        } else {
            // Only set the relevant fields for non-students
            const { name, email, password, role } = user;
            setNewUser({ name, email, password, role });
        }
    };


    // const handleUpdate = async (e) => {
    //     e.preventDefault();
    //     const updatedUsers = users.map((user) => (user._id === editUser._id ? newUser : user));
    //     setUsers(updatedUsers);
    //     setNewUser({ name: '', email: '', password: '', role: '', semester: '', enrollmentNumber: '' });
    //     setEditUser(null);
    // };


    const handleUpdate = async (e) => {
        e.preventDefault();

        // Check for required fields based on role
        const requiredFields = editUser.role === 'student'
            ? ['name', 'email', 'password', 'role', 'semester', 'enrollmentNumber']
            : ['name', 'email', 'password', 'role'];

        // Validate required fields
        const missingFields = requiredFields.filter(field => !newUser[field]);

        if (missingFields.length > 0) {
            alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return; // Stop the update process if validation fails
        }

        const updatedUsers = users.map((user) => {
            if (user._id === editUser._id) {
                if (user.role === 'student') {
                    return {
                        ...user,
                        name: newUser.name,
                        email: newUser.email,
                        password: newUser.password,
                        role: newUser.role,
                        semester: newUser.semester,
                        enrollmentNumber: newUser.enrollmentNumber,
                    };
                } else {
                    return {
                        ...user,
                        name: newUser.name,
                        email: newUser.email,
                        password: newUser.password,
                        role: newUser.role,
                    };
                }
            }
            return user; // Return unchanged user if not the edited one
        });

        // Update the state with the modified user list
        setUsers(updatedUsers);

        // Conditionally reset newUser based on the role
        if (editUser.role === 'student') {
            setNewUser({ name: '', email: '', password: '', role: '', semester: '', enrollmentNumber: '' });
        } else {
            setNewUser({ name: '', email: '', password: '', role: '' }); // Reset only relevant fields for non-student roles
        }

        setEditUser(null); // Clear the editing state
    };




    const handleDeleteConfirmation = (id) => {
        setUserIdToDelete(id);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/users/${userIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to delete user');

            setUsers(users.filter(user => user._id !== userIdToDelete));
            setUserIdToDelete(null);
            setIsModalOpen(false);
        } catch (error) {
            setError('Error deleting user: ' + error.message);
        }
    };

    const DonutChart = ({ data }) => {
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

        return (
            <div className="flex justify-center mb-8">
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx={200}
                        cy={200}
                        innerRadius={100}
                        outerRadius={150}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <AdminNavbar />
            <div className="container mx-auto p-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-xl p-8 border border-gray-200"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

                    {/* Toggle Buttons */}
                    <div className="flex justify-center mb-6">
                        <button
                            className={`px-4 py-2 font-semibold ${isRegistering ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200'} rounded-l-lg hover:bg-yellow-300`}
                            onClick={() => setIsRegistering(true)}
                        >
                            Register New Users
                        </button>
                        <button
                            className={`px-4 py-2 font-semibold ${!isRegistering ? 'bg-yellow-400 text-gray-800' : 'bg-gray-200'} rounded-r-lg hover:bg-yellow-300`}
                            onClick={() => setIsRegistering(false)}
                        >
                            Registered Users
                        </button>
                    </div>

                    {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

                    {loading ? ( // Loading state
                        <p className="text-gray-700">Loading users...</p>
                    ) : isRegistering ? (
                        <form onSubmit={editUser ? handleUpdate : handleRegister} className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">{editUser ? 'Edit User' : 'Register New User'}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    required
                                    className="border border-gray-300 rounded-lg p-3"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    required
                                    className="border border-gray-300 rounded-lg p-3"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={newUser.password || ''}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    required
                                    className="border border-gray-300 rounded-lg p-3"
                                />
                                <select
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    required
                                    className="border border-gray-300 rounded-lg p-3"
                                >
                                    <option value="">Select Role</option>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="hod">HOD</option>
                                    <option value="admin">Admin</option>
                                </select>

                                {newUser.role === 'student' && (
                                    <>
                                        <input
                                            type="number"
                                            placeholder="Semester"
                                            value={newUser.semester}
                                            onChange={(e) => setNewUser({ ...newUser, semester: e.target.value })}
                                            required
                                            className="border border-gray-300 rounded-lg p-3"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Enrollment Number"
                                            value={newUser.enrollmentNumber}
                                            onChange={(e) => setNewUser({ ...newUser, enrollmentNumber: e.target.value })}
                                            required
                                            className="border border-gray-300 rounded-lg p-3"
                                        />
                                    </>
                                )}
                            </div>
                            <button type="submit" className="bg-yellow-400 text-black rounded-lg px-4 py-2 hover:bg-yellow-300">
                                {editUser ? 'Update User' : 'Register User'}
                            </button>
                        </form>
                    ) : (
                        <>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Registered Users</h2>
                            
                    <DonutChart data={prepareChartData()} />
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-gray-300 p-4">Name</th>
                                            <th className="border border-gray-300 p-4">Email</th>
                                            <th className="border border-gray-300 p-4">Role</th>
                                            <th className="border border-gray-300 p-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user._id}>
                                                <td className="border border-gray-300 p-4">{user.name}</td>
                                                <td className="border border-gray-300 p-4">{user.email}</td>
                                                <td className="border border-gray-300 p-4">{user.role}</td>
                                                <td className="border border-gray-300 p-4 flex space-x-2">
                                                    <button onClick={() => handleEdit(user)} className="text-blue-500 hover:underline">
                                                        <FaRegEdit />
                                                    </button>
                                                    <button onClick={() => handleDeleteConfirmation(user._id)} className="text-red-500 hover:underline">
                                                        <FaTrashAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    

                    {/* Modal for delete confirmation */}
                    {isModalOpen && (
                        <Modal onClose={() => setIsModalOpen(false)}>
                            <h3 className="text-lg font-semibold">Confirm Delete</h3>
                            <p>Are you sure you want to delete this user?</p>
                            <div className="flex justify-end mt-4">
                                <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-gray-800 rounded px-4 py-2 mr-2">Cancel</button>
                                <button onClick={handleDelete} className="bg-red-500 text-white rounded px-4 py-2">Delete</button>
                            </div>
                        </Modal>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
