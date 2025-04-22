import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFileAlt, FaEnvelope, FaInfoCircle } from "react-icons/fa";
import img from "../../../public/IMG_5683.jpg";

const Home = () => {


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section with proper spacing */}
      <div className="container mx-auto px-6 pt-16 md:pt-24 pb-16 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-white">
            Hi, I'm <span className="text-blue-500">Diwakar</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          A Chartered Accountant (CA) holding a Certificate of Practice (COP) and serving as a
          partner at K. B. P. S. & Associates, Chartered Accountants, a growing and reputed firm.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {/* Contact Button with Animation */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="group relative px-8 py-3 bg-blue-600 overflow-hidden rounded-lg inline-flex items-center"
              >
                <motion.span className="absolute inset-0 w-0 bg-blue-800 transition-all duration-500 ease-out group-hover:w-full" />
                <FaEnvelope className="mr-2 relative z-10" />
                <span className="font-medium relative z-10">Contact Me</span>
              </Link>
            </motion.div>

            {/* About Button with Animation */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/about"
                className="group relative px-8 py-3 bg-gray-700 overflow-hidden rounded-lg inline-flex items-center"
              >
                <motion.span className="absolute inset-0 w-0 bg-gray-600 transition-all duration-500 ease-out group-hover:w-full" />
                <FaInfoCircle className="mr-2 relative z-10" />
                <span className="font-medium relative z-10">Learn More</span>
              </Link>
            </motion.div>

          
          </div>
        </motion.div>

        <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Enhanced image styling with liquid animation effect */}
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg shadow-blue-500/20 relative">
              {/* Water wave effect overlay */}
              <div className="absolute inset-0 z-10 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/20"
                  animate={{
                    y: ["-100%", "100%"],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Profile image */}
              <img
                src={img}
                alt="Diwakar Pandey"
                className="w-full h-full object-cover"
              />

              {/* Animated ring */}
              <motion.div
                className="absolute -inset-1 rounded-full border-2 border-blue-400 z-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Second animated ring going counter-clockwise */}
              <motion.div
                className="absolute -inset-3 rounded-full border-2 border-blue-300 z-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Floating particles around the image */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-blue-400"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 30 - 15],
                  y: [0, Math.random() * 30 - 15],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Professional highlights section */}
      <div className="container mx-auto px-6 py-16 bg-gray-800/50 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Professional Highlights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
            }}
          >
            <h3 className="text-xl font-bold mb-2 text-blue-400">
              Chartered Accountant
            </h3>
            <p className="text-gray-300">
            With hands-on experience in auditing, regulatory compliance, and public finance management, I help organizations strengthen their financial strategies, ensure compliance, and drive long-term value. I believe that precision in numbers should always be paired with a clear understanding of the bigger picture.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.5)",
            }}
          >
            <h3 className="text-xl font-bold mb-2 text-purple-400">
              Political Advocacy
            </h3>
            <p className="text-gray-300">
              Dedicated to promoting financial transparency and ethical
              governance through active political engagement.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.5)",
            }}
          >
            <h3 className="text-xl font-bold mb-2 text-cyan-400">
              Thought Leadership
            </h3>
            <p className="text-gray-300">
            I advocate for progressive leadership grounded in democratic values, youth empowerment, and public accountability. With specialized expertise in fiscal laws, finance, accountancy, auditing, public finance, and governance, I champion transparency, inclusivity, and evidence-based policies. My vision is to strengthen institutions and drive transformative change toward a just and forward-thinking Nepal.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
