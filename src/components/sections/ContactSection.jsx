"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaUser,
  FaCommentAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import apiService from "@/services/apiService";
import SocialIcons from "@/components/shared/SocialIcons";
import SectionHeading from "@/components/shared/SectionHeading";
import { CONTACT_INFO } from "@/lib/constants";

const contactMethods = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone}`,
  },
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: "Kathmandu, Nepal",
  },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiService.sendMessage(formData);
      setSuccess(true);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      toast.error(error?.error || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="Contact"
          subtitle="Have a question or want to discuss a potential collaboration? I'd love to hear from you."
        />

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-5 gap-10"
        >
          <div className="lg:col-span-2 space-y-6">
            {contactMethods.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                      {m.label}
                    </p>
                    {m.href ? (
                      <a
                        href={m.href}
                        className="text-[#0f1d35] hover:text-[#c9a84c] transition-colors font-medium text-sm break-all"
                      >
                        {m.value}
                      </a>
                    ) : (
                      <p className="text-[#0f1d35] font-medium text-sm">
                        {m.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <p className="text-sm text-gray-500 mb-3 font-medium">
                Follow me on
              </p>
              <SocialIcons />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="rounded-2xl overflow-hidden border border-gray-100 h-56"
            >
              <iframe
                title="Office location map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14733.54973319241!2d85.332881!3d27.72848!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19001f99e28b%3A0x82b87ccd7e48ca29!2sK.%20B.%20P.%20S.%20%26%20Associates%2C%20Chartered%20Accountants!5e1!3m2!1sen!2snp!4v1781367445680!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3 bg-gray-50 rounded-2xl p-8 border border-gray-100"
          >
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-500 font-medium mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={14} />
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 pl-10 rounded-xl bg-white border border-gray-200 text-[#0f1d35] text-sm placeholder-gray-400 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 font-medium mb-2">
                  Your Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={14} />
                  <input
                    type="email"
                    name="email"
                    placeholder="johndoe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 pl-10 rounded-xl bg-white border border-gray-200 text-[#0f1d35] text-sm placeholder-gray-400 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 font-medium mb-2">
                  Message
                </label>
                <div className="relative">
                  <FaCommentAlt className="absolute left-3.5 top-3.5 text-gray-300 pointer-events-none" size={14} />
                  <textarea
                    name="message"
                    placeholder="I'd like to discuss..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full p-3 pl-10 rounded-xl bg-white border border-gray-200 text-[#0f1d35] text-sm placeholder-gray-400 focus:outline-none focus:border-[#c9a84c]/50 transition-colors resize-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting || success}
                className={`cursor-pointer w-full p-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  success
                    ? "bg-green-600 hover:bg-green-500 text-white"
                    : "bg-[#0f1d35] hover:bg-[#1a2d52] text-white"
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : success ? (
                  <>
                    <FaCheckCircle />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={13} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
