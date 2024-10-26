import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar1 from '../components/Navbar1';

const AssignmentDetail = () => {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [answer, setAnswer] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch(`http://localhost:5000/api/assignments/${assignmentId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setAssignment(data);
      } catch (error) {
        console.error('Error fetching assignment details:', error);
      }
    };

    fetchAssignmentDetails();
  }, [assignmentId]);

  const handleSubmit = async () => {
    if (!answer) return; // Prevent submission if answer is empty

    setIsSubmitting(true); // Set submitting state to true
    setShowConfirmModal(false); // Close the confirmation modal

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`http://localhost:5000/api/assignments/${assignmentId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submittedAnswer: answer }), // Send the answer
      });

      if (response.ok) {
        toast.success('Assignment submitted successfully!', {
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate('/student-dashboard'); // Redirect after success
        }, 4000);
      } else {
        throw new Error('Failed to submit assignment.');
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
      toast.error('Failed to submit assignment.');
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true); // Show the confirmation modal
  };

  const closeModal = () => {
    setShowConfirmModal(false); // Close the modal
  };

  const handleModalSubmit = () => {
    handleSubmit(); // Call the submit handler
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'v') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <Navbar1 />
      <div className="min-h-screen flex items-center justify-center py-10">
        <div className="w-full bg-gray-100 shadow-lg rounded-lg p-8">
          {assignment ? (
            <>
              <motion.h1 
                className="text-4xl font-extrabold mb-4 text-blue-800 text-center"
                initial={{ y: -20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.5 }}
              >
                {assignment.title}
              </motion.h1>
              <motion.div
                className="text-gray-800 mb-6 whitespace-pre-wrap bg-gray-100 p-4 rounded-lg border border-blue-300 shadow-md"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
              >
                {assignment.content.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </motion.div>

              <form onSubmit={handleConfirmSubmit} className="space-y-6">
                <motion.textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300"
                  placeholder="Write your answer here..."
                  rows="8"
                  required
                  onPaste={(e) => e.preventDefault()} // Disable pasting directly into the textarea
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.5 }}
                ></motion.textarea>
                
                <motion.button
                  type="submit"
                  className="w-full bg-yellow-300 text-gray-800 p-4 rounded-lg hover:bg-yellow-400 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Answer
                </motion.button>
              </form>

              {/* Confirmation Modal */}
              {showConfirmModal && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                  initial={{ opacity: 0, scale: 0.8 }} // Initial state for entering animation
                  animate={{ opacity: 1, scale: 1 }} // Final state for entering animation
                  exit={{ opacity: 0, scale: 0.8 }} // State for exiting animation
                  transition={{ duration: 0.3 }} // Transition duration
                >
                  <motion.div className="bg-white rounded-lg p-5 shadow-lg"
                    initial={{ opacity: 0 }} // Initial state for content
                    animate={{ opacity: 1 }} // Final state for content
                    exit={{ opacity: 0 }} // State for exiting content
                    transition={{ duration: 0.3 }} // Transition duration for content
                  >
                    <h2 className="text-lg font-semibold">Confirm Submission</h2>
                    <p>Are you sure you want to submit your answer?</p>
                    <div className="flex justify-end mt-4">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={handleModalSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Confirm'}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500">Loading assignment...</p>
          )}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
    </div>
  );
};

export default AssignmentDetail;
