"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { label: "Home", href: "/", section: "hero" },
  { label: "About", href: "/about", section: "about" },
  { label: "Services", href: "/services", section: "services" },
  { label: "Experience", href: "/experience", section: "experience" },
  { label: "Testimonials", href: "/testimonials", section: "testimonials" },
  { label: "Blog", href: "/blog", section: "blog" },
  { label: "Gallery", href: "/gallery", section: "gallery" },
  { label: "Contact", href: "/contact", section: "contact" },
];

const sectionMap = {
  about: "about",
  services: "services",
  experience: "experience",
  testimonials: "testimonials",
  blog: "blog",
  gallery: "gallery",
  contact: "contact",
};

const getActiveFromPath = (path) => {
  const p = path.replace(/^\//, "");
  return sectionMap[p] || "hero";
};

const scrollTo = (section) => {
  if (section === "hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(section);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const pathname = usePathname();
  const scrollListenerRef = useRef(null);

  useEffect(() => {
    if (window.location.hash) {
      requestAnimationFrame(() => {
        window.history.replaceState(null, "", pathname);
      });
    }
  }, [pathname]);

  useEffect(() => {
    setActiveSection(getActiveFromPath(pathname));
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const reversed = [...navItems].reverse();
      for (const item of reversed) {
        const el = document.getElementById(item.section);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(item.section);
          break;
        }
      }
    };
    scrollListenerRef.current = onScroll;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = useCallback((item) => {
    setIsOpen(false);
    scrollTo(item.section);
    window.history.replaceState(null, "", item.href);
  }, []);

  const handleBrand = useCallback(() => {
    setIsOpen(false);
    scrollTo("hero");
    window.history.replaceState(null, "", "/");
    setActiveSection("hero");
  }, []);

  const isActive = (item) => item.section === activeSection;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <button onClick={handleBrand} className="shrink-0 cursor-pointer text-left">
            <span className="text-xl font-bold tracking-tight text-[#0f1d35]">
              Diwakar <span className="text-[#c9a84c]">Pandey</span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive(item)
                    ? "text-[#c9a84c]"
                    : "text-gray-600 hover:text-[#0f1d35]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  isActive(item)
                    ? "text-[#c9a84c] bg-gray-50"
                    : "text-gray-600 hover:text-[#0f1d35] hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
