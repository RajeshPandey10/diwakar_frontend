"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import apiService from "@/services/apiService";
import SectionHeading from "@/components/shared/SectionHeading";

const fallbackTestimonials = [
  {
    name: "Rajesh Sharma",
    role: "Business Owner",
    content:
      "Mr. Pandey's expertise in tax planning and compliance has been invaluable for our business. His thorough approach and deep understanding of financial regulations gave us complete confidence.",
    rating: 5,
  },
  {
    name: "Anita Thapa",
    role: "Startup Founder",
    content:
      "Working with Diwakar on our financial structuring was a game-changer. He provided clear, actionable advice that helped us navigate complex regulatory requirements with ease.",
    rating: 5,
  },
  {
    name: "Prakash Adhikari",
    role: "NGO Director",
    content:
      "The audit services provided by K.B.P.S & Associates under Mr. Pandey's leadership were exceptionally thorough. Highly professional and detail-oriented.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiService.fetchTestimonials();
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
          return;
        }
      } catch {}
      setTestimonials(null);
    };
    load();
  }, []);

  const items = testimonials || fallbackTestimonials;

  const next = () => setCurrent((p) => (p + 1) % items.length);
  const prev = () =>
    setCurrent((p) => (p - 1 + items.length) % items.length);

  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          title="Testimonials"
          subtitle="What clients and colleagues say about working with me"
        />

        <div ref={ref} className="relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="bg-white rounded-2xl p-10 md:p-14 border border-gray-100 shadow-lg shadow-gray-100/50 text-center max-w-2xl mx-auto"
          >
            <FaQuoteLeft className="text-[#c9a84c]/20 text-4xl mx-auto mb-6" />
            <p className="text-gray-600 text-lg leading-relaxed italic mb-8">
              &ldquo;{items[current].content}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: items[current].rating }).map(
                (_, i) => (
                  <FaStar key={i} className="text-[#c9a84c] w-4 h-4" />
                )
              )}
            </div>
            <div>
              <p className="font-semibold text-[#0f1d35]">
                {items[current].name}
              </p>
              <p className="text-sm text-gray-400">
                {items[current].role}
              </p>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="cursor-pointer w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#0f1d35] hover:border-[#c9a84c]/30 transition-all"
            >
              <FaChevronLeft size={14} />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`cursor-pointer w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "bg-[#c9a84c] w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="cursor-pointer w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#0f1d35] hover:border-[#c9a84c]/30 transition-all"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
