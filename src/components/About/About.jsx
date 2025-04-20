import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaLandmark,FaFileAlt } from "react-icons/fa";

const About = () => {
    // const openCV = () => {
    //     // Replace with your actual CV URL
    //     window.open("/cv_diwakar.pdf", "_blank");
    //   };
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div
      id="about-section"
      className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white py-20 px-6"
    >
      <motion.div
        className="container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.h1
          className="text-5xl font-bold mb-16 text-center relative"
          variants={cardVariants}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            About Me
          </span>
          <motion.span
            className="absolute bottom-0 left-1/2 w-20 h-1 bg-blue-500 rounded-full"
            initial={{ width: 0, x: "-50%" }}
            whileInView={{ width: 80, x: "-50%" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          ></motion.span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Career Card */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300 group"
            variants={cardVariants}
            whileHover={{ boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
          >
            <div className="flex justify-center">
              <motion.div
                className="p-4 bg-blue-500 rounded-full text-white mb-6 group-hover:bg-blue-400 transition-colors"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <FaBriefcase size={30} />
              </motion.div>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-center text-blue-400">
              Career
            </h2>
            <p className="text-gray-300 text-center">
              I am a Chartered Accountant with over 10 years of experience in
              financial management and auditing. My career has been dedicated to
              helping businesses achieve their financial goals through strategic
              planning and expert financial analysis.
                {/* CV Button with Animation */}
                          {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <button
                              onClick={openCV}
                              className="group relative px-8 py-3 bg-green-600 overflow-hidden rounded-lg inline-flex items-center"
                            >
                              <motion.span className="absolute inset-0 w-0 bg-green-800 transition-all duration-500 ease-out group-hover:w-full" />
                              <FaFileAlt className="mr-2 relative z-10" />
                              <span className="font-medium relative z-10">View CV</span>
              
                              {/* Small dot animation */}
                              {/* <motion.span
                                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white"
                                animate={{
                                  opacity: [0, 1, 0],
                                  scale: [1, 1.5, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                }}
                              />
                            </button>
                          </motion.div> */} 
            </p>

            <motion.div
              className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-6 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Education Card */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300 group"
            variants={cardVariants}
            whileHover={{ boxShadow: "0 0 25px rgba(168, 85, 247, 0.5)" }}
          >
            <div className="flex justify-center">
              <motion.div
                className="p-4 bg-purple-500 rounded-full text-white mb-6 group-hover:bg-purple-400 transition-colors"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaGraduationCap size={30} />
              </motion.div>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-center text-purple-400">
              Education
            </h2>
            <p className="text-gray-300 text-center">
              I hold a degree in Commerce and have completed my Chartered
              Accountancy from the Institute of Chartered Accountants of India
              with distinction. My education has provided me with a robust
              foundation in financial principles and practices.
            </p>

            <motion.div
              className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 mt-6 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Politics Card */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300 group"
            variants={cardVariants}
            whileHover={{ boxShadow: "0 0 25px rgba(239, 68, 68, 0.5)" }}
          >
            <div className="flex justify-center">
              <motion.div
                className="p-4 bg-red-500 rounded-full text-white mb-6 group-hover:bg-red-400 transition-colors"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaLandmark size={30} />
              </motion.div>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-center text-red-400">
              Politics
            </h2>
            <p className="text-gray-300 text-center">
              I am deeply involved in politics, advocating for transparency and
              accountability in governance. My mission is to bring positive
              change to society through ethical leadership and policy reform
              that benefits all citizens.
            </p>

            <motion.div
              className="w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 mt-6 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
