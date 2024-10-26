// // src/pages/UnderConstruction.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const UnderConstruction = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-yellow-100">
//       <h1 className="text-4xl font-bold text-yellow-600">🚧 Under Construction 🚧</h1>
//       <p className="text-xl mt-4">This page is currently under construction. Please come back later.</p>
//       <Link to="/" className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//         Go Back Home
//       </Link>
//     </div>
//   );
// };

// export default UnderConstruction;



// src/pages/UnderConstruction.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-yellow-100 to-yellow-200">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-extrabold text-yellow-700 drop-shadow-md">
          🚧 Under Construction 🚧
        </h1>
        <p className="text-lg text-gray-700 mt-4 font-light">
          We're working hard to get this page ready. Please check back soon!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-10"
      >
        <Link
          to="/student-dashboard"
          className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none"
        >
          Go Back Home
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="absolute bottom-10 text-gray-500 text-sm"
      >
        <p>© 2024 Team PLO(PaperlessOffice). All rights reserved.</p>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;
