"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 60,
      easing: "ease-out-cubic",
    });
  }, []);

  return null;
};

export default AOSInit;
