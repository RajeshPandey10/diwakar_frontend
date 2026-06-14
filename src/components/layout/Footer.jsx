"use client";

import Link from "next/link";
import { FaArrowRight, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import SocialIcons from "@/components/shared/SocialIcons";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f1d35] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-16 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <span className="text-xl font-bold tracking-tight">
                  Diwakar <span className="text-[#c9a84c]">Pandey</span>
                </span>
              </Link>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Chartered Accountant | Partner at K.B.P.S & Associates
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#c9a84c]/80 uppercase tracking-widest mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/about" },
                  { label: "Services", href: "/services" },
                  { label: "Testimonials", href: "/testimonials" },
                  { label: "Blog", href: "/blog" },
                  { label: "Gallery", href: "/gallery" },
                  { label: "Contact", href: "/contact" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-white/50 hover:text-[#c9a84c] text-sm transition-colors flex items-center gap-2 group"
                    >
                      <FaArrowRight className="w-2.5 h-2.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#c9a84c]/80 uppercase tracking-widest mb-5">
                Services
              </h4>
              <ul className="space-y-3 text-white/50 text-sm">
                {[
                  "Auditing & Assurance",
                  "Tax Filing & Compliance",
                  "Financial Consulting",
                  "Business Registration",
                  "Risk Assessment",
                ].map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#c9a84c]/80 uppercase tracking-widest mb-5">
                Contact
              </h4>
              <div className="space-y-3 text-white/60 text-sm">
                <a
                  href="mailto:diwakar.kbc@gmail.com"
                  className="flex items-center gap-3 hover:text-[#c9a84c] transition-colors"
                >
                  <FaEnvelope className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">diwakar.kbc@gmail.com</span>
                </a>
                <a
                  href="tel:+977-9864599939"
                  className="flex items-center gap-3 hover:text-[#c9a84c] transition-colors"
                >
                  <FaPhone className="w-3.5 h-3.5 shrink-0" />
                  <span>+977-9864599939</span>
                </a>
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>Kathmandu, Nepal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>&copy; {year} Diwakar Pandey. All rights reserved.</p>
          <p>
            Made with{" "}
            <span className="text-red-400/80">&hearts;</span> by{" "}
            <a
              href="https://rajeshpandey10.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a84c]/70 hover:text-[#c9a84c] transition-colors"
            >
              Rajesh Pandey
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
