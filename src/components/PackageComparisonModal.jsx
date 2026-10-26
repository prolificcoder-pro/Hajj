import React from 'react';
import { X, Check, Minus, MessageCircle, ShieldCheck } from 'lucide-react';
import { AGENCY_CONTACT } from '../data/travelData';

export default function PackageComparisonModal({ packages, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">مقارنة باقات الحج والعمرة المتاحة</h3>
            <p className="modal-subtitle">نظرة شاملة وشفافة لمقارنة الميزات والتفاصيل والأسعار بالدرهم المغربي (MAD)</p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="إغلاق">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="compare-feature-col">المواصفات والخدمة</th>
                  {packages.map((pkg) => (
                    <th key={pkg.id} className="compare-pkg-col">
                      <div className="compare-pkg-header">
                        <span className="badge-gold">{pkg.type}</span>
                        <h4 className="compare-pkg-title">{pkg.title}</h4>
                        <div className="compare-pkg-price">
                          {pkg.price.toLocaleString('ar-MA')} <span className="price-curr">درهم</span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-label">المدة الإجمالية</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="feature-value">{pkg.duration}</td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-label">تصنيف الإقامة الفندقية</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="feature-value">{pkg.category}</td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-label">فندق مكة المكرمة</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="feature-value">{pkg.makkahHotel}</td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-label">فندق المدينة المنورة</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="feature-value">{pkg.madinahHotel}</td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-label">نوعية رحلة الطيران</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="feature-value">{pkg.flight}</td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-label">وسيلة التنقل الداخلي</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="feature-value">{pkg.transport}</td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-label">تأطير ديني وإداري مغربي</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="feature-value">
                      <span className="check-badge"><Check size={16} /> مشمول بالكامل</span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-label">شحن الأمتعة والهدايا وماء زمزم</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="feature-value">
                      <span className="check-badge"><Check size={16} /> مشمول</span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-label">طلب الاستفسار</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="feature-action">
                      <a 
                        href={`https://wa.me/${AGENCY_CONTACT.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار عن باقة: ${pkg.title} - بسعر ${pkg.price.toLocaleString('ar-MA')} درهم مغربي.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary btn-compare-cta"
                      >
                        <MessageCircle size={15} />
                        استفسار عن الباقة
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
