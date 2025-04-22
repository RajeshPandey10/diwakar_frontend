import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../../services/apiService";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiService.sendMessage(formData);
      setFormSuccess(true);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      // Reset success state after 5 seconds
      setTimeout(() => setFormSuccess(false), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.error || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div
      id="contact"
      className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white py-20"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h1
            className="text-5xl font-bold mb-16 text-center relative"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Get In Touch
            </span>
            <motion.span
              className="absolute bottom-0 left-1/2 w-20 h-1 bg-blue-500 rounded-full"
              initial={{ width: 0, x: "-50%" }}
              whileInView={{ width: 80, x: "-50%" }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            ></motion.span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {/* Contact Information */}
            <motion.div
              className="md:col-span-2 space-y-8"
              variants={containerVariants}
            >
              <motion.div
                className="flex items-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 transform hover:-translate-y-1 transition-transform duration-300"
                variants={itemVariants}
                whileHover={{ boxShadow: "0 0 25px rgba(59, 130, 246, 0.3)" }}
              >
                <div className="p-3 bg-blue-500 text-white rounded-full mr-4">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400">Email</h3>
                  <a
                    href="mailto:cadiwakar.kbps@gmail.com"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    cadiwakar.kbps@gmail.com
                  </a>
                </div>
              </motion.div>

            

              <motion.div
                className="flex items-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 transform hover:-translate-y-1 transition-transform duration-300"
                variants={itemVariants}
                whileHover={{ boxShadow: "0 0 25px rgba(239, 68, 68, 0.3)" }}
              >
                <div className="p-3 bg-red-500 text-white rounded-full mr-4">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-400">
                    Location
                  </h3>
                  <p className="text-gray-300">Kathmandu, Nepal</p>
                </div>
              </motion.div>

              <motion.div
                className="mt-8 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700"
                variants={itemVariants}
              >
                <p className="text-gray-300 italic">
                Let’s connect and work toward a more accountable and financially sound future for businesses and institutions in Nepal.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div className="md:col-span-3" variants={containerVariants}>
              <motion.form
                onSubmit={handleSubmit}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700"
                variants={itemVariants}
              >
                <motion.div className="mb-6" variants={itemVariants}>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </motion.div>

                <motion.div className="mb-6" variants={itemVariants}>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="johndoe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </motion.div>

                <motion.div className="mb-6" variants={itemVariants}>
                  <label className="block text-gray-300 mb-2 font-medium">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="I'd like to discuss..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    rows="6"
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || formSuccess}
                  className={`w-full p-4 rounded-lg font-medium text-white flex items-center justify-center transition-all ${
                    formSuccess
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: formSuccess ? 1 : 1.03 }}
                  whileTap={{ scale: formSuccess ? 1 : 0.97 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : formSuccess ? (
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Message Sent!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </span>
                  )}
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
