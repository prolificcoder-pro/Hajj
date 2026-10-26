import React, { useState, useMemo } from 'react';
import { 
  DEPARTURE_CITIES, 
  DURATION_OPTIONS, 
  FLIGHT_OPTIONS, 
  VISA_OPTIONS, 
  MAKKAH_HOTELS, 
  MADINAH_HOTELS, 
  ROOM_TYPES, 
  GROUND_TRANSFERS, 
  ADDON_SERVICES,
  AGENCY_CONTACT 
} from '../data/travelData';
import { 
  Compass, 
  Calendar, 
  Users, 
  Plane, 
  Hotel, 
  Train, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  ShieldCheck, 
  MessageCircle, 
  Sparkles,
  Info,
  MapPin,
  Clock,
  Award
} from 'lucide-react';

export default function UmrahBuilder() {
  // Step State (1: Basics, 2: Flights & Visa, 3: Makkah Hotel, 4: Madinah Hotel, 5: Transfers & Addons, 6: Summary)
  const [currentStep, setCurrentStep] = useState(1);

  // Configuration State
  const [basics, setBasics] = useState({
    cityId: 'cmn',
    departureMonth: '2026-11',
    durationId: '15days',
    adults: 2,
    children: 0,
    infants: 0
  });

  const [flightVisa, setFlightVisa] = useState({
    flightId: 'direct',
    visaId: 'umrah_nusuk'
  });

  const [makkah, setMakkah] = useState({
    hotelId: 'makkah_swissotel_maqam',
    roomType: 'quad'
  });

  const [madinah, setMadinah] = useState({
    hotelId: 'madinah_saja',
    roomType: 'quad'
  });

  const [services, setServices] = useState({
    transferId: 'haramain_train_economy',
    selectedAddonIds: ['makkah_ziyarat', 'madinah_ziyarat', 'guide_assistance']
  });

  // Selected object references
  const selectedCity = DEPARTURE_CITIES.find(c => c.id === basics.cityId) || DEPARTURE_CITIES[0];
  const selectedDuration = DURATION_OPTIONS.find(d => d.id === basics.durationId) || DURATION_OPTIONS[1];
  const selectedFlight = FLIGHT_OPTIONS.find(f => f.id === flightVisa.flightId) || FLIGHT_OPTIONS[0];
  const selectedVisa = VISA_OPTIONS.find(v => v.id === flightVisa.visaId) || VISA_OPTIONS[0];
  const selectedMakkahHotel = MAKKAH_HOTELS.find(h => h.id === makkah.hotelId) || MAKKAH_HOTELS[1];
  const selectedMadinahHotel = MADINAH_HOTELS.find(h => h.id === madinah.hotelId) || MADINAH_HOTELS[2];
  const selectedTransfer = GROUND_TRANSFERS.find(t => t.id === services.transferId) || GROUND_TRANSFERS[1];

  // Room capacities & count calculations
  const makkahCapacity = ROOM_TYPES.find(r => r.id === makkah.roomType)?.capacity || 4;
  const madinahCapacity = ROOM_TYPES.find(r => r.id === madinah.roomType)?.capacity || 4;

  const payingTravelers = Math.max(1, basics.adults + basics.children);
  const totalTravelers = basics.adults + basics.children + basics.infants;

  const makkahRoomsCount = Math.ceil(payingTravelers / makkahCapacity);
  const madinahRoomsCount = Math.ceil(payingTravelers / madinahCapacity);

  // Financial Calculations
  const calculations = useMemo(() => {
    // 1. Flights
    const flightBaseCost = (selectedFlight.pricePerPerson + selectedCity.extraFlightFee) * payingTravelers;
    
    // 2. Visa
    const visaCost = selectedVisa.pricePerPerson * payingTravelers;

    // 3. Makkah Hotel
    const makkahNightRate = selectedMakkahHotel.pricesPerNightPerRoom[makkah.roomType] || 1500;
    const makkahTotalCost = makkahNightRate * selectedDuration.makkahNights * makkahRoomsCount;

    // 4. Madinah Hotel
    const madinahNightRate = selectedMadinahHotel.pricesPerNightPerRoom[madinah.roomType] || 1100;
    const madinahTotalCost = madinahNightRate * selectedDuration.madinahNights * madinahRoomsCount;

    // 5. Transfer
    let transferCost = 0;
    if (selectedTransfer.pricePerPerson) {
      transferCost = selectedTransfer.pricePerPerson * payingTravelers;
    } else if (selectedTransfer.pricePerGroup) {
      transferCost = selectedTransfer.pricePerGroup;
    }

    // 6. Addons
    const addonsCost = services.selectedAddonIds.reduce((sum, addonId) => {
      const addon = ADDON_SERVICES.find(a => a.id === addonId);
      return sum + (addon ? addon.pricePerPerson * payingTravelers : 0);
    }, 0);

    const totalEstimate = flightBaseCost + visaCost + makkahTotalCost + madinahTotalCost + transferCost + addonsCost;
    const perPersonEstimate = Math.round(totalEstimate / payingTravelers);

    return {
      flightBaseCost,
      visaCost,
      makkahTotalCost,
      makkahNightRate,
      madinahTotalCost,
      madinahNightRate,
      transferCost,
      addonsCost,
      totalEstimate,
      perPersonEstimate
    };
  }, [
    selectedFlight, 
    selectedCity, 
    payingTravelers, 
    selectedVisa, 
    selectedMakkahHotel, 
    makkah.roomType, 
    selectedDuration, 
    makkahRoomsCount,
    selectedMadinahHotel,
    madinah.roomType,
    madinahRoomsCount,
    selectedTransfer,
    services.selectedAddonIds
  ]);

  // Generate Reference Code
  const itineraryRef = useMemo(() => {
    return `OKH-UMR-${basics.cityId.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  }, [basics.cityId]);

  // Construct WhatsApp Enquiry Message
  const whatsappUrl = useMemo(() => {
    const lines = [
      `السلام عليكم ورحمة الله وبركاته،`,
      `أرغب في الاستفسار عن توفر باقة العمرة المصممة عبر موقع الأخوية:`,
      `🔖 كود الرحلة المرجعي: ${itineraryRef}`,
      `✈️ مدينة الانطلاق: ${selectedCity.name} (${selectedCity.airport})`,
      `📅 موعد السفر المقترح: ${basics.departureMonth}`,
      `⏳ المدة: ${selectedDuration.label}`,
      `👥 عدد المسافرين: ${basics.adults} بالغين${basics.children > 0 ? ` + ${basics.children} أطفال` : ''}${basics.infants > 0 ? ` + ${basics.infants} رضع` : ''}`,
      `🛫 الطيران: ${selectedFlight.name}`,
      `📋 التأشيرة: ${selectedVisa.name}`,
      `🕋 فندق مكة: ${selectedMakkahHotel.name} (${makkah.roomType === 'double' ? 'غرفة ثنائية' : makkah.roomType === 'triple' ? 'غرفة ثلاثية' : 'غرفة رباعية'}) - ${selectedDuration.makkahNights} ليالٍ`,
      `🕌 فندق المدينة: ${selectedMadinahHotel.name} (${madinah.roomType === 'double' ? 'غرفة ثنائية' : madinah.roomType === 'triple' ? 'غرفة ثلاثية' : 'غرفة رباعية'}) - ${selectedDuration.madinahNights} ليالٍ`,
      `🚆 التنقلات: ${selectedTransfer.name}`,
      `💰 التكلفة التقديرية: ${calculations.totalEstimate.toLocaleString('ar-MA')} درهم مغربي (${calculations.perPersonEstimate.toLocaleString('ar-MA')} د.م للشخص)`,
      `\nأرجو تدقيق التوفر وإفادتي بالخطوات القادمة وشروط التأكيد مع مستشاركم.`
    ];

    const message = lines.join('\n');
    return `https://wa.me/${AGENCY_CONTACT.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  }, [
    itineraryRef,
    selectedCity,
    basics,
    selectedDuration,
    selectedFlight,
    selectedVisa,
    selectedMakkahHotel,
    makkah.roomType,
    selectedMadinahHotel,
    madinah.roomType,
    selectedTransfer,
    calculations
  ]);

  // Addon selection toggle
  const toggleAddon = (addonId) => {
    setServices(prev => {
      const exists = prev.selectedAddonIds.includes(addonId);
      return {
        ...prev,
        selectedAddonIds: exists 
          ? prev.selectedAddonIds.filter(id => id !== addonId)
          : [...prev.selectedAddonIds, addonId]
      };
    });
  };

  const stepsList = [
    { number: 1, title: 'الوجهة والمسافرين' },
    { number: 2, title: 'الطيران والتأشيرة' },
    { number: 3, title: 'فنادق مكة' },
    { number: 4, title: 'فنادق المدينة' },
    { number: 5, title: 'التنقلات والخدمات' },
    { number: 6, title: 'المراجعة والتكلفة' }
  ];

  return (
    <section id="builder" className="builder-section">
      <div className="container">
        {/* Section Title */}
        <div className="section-header">
          <span className="section-tag">الخدمة الحصرية لأبناء المغرب</span>
          <h2 className="section-title">
            صمّم رحلتك <span className="gold-text-gradient font-serif">خطوة بخطوة</span>
          </h2>
          <p className="section-subtitle">
            حدد خياراتك بدقة لتصميم برنامج عمرة متكامل يناسب ميزانيتك وعائلتك، مع احتساب فوري وشفاف بالدرهم المغربي (MAD).
          </p>
        </div>

        {/* Builder Wrapper */}
        <div className="builder-card">
          {/* Top Step Bar */}
          <div className="builder-stepper">
            {stepsList.map((step) => {
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              return (
                <button
                  key={step.number}
                  type="button"
                  className={`step-btn ${isCurrent ? 'step-active' : ''} ${isCompleted ? 'step-done' : ''}`}
                  onClick={() => setCurrentStep(step.number)}
                  aria-label={`الانتقال إلى خطوة ${step.title}`}
                >
                  <div className="step-circle">
                    {isCompleted ? <Check size={14} /> : step.number}
                  </div>
                  <span className="step-label">{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Step Content */}
          <div className="builder-body">
            {/* STEP 1: Basics (City, Date, Travelers, Duration) */}
            {currentStep === 1 && (
              <div className="step-content">
                <div className="step-intro">
                  <h3 className="step-title">المحطة الأولى: تفاصيل الرحلة الأساسية</h3>
                  <p className="step-desc">اختر مطار الانطلاق المغربي المفضل، المدة الإجمالية، وموعد السفر المقترح.</p>
                </div>

                {/* Departure City Grid */}
                <div className="form-group">
                  <label className="form-label">مدينة الانطلاق (المغرب)</label>
                  <div className="options-grid grid-3">
                    {DEPARTURE_CITIES.map((city) => (
                      <div 
                        key={city.id}
                        className={`selectable-option ${basics.cityId === city.id ? 'option-selected' : ''}`}
                        onClick={() => setBasics({ ...basics, cityId: city.id })}
                      >
                        <div className="option-header">
                          <span className="option-name">{city.name}</span>
                          {basics.cityId === city.id && <Check size={16} className="text-gold" />}
                        </div>
                        <span className="option-sub">{city.airport}</span>
                        {city.extraFlightFee > 0 && (
                          <span className="option-hint">فرق رمزي: +{city.extraFlightFee} د.م</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration Picker */}
                <div className="form-group">
                  <label className="form-label">مدة الإقامة الإجمالية</label>
                  <div className="options-grid grid-2">
                    {DURATION_OPTIONS.map((dur) => (
                      <div 
                        key={dur.id}
                        className={`selectable-option ${basics.durationId === dur.id ? 'option-selected' : ''}`}
                        onClick={() => setBasics({ ...basics, durationId: dur.id })}
                      >
                        <div className="option-header">
                          <span className="option-name">{dur.label}</span>
                          {dur.recommended && <span className="badge-gold">الأكثر طلباً</span>}
                        </div>
                        <span className="option-sub">{dur.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Month & Travelers Grid */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">تاريخ المغادرة المقترح</label>
                    <select 
                      className="form-select"
                      value={basics.departureMonth}
                      onChange={(e) => setBasics({ ...basics, departureMonth: e.target.value })}
                    >
                      <option value="2026-11">نوفمبر 2026 (موسم ربيع الأول - المولد النبوي)</option>
                      <option value="2026-12">ديسمبر 2026 (عطلة نهاية السنة)</option>
                      <option value="2027-01">يناير 2027 (أجواء معتدلة وهادئة)</option>
                      <option value="2027-02">فبراير 2027 (موسم رجب المبارك)</option>
                      <option value="2027-03">مارس 2027 (موسم شعبان ورمضان المبارك)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">عدد المسافرين (بالغين وأطفال)</label>
                    <div className="travelers-counter-box">
                      <div className="counter-item">
                        <span className="counter-label">البالغين (+12 سنة)</span>
                        <div className="counter-actions">
                          <button 
                            type="button" 
                            className="counter-btn"
                            disabled={basics.adults <= 1}
                            onClick={() => setBasics({ ...basics, adults: basics.adults - 1 })}
                          >-</button>
                          <span className="counter-val">{basics.adults}</span>
                          <button 
                            type="button" 
                            className="counter-btn"
                            onClick={() => setBasics({ ...basics, adults: basics.adults + 1 })}
                          >+</button>
                        </div>
                      </div>

                      <div className="counter-item">
                        <span className="counter-label">الأطفال (2 - 11 سنة)</span>
                        <div className="counter-actions">
                          <button 
                            type="button" 
                            className="counter-btn"
                            disabled={basics.children <= 0}
                            onClick={() => setBasics({ ...basics, children: basics.children - 1 })}
                          >-</button>
                          <span className="counter-val">{basics.children}</span>
                          <button 
                            type="button" 
                            className="counter-btn"
                            onClick={() => setBasics({ ...basics, children: basics.children + 1 })}
                          >+</button>
                        </div>
                      </div>

                      <div className="counter-item">
                        <span className="counter-label">الرضع (أقل من سنتين)</span>
                        <div className="counter-actions">
                          <button 
                            type="button" 
                            className="counter-btn"
                            disabled={basics.infants <= 0}
                            onClick={() => setBasics({ ...basics, infants: basics.infants - 1 })}
                          >-</button>
                          <span className="counter-val">{basics.infants}</span>
                          <button 
                            type="button" 
                            className="counter-btn"
                            onClick={() => setBasics({ ...basics, infants: basics.infants + 1 })}
                          >+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Flights & Visa */}
            {currentStep === 2 && (
              <div className="step-content">
                <div className="step-intro">
                  <h3 className="step-title">المحطة الثانية: الطيران والتأشيرة الإلكترونية</h3>
                  <p className="step-desc">حدد نوع الرحلة الجوية وتأشيرة الدخول المعتمدة وفق تفضيلك لراحة السفر.</p>
                </div>

                {/* Flights */}
                <div className="form-group">
                  <label className="form-label">خيارات الطيران (ذهاب وعودة)</label>
                  <div className="options-stack">
                    {FLIGHT_OPTIONS.map((flight) => (
                      <div 
                        key={flight.id}
                        className={`selectable-card ${flightVisa.flightId === flight.id ? 'option-selected' : ''}`}
                        onClick={() => setFlightVisa({ ...flightVisa, flightId: flight.id })}
                      >
                        <div className="card-radio">
                          <div className={`radio-dot ${flightVisa.flightId === flight.id ? 'dot-active' : ''}`}></div>
                        </div>
                        <div className="card-main">
                          <div className="card-title-row">
                            <h4 className="card-title">{flight.name}</h4>
                            <span className="badge-gold">{flight.badge}</span>
                          </div>
                          <p className="card-desc">{flight.desc}</p>
                          <span className="card-airline">الناقل المقترح: {flight.airline}</span>
                        </div>
                        <div className="card-price-tag">
                          <span className="price-amount">{flight.pricePerPerson.toLocaleString('ar-MA')} د.م</span>
                          <span className="price-unit">/ للشخص</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visa */}
                <div className="form-group">
                  <label className="form-label">نوع التأشيرة والتأمين الصحي الإلزامي</label>
                  <div className="options-stack">
                    {VISA_OPTIONS.map((visa) => (
                      <div 
                        key={visa.id}
                        className={`selectable-card ${flightVisa.visaId === visa.id ? 'option-selected' : ''}`}
                        onClick={() => setFlightVisa({ ...flightVisa, visaId: visa.id })}
                      >
                        <div className="card-radio">
                          <div className={`radio-dot ${flightVisa.visaId === visa.id ? 'dot-active' : ''}`}></div>
                        </div>
                        <div className="card-main">
                          <div className="card-title-row">
                            <h4 className="card-title">{visa.name}</h4>
                            <span className="badge-dark">{visa.badge}</span>
                          </div>
                          <p className="card-desc">{visa.desc}</p>
                        </div>
                        <div className="card-price-tag">
                          <span className="price-amount">{visa.pricePerPerson.toLocaleString('ar-MA')} د.م</span>
                          <span className="price-unit">/ للشخص</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Makkah Hotel */}
            {currentStep === 3 && (
              <div className="step-content">
                <div className="step-intro">
                  <div className="step-intro-header">
                    <div>
                      <h3 className="step-title">المحطة الثالثة: فنادق مكة المكرمة</h3>
                      <p className="step-desc">
                        فترة الإقامة بمكة: <strong>{selectedDuration.makkahNights} ليالٍ</strong>. اختر الفندق ونوع الغرفة المناسبة لراحتكم.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Room Type Selector */}
                <div className="form-group">
                  <label className="form-label">نوع الغرفة بمكة المكرمة</label>
                  <div className="options-grid grid-3">
                    {ROOM_TYPES.map((room) => (
                      <div 
                        key={room.id}
                        className={`selectable-option ${makkah.roomType === room.id ? 'option-selected' : ''}`}
                        onClick={() => setMakkah({ ...makkah, roomType: room.id })}
                      >
                        <div className="option-header">
                          <span className="option-name">{room.name}</span>
                          {room.recommended && <span className="badge-gold">اقتصادي</span>}
                        </div>
                        <span className="option-sub">{room.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotel List */}
                <div className="form-group">
                  <label className="form-label">الفنادق المتوفرة بمكة المكرمة</label>
                  <div className="hotels-grid">
                    {MAKKAH_HOTELS.map((hotel) => {
                      const isSelected = makkah.hotelId === hotel.id;
                      const roomPrice = hotel.pricesPerNightPerRoom[makkah.roomType];
                      return (
                        <div 
                          key={hotel.id}
                          className={`hotel-card ${isSelected ? 'hotel-card-selected' : ''}`}
                          onClick={() => setMakkah({ ...makkah, hotelId: hotel.id })}
                        >
                          <div className="hotel-card-badge-row">
                            <span className="badge-gold">{hotel.badge}</span>
                            <span className="hotel-stars">{'★'.repeat(hotel.stars)}</span>
                          </div>
                          <h4 className="hotel-title">{hotel.name}</h4>
                          <div className="hotel-features">
                            <div className="feature-line">
                              <MapPin size={14} className="feature-icon" />
                              <span>{hotel.distance}</span>
                            </div>
                            <div className="feature-line">
                              <Info size={14} className="feature-icon" />
                              <span>{hotel.zone}</span>
                            </div>
                          </div>
                          <div className="hotel-bottom-row">
                            <div className="hotel-price-block">
                              <span className="hotel-price">{roomPrice.toLocaleString('ar-MA')} د.م</span>
                              <span className="hotel-price-sub">/ للغرفة في الليلة</span>
                            </div>
                            <div className={`select-indicator ${isSelected ? 'indicator-active' : ''}`}>
                              {isSelected ? 'تم الاختيار' : 'تحديد الفندق'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Madinah Hotel */}
            {currentStep === 4 && (
              <div className="step-content">
                <div className="step-intro">
                  <div className="step-intro-header">
                    <div>
                      <h3 className="step-title">المحطة الرابعة: فنادق المدينة المنورة</h3>
                      <p className="step-desc">
                        فترة الإقامة بالمدينة المنورة: <strong>{selectedDuration.madinahNights} ليالٍ</strong> قبالة الحرم النبوي الشريف.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Room Type Selector */}
                <div className="form-group">
                  <label className="form-label">نوع الغرفة بالمدينة المنورة</label>
                  <div className="options-grid grid-3">
                    {ROOM_TYPES.map((room) => (
                      <div 
                        key={room.id}
                        className={`selectable-option ${madinah.roomType === room.id ? 'option-selected' : ''}`}
                        onClick={() => setMadinah({ ...madinah, roomType: room.id })}
                      >
                        <div className="option-header">
                          <span className="option-name">{room.name}</span>
                          {room.recommended && <span className="badge-gold">اقتصادي</span>}
                        </div>
                        <span className="option-sub">{room.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotel List */}
                <div className="form-group">
                  <label className="form-label">الفنادق المتوفرة بالمدينة المنورة</label>
                  <div className="hotels-grid">
                    {MADINAH_HOTELS.map((hotel) => {
                      const isSelected = madinah.hotelId === hotel.id;
                      const roomPrice = hotel.pricesPerNightPerRoom[madinah.roomType];
                      return (
                        <div 
                          key={hotel.id}
                          className={`hotel-card ${isSelected ? 'hotel-card-selected' : ''}`}
                          onClick={() => setMadinah({ ...madinah, hotelId: hotel.id })}
                        >
                          <div className="hotel-card-badge-row">
                            <span className="badge-gold">{hotel.badge}</span>
                            <span className="hotel-stars">{'★'.repeat(hotel.stars)}</span>
                          </div>
                          <h4 className="hotel-title">{hotel.name}</h4>
                          <div className="hotel-features">
                            <div className="feature-line">
                              <MapPin size={14} className="feature-icon" />
                              <span>{hotel.distance}</span>
                            </div>
                            <div className="feature-line">
                              <Info size={14} className="feature-icon" />
                              <span>{hotel.zone}</span>
                            </div>
                          </div>
                          <div className="hotel-bottom-row">
                            <div className="hotel-price-block">
                              <span className="hotel-price">{roomPrice.toLocaleString('ar-MA')} د.م</span>
                              <span className="hotel-price-sub">/ للغرفة في الليلة</span>
                            </div>
                            <div className={`select-indicator ${isSelected ? 'indicator-active' : ''}`}>
                              {isSelected ? 'تم الاختيار' : 'تحديد الفندق'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Transfers & Addons */}
            {currentStep === 5 && (
              <div className="step-content">
                <div className="step-intro">
                  <h3 className="step-title">المحطة الخامسة: التنقلات والمزارات والخدمات الإضافية</h3>
                  <p className="step-desc">اختر وسيلة التنقل بين مكة والمدينة والمطار، والخدمات الخاصة التي تعزز طمأنينتك.</p>
                </div>

                {/* Ground Transfers */}
                <div className="form-group">
                  <label className="form-label">وسيلة التنقل بين الحرمين الشريفين والمطارات</label>
                  <div className="options-stack">
                    {GROUND_TRANSFERS.map((transfer) => (
                      <div 
                        key={transfer.id}
                        className={`selectable-card ${services.transferId === transfer.id ? 'option-selected' : ''}`}
                        onClick={() => setServices({ ...services, transferId: transfer.id })}
                      >
                        <div className="card-radio">
                          <div className={`radio-dot ${services.transferId === transfer.id ? 'dot-active' : ''}`}></div>
                        </div>
                        <div className="card-main">
                          <div className="card-title-row">
                            <h4 className="card-title">{transfer.name}</h4>
                            <span className="badge-dark">{transfer.badge}</span>
                          </div>
                          <p className="card-desc">{transfer.desc}</p>
                        </div>
                        <div className="card-price-tag">
                          {transfer.pricePerPerson ? (
                            <>
                              <span className="price-amount">{transfer.pricePerPerson.toLocaleString('ar-MA')} د.م</span>
                              <span className="price-unit">/ للشخص</span>
                            </>
                          ) : (
                            <>
                              <span className="price-amount">{transfer.pricePerGroup.toLocaleString('ar-MA')} د.م</span>
                              <span className="price-unit">/ للمجموعة كاملة</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add-on Services Checklist */}
                <div className="form-group">
                  <label className="form-label">الخدمات الإضافية والمزارات الدينية</label>
                  <div className="addons-grid">
                    {ADDON_SERVICES.map((addon) => {
                      const isChecked = services.selectedAddonIds.includes(addon.id);
                      return (
                        <div 
                          key={addon.id}
                          className={`addon-card ${isChecked ? 'addon-card-active' : ''}`}
                          onClick={() => toggleAddon(addon.id)}
                        >
                          <div className="addon-checkbox">
                            {isChecked && <Check size={14} className="checkbox-check" />}
                          </div>
                          <div className="addon-info">
                            <h5 className="addon-name">{addon.name}</h5>
                            <p className="addon-desc">{addon.desc}</p>
                          </div>
                          <div className="addon-price">
                            <span>+{addon.pricePerPerson.toLocaleString('ar-MA')} د.م</span>
                            <small>/ فرد</small>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Summary & WhatsApp Enquiry */}
            {currentStep === 6 && (
              <div className="step-content">
                <div className="step-intro">
                  <div className="summary-badge-header">
                    <span className="badge-gold">
                      <Sparkles size={14} />
                      برنامج مفصّل حسب الطلب
                    </span>
                    <span className="summary-ref">رمز البرنامج: {itineraryRef}</span>
                  </div>
                  <h3 className="step-title">ملخص الرحلة والتكلفة التقديرية بالدرهم المغربي</h3>
                  <p className="step-desc">
                    راجع تفاصيل خياراتك أدناه، ويمكنك العودة لأي خطوة سابقة لتعديلها بحرية قبل إرسال طلب الاستفسار المباشر عبر واتساب.
                  </p>
                </div>

                {/* Detailed Summary Cards */}
                <div className="summary-grid">
                  {/* Left Column: Itinerary Details */}
                  <div className="summary-details-card">
                    <h4 className="summary-card-title">مواصفات البرنامج المختار</h4>
                    
                    <div className="summary-row">
                      <span className="row-label">مدينة ومطار المغادرة:</span>
                      <span className="row-value">{selectedCity.name} — {selectedCity.airport}</span>
                    </div>

                    <div className="summary-row">
                      <span className="row-label">تاريخ السفر وعدد الأيام:</span>
                      <span className="row-value">{basics.departureMonth} ({selectedDuration.label})</span>
                    </div>

                    <div className="summary-row">
                      <span className="row-label">عدد أفراد الرحلة:</span>
                      <span className="row-value">
                        {basics.adults} بالغين {basics.children > 0 ? `+ ${basics.children} أطفال` : ''} {basics.infants > 0 ? `+ ${basics.infants} رضع` : ''}
                      </span>
                    </div>

                    <div className="summary-row">
                      <span className="row-label">رحلة الطيران:</span>
                      <span className="row-value">{selectedFlight.name}</span>
                    </div>

                    <div className="summary-row">
                      <span className="row-label">التأشيرة والتأمين:</span>
                      <span className="row-value">{selectedVisa.name}</span>
                    </div>

                    <div className="summary-row">
                      <span className="row-label">فندق مكة المكرمة:</span>
                      <span className="row-value">
                        {selectedMakkahHotel.name} ({selectedDuration.makkahNights} ليالٍ) — {makkah.roomType === 'double' ? 'غرفة ثنائية' : makkah.roomType === 'triple' ? 'غرفة ثلاثية' : 'غرفة رباعية'}
                      </span>
                    </div>

                    <div className="summary-row">
                      <span className="row-label">فندق المدينة المنورة:</span>
                      <span className="row-value">
                        {selectedMadinahHotel.name} ({selectedDuration.madinahNights} ليالٍ) — {madinah.roomType === 'double' ? 'غرفة ثنائية' : madinah.roomType === 'triple' ? 'غرفة ثلاثية' : 'غرفة رباعية'}
                      </span>
                    </div>

                    <div className="summary-row">
                      <span className="row-label">التنقلات الداخلية:</span>
                      <span className="row-value">{selectedTransfer.name}</span>
                    </div>

                    <div className="summary-row">
                      <span className="row-label">الخدمات الإضافية:</span>
                      <span className="row-value">
                        {services.selectedAddonIds.length > 0 ? (
                          services.selectedAddonIds.map(id => ADDON_SERVICES.find(a => a.id === id)?.name).filter(Boolean).join(' • ')
                        ) : 'لا توجد خدمات إضافية مختارة'}
                      </span>
                    </div>

                    {/* Quick Revisions Buttons */}
                    <div className="summary-edit-links">
                      <span>تعديل سريع:</span>
                      <button type="button" onClick={() => setCurrentStep(1)} className="edit-link">المدينة والتواريخ</button>
                      <button type="button" onClick={() => setCurrentStep(2)} className="edit-link">الطيران</button>
                      <button type="button" onClick={() => setCurrentStep(3)} className="edit-link">فندق مكة</button>
                      <button type="button" onClick={() => setCurrentStep(4)} className="edit-link">فندق المدينة</button>
                      <button type="button" onClick={() => setCurrentStep(5)} className="edit-link">الخدمات</button>
                    </div>
                  </div>

                  {/* Right Column: Pricing Estimate Breakdown & WhatsApp CTA */}
                  <div className="summary-pricing-card">
                    <h4 className="summary-card-title">التكلفة التقديرية بالدرهم المغربي</h4>

                    <div className="price-breakdown-table">
                      <div className="breakdown-line">
                        <span>تذاكر الطيران ذهاب وعودة ({payingTravelers} أفراد):</span>
                        <span>{calculations.flightBaseCost.toLocaleString('ar-MA')} د.م</span>
                      </div>
                      <div className="breakdown-line">
                        <span>التأشيرات والتأمين الإلزامي:</span>
                        <span>{calculations.visaCost.toLocaleString('ar-MA')} د.م</span>
                      </div>
                      <div className="breakdown-line">
                        <span>إقامة مكة المكرمة ({selectedDuration.makkahNights} ليالٍ):</span>
                        <span>{calculations.makkahTotalCost.toLocaleString('ar-MA')} د.م</span>
                      </div>
                      <div className="breakdown-line">
                        <span>إقامة المدينة المنورة ({selectedDuration.madinahNights} ليالٍ):</span>
                        <span>{calculations.madinahTotalCost.toLocaleString('ar-MA')} د.م</span>
                      </div>
                      <div className="breakdown-line">
                        <span>التنقلات والمزارات والخدمات الإضافية:</span>
                        <span>{(calculations.transferCost + calculations.addonsCost).toLocaleString('ar-MA')} د.م</span>
                      </div>
                    </div>

                    <div className="price-grand-total">
                      <div className="total-header">
                        <span className="total-label">الإجمالي التقديري للرحلة:</span>
                        <div className="total-number-group">
                          <span className="total-mad-number">{calculations.totalEstimate.toLocaleString('ar-MA')}</span>
                          <span className="total-currency">درهم مغربي</span>
                        </div>
                      </div>
                      <div className="per-person-sub">
                        <span>المعدل التقديري لكل مسافر:</span>
                        <strong>{calculations.perPersonEstimate.toLocaleString('ar-MA')} درهم مغربي</strong>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="trust-disclaimer">
                      <Info size={16} className="disclaimer-icon" />
                      <p>
                        <strong>تنويه الشفافية:</strong> هذه التسعيرة مبنية على خياراتكم والبيانات المعتمدة للموسم. لا يُعتبر هذا حجزاً مؤكداً أو ملزماً إلا بعد مراجعة توفر المقاعد والغرف واعتمادها مع مستشار الأخوية.
                      </p>
                    </div>

                    {/* WhatsApp CTA Generator */}
                    <div className="whatsapp-action-block">
                      <a 
                        href={whatsappUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-whatsapp-full"
                      >
                        <MessageCircle size={22} />
                        <div className="btn-whatsapp-text">
                          <span className="btn-main-label">إرسال استفسار فوري عبر واتساب</span>
                          <span className="btn-sub-label">سيتم تحويل تفاصيل برنامجك مباشرة إلى المستشار الميداني</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stepper Footer Controls */}
          <div className="builder-footer">
            <div className="footer-live-preview">
              <span className="live-preview-label">التكلفة التقديرية الحالية:</span>
              <span className="live-preview-price">{calculations.totalEstimate.toLocaleString('ar-MA')} د.م</span>
              <span className="live-preview-pax">({calculations.perPersonEstimate.toLocaleString('ar-MA')} د.م / للفرد)</span>
            </div>

            <div className="footer-nav-buttons">
              {currentStep > 1 && (
                <button 
                  type="button" 
                  className="btn-secondary btn-step-nav"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  <ChevronRight size={18} />
                  <span>السابق</span>
                </button>
              )}

              {currentStep < 6 ? (
                <button 
                  type="button" 
                  className="btn-primary btn-step-nav"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  <span>التالي</span>
                  <ChevronLeft size={18} />
                </button>
              ) : (
                <button 
                  type="button" 
                  className="btn-secondary btn-step-nav"
                  onClick={() => setCurrentStep(1)}
                >
                  <RotateCcw size={16} />
                  <span>إعادة الضبط من البداية</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
