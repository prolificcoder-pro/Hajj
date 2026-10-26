import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Phone, MessageCircle, Menu, X, Compass, CheckCircle2, ChevronLeft, MapPin } from 'lucide-react';
import { AGENCY_CONTACT } from '../data/travelData';

export default function Navbar({ onNavigateToBuilder }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  };

  const handleBuilderClick = () => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      onNavigateToBuilder();
    }, 80);
  };

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo & Name */}
        <a 
          href="#" 
          className="navbar-brand" 
          onClick={(e) => { 
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }}
          aria-label="الأخوية لخدمة ضيوف الرحمن - الصفحة الرئيسية"
        >
          <img 
            src="/assets/logo-gold.png" 
            alt="الأخوية لخدمة ضيوف الرحمن" 
            className="navbar-logo-img"
          />
          <div className="navbar-brand-text">
            <span className="navbar-brand-title">الأخوية</span>
            <span className="navbar-brand-subtitle">لخدمة ضيوف الرحمن بالمغرب</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links" aria-label="التنقل الرئيسي">
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }} className="nav-link">الرئيسية</a>
          <a href="#packages" onClick={(e) => { e.preventDefault(); handleNavClick('packages'); }} className="nav-link">باقات العمرة والحج</a>
          <a href="#builder" onClick={(e) => { e.preventDefault(); handleNavClick('builder'); }} className="nav-link nav-link-highlight">
            <Compass size={16} />
            صمّم رحلتك
          </a>
          <a href="#guide" onClick={(e) => { e.preventDefault(); handleNavClick('guide'); }} className="nav-link">دليل المعتمر والحاج</a>
          <a href="#trust" onClick={(e) => { e.preventDefault(); handleNavClick('trust'); }} className="nav-link">من نحن والاعتماد</a>
        </nav>

        {/* Action Controls & Contact */}
        <div className="navbar-actions">
          <a 
            href={`https://wa.me/${AGENCY_CONTACT.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('السلام عليكم ورحمة الله، أود الاستفسار عن برامج الحج والعمرة المتاحة لدى الأخوية.')}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-contact-btn"
            title="تواصل سريع عبر واتساب"
          >
            <MessageCircle size={18} className="whatsapp-icon" />
            <span className="contact-text">استشارة فورية</span>
          </a>

          <button 
            type="button" 
            className="btn-primary nav-cta-btn"
            onClick={onNavigateToBuilder}
          >
            صمّم رحلتك
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? "إغلاق القائمة الرئيسية" : "فتح القائمة الرئيسية"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer rendered via Portal into body to escape header clipping & backdrop-filter */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="mobile-menu-overlay" 
          onClick={() => setMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="قائمة التصفح للهاتف"
        >
          <div 
            className="mobile-menu-drawer" 
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Drawer Header */}
            <div className="mobile-drawer-header">
              <div className="mobile-brand-row">
                <img src="/assets/logo-gold.png" alt="الأخوية" className="drawer-logo" />
                <div className="drawer-brand-col">
                  <h4 className="drawer-title">الأخوية</h4>
                  <p className="drawer-subtitle">لخدمة ضيوف الرحمن</p>
                </div>
              </div>
              <button 
                type="button" 
                className="drawer-close-btn" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="إغلاق القائمة"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="mobile-links-list">
              <button 
                type="button" 
                onClick={() => handleNavClick('hero')} 
                className="mobile-nav-item"
              >
                <span>الرئيسية</span>
                <ChevronLeft size={18} className="nav-chevron" />
              </button>

              <button 
                type="button" 
                onClick={() => handleNavClick('packages')} 
                className="mobile-nav-item"
              >
                <span>باقات العمرة والحج الموسمية</span>
                <ChevronLeft size={18} className="nav-chevron" />
              </button>

              <button 
                type="button" 
                onClick={handleBuilderClick} 
                className="mobile-nav-item mobile-nav-highlight"
              >
                <div className="nav-item-icon-title">
                  <Compass size={18} />
                  <span>صمّم رحلتك (البرنامج المخصص)</span>
                </div>
                <ChevronLeft size={18} className="nav-chevron" />
              </button>

              <button 
                type="button" 
                onClick={() => handleNavClick('guide')} 
                className="mobile-nav-item"
              >
                <span>دليل المعتمر والحاج المغربي</span>
                <ChevronLeft size={18} className="nav-chevron" />
              </button>

              <button 
                type="button" 
                onClick={() => handleNavClick('trust')} 
                className="mobile-nav-item"
              >
                <span>الضمانات والاعتماد الرسمي</span>
                <ChevronLeft size={18} className="nav-chevron" />
              </button>
            </nav>

            {/* Quick Contact & Footer inside Drawer */}
            <div className="mobile-drawer-footer">
              <a 
                href={`https://wa.me/${AGENCY_CONTACT.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('السلام عليكم ورحمة الله، أود الاستفسار عن برامج الحج والعمرة المتاحة لدى الأخوية.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-action w-full"
              >
                <MessageCircle size={18} />
                <span>محادثة واتساب فورية</span>
              </a>

              <button 
                type="button" 
                className="btn-primary w-full drawer-cta-btn"
                onClick={handleBuilderClick}
              >
                <Compass size={18} />
                <span>صمّم رحلتك الآن بالدرهم (MAD)</span>
              </button>

              <div className="drawer-morocco-tag">
                <span>🇲🇦 وكالة مغربية مرخصة — رقم: {AGENCY_CONTACT.licenseNo}</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
