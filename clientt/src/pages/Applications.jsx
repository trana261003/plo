import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const url = 'http://localhost:5000/api/applications';
        console.log('Fetching from:', url); // Log the URL

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('API Response:', response.data); // Log the response

        if (Array.isArray(response.data)) {
          setApplications(response.data);
        } else {
          setError('Unexpected response format.');
        }
      } catch (err) {
        console.error('Error fetching applications:', err.response ? err.response.data : err.message);
        setError('Failed to fetch applications. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <p>Loading applications...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} className="border border-gray-300 rounded-md p-4 mb-4 shadow-sm">
            <p><strong>Content:</strong> {app.content}</p>
            <p><strong>Status:</strong> {app.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Applications;




