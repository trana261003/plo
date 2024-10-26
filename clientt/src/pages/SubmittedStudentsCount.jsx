import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SubmittedStudentsCount = () => {
  const { assignmentId } = useParams(); // Get assignmentId from URL or props
  const [submittedCount, setSubmittedCount] = useState(0);

  useEffect(() => {
    const fetchSubmittedStudentsCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch(`http://localhost:5000/api/assignments/submitted-count/${assignmentId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setSubmittedCount(data.count); // Update count
      } catch (error) {
        console.error('Error fetching submitted students count:', error);
      }
    };

    fetchSubmittedStudentsCount();
  }, [assignmentId]);

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-2xl font-bold mb-4">Submitted Students</h2>
      <p className="text-lg">
        {submittedCount} students have submitted this assignment.
      </p>
    </div>
  );
};

export default SubmittedStudentsCount;
