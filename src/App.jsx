import { useState, useEffect } from 'react';
import './App.css';

const KRATHONG_STYLES = [
  { id: 'classic', label: 'ใบตองคลาสสิก', desc: 'ต้นตำรับใบตองสีเขียว' },
  { id: 'lotus', label: 'ดอกบัวชมพู', desc: 'กลีบบัวอ่อนหวาน' },
  { id: 'bread', label: 'กระทงขนมปัง', desc: 'รักษ์โลก เป็นอาหารปลา' },
  { id: 'coconut', label: 'กะลามะพร้าว', desc: 'สไตล์ล้านนาเรียบง่าย' },
];

const QUICK_WISHES = [
  'ขอให้เรียนเก่งๆ เกรด 4 ทุกวิชา',
  'ขอให้สุขภาพแข็งแรง ร่ำรวยเงินทอง',
  'ขอให้สิ่งไม่ดีลอยไปกับสายน้ำ',
  'ขอให้สมหวังในทุกสิ่งที่ตั้งใจ',
];

const INITIAL_KRATHONGS = [
  { id: 1, name: 'สมชาย', wish: 'ขอให้ปีนี้มีแต่ความสุข สุขภาพแข็งแรงครับ', type: 'classic', top: 22, duration: 26, delay: -8 },
  { id: 2, name: 'นภา', wish: 'ขอให้สอบผ่านฉลุย เกรดสวยๆ ทุกวิชา!', type: 'lotus', top: 48, duration: 30, delay: -18 },
  { id: 3, name: 'ต้นกล้า', wish: 'ขอให้ครอบครัวมีความสุขและปลอดภัย', type: 'bread', top: 68, duration: 24, delay: -3 },
];

function KrathongSVG({ type, size = 110 }) {
  const palettes = {
    classic: { base: '#15803d', rim: '#22c55e', accent: '#facc15', flower: '#fb7185' },
    lotus: { base: '#be185d', rim: '#f472b6', accent: '#fbcfe8', flower: '#fef08a' },
    bread: { base: '#b45309', rim: '#d97706', accent: '#fde68a', flower: '#f97316' },
    coconut: { base: '#57280c', rim: '#7c2d12', accent: '#a16207', flower: '#fde047' },
  };
  const p = palettes[type] || palettes.classic;

  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 140 120" fill="none">
      <circle cx="70" cy="24" r="18" fill="#fbbf24" opacity="0.28" />
      <line x1="60" y1="60" x2="53" y2="28" stroke="#92400e" strokeWidth="2" />
      <line x1="80" y1="60" x2="87" y2="28" stroke="#92400e" strokeWidth="2" />
      <circle cx="53" cy="27" r="2" fill="#ef4444" />
      <circle cx="87" cy="27" r="2" fill="#ef4444" />
      <rect x="66" y="34" width="8" height="30" rx="2" fill="#fef08a" />
      <path d="M70 14 C75 22, 75 30, 70 34 C65 30, 65 22, 70 14 Z" fill="#f59e0b" className="flame" />
      <path d="M70 20 C73 25, 73 30, 70 33 C67 30, 67 25, 70 20 Z" fill="#fef9c3" />
      <path d="M25 70 L38 48 L52 70 Z" fill={p.rim} />
      <path d="M46 70 L70 42 L94 70 Z" fill={p.accent} />
      <path d="M88 70 L102 48 L115 70 Z" fill={p.rim} />
      <circle cx="44" cy="64" r="6" fill={p.flower} />
      <circle cx="70" cy="62" r="7" fill={p.flower} />
      <circle cx="96" cy="64" r="6" fill={p.flower} />
      <path d="M18 70 Q70 82 122 70 L108 96 Q70 106 32 96 Z" fill={p.base} />
      <path d="M18 70 Q70 82 122 70 Q70 62 18 70 Z" fill={p.rim} />
      <ellipse cx="70" cy="102" rx="52" ry="6" fill="#38bdf8" opacity="0.25" />
    </svg>
  );
}

export default function App() {
  const [krathongs, setKrathongs] = useState(() => {
    const saved = localStorage.getItem('loy-krathong-list');
    return saved ? JSON.parse(saved) : INITIAL_KRATHONGS;
  });

  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [selectedType, setSelectedType] = useState('classic');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('loy-krathong-list', JSON.stringify(krathongs));
  }, [krathongs]);

  const handleFloat = (e) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) return;

    const newKrathong = {
      id: Date.now(),
      name: name.trim(),
      wish: wish.trim(),
      type: selectedType,
      top: Math.floor(Math.random() * 55) + 18,
      duration: Math.floor(Math.random() * 12) + 20,
      delay: 0,
    };

    setKrathongs((prev) => [...prev, newKrathong]);
    setName('');
    setWish('');
    setIsModalOpen(false);
  };

  return (
    <div className="scene">
      <header className="sky">
        <div className="stars" />
        <div className="moon" />
        <div className="lantern l1" />
        <div className="lantern l2" />
        <div className="lantern l3" />

        <nav className="top-bar">
          <div>
            <h1 className="title">ลอยกระทงออนไลน์</h1>
            <p className="subtitle">ร่วมสืบสานประเพณีไทย รักษ์สายน้ำออนไลน์</p>
          </div>
          <div className="stats-group">
            <span className="counter">กระทงทั้งหมด: {krathongs.length} ใบ</span>
            <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
              + สร้างกระทงของคุณ
            </button>
          </div>
        </nav>
      </header>

      <main className="river">
        <div className="moon-reflection" />
        {krathongs.map((k) => (
          <div
            key={k.id}
            className="floating-wrapper"
            style={{
              top: `${k.top}%`,
              animationDuration: `${k.duration}s`,
              animationDelay: `${k.delay}s`,
            }}
          >
            <div className="bobbing-inner">
              <div className="wish-card">
                <strong className="wish-name">{k.name}</strong>
                <p className="wish-text">“{k.wish}”</p>
              </div>
              <KrathongSVG type={k.type} size={105} />
            </div>
          </div>
        ))}
      </main>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>ประดิษฐ์กระทงและขอพร</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleFloat} className="krathong-form">
              <label className="field-label">1. เลือกแบบกระทง</label>
              <div className="style-grid">
                {KRATHONG_STYLES.map((style) => (
                  <button
                    type="button"
                    key={style.id}
                    className={`style-option ${selectedType === style.id ? 'active' : ''}`}
                    onClick={() => setSelectedType(style.id)}
                  >
                    <KrathongSVG type={style.id} size={64} />
                    <span className="style-name">{style.label}</span>
                    <span className="style-desc">{style.desc}</span>
                  </button>
                ))}
              </div>

              <label className="field-label" htmlFor="name-input">2. ชื่อผู้ลอย</label>
              <input
                id="name-input"
                type="text"
                maxLength={30}
                placeholder="เช่น สมชาย ใจดี"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label className="field-label" htmlFor="wish-input">3. คำอธิษฐาน</label>
              <textarea
                id="wish-input"
                rows={3}
                maxLength={120}
                placeholder="พิมพ์คำอธิษฐานของคุณที่นี่..."
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                required
              />

              <div className="quick-wishes">
                {QUICK_WISHES.map((w) => (
                  <button type="button" key={w} className="chip" onClick={() => setWish(w)}>
                    {w}
                  </button>
                ))}
              </div>

              <button type="submit" className="submit-btn">ปล่อยกระทงลงสู่สายน้ำ</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
