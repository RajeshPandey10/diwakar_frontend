"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaLandmark, FaAward } from "react-icons/fa";
import SectionHeading from "@/components/shared/SectionHeading";

const creds = [
  { icon: FaAward, label: "ICAI Member", sub: "No. 573775" },
  { icon: FaAward, label: "ICAN Member", sub: "No. 2316" },
  { icon: FaGraduationCap, label: "MBS", sub: "Tribhuvan University" },
  { icon: FaAward, label: "Cert. PFM", sub: "ICAN" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="About Me"
          subtitle="A Chartered Accountant with a passion for public service and good governance"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              <div className="aspect-square w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="/IMG_5683.jpg"
                  alt="Diwakar Pandey"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center -z-10">
                <span className="text-[#c9a84c] text-4xl font-bold">CA</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10 max-w-sm mx-auto lg:max-w-none">
              {creds.map((c, i) => {
                const Icon = c.icon;
                return (
                  <div
                    key={i}
                    className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center mx-auto mb-2">
                      <Icon size={18} />
                    </div>
                    <p className="text-sm font-semibold text-[#0f1d35]">
                      {c.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div ref={ref}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 leading-relaxed mb-5"
            >
              <strong className="text-[#0f1d35]">CA Diwakar Pandey</strong> is
              a Partner at{" "}
              <strong className="text-[#0f1d35]">
                K.B.P.S & Associates, Chartered Accountants
              </strong>
              , where he leads the firm&apos;s Tax Advisory practice. He is a
              distinguished member of the Institute of Chartered Accountants of
              India (ICAI), Membership No. 573775, and the Institute of
              Chartered Accountants of Nepal (ICAN), Membership No. 2316.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 leading-relaxed mb-5"
            >
              Throughout his professional career, CA Pandey has accumulated
              extensive expertise in taxation, compliance, advisory, and
              negotiation services, advising a broad spectrum of clients across
              various industries. He is recognized for providing comprehensive
              and strategic guidance on complex tax matters, supporting clients
              in achieving robust tax compliance and optimal financial
              outcomes.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-600 leading-relaxed mb-5"
            >
              CA Pandey is also a certified Public Financial Management (PFM)
              expert, having received certification from the Institute of
              Chartered Accountants of Nepal (ICAN). In addition, he holds a
              Master of Business Studies (MBS) degree from Tribhuvan
              University.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-600 leading-relaxed"
            >
              As an aspiring youth politician, he actively advocates for good
              governance, transparency, and accountable leadership. His mission
              is to bring positive change by promoting inclusive development and
              empowering communities.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
