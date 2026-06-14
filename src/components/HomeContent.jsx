"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";

const sectionMap = {
  about: "about",
  services: "services",
  experience: "experience",
  testimonials: "testimonials",
  gallery: "gallery",
  blog: "blog",
  contact: "contact",
};

const scrollToId = (id) => {
  if (!id) return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "instant", block: "start" });
  }
};

const HomeContent = () => {
  const pathname = usePathname();
  const path = pathname.replace(/^\//, "");

  useEffect(() => {
    if (path === "") return;
    const id = sectionMap[path];
    if (id) scrollToId(id);
  }, [path]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace("#", "");
    if (sectionMap[id]) scrollToId(id);
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ExperienceSection />
      <TestimonialsSection />
      <BlogSection />
      <GallerySection />
      <ContactSection />
    </>
  );
};

export default HomeContent;
