import React, { useState, useMemo } from 'react';
import { FEATURED_PACKAGES, AGENCY_CONTACT } from '../data/travelData';
import { 
  Calendar, 
  MapPin, 
  Hotel, 
  Plane, 
  Train, 
  CheckCircle2, 
  XCircle, 
  MessageCircle, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Scale
} from 'lucide-react';
import PackageComparisonModal from './PackageComparisonModal';

export default function PackagesSection() {
  const [activeTypeTab, setActiveTypeTab] = useState('all'); // 'all', 'عمرة', 'حج'
  const [budgetFilter, setBudgetFilter] = useState('all'); // 'all', 'under20k', '20k-40k', 'above40k'
  const [expandedPackageId, setExpandedPackageId] = useState(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const filteredPackages = useMemo(() => {
    return FEATURED_PACKAGES.filter((pkg) => {
      // Type match
      if (activeTypeTab !== 'all' && pkg.type !== activeTypeTab) {
        return false;
      }
      // Budget match
      if (budgetFilter === 'under20k' && pkg.price >= 20000) return false;
      if (budgetFilter === '20k-40k' && (pkg.price < 20000 || pkg.price > 40000)) return false;
      if (budgetFilter === 'above40k' && pkg.price <= 40000) return false;
      return true;
    });
  }, [activeTypeTab, budgetFilter]);

  const toggleExpand = (id) => {
    setExpandedPackageId(expandedPackageId === id ? null : id);
  };

  return (
    <section id="packages" className="packages-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">برامج متكاملة ومؤطرة</span>
          <h2 className="section-title">
            باقات الحج والعمرة <span className="gold-text-gradient font-serif">الموسمية</span>
          </h2>
          <p className="section-subtitle">
            خيارات مدروسة بعناية تراعي راحة الحاج والمعتمر المغربي، مع تفصيل واضح وشامل للإقامة والخدمات وتكلفة محددة بالدرهم المغربي (MAD).
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="packages-filters-bar">
          <div className="filter-tabs">
            <button 
              type="button" 
              className={`filter-tab ${activeTypeTab === 'all' ? 'active-tab' : ''}`}
              onClick={() => setActiveTypeTab('all')}
            >
              جميع البرامج ({FEATURED_PACKAGES.length})
            </button>
            <button 
              type="button" 
              className={`filter-tab ${activeTypeTab === 'عمرة' ? 'active-tab' : ''}`}
              onClick={() => setActiveTypeTab('عمرة')}
            >
              رحلات العمرة المباركة
            </button>
            <button 
              type="button" 
              className={`filter-tab ${activeTypeTab === 'حج' ? 'active-tab' : ''}`}
              onClick={() => setActiveTypeTab('حج')}
            >
              باقات موسم الحج
            </button>
          </div>

          <div className="filter-actions-right">
            {/* Budget Filter */}
            <div className="budget-select-wrap">
              <SlidersHorizontal size={15} className="filter-icon" />
              <select 
                className="budget-select"
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
              >
                <option value="all">تصفية حسب الميزانية (الكل)</option>
                <option value="under20k">أقل من 20,000 درهم</option>
                <option value="20k-40k">من 20,000 إلى 40,000 درهم</option>
                <option value="above40k">أكثر من 40,000 درهم</option>
              </select>
            </div>

            {/* Compare Trigger Button */}
            <button 
              type="button" 
              className="btn-secondary btn-compare-trigger"
              onClick={() => setIsCompareOpen(true)}
            >
              <Scale size={16} />
              <span>مقارنة الباقات</span>
            </button>
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="packages-grid">
          {filteredPackages.map((pkg) => {
            const isExpanded = expandedPackageId === pkg.id;
            const waText = encodeURIComponent(`السلام عليكم ورحمة الله، أود الاستفسار عن تفاصيل وحجز مقاعد في «${pkg.title}» بسعر ${pkg.price.toLocaleString('ar-MA')} درهم.`);

            return (
              <div key={pkg.id} className="package-card luxury-card">
                {/* Header Badge */}
                <div className="package-top-bar">
                  <div className="badge-row">
                    <span className="badge-gold">{pkg.badge}</span>
                    <span className="badge-dark">{pkg.duration}</span>
                  </div>
                  <span className="package-type-pill">{pkg.type}</span>
                </div>

                {/* Title */}
                <h3 className="package-title">{pkg.title}</h3>

                {/* Price Display */}
                <div className="package-price-box">
                  <span className="price-number">{pkg.price.toLocaleString('ar-MA')}</span>
                  <span className="price-currency">درهم مغربي</span>
                  <span className="price-details-note">/ للشخص في غرفة رباعية (شامل الطيران والتأشيرة)</span>
                </div>

                {/* Key Spec List */}
                <div className="package-specs-list">
                  <div className="spec-row">
                    <Calendar size={16} className="spec-icon" />
                    <span className="spec-text"><strong>المغادرة:</strong> {pkg.departure}</span>
                  </div>
                  <div className="spec-row">
                    <Hotel size={16} className="spec-icon" />
                    <span className="spec-text"><strong>فندق مكة:</strong> {pkg.makkahHotel}</span>
                  </div>
                  <div className="spec-row">
                    <Hotel size={16} className="spec-icon" />
                    <span className="spec-text"><strong>فندق المدينة:</strong> {pkg.madinahHotel}</span>
                  </div>
                  <div className="spec-row">
                    <Plane size={16} className="spec-icon" />
                    <span className="spec-text"><strong>الطيران:</strong> {pkg.flight}</span>
                  </div>
                  <div className="spec-row">
                    <Train size={16} className="spec-icon" />
                    <span className="spec-text"><strong>التنقلات:</strong> {pkg.transport}</span>
                  </div>
                </div>

                {/* Program Highlights */}
                <div className="package-highlights-box">
                  <h4 className="highlights-title">أبرز مزايا الباقة:</h4>
                  <ul className="highlights-ul">
                    {pkg.highlights.map((item, idx) => (
                      <li key={idx} className="highlight-li">
                        <CheckCircle2 size={15} className="highlight-check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inclusions Accordion (Collapsible) */}
                {isExpanded && (
                  <div className="package-expanded-details">
                    <div className="details-column">
                      <h5 className="details-col-title text-success">
                        <CheckCircle2 size={16} /> المشمولات في السعر:
                      </h5>
                      <ul className="details-ul">
                        {pkg.inclusions.map((inc, i) => (
                          <li key={i}>{inc}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="details-column">
                      <h5 className="details-col-title text-muted">
                        <XCircle size={16} /> غير مشمول:
                      </h5>
                      <ul className="details-ul">
                        {pkg.exclusions.map((exc, j) => (
                          <li key={j}>{exc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Card Actions */}
                <div className="package-card-footer">
                  <button 
                    type="button" 
                    className="btn-details-toggle"
                    onClick={() => toggleExpand(pkg.id)}
                  >
                    <span>{isExpanded ? 'إخفاء التفاصيل والشروط' : 'عرض كامل المشمولات والتفاصيل'}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  <a 
                    href={`https://wa.me/${AGENCY_CONTACT.whatsappNumber.replace(/[^0-9]/g, '')}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary package-enquire-btn"
                  >
                    <MessageCircle size={17} />
                    <span>استفسار فوري عبر واتساب</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Modal */}
      <PackageComparisonModal 
        packages={FEATURED_PACKAGES}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />
    </section>
  );
}
