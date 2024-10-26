import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState('');

  // Fetch assignments on component mount
  useEffect(() => {
    const fetchAssignments = async () => {
      const token = localStorage.getItem('token'); // Assuming you're storing JWT in localStorage
      console.log('token:', token);

      try {
        const response = await fetch('http://localhost:5000/api/assignments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch assignments');
        }

        const data = await response.json(); // Parse JSON response
        setAssignments(data); // Set the fetched assignments to state
      } catch (error) {
        setError('Failed to fetch assignments');
      }
    };

    fetchAssignments();
  }, []);

  // Handle status change
  const handleStatusChange = async (assignmentId, newStatus) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`http://localhost:5000/api/assignments/${assignmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add authorization header
        },
        body: JSON.stringify({ status: newStatus }), // Send new status in the body
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update the assignments list with the new status
      const updatedAssignment = await response.json();
      setAssignments((prevAssignments) =>
        prevAssignments.map((assignment) =>
          assignment._id === assignmentId ? { ...assignment, status: updatedAssignment.assignment.status } : assignment
        )
      );
    } catch (error) {
      setError('Failed to update status');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Assignments</h1>
        {error && <p className="text-red-500">{error}</p>}
        {assignments.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Assignment Title</th>
                <th className="border p-2">Student Name</th>
                <th className="border p-2">Teacher Name</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Created At</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment._id}>
                  <td className="border p-2">{assignment.title}</td>
                  <td className="border p-2">{assignment.studentId.name}</td>
                  <td className="border p-2">{assignment.teacherId.name}</td>
                  <td className="border p-2">{assignment.status}</td>
                  <td className="border p-2">{new Date(assignment.createdAt).toLocaleDateString()}</td>
                  <td className="border p-2">
                    {/* Dropdown for changing status */}
                    <select
                      value={assignment.status}
                      onChange={(e) => handleStatusChange(assignment._id, e.target.value)}
                      className="p-2 border rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="submitted">Submitted</option>
                      <option value="graded">Graded</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No assignments found</p>
        )}
      </div>
    </div>
  );
};

export default AssignmentsPage;
