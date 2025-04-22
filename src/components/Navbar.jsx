import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [experienceDropdown, setExperienceDropdown] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleExperienceDropdown = () => {
    setExperienceDropdown(!experienceDropdown);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { 
      name: "Journey", 
      path: "/journey",
      dropdown: true,
      items: [
        { name: "Professional", path: "/journey#professional" },
        { name: "Political", path: "/journey#political" },
      ]
    },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: "auto",
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      y: -5, 
      height: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.nav
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-sm py-3 shadow-lg"
          : "bg-gray-900/90 py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="group">
          <h1 className="text-2xl font-bold text-white">Diwakar Pandey</h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:space-x-8">
          {navLinks.map((link) => (
            link.dropdown ? (
              <div key={link.name} className="relative group">
                <button 
                  className={`flex items-center px-2 py-1 font-medium ${
                    location.pathname === link.path
                      ? "text-blue-400"
                      : "text-gray-200 hover:text-white"
                  } transition-colors duration-300`}
                  onClick={toggleExperienceDropdown}
                >
                  {link.name}
                  <FaChevronDown className="ml-1 w-3 h-3" />
                  {location.pathname === link.path && (
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full"
                      layoutId="underline"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
                
                <AnimatePresence>
                  {experienceDropdown && (
                    <motion.div 
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-0 mt-2 py-2 w-48 bg-gray-800 rounded-md shadow-xl z-20"
                    >
                      {link.items.map((item) => (
                        <motion.div key={item.name} variants={itemVariants}>
                          <a 
                            href={item.path} 
                            className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                            onClick={() => setExperienceDropdown(false)}
                          >
                            {item.name}
                          </a>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-2 py-1 font-medium ${
                  location.pathname === link.path
                    ? "text-blue-400"
                    : "text-gray-200 hover:text-white"
                } transition-colors duration-300`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 rounded-full"
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-gray-800/95 backdrop-blur-sm shadow-xl"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="container mx-auto px-6 py-4">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={itemVariants}
                  className="border-b border-gray-700 last:border-b-0"
                >
                  {link.dropdown ? (
                    <div>
                      <button
                        className={`flex items-center justify-between w-full py-4 ${
                          location.pathname === link.path
                            ? "text-blue-400"
                            : "text-gray-200"
                        } hover:text-blue-300 transition-colors duration-300`}
                        onClick={() => {
                          toggleExperienceDropdown();
                        }}
                      >
                        <span>{link.name}</span>
                        <FaChevronDown className={`transition-transform duration-300 ${experienceDropdown ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence>
                        {experienceDropdown && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pl-4 overflow-hidden"
                          >
                            {link.items.map((item) => (
                              <a
                                key={item.name}
                                href={item.path}
                                className="block py-3 text-gray-300 hover:text-blue-300 transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.name}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block py-4 ${
                        location.pathname === link.path
                          ? "text-blue-400"
                          : "text-gray-200"
                      } hover:text-blue-300 transition-colors duration-300 flex items-center justify-between`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{link.name}</span>
                      {location.pathname === link.path && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
