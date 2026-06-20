'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const PIXEL_ID = '1901161570375773';
const LIST_ID = '71507';

const C = {
  bg: '#FFF8F5',
  bgAlt: '#FDF0EA',
  text: '#2C1A0E',
  textSec: '#7A5347',
  accent: '#C4956A',
  accentLight: '#EDD8C8',
  cta: '#B5647A',
  ctaHover: '#9D4F65',
  stickyBg: '#F7E0E5',
  stickyText: '#8B2A4A',
  border: '#E8D5C4',
  white: '#FFFFFF',
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}

const TESTIMONIALS = [
  {
    quote: 'הורדתי את העבודה בציפורניים לחצי — ועכשיו אני מכניסה 30,000 ₪ בחודש מגבות ומיקרו.',
    highlight: '30,000 ₪ בחודש',
  },
  {
    quote: 'הגעתי בגיל 16 בלי ניסיון. היום יש לי 2 מטופלות כמעט כל יום.',
    highlight: '2 מטופלות כל יום — בגיל 16',
  },
  {
    quote: 'הייתה לי תעודה ממקום אחר אבל לא עבדתי. אחרי טליה — חזרתי לעבוד בביטחון.',
    highlight: 'חזרה לעבוד אחרי ההשתלמות',
  },
];

const COURSE_DATE = new Date('2026-07-17T09:00:00');
const WA_NUMBER = '972500000000'; // ← שני את המספר

