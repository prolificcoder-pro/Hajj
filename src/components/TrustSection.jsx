import React from 'react';
import { TRUST_POINTS, AGENCY_CONTACT } from '../data/travelData';
import { ShieldCheck, Award, HeartHandshake, FileCheck, Phone, MapPin, Clock } from 'lucide-react';

export default function TrustSection() {
  return (
    <section id="trust" className="trust-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">الأخوية لخدمة ضيوف الرحمن</span>
          <h2 className="section-title">
            أمانة ورعاية <span className="gold-text-gradient font-serif">مبنية على الثقة</span>
          </h2>
          <p className="section-subtitle">
            نكرس كفاءتنا لضمان طمأنينة الحاج والمعتمر المغربي من خلال الالتزام الصارم بالمعايير القانونية والفندقية والشرعية المعتمدة.
          </p>
        </div>

        {/* 4 Trust Pillars */}
        <div className="trust-grid">
          {TRUST_POINTS.map((point) => (
            <div key={point.id} className="trust-card luxury-card">
              <div className="trust-icon-box">
                <ShieldCheck size={28} className="trust-main-icon" />
              </div>
              <h3 className="trust-card-title">{point.title}</h3>
              <p className="trust-card-desc">{point.desc}</p>
            </div>
          ))}
        </div>

        {/* Official Agency Credentials Box */}
        <div className="credentials-box">
          <div className="credentials-content">
            <div className="credentials-text">
              <span className="badge-gold">الاعتماد الرسمي بالمملكة المغربية</span>
              <h3 className="credentials-title">{AGENCY_CONTACT.name}</h3>
              <p className="credentials-desc">
                مرخصة قانونياً تحت رقم: <strong>{AGENCY_CONTACT.licenseNo}</strong>. مسجلة ضمن الوكالات المعتمدة لتنظيم رحلات الحج والعمرة، مع ارتباط مباشر بنظام نسك للتأشيرات وخدمات الحرمين الشريفين.
              </p>
              <div className="credentials-features">
                <div className="feature-pill">
                  <FileCheck size={16} /> عقود نموذجية مصادق عليها
                </div>
                <div className="feature-pill">
                  <Award size={16} /> ضمانات مالية وتأمين شامل
                </div>
                <div className="feature-pill">
                  <HeartHandshake size={16} /> مرافقة مستمرة في كل محطة
                </div>
              </div>
            </div>

            <div className="credentials-emblem">
              <img 
                src="/assets/logo-gold.png" 
                alt="شعار الأخوية" 
                className="credentials-logo-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
