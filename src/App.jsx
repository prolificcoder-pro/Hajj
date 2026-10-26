import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UmrahBuilder from './components/UmrahBuilder';
import PackagesSection from './components/PackagesSection';
import PilgrimGuide from './components/PilgrimGuide';
import TrustSection from './components/TrustSection';
import WhatsAppFloat from './components/WhatsAppFloat';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const navigateToBuilder = () => {
    const builderEl = document.getElementById('builder');
    if (builderEl) {
      builderEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToPackages = () => {
    const packagesEl = document.getElementById('packages');
    if (packagesEl) {
      packagesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="al-okhowa-app" dir="rtl" lang="ar">
      {/* Top Navigation */}
      <Navbar onNavigateToBuilder={navigateToBuilder} />

      {/* Main Content Area */}
      <main>
        {/* 1. Hero Section */}
        <Hero 
          onNavigateToBuilder={navigateToBuilder} 
          onNavigateToPackages={navigateToPackages} 
        />

        {/* 2. Signature Feature: صمّم رحلتك (Step-by-step Interactive Builder) */}
        <UmrahBuilder />

        {/* 3. Seasonal Featured Packages & Comparison */}
        <PackagesSection />

        {/* 4. Practical Pilgrim Guide & Checklist */}
        <PilgrimGuide />

        {/* 5. Trust, Accreditations & Moroccan Credentials */}
        <TrustSection />
      </main>

      {/* Persistent & Discreet WhatsApp Contact Widget */}
      <WhatsAppFloat />

      {/* Footer */}
      <Footer onNavigateToBuilder={navigateToBuilder} />
    </div>
  );
}