function useCountdown() {
  const [t, setT] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = COURSE_DATE.getTime() - Date.now();
      if (diff <= 0) return;
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function MicrobladingWorkshopPage() {
  const [form, setForm] = useState({ name: '', phone: '', consent: false, path: '' });
  const [submitted, setSubmitted] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupForm, setPopupForm] = useState({ name: '', phone: '', sent: false });
  const countdown = useCountdown();

  // Exit intent — show once per session, only after 8 seconds on page
  useEffect(() => {
    if (sessionStorage.getItem('popup_shown')) return;
    let ready = false;
    const timer = setTimeout(() => { ready = true; }, 8000);
    const onLeave = (e: MouseEvent) => {
      if (ready && e.clientY < 10 && !sessionStorage.getItem('popup_shown')) {
        setPopup(true);
        sessionStorage.setItem('popup_shown', '1');
      }
    };
    document.addEventListener('mouseleave', onLeave);
    return () => { clearTimeout(timer); document.removeEventListener('mouseleave', onLeave); };
  }, []);

  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.fbq?.('track', 'Lead', { content_name: 'microblading_popup' });
    try {
      await fetch('/api/add-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: popupForm.name, phone: popupForm.phone, listId: LIST_ID, source: 'microblading-popup' }),
      });
    } catch { /* silent */ }
    setPopupForm(f => ({ ...f, sent: true }));
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.fbq) {
      const s = document.createElement('script');
      s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`;
      document.head.appendChild(s);
    }
  }, []);

  const scrollToForm = () =>
    document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    window.fbq?.('track', 'Lead', { content_name: 'microblading_workshop' });
    try {
      await fetch('/api/add-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          listId: LIST_ID,
          source: `microblading-workshop-${form.path || 'general'}`,
        }),
      });
    } catch { /* silent */ }
    setSubmitted(true);
  };

  const renderLeadForm = () => submitted ? (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl p-10 text-center shadow-xl"
      style={{ background: C.white, border: `1px solid ${C.border}` }}>
      <p className="text-5xl mb-4">🙏</p>
      <p className="text-2xl font-extrabold mb-2" style={{ color: C.text }}>קיבלתי!</p>
      <p className="mb-1" style={{ color: C.textSec }}>אחזור אליך תוך 24 שעות.</p>
      <p className="font-bold mt-4 text-lg" style={{ color: C.accent }}>מאמינה בך, טליה ✨</p>
    </motion.div>
  ) : (
    <form onSubmit={handleSubmit}
      className="rounded-3xl p-8 shadow-xl space-y-4"
      style={{ background: C.white, border: `1px solid ${C.border}` }}>

      {/* Path selector */}
      <div>
        <label className="block text-sm font-bold mb-2 text-right" style={{ color: C.textSec }}>
          מה מתאים לי?
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { val: 'new', label: 'עדיין לא למדתי' },
            { val: 'advanced', label: 'כבר למדתי' },
          ].map(opt => (
            <button key={opt.val} type="button"
              onClick={() => setForm(f => ({ ...f, path: opt.val }))}
              className="py-3 rounded-xl text-sm font-bold border-2 transition-all"
              style={{
                background: form.path === opt.val ? C.cta : C.white,
                color: form.path === opt.val ? C.white : C.textSec,
                borderColor: form.path === opt.val ? C.cta : C.border,
              }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold mb-1 text-right" style={{ color: C.textSec }}>
          שם מלא
        </label>
        <input type="text" required placeholder="הכניסי את שמך"
          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-xl px-4 py-3 text-right text-base focus:outline-none"
          style={{ border: `1px solid ${C.border}`, color: C.text, background: C.bg }}
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold mb-1 text-right" style={{ color: C.textSec }}>
          טלפון נייד
        </label>
        <input type="tel" required placeholder="050-0000000"
          value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-xl px-4 py-3 text-base focus:outline-none"
          style={{ border: `1px solid ${C.border}`, color: C.text, background: C.bg }}
          dir="ltr"
        />
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <label htmlFor="consent" className="text-xs leading-relaxed cursor-pointer flex-1 text-right"
          style={{ color: C.textSec }}>
          אני מאשרת קבלת עדכונים, מבצעים ותוכן מקצועי מטליה בוזורגי
        </label>
        <input type="checkbox" id="consent" required
          checked={form.consent}
          onChange={e => setForm({ ...form, consent: e.target.checked })}
          className="mt-1 w-5 h-5 flex-shrink-0 cursor-pointer rounded"
          style={{ accentColor: C.cta }}
        />
      </div>

      <motion.button type="submit"
        className="w-full text-white py-4 rounded-2xl font-black text-xl shadow-lg"
        style={{ background: form.consent ? C.cta : '#ccc' }}
        whileHover={form.consent ? { scale: 1.02 } : {}}
        whileTap={form.consent ? { scale: 0.97 } : {}}
        disabled={!form.consent}>
        השאירי פרטים ואחזור אלייך ←
      </motion.button>

      <p className="text-xs text-center" style={{ color: C.textSec }}>
        * הפרטים נשמרים בסודיות מלאה
      </p>
    </form>
  );

  return (
    <main dir="rtl" className="overflow-x-hidden pb-24"
      style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-assistant), Assistant, sans-serif' }}>

      <noscript>
        <img height="1" width="1" style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} alt="" />
      </noscript>

      {/* ─── STICKY TOP BAR ─── */}
      <div className="sticky top-0 z-50 text-center py-3 px-4 text-sm font-bold"
        style={{ background: C.stickyBg, color: C.stickyText }}>
        קבוצות קטנות של עד 3 תלמידות בלבד — מקומות אחרונים
      </div>

      {/* ─── HERO ─── */}
      <section className="px-5 pt-12 pb-10 text-center"
        style={{ background: `linear-gradient(to bottom, ${C.bgAlt}, ${C.bg})` }}>
        <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={stagger}>

          <motion.p variants={fadeUp} className="text-sm font-bold uppercase mb-3"
            style={{ color: C.accent }}>
            טליה בוזורגי | Talya Cosmetics
          </motion.p>

          <motion.h1 variants={fadeUp}
            className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4"
            style={{ color: C.text }}>
            הפכי למקצוענית מבוקשת<br />
            <span style={{ color: C.cta }}>בתחום המיקרובליידינג</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-xl mb-5 leading-relaxed max-w-xl mx-auto font-medium"
            style={{ color: C.textSec }}>
            עם ליווי אישי, תרגול מעשי וביטחון אמיתי לעבוד מול לקוחות —
            כבר מההתחלה.
          </motion.p>

          {/* PRIVATE badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm"
              style={{ background: C.cta, color: C.white }}>
              👤 קורס פרטני בלבד — עד 3 תלמידות בקבוצה
            </span>
          </motion.div>

          <motion.div variants={fadeUp}
            className="flex flex-col sm:flex-row justify-center gap-3 mb-6 text-sm font-semibold">
            <span className="px-4 py-2 rounded-full"
              style={{ background: C.accentLight, color: C.text }}>
              גם אם את רק בתחילת הדרך
            </span>
            <span className="px-4 py-2 rounded-full"
              style={{ background: C.accentLight, color: C.text }}>
              וגם אם כבר למדת ועדיין חסר לך ביטחון
            </span>
          </motion.div>

          {/* VSL VIDEO */}
          <motion.p variants={fadeUp} className="text-sm font-bold mb-3 animate-pulse"
            style={{ color: C.cta }}>
            ▶ לחצי לצפייה — 4 דקות שיכולות לשנות את הכיוון שלך
          </motion.p>
          <motion.div variants={fadeUp}
            className="relative rounded-3xl overflow-hidden shadow-2xl mx-auto mb-8"
            style={{ aspectRatio: '9/16', maxWidth: '360px' }}>
            <iframe
              src="https://www.youtube.com/embed/LY8wX394o68?rel=0&modestbranding=1"
              style={{
                position: 'absolute',
                top: '-50px',
                left: 0,
                width: '100%',
                height: 'calc(100% + 100px)',
                border: 'none',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>

          <motion.button variants={fadeUp} onClick={scrollToForm}
            className="inline-flex items-center gap-2 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-lg"
            style={{ background: C.cta }}
            whileHover={{ scale: 1.02, backgroundColor: C.ctaHover }}
            whileTap={{ scale: 0.97 }}>
            אני רוצה להשאיר פרטים ⬇️
          </motion.button>
        </motion.div>
      </section>

      {/* ─── EMPATHY ─── */}
      <section className="py-10 px-5" style={{ background: C.white }}>
        <motion.div className="max-w-xl mx-auto text-right"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-4" style={{ color: C.textSec }}>
            חלמת להיכנס לתחום — או כבר למדת בעבר, אבל עדיין לא עובדת בביטחון.
          </motion.p>
          <motion.div variants={fadeUp} className="rounded-2xl p-5"
            style={{ background: C.bgAlt, borderRight: `4px solid ${C.accent}` }}>
            <p className="font-bold" style={{ color: C.text }}>
              הבעיה היא לא היכולת שלך — אף אחד לא נתן לך את הביטחון והליווי הנכון.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── AUTHORITY ─── */}
      <section className="py-12 px-5" style={{ background: C.bgAlt }}>
        <motion.div className="max-w-3xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Photo — replace src with actual image path */}
            <motion.div variants={fadeUp} className="flex-shrink-0">
              <div className="w-44 h-44 rounded-full overflow-hidden shadow-xl border-4"
                style={{ borderColor: C.accent }}>
                <img
                  src="/talya-profile.png"
                  alt="טליה בוזורגי"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    transform: 'scale(1.4) translateY(8%)',
                  }}
                />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="text-right flex-1">
              <p className="text-sm font-bold uppercase mb-1" style={{ color: C.accent }}>
                המורה שלך
              </p>
              <h2 className="text-2xl font-extrabold mb-1" style={{ color: C.text }}>
                טליה בוזורגי
              </h2>
              <p className="font-semibold mb-3" style={{ color: C.cta }}>
                בעלת קליניקה ואקדמיה למיקרובליידינג
              </p>
              <p className="text-base leading-relaxed" style={{ color: C.textSec }}>
                מלווה נשים להיכנס לתחום ולעבוד בביטחון מלא — עם שיטה מעשית שעובדת.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── DIFFERENTIATOR ─── */}
      <section className="py-14 px-5" style={{ background: C.white }}>
        <motion.div className="max-w-2xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-sm font-bold uppercase text-center mb-2"
            style={{ color: C.accent }}>
            למה אצל טליה זה שונה
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="text-2xl sm:text-3xl font-extrabold mb-3 text-center"
            style={{ color: C.text }}>
            מה שמיוחד בשיטת הלימוד שלי
          </motion.h2>
          <motion.div variants={stagger} className="space-y-3">
            {[
              { emoji: '👥', text: 'עד 3 תלמידות בלבד — יחס אישי אמיתי' },
              { emoji: '🤝', text: 'תיקונים בזמן אמת — לא סרטון, לא PDF' },
              { emoji: '📲', text: 'ליווי גם אחרי שהקורס מסתיים' },
              { emoji: '💼', text: 'שיווק, תמחור והתנהלות מול לקוחות — לא רק טכניקה' },
              { emoji: '⭐', text: 'שיעור חיזוק על לקוחה אמיתית אחרי חודש וחצי' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-center gap-4 rounded-2xl px-5 py-4"
                style={{
                  background: C.bgAlt,
                  border: `1px solid ${C.border}`,
                  boxShadow: '0 2px 10px rgba(196,149,106,0.07)',
                }}>
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <span className="font-semibold text-right leading-snug" style={{ color: C.text }}>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── RESULTS CHECKLIST ─── */}
      <section className="py-14 px-5" style={{ background: C.bgAlt }}>
        <motion.div className="max-w-2xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-sm font-bold uppercase text-center mb-2"
            style={{ color: C.accent }}>
            מה את לוקחת הביתה
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="text-2xl sm:text-3xl font-extrabold mb-10 text-center"
            style={{ color: C.text }}>
            בסיום ההכשרה תוכלי:
          </motion.h2>
          <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-3">
            {[
              { emoji: '✂️', text: 'לבצע עבודות מקצועיות ומדויקות' },
              { emoji: '🎯', text: 'להתאים מבנה גבה לכל לקוחה — בלי לנחש' },
              { emoji: '💪', text: 'לעבוד בביטחון מול לקוחות אמיתיות' },
              { emoji: '😌', text: 'להפסיק לפחד מכל טיפול חדש' },
              { emoji: '🌟', text: 'לבנות שם מקצועי בתחום' },
              { emoji: '💰', text: 'להפוך את הידע להכנסה — עיקרית או נוספת' },
              { emoji: '🤍', text: 'לקבל ליווי אישי גם אחרי סיום הלימודים' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-center gap-4 rounded-2xl px-5 py-4"
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  boxShadow: '0 2px 12px rgba(196,149,106,0.08)',
                }}>
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <span className="font-semibold text-right leading-snug" style={{ color: C.text }}>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-12 px-5" style={{ background: C.white }}>
        <motion.div className="max-w-3xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-sm font-bold uppercase text-center mb-2"
            style={{ color: C.accent }}>
            מה אומרות הבוגרות
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="text-2xl sm:text-3xl font-extrabold text-center mb-8"
            style={{ color: C.text }}>
            הן כבר עשו את זה
          </motion.h2>
          <div className="space-y-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} variants={fadeUp}
                className="rounded-2xl p-6 shadow-sm"
                style={{
                  background: C.bg,
                  borderTop: `1px solid ${C.border}`,
                  borderBottom: `1px solid ${C.border}`,
                  borderLeft: `1px solid ${C.border}`,
                  borderRight: `4px solid ${C.accent}`,
                }}>
                <p className="text-right leading-relaxed mb-4 text-lg"
                  style={{ color: C.textSec }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="text-right">
                  <span className="text-sm font-bold px-3 py-1.5 rounded-full"
                    style={{ background: C.accentLight, color: C.cta }}>
                    ✅ {t.highlight}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── GALLERY: COURSE IN ACTION ─── */}
      <section className="py-14 px-5" style={{ background: C.bgAlt }}>
        <motion.div className="max-w-3xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp}
            className="text-xl font-extrabold text-center mb-6"
            style={{ color: C.text }}>
            ככה זה נראה אצלנו
          </motion.h2>
          <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              '/course-photos/מיקרו-6.jpeg',
              '/course-photos/מיקרו-7.jpeg',
              '/course-photos/מיקרו-8.jpeg',
              '/course-photos/3.jpeg',
              '/course-photos/7.jpeg',
            ].map((src, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative rounded-2xl overflow-hidden shadow-md aspect-square"
                whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <img src={src} alt={`תמונה מהקורס ${i + 1}`}
                  className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── GALLERY: GRADUATES ─── */}
      <section className="py-14 px-5" style={{ background: C.white }}>
        <motion.div className="max-w-3xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp}
            className="text-xl font-extrabold text-center mb-6"
            style={{ color: C.text }}>
            הבוגרות שלנו
          </motion.h2>
          <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              '/student-photos/4.jpeg',
              '/student-photos/5.jpeg',
              '/student-photos/6.jpeg',
              '/student-photos/מיקרו-9.jpeg',
              '/student-photos/מיקרו-10.jpeg',
              '/student-photos/מיקרו-11.jpeg',
            ].map((src, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative rounded-2xl overflow-hidden shadow-md aspect-square"
                whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <img src={src} alt={`בוגרת ${i + 1}`}
                  className="w-full h-full object-cover object-top" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── GALLERY: BEFORE & AFTER ─── */}
      <section className="py-14 px-5" style={{ background: C.bgAlt }}>
        <motion.div className="max-w-3xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp}
            className="text-xl font-extrabold text-center mb-6"
            style={{ color: C.text }}>
            לפני ואחרי — עבודות התלמידות
          </motion.h2>
          <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              '/before-after-photos/ba-1.jpeg',
              '/before-after-photos/ba-2.jpeg',
              '/before-after-photos/ba-3.jpeg',
              '/before-after-photos/ba-4.jpeg',
              '/before-after-photos/ba-5.jpeg',
              '/before-after-photos/ba-6.jpeg',
            ].map((src, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative rounded-2xl overflow-hidden shadow-md aspect-square"
                whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <img src={src} alt={`לפני ואחרי מיקרובליידינג ${i + 1}`}
                  className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── MID-PAGE CTA ─── */}
      <section className="py-8 px-5 text-center" style={{ background: C.white }}>
        <motion.button onClick={scrollToForm}
          className="inline-flex items-center gap-2 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-lg"
          style={{ background: C.cta }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          להשאיר פרטים ⬇️
        </motion.button>
      </section>

      {/* ─── URGENCY ─── */}
      <section className="py-8 px-5 text-center"
        style={{ background: `linear-gradient(to bottom, ${C.bgAlt}, #F7E0E5)` }}>
        <motion.p variants={fadeUp}
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-lg font-bold" style={{ color: C.cta }}>
          מקומות אחרונים — קבוצות של עד 3 תלמידות בלבד
        </motion.p>
      </section>

      {/* ─── MAIN CTA FORM ─── */}
      <section id="cta-form" className="py-14 px-5" style={{ background: C.bgAlt }}>
        <motion.div className="max-w-md mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp}
            className="text-3xl font-extrabold text-center mb-2"
            style={{ color: C.text }}>
            השאירי פרטים ונבדוק יחד ✨
          </motion.h2>
          <motion.p variants={fadeUp}
            className="text-center mb-8 text-lg"
            style={{ color: C.textSec }}>
            איזה מסלול מתאים לך — בלי התחייבות
          </motion.p>
          {renderLeadForm()}
        </motion.div>
      </section>

      {/* ─── STICKY BOTTOM CTA ─── */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2"
        style={{ background: 'linear-gradient(to top, rgba(255,248,245,0.97), transparent)' }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 0.4 }}>
        <button onClick={scrollToForm}
          className="w-full max-w-lg mx-auto flex items-center justify-center gap-2 text-white py-4 rounded-2xl font-black text-xl shadow-2xl"
          style={{ background: C.cta, display: 'flex' }}>
          השאירי פרטים ואחזור אלייך ✨
        </button>
      </motion.div>

      {/* ─── WHATSAPP FLOATING BUTTON ─── */}
      <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
        className="fixed z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-xl"
        style={{ bottom: '88px', left: '16px', background: '#25D366' }}
        aria-label="שלחי הודעה בוואטסאפ">
        <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.115 1.528 5.843L.057 23.57a.5.5 0 0 0 .612.612l5.729-1.47A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.668-.524-5.181-1.434l-.369-.222-3.829.983.998-3.832-.24-.381A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>

      {/* ─── EXIT INTENT POPUP ─── */}
      {popup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-5"
          style={{ background: 'rgba(0,0,0,0.55)' }}
          onClick={e => { if (e.target === e.currentTarget) setPopup(false); }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-sm rounded-3xl p-8 text-right relative"
            style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <button onClick={() => setPopup(false)}
              className="absolute top-4 left-4 text-2xl leading-none opacity-50 hover:opacity-80"
              style={{ color: C.text }}>×</button>

            {popupForm.sent ? (
              <div className="text-center py-4">
                <p className="text-4xl mb-3">🙏</p>
                <p className="text-xl font-extrabold mb-2" style={{ color: C.text }}>
                  קיבלתי! אחזור אלייך בהקדם
                </p>
                <p className="text-sm" style={{ color: C.textSec }}>טליה תחזור אלייך לייעוץ אישי ✨</p>
              </div>
            ) : (
              <>
                <p className="text-2xl mb-1">🎁</p>
                <h3 className="text-xl font-extrabold mb-2" style={{ color: C.text }}>
                  רגע לפני שאת עוזבת...
                </h3>
                <p className="text-base mb-5 leading-relaxed" style={{ color: C.textSec }}>
                  השאירי פרטים ותקבלי ייעוץ אישי חינם עם טליה —
                  כדי לבדוק יחד איזה מסלול הכי מתאים לך.
                </p>
                <form onSubmit={handlePopupSubmit} className="space-y-3">
                  <input type="text" required placeholder="השם שלך"
                    value={popupForm.name}
                    onChange={e => setPopupForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-xl px-4 py-3 text-right text-base focus:outline-none"
                    style={{ border: `1px solid ${C.border}`, color: C.text, background: C.bg }}
                  />
                  <input type="tel" required placeholder="מספר טלפון"
                    value={popupForm.phone}
                    onChange={e => setPopupForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full rounded-xl px-4 py-3 text-base focus:outline-none"
                    style={{ border: `1px solid ${C.border}`, color: C.text, background: C.bg }}
                    dir="ltr"
                  />
                  <motion.button type="submit"
                    className="w-full text-white py-3.5 rounded-2xl font-black text-lg shadow-md"
                    style={{ background: C.cta }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    אני רוצה את הייעוץ חינם ←
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </main>
  );
}
