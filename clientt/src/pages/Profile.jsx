import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user details');
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error(error.message);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-yellow-300">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg transform transition-all hover:scale-105">
          {loading ? (
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-600">Loading...</p>
            </div>
          ) : user ? (
            <div>
              <div className="flex items-center justify-center mb-6">
                <FaUserCircle className="w-32 h-32 text-gray-400" />
              </div>
              <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Profile</h1>
              <div className="border-b mb-4 pb-4">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">User Details</h2>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Name:</span> {user.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Role:</span> {user.role}
                  </p>
                  {user.semester && (
                    <p className="text-gray-700">
                      <span className="font-medium">Semester:</span> {user.semester}
                    </p>
                  )}
                  {user.enrollmentNumber && (
                    <p className="text-gray-700">
                      <span className="font-medium">Enrollment Number:</span> {user.enrollmentNumber}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={() => navigate('/edit-profile')}
                  className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate('/teacher-dashboard')}
                  className="mt-4 ml-4 bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
                >
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-600">No user data available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
