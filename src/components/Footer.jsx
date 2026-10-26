import React from 'react';
import { AGENCY_CONTACT } from '../data/travelData';
import { MapPin, Phone, Clock, ShieldCheck } from 'lucide-react';

// Inline brand icons (not in lucide-react)
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer({ onNavigateToBuilder }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // TODO: Replace '#' with real social media profile URLs before launch
  const socialLinks = [
    {
      label: 'إنستغرام',
      href: AGENCY_CONTACT.instagramUrl || '#',
      Icon: InstagramIcon,
    },
    {
      label: 'فيسبوك',
      href: AGENCY_CONTACT.facebookUrl || '#',
      Icon: FacebookIcon,
    },
  ];


  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-main-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <img
                src="/assets/logo-white.png"
                alt="الأخوية لخدمة ضيوف الرحمن"
                className="footer-logo-img"
              />
              <div>
                <h3 className="footer-brand-name">الأخوية</h3>
                <p className="footer-brand-tagline">لخدمة ضيوف الرحمن</p>
              </div>
            </div>
            <p className="footer-about-text">
              وكالة أسفار مغربية متخصصة في تنظيم رحلات الحج والعمرة الراقية والميسرة. نلتزم بأعلى معايير الإتقان والتأطير الديني والأمانة لضمان أداء مناسككم بكل راحة وطمأنينة.
            </p>
            <div className="footer-license-pill">
              <ShieldCheck size={16} />
              <span>{AGENCY_CONTACT.licenseNo}</span>
            </div>

            {/* Social Media Links */}
            <div className="footer-social-links">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`تابعونا على ${label}`}
                  className="footer-social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">روابط سريعة</h4>
            <ul className="footer-links-list">
              <li><button type="button" onClick={() => scrollTo('hero')}>الرئيسية</button></li>
              <li><button type="button" onClick={() => scrollTo('packages')}>باقات العمرة والحج</button></li>
              <li><button type="button" onClick={onNavigateToBuilder} className="text-gold-light">صمّم رحلتك (البرنامج المخصص)</button></li>
              <li><button type="button" onClick={() => scrollTo('guide')}>دليل المعتمر والحاج المغربي</button></li>
              <li><button type="button" onClick={() => scrollTo('trust')}>الضمانات والاعتماد</button></li>
            </ul>
          </div>

          {/* Offices in Morocco */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">فروعنا بالمملكة المغربية</h4>
            <ul className="footer-contact-list">
              <li className="contact-list-item">
                <MapPin size={18} className="contact-icon" />
                <div>
                  <strong>المقر الرئيسي (الدار البيضاء):</strong>
                  <span>{AGENCY_CONTACT.headquarters}</span>
                </div>
              </li>
              <li className="contact-list-item">
                <MapPin size={18} className="contact-icon" />
                <div>
                  <strong>فرع الرباط:</strong>
                  <span>{AGENCY_CONTACT.branchRabat}</span>
                </div>
              </li>
              <li className="contact-list-item">
                <Phone size={18} className="contact-icon" />
                <div>
                  <strong>الهاتف الموحد:</strong>
                  <span dir="ltr">{AGENCY_CONTACT.phone}</span>
                </div>
              </li>
              <li className="contact-list-item">
                <Clock size={18} className="contact-icon" />
                <div>
                  <strong>أوقات الاستقبال:</strong>
                  <span>{AGENCY_CONTACT.hours}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            جميع الحقوق محفوظة © {new Date().getFullYear()} الأخوية لخدمة ضيوف الرحمن.
          </p>
          <p className="disclaimer-text">
            جميع الأسعار معروضة بالدرهم المغربي (MAD). تخضع العمليات للأنظمة المعتمدة من وزارة السياحة والصناعة التقليدية والاقتصاد الاجتماعي ووزارة الأوقاف والشؤون الإسلامية بالمغرب.
          </p>
        </div>
      </div>
    </footer>
  );
}
