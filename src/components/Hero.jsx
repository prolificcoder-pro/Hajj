import React from 'react';
import { Compass, ShieldCheck, Plane, CheckCircle2, ArrowDown, MapPin } from 'lucide-react';

export default function Hero({ onNavigateToBuilder, onNavigateToPackages }) {
  return (
    <section id="hero" className="hero-section">
      {/* Background with Dark Subtle Atmosphere and Serene Makkah Visual */}
      <div className="hero-backdrop">
        <img 
          src="/assets/makkah.jpg" 
          alt="الكعبة المشرفة والمسجد الحرام" 
          className="hero-backdrop-img"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          {/* Hero Emblem Showcase */}
          <div className="hero-emblem-wrap">
            <img 
              src="/assets/logo-white.png" 
              alt="شعار الأخوية لخدمة ضيوف الرحمن" 
              className="hero-emblem-img"
            />
          </div>

          {/* Official License Badge */}
          <div className="hero-badge">
            <span className="hero-badge-flag">🇲🇦</span>
            <span className="hero-badge-text">الأخوية لخدمة ضيوف الرحمن بالمغرب — رخصة سياحية رسمية</span>
            <ShieldCheck size={16} className="hero-badge-icon" />
          </div>

          {/* Main Headline */}
          <h1 className="hero-title">
            رحلتكم إلى الديار المقدسة.. <br />
            <span className="gold-text-gradient font-serif">أمانة نرعاها ورعاية تليق بضيوف الرحمن</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-description">
            نضع بين أيديكم تجربة حج وعمرة راقية متكاملة؛ نجمع فيها بين أصالة التأطير المغربي، دقة المواعيد، وراحة الإقامة بالدرهم المغربي (MAD) بكل طمأنينة وشفافية.
          </p>

          {/* Prominent CTAs */}
          <div className="hero-cta-group">
            <button 
              type="button" 
              className="btn-primary hero-main-btn"
              onClick={onNavigateToBuilder}
            >
              <Compass size={20} />
              <span>صمّم رحلتك الآن</span>
            </button>

            <button 
              type="button" 
              className="btn-secondary hero-secondary-btn"
              onClick={onNavigateToPackages}
            >
              <span>استكشف الباقات الجاهزة</span>
              <ArrowDown size={18} />
            </button>
          </div>

          {/* Trust Metrics Bar */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <CheckCircle2 size={18} className="trust-icon" />
              <span>رحلات مباشرة من مطارات المملكة</span>
            </div>
            <div className="trust-item-divider"></div>
            <div className="trust-item">
              <CheckCircle2 size={18} className="trust-icon" />
              <span>فنادق معتمدة قبالة الحرمين</span>
            </div>
            <div className="trust-item-divider"></div>
            <div className="trust-item">
              <CheckCircle2 size={18} className="trust-icon" />
              <span>تأطير ديني وإداري 24/7</span>
            </div>
            <div className="trust-item-divider"></div>
            <div className="trust-item">
              <CheckCircle2 size={18} className="trust-icon" />
              <span>أسعار واضحة بالدرهم المغربي</span>
            </div>
          </div>

          {/* Quick Moroccan Cities Strip */}
          <div className="hero-cities-strip">
            <span className="cities-label">
              <Plane size={15} />
              انطلاق الرحلات:
            </span>
            <span className="city-pill">الدار البيضاء</span>
            <span className="city-pill">الرباط</span>
            <span className="city-pill">مراكش</span>
            <span className="city-pill">طنجة</span>
            <span className="city-pill">فاس</span>
            <span className="city-pill">أكادير</span>
          </div>
        </div>
      </div>
    </section>
  );
}
