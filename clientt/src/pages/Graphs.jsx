import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';
import AdminNavbar from '../components/AdminNavbar';

const Graph = () => {
    const [data, setData] = useState({
        users: [],
        assignments: [],
        applications: [],
        students: []
    });

    const token = localStorage.getItem('token'); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all([
                    fetch('http://localhost:5000/api/users', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` }}),
                    fetch('http://localhost:5000/api/assignments', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` }}),
                    fetch('http://localhost:5000/api/applications', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` }}),
                    fetch('http://localhost:5000/api/students', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` }})
                ]);

                const [usersData, assignmentsData, applicationsData, studentsData] = await Promise.all(responses.map(res => res.json()));
                setData({
                    users: usersData,
                    assignments: assignmentsData,
                    applications: applicationsData,
                    students: studentsData
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div>
            <AdminNavbar />
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center mb-6">Data Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div 
                        className="p-4 border rounded shadow"
                        initial={{ opacity: 0, scale: 0.5 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-semibold">Total Users</h2>
                        <BarChart width={250} height={250} data={[{ name: 'Users', value: data.users.length }]}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#0088FE" />
                        </BarChart>
                    </motion.div>

                    <motion.div 
                        className="p-4 border rounded shadow"
                        initial={{ opacity: 0, scale: 0.5 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-semibold">Total Assignments</h2>
                        <BarChart width={250} height={250} data={[{ name: 'Assignments', value: data.assignments.length }]}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#00C49F" />
                        </BarChart>
                    </motion.div>

                    <motion.div 
                        className="p-4 border rounded shadow"
                        initial={{ opacity: 0, scale: 0.5 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-semibold">Total Applications</h2>
                        <BarChart width={250} height={250} data={[{ name: 'Applications', value: data.applications.length }]}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#FFBB28" />
                        </BarChart>
                    </motion.div>

                    <motion.div 
                        className="p-4 border rounded shadow"
                        initial={{ opacity: 0, scale: 0.5 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-semibold">Total Students</h2>
                        <BarChart width={250} height={250} data={[{ name: 'Students', value: data.students.length }]}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#FF8042" />
                        </BarChart>
                    </motion.div>
                </div>

                <div className="flex flex-col md:flex-row justify-between mb-8">
                    <motion.div 
                        className="md:w-1/2 p-4 border rounded shadow"
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-semibold">Student Enrollment Trend</h2>
                        <LineChart width={500} height={300} data={data.students} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="enrollment" stroke="#82ca9d" />
                        </LineChart>
                    </motion.div>

                    <motion.div 
                        className="md:w-1/2 p-4 border rounded shadow"
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-semibold">Assignment Submission Trend</h2>
                        <LineChart width={500} height={300} data={data.assignments} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="submissions" stroke="#8884d8" />
                        </LineChart>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Graph;
