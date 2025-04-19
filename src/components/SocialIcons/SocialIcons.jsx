import React from "react";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { motion } from "framer-motion";

const SocialIcons = () => {
  const iconVariants = {
    hover: (custom) => ({
      y: -5,
      scale: 1.2,
      rotate: custom === "twitter" ? 360 : 0,
      transition: {
        type: "spring",
        stiffness: 300,
        duration: 0.4,
      },
    }),
  };

  return (
    <div className="flex space-x-6 justify-center">
      <motion.a
        href="https://www.linkedin.com/in/ca-diwakar-pandey-61783574/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover="hover"
        variants={iconVariants}
        className="relative"
      >
        <div className="absolute -inset-2 rounded-full bg-blue-600 opacity-25 blur-md transition-opacity group-hover:opacity-75"></div>
        <FaLinkedin
          className="text-blue-500 hover:text-blue-400 transition duration-300 z-10 relative"
          size={36}
        />
        <span className="sr-only">LinkedIn</span>
      </motion.a>

      <motion.a
        href="https://www.facebook.com/PANDEYDIWAKARCA"
        target="_blank"
        rel="noopener noreferrer"
        whileHover="hover"
        variants={iconVariants}
        className="relative"
      >
        <div className="absolute -inset-2 rounded-full bg-blue-700 opacity-25 blur-md transition-opacity group-hover:opacity-75"></div>
        <FaFacebook
          className="text-blue-600 hover:text-blue-400 transition duration-300 z-10 relative"
          size={36}
        />
        <span className="sr-only">Facebook</span>
      </motion.a>

      <motion.a
        href="https://x.com/i/flow/login?redirect_after_login=%2FDiwakar_NC"
        target="_blank"
        rel="noopener noreferrer"
        whileHover="hover"
        variants={iconVariants}
        custom="twitter"
        className="relative"
      >
        <div className="absolute -inset-2 rounded-full bg-gray-800 opacity-25 blur-md transition-opacity group-hover:opacity-75"></div>
        <RiTwitterXFill
          className="text-gray-200 hover:text-gray-100 transition duration-300 z-10 relative"
          size={36}
        />
        <span className="sr-only">Twitter</span>
      </motion.a>

      <motion.a
        href="https://www.instagram.com/dwakarpandey/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover="hover"
        variants={iconVariants}
        className="relative group"
      >
        <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 opacity-25 blur-md transition-opacity group-hover:opacity-75"></div>
        <FaInstagram
          className="text-gradient-instagram hover:text-pink-400 transition duration-300 z-10 relative"
          size={36}
        />
        <span className="sr-only">Instagram</span>
      </motion.a>
    </div>
  );
};

export default SocialIcons;
