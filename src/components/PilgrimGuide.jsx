import React, { useState } from 'react';
import { PILGRIM_CHECKLIST } from '../data/travelData';
import { CheckSquare, Square, FileText, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';

export default function PilgrimGuide() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const currentCategory = PILGRIM_CHECKLIST[activeCategoryIndex];

  return (
    <section id="guide" className="guide-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">دليل ضيوف الرحمن</span>
          <h2 className="section-title">
            إرشادات وقائمة <span className="gold-text-gradient font-serif">تجهيز المعتمر والحاج</span>
          </h2>
          <p className="section-subtitle">
            قائمة عملية وتفاعلية لمساعدتكم في استكمال الوثائق الرسمية، فقه الإحرام للمغادرين من المغرب، وتجهيز الحقيبة براحة وطمأنينة.
          </p>
        </div>

        {/* Guide Container */}
        <div className="guide-wrapper luxury-card">
          {/* Guide Category Tabs */}
          <div className="guide-tabs">
            {PILGRIM_CHECKLIST.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                className={`guide-tab-btn ${activeCategoryIndex === idx ? 'guide-tab-active' : ''}`}
                onClick={() => setActiveCategoryIndex(idx)}
              >
                <span className="tab-number">{idx + 1}</span>
                <span className="tab-text">{cat.category}</span>
              </button>
            ))}
          </div>

          {/* Guide Items List */}
          <div className="guide-content-area">
            <div className="guide-category-header">
              <h3 className="category-title">{currentCategory.category}</h3>
              <span className="category-hint">اضغط على أي بند لتحديده كمكتمل في قائمتك الخاصة</span>
            </div>

            <div className="guide-items-list">
              {currentCategory.items.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div 
                    key={item.id}
                    className={`guide-item-card ${isChecked ? 'item-checked' : ''}`}
                    onClick={() => toggleCheck(item.id)}
                  >
                    <div className="item-checkbox">
                      {isChecked ? (
                        <CheckSquare size={20} className="check-icon-active" />
                      ) : (
                        <Square size={20} className="check-icon-idle" />
                      )}
                    </div>
                    <div className="item-details">
                      <h4 className="item-title">{item.title}</h4>
                      <p className="item-desc">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Practical Advice Banner */}
            <div className="guide-note-banner">
              <AlertCircle size={20} className="note-icon" />
              <div className="note-text">
                <strong>تذكير فريق الأخوية:</strong> يتولى مستشاركم في الأخوية مراجعة وثائقكم والتأكد من مطابقتها للشروط المعتمدة قبل موعد السفر، ويسلمكم الدليل الفقهي الميسر مطبوعاً مع حقيبة المعتمر.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
