"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaSuitcase, FaCalendarAlt, FaLandmark, FaMapMarkerAlt } from "react-icons/fa";
import {
  PROFESSIONAL_EXPERIENCES,
  POLITICAL_EXPERIENCES,
} from "@/lib/constants";
import apiService from "@/services/apiService";
import SectionHeading from "@/components/shared/SectionHeading";

const tabs = [
  { key: "professional", label: "Professional" },
  { key: "political", label: "Political" },
];

const colorMap = {
  blue: { bg: "bg-blue-100", border: "border-blue-200", text: "text-blue-600", dot: "bg-blue-500", line: "from-blue-300/60" },
  indigo: { bg: "bg-indigo-100", border: "border-indigo-200", text: "text-indigo-600", dot: "bg-indigo-500", line: "from-indigo-300/60" },
  amber: { bg: "bg-amber-100", border: "border-amber-200", text: "text-amber-600", dot: "bg-amber-500", line: "from-amber-300/60" },
};

const ExperienceSection = () => {
  const [activeTab, setActiveTab] = useState("professional");
  const [experiences, setExperiences] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiService.fetchExperiences(activeTab);
        if (Array.isArray(data) && data.length > 0) {
          setExperiences(data);
          return;
        }
      } catch {}
      setExperiences(null);
    };
    load();
  }, [activeTab]);

  const data = experiences || (activeTab === "professional"
    ? PROFESSIONAL_EXPERIENCES
    : POLITICAL_EXPERIENCES);

  return (
    <section id="experience" className="section-padding bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          title="Experience & Qualifications"
          subtitle="My professional and political journey"
        />

        <div className="flex justify-center mb-12" data-aos="fade-up" data-aos-delay="100">
          <div className="inline-flex gap-1 bg-gray-100 rounded-xl p-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`cursor-pointer px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === t.key
                    ? "bg-white text-[#0f1d35] shadow-sm"
                    : "text-gray-500 hover:text-[#0f1d35]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={ref} className="relative">
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[#c9a84c]/30 via-[#c9a84c]/10 to-transparent" />

          <div className="space-y-10">
            {data.map((exp, i) => {
              const c = colorMap[exp.color] || colorMap.blue;
              const isLast = i === data.length - 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.08,
                    ease: "easeOut",
                  }}
                  className="relative pl-20 group"
                >
                  <div className={`absolute left-0 top-0 w-[54px] h-[54px] rounded-2xl bg-white border-2 ${c.border} flex items-center justify-center ${c.text} shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 z-10`}>
                    {activeTab === "professional" ? (
                      <FaSuitcase size={18} />
                    ) : (
                      <FaLandmark size={18} />
                    )}
                  </div>

                  <div className={`absolute left-[46px] top-[54px] w-2 h-[calc(100%+20px)] ${c.dot} opacity-40 rounded-full ${isLast ? "hidden" : ""}`} />

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#c9a84c]/20 hover:shadow-lg hover:shadow-[#c9a84c]/5 transition-all duration-300 relative overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${c.bg} opacity-60 rounded-l-2xl`} />

                    <div className="pl-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-[#0f1d35]">
                          {exp.title}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-400 shrink-0">
                          <FaCalendarAlt size={11} />
                          {exp.dateEnd ? `${exp.date} – ${exp.dateEnd}` : exp.date}
                        </span>
                      </div>

                      <p className="text-gray-500 text-sm mt-1">
                        {exp.company || exp.organization}
                      </p>

                      {exp.location && (
                        <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                          <FaMapMarkerAlt size={10} />
                          {exp.location}
                        </p>
                      )}

                      {exp.description && (
                        <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
