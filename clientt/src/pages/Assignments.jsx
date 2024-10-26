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
