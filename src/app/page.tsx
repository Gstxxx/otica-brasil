"use client";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import MultifocaisSection from "../components/MultifocaisSection";
import BenefitsSection from "../components/BenefitsSection";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection scrollY={scrollY} />

      {/* Multifocais Section */}
      <MultifocaisSection scrollY={scrollY} />

      {/* Benefits Section */}
      <BenefitsSection scrollY={scrollY} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
