import React from "react";
import { motion } from "framer-motion";
import {
  FaSuitcase,
  FaCalendarAlt,
} from "react-icons/fa";

const ProfessionalJourney = () => {
  // Professional experiences
  const professionalExperiences = [
    {
      title: "Article Trainee",
      company: "M. Thomas & Co.",
      location: "",
      date: "2013",
      description: "",
      color: "blue",
    },
    {
      title: "Article Trainee",
      company: "Gupta Aggarwal Sharda & Jain, Chartered Accountants",
      date: "2014",
      color: "purple",
    },
    {
      title: "Associates",
      company: "Kaizen Business Consultants Pvt Ltd",
      date: "2019",
      color: "green",
    },
    {
      title: "Senior Associates",
      company: "Ecovis P Y C & Associates, Chartered Accountants",
      date: "2020",
      color: "purple",
    },
    {
      title: "Managing  Director",
      company: "Kaizen Business Consultants Pvt Ltd",
      date: "2021",
      color: "purple",
    },
    {
      title: "Chartered Accountants",
      company: "A. Khadka & Associates, Chartered Accountants",
      date: "2023",
      color: "green",
    },
    {
      title: "Partner",
      company: "K. B. P. S. & Associates, Chartered Accountants",
      date: "2025",
      color: "green",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const getColor = (color) => {
    switch (color) {
      case "blue":
        return "from-blue-500 to-blue-600 border-blue-400 shadow-blue-400/20";
      case "purple":
        return "from-purple-500 to-purple-600 border-purple-400 shadow-purple-400/20";
      case "green":
        return "from-emerald-500 to-emerald-600 border-emerald-400 shadow-emerald-400/20";
      case "red":
        return "from-red-500 to-red-600 border-red-400 shadow-red-400/20";
      default:
        return "from-gray-500 to-gray-600 border-gray-400 shadow-gray-400/20";
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Professional Experience Section */}
      <section id="professional" className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-5xl font-bold text-center mb-16 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Professional Journey
            </span>
            <motion.span
              className="absolute bottom-0 left-1/2 w-20 h-1 bg-blue-500 rounded-full"
              initial={{ width: 0, x: "-50%" }}
              animate={{ width: 80, x: "-50%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.span>
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-6 md:left-1/2 w-1 h-full transform -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 rounded-full z-0"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />

            {/* Experience items */}
            <motion.div
              className="relative z-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {professionalExperiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="mb-12 relative"
                  variants={itemVariants}
                >
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center`}
                  >
                    {/* Timeline dot */}
                    <motion.div
                      className={`absolute left-6 md:left-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${getColor(
                        exp.color
                      )} transform -translate-x-1/2 border-2 border-gray-900 z-20`}
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />

                    {/* Content card */}
                    <motion.div
                      className={`w-full md:w-5/12 ${
                        index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                      }`}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div
                        className={`p-6 bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700 hover:shadow-2xl hover:shadow-${exp.color}-500/10 transition-all duration-500`}
                      >
                        <h3
                          className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${getColor(
                            exp.color
                          )}`}
                        >
                          {exp.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <div className="flex items-center">
                            <FaSuitcase className="mr-2 text-gray-400" />
                            <span className="text-gray-300">{exp.company}</span>
                          </div>
                        </div>

                        <div className="flex items-center mt-2">
                          <FaCalendarAlt className="mr-2 text-gray-400" />
                          <span className="text-gray-300">{exp.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalJourney;
