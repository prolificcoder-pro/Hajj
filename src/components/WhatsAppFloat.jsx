import React, { useState } from 'react';
import { MessageCircle, Phone, Clock, X, ChevronUp } from 'lucide-react';
import { AGENCY_CONTACT } from '../data/travelData';

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultWaUrl = `https://wa.me/${AGENCY_CONTACT.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('السلام عليكم ورحمة الله، أود الاستفسار عن برامج الحج والعمرة المتاحة لدى الأخوية لخدمة ضيوف الرحمن.')}`;

  return (
    <div className="whatsapp-float-container">
      {/* Expandable Quick Drawer */}
      {isOpen && (
        <div className="whatsapp-float-card">
          <div className="float-card-header">
            <div className="float-header-info">
              <span className="float-status-dot"></span>
              <div>
                <h4 className="float-title">مستشار الأخوية متاح لخدمتكم</h4>
                <p className="float-sub">إجابة سريعة على جميع استفسارات الحج والعمرة</p>
              </div>
            </div>
            <button 
              type="button" 
              className="float-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="إغلاق نافذة التواصل"
            >
              <X size={16} />
            </button>
          </div>

          <div className="float-card-body">
            <p className="float-msg">
              أهلاً بكم في الأخوية. يسعدنا تقديم الاستشارة الفقهية والإدارية والتسعير الدقيق بالدرهم المغربي.
            </p>

            <a 
              href={defaultWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-action"
            >
              <MessageCircle size={18} />
              <span>محادثة واتساب مباشرة</span>
            </a>

            <a 
              href={`tel:${AGENCY_CONTACT.phone.replace(/[^0-9+]/g, '')}`}
              className="btn-call-action"
            >
              <Phone size={16} />
              <span>الاتصال بالوكالة: {AGENCY_CONTACT.phone}</span>
            </a>

            <div className="float-card-footer">
              <Clock size={13} />
              <span>{AGENCY_CONTACT.hours}</span>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Button */}
      <button 
        type="button" 
        className="whatsapp-float-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="تواصل عبر واتساب"
      >
        <span className="float-tooltip">تواصل مع مستشار الأخوية</span>
        <div className="float-icon-bubble">
          <MessageCircle size={26} />
        </div>
      </button>
    </div>
  );
}
