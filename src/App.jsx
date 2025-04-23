import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import ProfessionalJourney from "./components/Experience/ProfessionalJourney";
import PoliticalJourney from "./components/Experience/PoliticalJourney";
import Blog from "./components/Blog/Blog";
import Contact from "./components/Contact/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import AOS properly
import AOS from "aos";
import "aos/dist/aos.css";

// Add styles
import "./styles/gradient-text.css";
import "./styles/blog.css";

// Page transition wrapper
const PageTransition = ({ children }) => {
  const location = useLocation();

  // Simplified page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };

  const pageTransition = {
    duration: 0.3,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen" // Remove the padding-top to prevent gap
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <PageTransition>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/journey" element={<Experience />} />
          <Route
            path="/journey/professional"
            element={<ProfessionalJourney />}
          />
          <Route path="/journey/political" element={<PoliticalJourney />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageTransition>
      <Footer />
    </>
  );
};

const App = () => {
  useEffect(() => {
    try {
      // Safely initialize AOS
      if (typeof AOS.init === "function") {
        AOS.init({
          duration: 1000,
          once: true,
        });
      } else {
        console.warn("AOS.init is not available");
      }
    } catch (error) {
      console.error("Failed to initialize AOS:", error);
    }
  }, []);

  return (
    <Router>
      <AppContent />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
};

export default App;
