// // src/pages/NotFoundPage.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const NotFoundPage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
//       <p className="text-xl mt-4">Sorry, the page you're looking for doesn't exist.</p>
//       <Link to="/" className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//         Go Back Home
//       </Link>
//     </div>
//   );
// };

// export default NotFoundPage;





// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-6xl font-extrabold text-red-600 drop-shadow-md">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mt-2 font-light">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-10"
      >
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none"
        >
          Go Back Home
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-10 text-gray-500 text-sm"
      >
        <p>© 2024 PLO(PaperlessOffice). All rights reserved.</p>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
