"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaFileInvoiceDollar,
  FaSearchDollar,
  FaChartLine,
  FaBuilding,
  FaShieldAlt,
  FaHandshake,
} from "react-icons/fa";
import SectionHeading from "@/components/shared/SectionHeading";

const services = [
  {
    icon: FaSearchDollar,
    title: "Auditing & Assurance",
    description:
      "Comprehensive audit services including statutory audits, internal audits, and compliance audits to ensure financial accuracy and regulatory adherence.",
  },
  {
    icon: FaFileInvoiceDollar,
    title: "Tax Filing & Compliance",
    description:
      "Expert tax planning, return filing, and compliance services for individuals and businesses, ensuring full adherence to tax regulations.",
  },
  {
    icon: FaChartLine,
    title: "Financial Consulting",
    description:
      "Strategic financial planning, budgeting, and advisory services to help organizations optimize their financial performance and achieve growth.",
  },
  {
    icon: FaBuilding,
    title: "Business Registration",
    description:
      "Assistance with company registration, partnership formation, and business structuring to establish a solid legal and operational foundation.",
  },
  {
    icon: FaShieldAlt,
    title: "Risk Assessment",
    description:
      "Identifying, analyzing, and mitigating financial and operational risks through robust risk management frameworks and internal controls.",
  },
  {
    icon: FaHandshake,
    title: "Corporate Advisory",
    description:
      "Strategic advisory on mergers, acquisitions, corporate restructuring, and governance to drive sustainable business value.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Services"
          subtitle="Comprehensive financial and accounting services tailored to your needs"
        />

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#c9a84c]/20 hover:shadow-lg hover:shadow-[#c9a84c]/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center mb-6 group-hover:bg-[#c9a84c] group-hover:text-white transition-all duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[#0f1d35] mb-3">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {s.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
