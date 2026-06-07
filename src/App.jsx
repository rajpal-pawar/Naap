import React, { useState, useEffect } from 'react';
import { Moon, Sun, Plus, BookOpen, User, Phone, ArrowLeft, Save, Shirt, Ruler, Trash2, Edit2, PhoneCall, Copy } from 'lucide-react';

const translations = {
  en: {
    appTitle: 'Naap',
    noMeasurements: 'No measurements yet',
    tapToAdd: 'Tap the + button to add your first customer.',
    customerDetails: 'Customer Details',
    fullName: 'Full Name *',
    phoneNumber: 'Phone Number',
    kurti: 'Kurti (Outer Tunic)',
    kurtiLength: 'Length',
    kurtiChest: 'Chest',
    kurtiWaist: 'Waist',
    kurtiShoulder: 'Shoulder',
    kurtiSideSlit: 'Side Slit',
    kanchali: 'Kanchali (Inner Blouse)',
    kanchaliTukki: 'Tukki (Cup)',
    kanchaliSleeveLength: 'Sleeve Length',
    kanchaliSleeveRound: 'Sleeve Round',
    kanchaliKharaki: 'Kharaki',
    kanchaliBaadh: 'Baadh',
    lehenga: 'Lehenga (Skirt)',
    lehengaLength: 'Length',
    lehengaWaist: 'Waist',
    lehengaMagji: 'Magji Width',
    extraNotes: 'Extra Notes',
    specialRequests: 'Special Requests',
    noPhone: 'No phone number',
    dateLabel: 'Date:',
    noMeasurementsAdded: 'No measurements added.',
    backToList: 'Back to List',
    saveMeasurement: 'Save Measurement',
    enterNameAlert: 'Please enter the customer name.',
    namePlaceholder: 'e.g., Anita Rajput',
    phonePlaceholder: 'e.g., 9876543210',
    notesPlaceholder: 'Any specific design requests...',
    deleteCustomer: 'Delete',
    deleteConfirm: 'Are you sure you want to delete this customer?',
    editCustomer: 'Edit',
    copyPhone: 'Copy',
    phoneCopied: 'Copied!',
  },
  hi: {
    appTitle: 'नाप',
    noMeasurements: 'अभी तक कोई नाप नहीं',
    tapToAdd: 'अपना पहला ग्राहक जोड़ने के लिए + बटन दबाएं।',
    customerDetails: 'ग्राहक विवरण',
    fullName: 'पूरा नाम *',
    phoneNumber: 'फ़ोन नंबर',
    kurti: 'कुर्ती',
    kurtiLength: 'लंबाई',
    kurtiChest: 'सीना',
    kurtiWaist: 'कमर',
    kurtiShoulder: 'कंधा',
    kurtiSideSlit: 'चाक (Side Slit)',
    kanchali: 'कांचली',
    kanchaliTukki: 'टुक्की',
    kanchaliSleeveLength: 'आस्तीन की लंबाई',
    kanchaliSleeveRound: 'आस्तीन की गोलाई',
    kanchaliKharaki: 'खड़की',
    kanchaliBaadh: 'बाढ़',
    lehenga: 'लहंगा',
    lehengaLength: 'लंबाई',
    lehengaWaist: 'कमर',
    lehengaMagji: 'मगजी की चौड़ाई',
    extraNotes: 'अतिरिक्त जानकारी',
    specialRequests: 'विशेष अनुरोध',
    noPhone: 'कोई फ़ोन नंबर नहीं',
    dateLabel: 'तारीख:',
    noMeasurementsAdded: 'कोई नाप नहीं जोड़ा गया।',
    backToList: 'वापस जाएं',
    saveMeasurement: 'नाप सेव करें',
    enterNameAlert: 'कृपया ग्राहक का नाम दर्ज करें।',
    namePlaceholder: 'उदा. अनीता राजपूत',
    phonePlaceholder: 'उदा. 9876543210',
    notesPlaceholder: 'कोई विशेष डिज़ाइन अनुरोध...',
    deleteCustomer: 'हटाएं',
    deleteConfirm: 'क्या आप वाकई इस ग्राहक को हटाना चाहते हैं?',
    editCustomer: 'संपादित करें',
    copyPhone: 'कॉपी करें',
    phoneCopied: 'कॉपी हो गया!',
  }
};

const KanchaliIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 5h10l3 5-1 4-2-2v4H7v-4l-2 2-1-4 3-5z" />
    <path d="M7 10c1.5 1 2.5 1 5 1s3.5 0 5-1" />
    <path d="M12 5v5" />
  </svg>
);

const LehengaIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 4h8l5 16H3L8 4z" />
    <path d="M3 20c3-1 7-1 9 0s6 1 9 0" />
    <path d="M10 4l-1 16" />
    <path d="M14 4l1 16" />
  </svg>
);

const AppLogo = ({ language }) => {
  const isEn = language === 'en';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', marginTop: '2px' }}>
      <span style={{ 
        fontFamily: isEn ? "'Playfair Display', serif" : "'Rozha One', serif",
        fontSize: isEn ? '30px' : '32px', 
        fontWeight: '700',
        fontStyle: isEn ? 'italic' : 'normal',
        color: 'var(--accent-color)', 
        letterSpacing: '1px',
        lineHeight: '1',
        marginLeft: isEn ? '2px' : '0'
      }}>
        {isEn ? 'Naap' : 'नाप'}
      </span>
      <div style={{ 
        display: 'flex', 
        width: '100%', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginTop: '2px', 
        borderTop: '2.5px solid var(--accent-color)' 
      }}>
        {[...Array(11)].map((_, i) => (
          <div key={i} style={{ 
            width: '2px', 
            height: i % 5 === 0 ? '8px' : (i % 2 === 0 ? '5px' : '3px'), 
            backgroundColor: 'var(--accent-color)',
            borderRadius: '0 0 1px 1px'
          }} />
        ))}
      </div>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [currentView, setCurrentView] = useState('home'); // 'home', 'add', or 'view'
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'add' || hash === 'view' || hash === 'home') {
        setCurrentView(hash);
      } else {
        setCurrentView('home');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [units, setUnits] = useState({});
  const [formData, setFormData] = useState({
    name: '', phone: '', kurtiLength: '', kurtiChest: '', kurtiWaist: '', kurtiShoulder: '', kurtiSideSlit: '',
    kanchaliTukki: '', kanchaliSleeveLength: '', kanchaliSleeveRound: '', kanchaliKharaki: '', kanchaliBaadh: '',
    lehengaLength: '', lehengaWaist: '', lehengaMagji: '', notes: ''
  });

  // Load theme, language, and data on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    const savedCustomers = JSON.parse(localStorage.getItem('naap_customers') || '[]');
    setCustomers(savedCustomers);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const handleUnitToggle = (name) => {
    setUnits(prev => ({
      ...prev,
      [name]: (prev[name] || 'in') === 'cm' ? 'in' : 'cm'
    }));
  };

  const t = translations[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert(t.enterNameAlert);
      return;
    }

    let updatedCustomers;
    if (formData.id) {
      const updatedCustomer = {
        ...formData,
        units: { ...units },
        date: new Date().toLocaleDateString(language === 'en' ? 'en-IN' : 'hi-IN', {
          day: 'numeric', month: 'short', year: 'numeric'
        })
      };
      updatedCustomers = customers.map(c => c.id === formData.id ? updatedCustomer : c);
    } else {
      const newCustomer = {
        ...formData,
        units: { ...units },
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(language === 'en' ? 'en-IN' : 'hi-IN', {
          day: 'numeric', month: 'short', year: 'numeric'
        })
      };
      updatedCustomers = [newCustomer, ...customers];
    }

    setCustomers(updatedCustomers);
    localStorage.setItem('naap_customers', JSON.stringify(updatedCustomers));
    
    // Reset form and go to home
    setFormData({
      name: '', phone: '', kurtiLength: '', kurtiChest: '', kurtiWaist: '', kurtiShoulder: '', kurtiSideSlit: '',
      kanchaliTukki: '', kanchaliSleeveLength: '', kanchaliSleeveRound: '', kanchaliKharaki: '', kanchaliBaadh: '',
      lehengaLength: '', lehengaWaist: '', lehengaMagji: '', notes: ''
    });
    setUnits({});
    window.location.hash = 'home';
  };

  const handleAddClick = () => {
    setFormData({
      name: '', phone: '', kurtiLength: '', kurtiChest: '', kurtiWaist: '', kurtiShoulder: '', kurtiSideSlit: '',
      kanchaliTukki: '', kanchaliSleeveLength: '', kanchaliSleeveRound: '', kanchaliKharaki: '', kanchaliBaadh: '',
      lehengaLength: '', lehengaWaist: '', lehengaMagji: '', notes: ''
    });
    setUnits({});
    window.location.hash = 'add';
  };

  const handleEditCustomer = () => {
    setFormData({ ...selectedCustomer });
    setUnits(selectedCustomer.units || {});
    window.location.hash = 'add';
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    window.location.hash = 'view';
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm(t.deleteConfirm)) {
      const updatedCustomers = customers.filter(c => c.id !== id);
      setCustomers(updatedCustomers);
      localStorage.setItem('naap_customers', JSON.stringify(updatedCustomers));
      window.location.hash = 'home';
      setSelectedCustomer(null);
    }
  };

  const renderInput = (label, name, placeholder = '') => {
    const isMeasurement = name !== 'name' && name !== 'phone' && name !== 'notes';
    const currentUnit = units[name] || 'in';

    return (
      <div className="input-group">
        <label className="input-label">{label}</label>
        <div className="neumorphic-inset" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type={name === 'phone' ? 'tel' : 'text'}
            inputMode={isMeasurement ? 'decimal' : undefined}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            placeholder={placeholder || label}
            className="form-input"
            style={isMeasurement ? { paddingRight: '60px' } : {}}
          />
          {isMeasurement && (
            <button
              type="button"
              onClick={() => handleUnitToggle(name)}
              className="neumorphic-btn"
              style={{
                position: 'absolute',
                right: '8px',
                padding: '6px 10px',
                fontSize: '12px',
                fontWeight: '700',
                minWidth: '42px',
                textTransform: 'uppercase'
              }}
            >
              {currentUnit}
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderViewRow = (label, name, value, customerUnits) => {
    if (!value) return null;
    const unit = customerUnits && customerUnits[name] ? customerUnits[name] : 'in';
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--accent-color)', borderBottomColor: 'rgba(138, 154, 134, 0.2)' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '15px' }}>{label}</span>
        <span style={{ fontWeight: '600', fontSize: '16px' }}>{value} <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '4px', textTransform: 'uppercase' }}>{unit}</span></span>
      </div>
    );
  };

  return (
    <div>
      <header className="app-header">
        <AppLogo language={language} />
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="neumorphic-btn theme-toggle" onClick={toggleLanguage} style={{ fontSize: '14px', fontWeight: 'bold' }}>
            {language === 'en' ? 'HI' : 'EN'}
          </button>
          <button className="neumorphic-btn theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      <main className="container">
        {currentView === 'home' && (
          <div className="home-view">
            {customers.length === 0 ? (
              <div className="empty-state">
                <div className="neumorphic empty-state-icon">
                  <BookOpen size={32} />
                </div>
                <h2>{t.noMeasurements}</h2>
                <p>{t.tapToAdd}</p>
              </div>
            ) : (
              <div style={{ paddingTop: '20px' }}>
                {customers.map((customer) => (
                  <div 
                    key={customer.id} 
                    className="neumorphic customer-card"
                    onClick={() => handleViewCustomer(customer)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div>
                      <div className="customer-name">{customer.name}</div>
                      <div className="customer-phone">
                        <Phone size={14} />
                        {customer.phone || t.noPhone}
                      </div>
                    </div>
                    <div className="customer-date">{customer.date}</div>
                  </div>
                ))}
              </div>
            )}

            <button 
              className="neumorphic-btn fab" 
              onClick={handleAddClick}
              aria-label="Add new customer"
            >
              <Plus size={28} />
            </button>
          </div>
        )}
        
        {currentView === 'add' && (
          <div className="add-view" style={{ paddingTop: '20px' }}>
            <div className="form-section">
              <div className="section-title">
                <User size={20} /> {t.customerDetails}
              </div>
              {renderInput(t.fullName, 'name', t.namePlaceholder)}
              {renderInput(t.phoneNumber, 'phone', t.phonePlaceholder)}
            </div>

            <div className="form-section">
              <div className="section-title">
                <Shirt size={20} /> {t.kurti}
              </div>
              {renderInput(t.kurtiLength, 'kurtiLength')}
              {renderInput(t.kurtiChest, 'kurtiChest')}
              {renderInput(t.kurtiWaist, 'kurtiWaist')}
              {renderInput(t.kurtiShoulder, 'kurtiShoulder')}
              {renderInput(t.kurtiSideSlit, 'kurtiSideSlit')}
            </div>

            <div className="form-section">
              <div className="section-title">
                <KanchaliIcon size={20} /> {t.kanchali}
              </div>
              {renderInput(t.kanchaliTukki, 'kanchaliTukki')}
              {renderInput(t.kanchaliSleeveLength, 'kanchaliSleeveLength')}
              {renderInput(t.kanchaliSleeveRound, 'kanchaliSleeveRound')}
              {renderInput(t.kanchaliKharaki, 'kanchaliKharaki')}
              {renderInput(t.kanchaliBaadh, 'kanchaliBaadh')}
            </div>

            <div className="form-section">
              <div className="section-title">
                <LehengaIcon size={20} /> {t.lehenga}
              </div>
              {renderInput(t.lehengaLength, 'lehengaLength')}
              {renderInput(t.lehengaWaist, 'lehengaWaist')}
              {renderInput(t.lehengaMagji, 'lehengaMagji')}
            </div>

            <div className="form-section">
              <div className="section-title">
                <BookOpen size={20} /> {t.extraNotes}
              </div>
              <div className="input-group">
                <label className="input-label">{t.specialRequests}</label>
                <div className="neumorphic-inset">
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder={t.notesPlaceholder}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button 
                className="neumorphic-btn btn-secondary" 
                onClick={() => { window.location.hash = 'home'; }}
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                className="neumorphic-btn btn-primary" 
                onClick={handleSave}
              >
                <Save size={20} style={{ marginRight: '8px' }}/> {t.saveMeasurement}
              </button>
            </div>
          </div>
        )}

        {currentView === 'view' && selectedCustomer && (
          <div className="view-details" style={{ paddingTop: '20px' }}>
            <div className="form-section">
              <div className="section-title">
                <User size={20} /> {t.customerDetails}
              </div>
              <div className="neumorphic" style={{ padding: '20px', marginBottom: '20px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{selectedCustomer.name}</div>
                <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Phone size={16} /> {selectedCustomer.phone || t.noPhone}
                  {selectedCustomer.phone && (
                    <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
                      <a href={`tel:${selectedCustomer.phone}`} className="neumorphic-btn" style={{ padding: '6px', display: 'flex', alignItems: 'center', color: 'var(--accent-color)' }}>
                        <PhoneCall size={16} />
                      </a>
                      <button className="neumorphic-btn" onClick={() => {
                        navigator.clipboard.writeText(selectedCustomer.phone);
                        alert(t.phoneCopied);
                      }} style={{ padding: '6px', display: 'flex', alignItems: 'center', color: 'var(--accent-color)' }}>
                        <Copy size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <div style={{ color: 'var(--accent-color)', fontSize: '14px', fontWeight: '500' }}>{t.dateLabel} {selectedCustomer.date}</div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">
                <Shirt size={20} /> {t.kurti}
              </div>
              <div className="neumorphic" style={{ padding: '10px 20px', marginBottom: '20px' }}>
                {renderViewRow(t.kurtiLength, 'kurtiLength', selectedCustomer.kurtiLength, selectedCustomer.units)}
                {renderViewRow(t.kurtiChest, 'kurtiChest', selectedCustomer.kurtiChest, selectedCustomer.units)}
                {renderViewRow(t.kurtiWaist, 'kurtiWaist', selectedCustomer.kurtiWaist, selectedCustomer.units)}
                {renderViewRow(t.kurtiShoulder, 'kurtiShoulder', selectedCustomer.kurtiShoulder, selectedCustomer.units)}
                {renderViewRow(t.kurtiSideSlit, 'kurtiSideSlit', selectedCustomer.kurtiSideSlit, selectedCustomer.units)}
                {!selectedCustomer.kurtiLength && !selectedCustomer.kurtiChest && !selectedCustomer.kurtiWaist && !selectedCustomer.kurtiShoulder && !selectedCustomer.kurtiSideSlit && (
                  <div style={{ padding: '10px 0', color: 'var(--text-muted)', fontStyle: 'italic' }}>{t.noMeasurementsAdded}</div>
                )}
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">
                <KanchaliIcon size={20} /> {t.kanchali}
              </div>
              <div className="neumorphic" style={{ padding: '10px 20px', marginBottom: '20px' }}>
                {renderViewRow(t.kanchaliTukki, 'kanchaliTukki', selectedCustomer.kanchaliTukki, selectedCustomer.units)}
                {renderViewRow(t.kanchaliSleeveLength, 'kanchaliSleeveLength', selectedCustomer.kanchaliSleeveLength, selectedCustomer.units)}
                {renderViewRow(t.kanchaliSleeveRound, 'kanchaliSleeveRound', selectedCustomer.kanchaliSleeveRound, selectedCustomer.units)}
                {renderViewRow(t.kanchaliKharaki, 'kanchaliKharaki', selectedCustomer.kanchaliKharaki, selectedCustomer.units)}
                {renderViewRow(t.kanchaliBaadh, 'kanchaliBaadh', selectedCustomer.kanchaliBaadh, selectedCustomer.units)}
                {!selectedCustomer.kanchaliTukki && !selectedCustomer.kanchaliSleeveLength && !selectedCustomer.kanchaliSleeveRound && !selectedCustomer.kanchaliKharaki && !selectedCustomer.kanchaliBaadh && (
                  <div style={{ padding: '10px 0', color: 'var(--text-muted)', fontStyle: 'italic' }}>{t.noMeasurementsAdded}</div>
                )}
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">
                <LehengaIcon size={20} /> {t.lehenga}
              </div>
              <div className="neumorphic" style={{ padding: '10px 20px', marginBottom: '20px' }}>
                {renderViewRow(t.lehengaLength, 'lehengaLength', selectedCustomer.lehengaLength, selectedCustomer.units)}
                {renderViewRow(t.lehengaWaist, 'lehengaWaist', selectedCustomer.lehengaWaist, selectedCustomer.units)}
                {renderViewRow(t.lehengaMagji, 'lehengaMagji', selectedCustomer.lehengaMagji, selectedCustomer.units)}
                {!selectedCustomer.lehengaLength && !selectedCustomer.lehengaWaist && !selectedCustomer.lehengaMagji && (
                  <div style={{ padding: '10px 0', color: 'var(--text-muted)', fontStyle: 'italic' }}>{t.noMeasurementsAdded}</div>
                )}
              </div>
            </div>

            {selectedCustomer.notes && (
              <div className="form-section">
                <div className="section-title">
                  <BookOpen size={20} /> {t.extraNotes}
                </div>
                <div className="neumorphic" style={{ padding: '20px', marginBottom: '20px', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                  {selectedCustomer.notes}
                </div>
              </div>
            )}

            <div className="form-actions" style={{ marginTop: '30px', marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button 
                className="neumorphic-btn btn-primary" 
                onClick={handleEditCustomer}
                style={{ width: '100%', padding: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Edit2 size={20} style={{ marginRight: '8px' }}/> {t.editCustomer}
              </button>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button 
                  className="neumorphic-btn" 
                  onClick={() => { window.location.hash = 'home'; }}
                  style={{ flex: 1, padding: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <ArrowLeft size={20} style={{ marginRight: '8px' }}/> {t.backToList}
                </button>
                <button 
                  className="neumorphic-btn" 
                  onClick={() => handleDeleteCustomer(selectedCustomer.id)}
                  style={{ flex: 1, padding: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#e74c3c' }}
                >
                  <Trash2 size={20} style={{ marginRight: '8px' }}/> {t.deleteCustomer}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
