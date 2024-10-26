import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HodNavbar from '../components/HodNavbar';
import { motion } from 'framer-motion'; // Import framer-motion

const HODNotice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [teacherId, setTeacherId] = useState(''); // For selecting a specific teacher
  const [teachers, setTeachers] = useState([]); // List of teachers
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [fetchingTeachers, setFetchingTeachers] = useState(false); // Loading state for fetching teachers

  // Get token from localStorage (assuming token is stored there after login)
  const token = localStorage.getItem('token');

  // Fetch teachers from the backend
  useEffect(() => {
    const fetchTeachers = async () => {
      setFetchingTeachers(true);
      try {
        const response = await fetch('http://localhost:5000/api/teachers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTeachers(data.teachers); // Assuming data.teachers is the array of teacher users
      } catch (error) {
        console.error('Error fetching teachers:', error);
        toast.error('Error fetching teachers.');
      } finally {
        setFetchingTeachers(false);
      }
    };

    fetchTeachers();
  }, [token]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const noticeData = {
        title,
        content,
        issuedBy: '6713c600f086db3aeb031c0d', // HOD id should be dynamically provided
        createdAt: date ? new Date(date) : new Date(),
        teacherId: teacherId || null, // Include teacherId if a specific teacher is selected
      };

      const response = await fetch('http://localhost:5000/api/notice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noticeData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Notice created successfully!');
        // Reset form fields
        setTitle('');
        setContent('');
        setDate('');
        setTeacherId('');
      } else {
        throw new Error(data.message || 'Error creating notice');
      }
    } catch (error) {
      console.error('Error creating notice:', error);
      toast.error('Error creating notice.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <HodNavbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <motion.div
          className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 50 }} // Start position and opacity
          animate={{ opacity: 1, y: 0 }} // End position and opacity
          transition={{ duration: 0.5 }} // Animation duration
        >
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Create New Notice</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the notice title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="6"
                  placeholder="Write the notice content here..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Select Teacher (Optional)</label>
                <select
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={fetchingTeachers}
                >
                  <option value="">-- Select a Teacher --</option>
                  {Array.isArray(teachers) &&
                    teachers.map((teacher) => (
                      <option key={teacher._id} value={teacher._id}>
                        {teacher.name}
                      </option>
                    ))}
                </select>
                {fetchingTeachers && <p className="text-sm text-gray-500 mt-2">Fetching teachers...</p>}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 text-black py-3 rounded-lg font-medium shadow-md hover:bg-yellow-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:bg-gray-400"
                whileHover={{ scale: 1.05 }} // Add hover animation
                whileTap={{ scale: 0.95 }} // Add click animation
              >
                {loading ? 'Creating Notice...' : 'Create Notice'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default HODNotice;
