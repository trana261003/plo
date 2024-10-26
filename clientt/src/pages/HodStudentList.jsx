import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import HodNavbar from '../components/HodNavbar';

const HodStudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/students', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message || 'Error fetching students');
      }
    };

    fetchStudents();
  }, []);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <HodNavbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Student List</h1>
          {students.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <motion.div
                  key={student._id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => handleStudentClick(student)}
                  initial={{ opacity: 0, y: 20 }} // Initial animation state
                  animate={{ opacity: 1, y: 0 }} // Animation to perform
                  transition={{ duration: 0.3 }} // Transition duration
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-yellow-100 rounded-full p-4 mb-4">
                      <svg
                        className="w-10 h-10 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l-9-5m9 5l9-5M12 14l-9-5 9-5 9 5z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {student.name}
                    </h2>
                    <p className="text-gray-600">{student.email}</p>
                    {/* <p className="text-gray-600">Enrollment: {student.enrollmentNumber}</p>
                    <p className="text-gray-600">Semester: {student.semester}</p> */}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No students found.</p>
          )}
        </div>

        {/* Modal for Student Details */}
        {isModalOpen && selectedStudent && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }} // Initial animation state for modal
            animate={{ opacity: 1 }} // Animation to perform for modal
            transition={{ duration: 0.3 }} // Transition duration for modal
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-8 relative max-w-lg w-full"
              initial={{ scale: 0.9 }} // Initial scale for modal
              animate={{ scale: 1 }} // Scale animation for modal
              transition={{ duration: 0.3 }} // Transition duration for modal scaling
            >
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                onClick={closeModal}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedStudent.name}</h2>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Enrollment Number:</strong> {selectedStudent.enrollmentNumber}</p>
              <p><strong>Semester:</strong> {selectedStudent.semester}</p>
              <p><strong>Additional Info:</strong> More details about the student can be added here.</p>
              <button
                className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 transition"
                onClick={closeModal}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HodStudentList;
