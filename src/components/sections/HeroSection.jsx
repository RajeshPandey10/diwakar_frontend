"use client";

import { motion } from "framer-motion";
import { FaArrowRight, FaFileAlt, FaAward } from "react-icons/fa";

const stats = [
  { value: "5+", label: "Years in Practice" },
  { value: "ICAI & ICAN", label: "Dual Certified CA" },
  { value: "Partner", label: "K.B.P.S & Associates" },
];

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#fbfaf6]"
      data-aos="fade-down"
    >
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(15,29,53,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,29,53,0.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#c9a84c]/10 blur-[120px] -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[480px] h-[480px] rounded-full bg-[#0f1d35]/5 blur-[120px] translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-6 w-full pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-[#0f1d35]">
              Hi, I&apos;m{" "}
              <span className="relative inline-block text-[#c9a84c]">
                Diwakar Pandey
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-[#c9a84c]/30"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M2 9C40 2 160 2 198 9"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl">
              A Chartered Accountant holding a Certificate of Practice and
              serving as a partner at{" "}
              <span className="text-[#0f1d35] font-medium">
                K. B. P. S. & Associates
              </span>
              , Chartered Accountants , a growing and reputed firm.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#c9a84c] hover:bg-[#d4b96a] text-[#0f1d35] font-semibold rounded-xl transition-all shadow-lg shadow-[#c9a84c]/20"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "auto" });
                }}
              >
                Book a Consultation
                <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 border-2 border-gray-200 hover:border-[#c9a84c]/30 text-gray-600 hover:text-[#0f1d35] font-medium rounded-xl transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("about")?.scrollIntoView({ behavior: "auto" });
                }}
              >
                <FaFileAlt className="w-4 h-4" />
                Learn More
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-x-10 gap-y-6 mt-12 pt-8 border-t border-[#0f1d35]/10"
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="text-2xl sm:text-3xl font-bold text-[#0f1d35] tracking-tight">
                    {s.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg mb-10">
              <div className="absolute -inset-1 rounded-[40px] bg-gradient-to-br from-[#c9a84c]/25 via-[#c9a84c]/5 to-transparent" />
              <div className="absolute inset-3 rounded-[36px] border border-dashed border-[#c9a84c]/30 -z-10" />

              <div className="relative aspect-6/5 rounded-4xl rounded-tl-lg overflow-hidden border border-gray-200 shadow-2xl shadow-[#0f1d35]/10">
                <img
                  src="/IMG_5683.jpg"
                  alt="Diwakar Pandey"
                  className="w-full h-full object-cover object-[78%_25%]"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-65 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3.5 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0f1d35] text-[#c9a84c] flex items-center justify-center shrink-0">
                  <FaAward size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#0f1d35] leading-tight whitespace-nowrap">
                    Partner, Tax Advisory
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">
                    K.B.P.S & Associates
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
