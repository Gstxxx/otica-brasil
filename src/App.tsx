import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import MultifocaisSection from './components/MultifocaisSection';
import BenefitsSection from './components/BenefitsSection';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 opacity-30">
        <div
          className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        />
      </div>

      {/* Header */}
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

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

export default App;