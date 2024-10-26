import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa'; // Import the trash and eye icons
import { IoNotificationsCircle } from "react-icons/io5";
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import Navbar1 from '../components/Navbar1';

const NoticeList1 = () => {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState('');
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notice', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notices');
        }

        const data = await response.json();
        setNotices(data.notices);
      } catch (error) {
        console.error('Error fetching notices:', error);
        setError('Error fetching notices');
      }
    };

    fetchNotices();
  }, []);

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotice(null);
  };

  const handleDeleteNotice = async () => {
    if (!selectedNotice) return;

    try {
      const response = await fetch(`http://localhost:5000/api/notice/${selectedNotice._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete notice');
      }

      setNotices((prevNotices) => prevNotices.filter((notice) => notice._id !== selectedNotice._id));
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting notice:', error);
      setError('Error deleting notice');
    }
  };

  return (
    <div>
      <Navbar1 />
      <motion.div
        className="min-h-screen flex flex-col bg-gray-50 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Notices</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {notices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <motion.div
                key={notice._id}
                className="p-4 border border-blue-600 rounded-lg shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleNoticeClick(notice)}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <IoNotificationsCircle className="mr-2 text-blue-600" /> {notice.title}
                </h3>
                <p className="text-gray-600">{notice.content}</p>
                <p className="text-sm text-blue-800">Issued by: {notice.issuedBy.name}</p>
                <p className="text-xs text-blue-800">{new Date(notice.createdAt).toLocaleString()}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No notices available</p>
        )}

        {isModalOpen && selectedNotice && (
          <motion.div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
              <IoNotificationsCircle className="mr-2 text-blue-600" /> {selectedNotice.title}
              </h2>
              <p className="mb-4">{selectedNotice.content}</p>
              <p className="text-sm text-blue-900">Issued by: {selectedNotice.issuedBy.name}</p>
              <p className="text-xs text-blue-900">Created at: {new Date(selectedNotice.createdAt).toLocaleString()}</p>

              <div className="flex justify-end mt-4">
                <button
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 mr-2"
                  onClick={handleDeleteNotice}
                >
                  <FaTrash className="mr-1" /> Delete Notice
                </button>
                <button
                  className="flex items-center px-4 py-2 bg-yellow-400 text-black rounded hover:bg-gradient-to-l transition duration-200"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default NoticeList1;
