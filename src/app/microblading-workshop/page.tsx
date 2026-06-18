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
    quote: 'הייתי מניקוריסטית שעבדה מסביב לשעון. אחרי הקורס אצל טליה — הורדתי את העבודה בציפורניים לחצי, מסיימת כל יום ב-15:00, ומכניסה 30,000 ₪ בחודש מעיצוב גבות ומיקרובליידינג.',
    highlight: '30,000 ₪ בחודש | עובדת עד 15:00',
  },
  {
    quote: 'הגעתי בגיל 16, בלי שום ניסיון קודם. טליה לימדה אותי לא רק את הטכניקה — אלא גם איך לקבל לקוחות, איך לשדר ביטחון ואיך לעבוד נכון. היום יש לי 2 מטופלות כמעט כל יום.',
    highlight: '2 מטופלות כל יום — בגיל 16',
  },
  {
    quote: 'הגעתי אחרי שסיימתי קורס יקר במקום אחר. הייתה לי תעודה — אבל לא עבדתי אפילו על לקוחה אחת. אחרי ההשתלמות אצל טליה חזרתי לעבוד. הפעם עם ביטחון אמיתי.',
    highlight: 'חזרה לעבוד אחרי ההשתלמות',
  },
];

export default function MicrobladingWorkshopPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', consent: false, path: '' });
  const [submitted, setSubmitted] = useState(false);

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
          email: form.email,
          listId: LIST_ID,
          source: `microblading-workshop-${form.path || 'general'}`,
        }),
      });
    } catch { /* silent */ }
    setSubmitted(true);
  };

  const LeadForm = () => (
    submitted ? (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl p-10 text-center shadow-xl"
        style={{ background: C.white, border: `1px solid ${C.border}` }}>
        <p className="text-5xl mb-4">🙏</p>
        <p className="text-2xl font-extrabold mb-2" style={{ color: C.text }}>קיבלתי!</p>
        <p className="mb-1" style={{ color: C.textSec }}>אחזור אליך תוך 24 שעות.</p>
        <p className="font-bold mt-4 text-lg" style={{ color: C.accent }}>מאמינה בך, טליה ✨</p>
      </motion.div>
    ) : (
      <motion.form variants={fadeUp} onSubmit={handleSubmit}
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
            className="w-full rounded-xl px-4 py-3 text-right text-base focus:outline-none transition-colors"
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
            className="w-full rounded-xl px-4 py-3 text-base focus:outline-none transition-colors"
            style={{ border: `1px solid ${C.border}`, color: C.text, background: C.bg }}
            dir="ltr"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-right" style={{ color: C.textSec }}>
            אימייל
          </label>
          <input type="email" required placeholder="your@email.com"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl px-4 py-3 text-base focus:outline-none transition-colors"
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
          className="w-full text-white py-4 rounded-2xl font-black text-xl shadow-lg transition-opacity"
          style={{ background: form.consent ? C.cta : '#ccc' }}
          whileHover={form.consent ? { scale: 1.02 } : {}}
          whileTap={form.consent ? { scale: 0.97 } : {}}
          disabled={!form.consent}>
          אני רוצה לשמוע יותר →
        </motion.button>

        <p className="text-xs text-center" style={{ color: C.textSec }}>
          * הפרטים נשמרים בסודיות מלאה
        </p>
      </motion.form>
    )
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
        הקורס הבא מתחיל 17.7 | קבוצות של עד 3 תלמידות בלבד — מקומות אחרונים
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
            className="text-3xl sm:text-5xl font-extrabold leading-tight mb-5"
            style={{ color: C.text }}>
            הפכי למקצוענית מבוקשת<br />
            <span style={{ color: C.cta }}>בתחום הגבות והמיקרובליידינג</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg mb-6 leading-relaxed max-w-xl mx-auto"
            style={{ color: C.textSec }}>
            בעזרת שיטת הלימוד הייחודית של טליה בוזורגי — מקצועיות, תרגול מעשי וליווי אישי —
            כדי שתוכלי לעבוד בביטחון אמיתי מול כל לקוחה.
          </motion.p>

          <motion.div variants={fadeUp}
            className="flex flex-col sm:flex-row justify-center gap-3 mb-8 text-sm font-semibold">
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
          <motion.div variants={fadeUp}
            className="relative rounded-3xl overflow-hidden shadow-2xl mx-auto mb-8 max-w-2xl"
            style={{ aspectRatio: '16/9' }}>
            <iframe
              src="https://drive.google.com/file/d/1dJhT8Bgp4ZcYkmyT-XfKMjyABJmH3yij/preview"
              className="absolute inset-0 w-full h-full"
              allow="autoplay"
              allowFullScreen
            />
          </motion.div>

          <motion.button variants={fadeUp} onClick={scrollToForm}
            className="inline-flex items-center gap-2 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-lg"
            style={{ background: C.cta }}
            whileHover={{ scale: 1.02, backgroundColor: C.ctaHover }}
            whileTap={{ scale: 0.97 }}>
            אני רוצה מקום בקורס הקרוב ⬇️
          </motion.button>
        </motion.div>
      </section>

      {/* ─── EMPATHY ─── */}
      <section className="py-12 px-5" style={{ background: C.white }}>
        <motion.div className="max-w-2xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp}
            className="text-2xl sm:text-3xl font-extrabold mb-6 text-right"
            style={{ color: C.cta }}>
            אני מבינה בדיוק איך את מרגישה...
          </motion.h2>
          <div className="space-y-4 text-lg leading-relaxed text-right" style={{ color: C.textSec }}>
            <motion.p variants={fadeUp}>
              אולי את חולמת להיכנס לתחום הגבות והמיקרובליידינג,
              אבל מפחדת לעשות את הצעד הראשון.
            </motion.p>
            <motion.p variants={fadeUp}>
              ואולי כבר למדת בעבר, השקעת זמן וכסף, קיבלת תעודה —
              אבל כשמגיעה לקוחה אמיתית, הביטחון פתאום נעלם.
            </motion.p>
            <motion.p variants={fadeUp}>
              את חוששת שהעבודה לא תצא מספיק מדויקת.
              מפחדת שהגבות לא יהיו סימטריות.
              חוששת להתמודד עם מקרים מורכבים לבד.
            </motion.p>
            <motion.div variants={fadeUp}
              className="rounded-2xl p-5 my-4"
              style={{
                background: C.bgAlt,
                borderRight: `4px solid ${C.accent}`,
                borderTop: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
                borderLeft: `1px solid ${C.border}`,
              }}>
              <p className="font-bold text-lg mb-2" style={{ color: C.text }}>
                האמת? את ממש לא היחידה.
              </p>
              <p style={{ color: C.textSec }}>
                אני פוגשת המון נשים מוכשרות שהבעיה שלהן היא לא היכולת —
                הבעיה היא שאף אחד לא נתן להן את הביטחון, הליווי והכלים לצאת לעבוד.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── AUTHORITY ─── */}
      <section className="py-12 px-5" style={{ background: C.bgAlt }}>
        <motion.div className="max-w-3xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Photo — replace src with actual image path */}
            <motion.div variants={fadeUp} className="flex-shrink-0">
              <div className="w-44 h-44 rounded-full overflow-hidden shadow-xl border-4 flex items-center justify-center text-5xl"
                style={{ borderColor: C.accent, background: C.accentLight }}>
                📸
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="text-right flex-1">
              <p className="text-sm font-bold uppercase mb-1" style={{ color: C.accent }}>
                המורה שלך
              </p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: C.text }}>
                נעים מאוד, אני טליה בוזורגי
              </h2>
              <p className="font-semibold mb-5" style={{ color: C.cta }}>
                בעלת קליניקה ואקדמיה למיקרובליידינג ועיצוב גבות
              </p>
              <div className="space-y-3 text-lg leading-relaxed" style={{ color: C.textSec }}>
                <p>
                  גם אני לא תמיד הייתי במקום שאני נמצאת בו היום.
                  אני זוכרת את החששות, את הלחץ, את הרצון שהכול ייצא מושלם.
                </p>
                <p>
                  עם השנים פיתחתי שיטת עבודה שמאפשרת לעבוד בצורה מדויקת, מקצועית ובטוחה —
                  שיטה שלא מתמקדת רק בטכניקה, אלא גם בביטחון, בתרגול נכון ובבניית
                  היכולת לעבוד מול לקוחות אמיתיות.
                </p>
                <p className="font-semibold" style={{ color: C.text }}>
                  היום אני מלווה נשים שרוצות להיכנס לתחום, להתפתח בו —
                  או לחזור לעבוד בו בביטחון מלא.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── DIFFERENTIATOR ─── */}
      <section className="py-12 px-5" style={{ background: C.white }}>
        <motion.div className="max-w-2xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp}
            className="text-2xl sm:text-3xl font-extrabold mb-4 text-right"
            style={{ color: C.text }}>
            מה שמיוחד בשיטת הלימוד שלי
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg mb-8 leading-relaxed text-right"
            style={{ color: C.textSec }}>
            ברוב המקומות מלמדים אותך איך לבצע טיפול.
            אצלי המטרה הרבה יותר גדולה מזה —
            אני רוצה שתצאי מההכשרה כשאת{' '}
            <strong style={{ color: C.text }}>באמת יודעת לעבוד.</strong>
          </motion.p>
          <motion.div variants={stagger} className="space-y-3">
            {[
              'קבוצות קטנות ואינטימיות של עד 2–3 תלמידות בלבד',
              'יחס אישי ותיקונים בזמן אמת',
              'ליווי צמוד לאורך כל הדרך — וגם אחרי שהקורס מסתיים',
              'לא רק טכניקה — גם שיווק, תמחור והתנהלות מול לקוחות',
              'שיעור נוסף אחרי חודש וחצי — לחזק את הביטחון על לקוחה אמיתית (שיעור שלא קיים בשום מקום אחר בארץ)',
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-center gap-4 rounded-2xl px-5 py-4"
                style={{
                  background: C.bgAlt,
                  border: `1px solid ${C.border}`,
                }}>
                <span className="text-xl flex-shrink-0" style={{ color: C.accent }}>✦</span>
                <span className="font-semibold text-right" style={{ color: C.text }}>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── RESULTS CHECKLIST ─── */}
      <section className="py-12 px-5" style={{ background: C.bgAlt }}>
        <motion.div className="max-w-2xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp}
            className="text-2xl sm:text-3xl font-extrabold mb-8 text-right"
            style={{ color: C.text }}>
            בסיום ההכשרה תוכלי:
          </motion.h2>
          <motion.div variants={stagger} className="space-y-3">
            {[
              'לבצע עבודות מקצועיות ומדויקות',
              'להבין לעומק — התאמת מבנה גבה לכל לקוחה',
              'לעבוד בביטחון מול לקוחות אמיתיות',
              'להפסיק לפחד מכל טיפול חדש',
              'לבנות שם מקצועי בתחום',
              'להפוך את הידע להכנסה — עיקרית או נוספת',
              'לקבל ליווי אישי גם אחרי סיום הלימודים',
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-center gap-4 rounded-2xl px-5 py-4 shadow-sm"
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                }}>
                <span className="text-xl flex-shrink-0" style={{ color: C.accent }}>✔️</span>
                <span className="font-semibold text-right" style={{ color: C.text }}>{item}</span>
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

      {/* ─── MID-PAGE CTA ─── */}
      <section className="py-8 px-5 text-center" style={{ background: C.bgAlt }}>
        <motion.button onClick={scrollToForm}
          className="inline-flex items-center gap-2 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-lg"
          style={{ background: C.cta }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          אני רוצה מקום בקורס הקרוב ⬇️
        </motion.button>
      </section>

      {/* ─── URGENCY ─── */}
      <section className="py-12 px-5 text-center"
        style={{ background: `linear-gradient(to bottom, ${C.bgAlt}, #F7E0E5)` }}>
        <motion.div className="max-w-2xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h3 variants={fadeUp}
            className="text-2xl sm:text-3xl font-extrabold mb-3"
            style={{ color: C.text }}>
            הקורס הבא מתחיל 17.7
          </motion.h3>
          <motion.p variants={fadeUp} className="text-lg mb-4" style={{ color: C.textSec }}>
            נשארו מקומות אחרונים — קבוצות של עד 3 תלמידות בלבד.
          </motion.p>
          <motion.p variants={fadeUp}
            className="text-base max-w-lg mx-auto leading-relaxed"
            style={{ color: C.text }}>
            המטרה שלי פשוטה: לא רק לתת לך תעודה — לתת לך את הידע, הביטחון והליווי
            שיעזרו לך{' '}
            <strong style={{ color: C.cta }}>להתחיל לעבוד באמת.</strong>
          </motion.p>
        </motion.div>
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
          <LeadForm />
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
          אני רוצה מקום בקורס הקרוב ✨
        </button>
      </motion.div>
    </main>
  );
}
