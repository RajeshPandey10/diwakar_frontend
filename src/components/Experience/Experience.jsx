import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  FaSuitcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLandmark,
  FaUserTie,
  FaBullhorn,
} from "react-icons/fa";

const Experience = ({ section }) => {
  const location = useLocation();

  // Determine which section to show based on props or URL
  const showSection =
    section ||
    (location.pathname === "/journey/professional"
      ? "professional"
      : location.pathname === "/journey/political"
      ? "political"
      : "both"); // Default to both sections on /journey

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

  // Political experiences
  const politicalExperiences = [
    {
      title: "General Member",
      organization: "Hatemalo Nepali Students Group (HNSG)",
      location: "New Delhi,India",
      date: "2012",
      description:
        "Took General Membership of Hatemalo Nepali Students Group (HNSG), HNSG used to be an umbrella organization for Nepalese CA Students residing in Laxminagar, New Delhi.",
      color: "blue",
    },
    {
      title: "Board Mmeber",
      organization: "Hatemalo Nepali Students Group (HNSG)",
      location: "New Delhi,India",
      date: "2013",
      description:
        "Elected as Board Mmeber for 5th tenure of Hatemalo Nepali Students Group (HNSG). Played crucial role in successful tenure being the most active board member.",
      color: "purple",
    },
    {
      title: "Advisor",
      organization: "Hatemalo Nepali Students Group (HNSG)",
      location: "New Delhi,India",
      date: "2014",
      description:
        "Nominated as Advisor by 6th tenure of Hatemalo Nepali Student's Group recognizing the contribution made in 5th tenure & for further guidance.",
      color: "green",
    },
    {
      title: "Advisor",
      organization: "CA NSU",
      location: "India",
      date: "2015",
      description:
        "Nominated as Advisor by 2nd committee of CA NSU India recognizing role played for helping Nepalese students residing in India",
      color: "green",
    },
    {
      title: "Joint General Secretary",
      organization: "Nepal Student's Union",
      location: "India",
      date: "2018",
      description:
        "Nominated as Joint General Secretary for central committee of Nepal Student's Union, India",
      color: "purple",
    },
    {
      title: "Treasurer",
      organization: "Sushil Koirala Socialist Youth Circle",
      location: "Nepal",
      date: "2020",
      description:
        "Nominated as Treasurer (Central) of Sushil Koirala Socialist Youth Circle",
      color: "green",
    },
    {
      title: "Regional Representative",
      organization: "Nepali Congress",
      location: "Nuwakot,Nepal",
      date: "2021",
      description:
        "Elected as Regional Representative for Nepali Congress, Nuwakot from Belkotgadhi Municipality-13, Nuwakot.",
      color: "green",
    },
    {
      title: "Central Committee Member",
      organization: "Nepal Student's Union",
      location: "Nepal",
      date: "2023",
      description:
        "Nominated as Central Committee Member  formed under leadership of Dujang Sherpa by Sher Bahadur Deuba, President, Nepali Congress.",
      color: "purple",
    },
    {
      title: "LIfe Member",
      organization: "Association of Chartered Accountants of Nepal (ACAN)",
      location: "Nepal",
      date: "2024",
      description: "",
      color: "purple",
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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
      {(showSection === "professional" || showSection === "both") && (
        <section id="professional" className="py-20">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-5xl font-bold text-center mb-16 relative"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Professional Journey
              </span>
              <motion.span
                className="absolute bottom-0 left-1/2 w-20 h-1 bg-blue-500 rounded-full"
                initial={{ width: 0, x: "-50%" }}
                whileInView={{ width: 80, x: "-50%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              ></motion.span>
            </motion.h2>

            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className="absolute left-6 md:left-1/2 w-1 h-full transform -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 rounded-full z-0"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              />

              {/* Experience items */}
              <motion.div
                className="relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
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
                          index % 2 === 0
                            ? "md:pr-12 md:text-right"
                            : "md:pl-12"
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
                              <span className="text-gray-300">
                                {exp.company}
                              </span>
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
      )}

      {/* Political Experience Section */}
      {(showSection === "political" || showSection === "both") && (
        <section id="political" className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-5xl font-bold text-center mb-16 relative"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500">
                Political Journey
              </span>
              <motion.span
                className="absolute bottom-0 left-1/2 w-20 h-1 bg-red-500 rounded-full"
                initial={{ width: 0, x: "-50%" }}
                whileInView={{ width: 80, x: "-50%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              ></motion.span>
            </motion.h2>

            <div className="relative">
              {/* Timeline line */}
              <motion.div
                className="absolute left-6 md:left-1/2 w-1 h-full transform -translate-x-1/2 bg-gradient-to-b from-red-500 via-orange-500 to-red-500 rounded-full z-0"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              />

              {/* Experience items */}
              <motion.div
                className="relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {politicalExperiences.map((exp, index) => (
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
                          index % 2 === 0
                            ? "md:pr-12 md:text-right"
                            : "md:pl-12"
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
                              <FaLandmark className="mr-2 text-gray-400" />
                              <span className="text-gray-300">
                                {exp.organization}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="mr-2 text-gray-400" />
                              <span className="text-gray-300">
                                {exp.location}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center mt-2">
                            <FaCalendarAlt className="mr-2 text-gray-400" />
                            <span className="text-gray-300">{exp.date}</span>
                          </div>

                          <p className="mt-4 text-gray-300">
                            {exp.description}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Experience;
