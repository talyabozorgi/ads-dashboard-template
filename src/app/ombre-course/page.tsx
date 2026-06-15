'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

function useCountdown() {
  const [time, setTime] = useState({ h: 0, m: 29, s: 59 });
  useEffect(() => {
    const key = 'ombre_end';
    let end = Number(localStorage.getItem(key));
    if (!end || Date.now() > end) {
      end = Date.now() + 30 * 60 * 1000;
      localStorage.setItem(key, String(end));
    }
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const PURCHASE_URL_FALLBACK = 'https://secure.cardcom.solutions/EA/EA5/gcsE7klOMU60cBNBqiZmdQ/PaymentSP';

async function redirectToCardcom(data: { name: string; email: string; phone?: string }) {
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(k => {
    const v = params.get(k); if (v) utmParams[k] = v;
  });
  localStorage.setItem('pending_buyer', JSON.stringify({
    ...data,
    utm_source: utmParams.utm_source || '',
    utm_campaign: utmParams.utm_campaign || '',
    utm_content: utmParams.utm_content || '',
  }));
  try {
    const res = await fetch('/api/cardcom/create-page', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: 'ombre_course', ...data, utmParams }),
    });
    const json = await res.json();
    if (json.url) { window.location.href = json.url; return; }
  } catch {}
  window.location.href = PURCHASE_URL_FALLBACK;
}

const testimonials = [
  { quote: 'טליה את פשוט מדהימה!! הקורס שינה לי את החיים, הלקוחות לא מאמינות לעצמן מה יצא לי', time: '21:14', name: 'מאיה' },
  { quote: 'אחרי שנים שניסיתי ולא הצלחתי, בקורס של טליה הצלחתי לעשות אומברה מושלם כבר בנסיון הראשון!', time: '19:42', name: 'שני' },
  { quote: 'הכפלתי את המחיר של הטיפול ואף לקוחה לא התלוננת. אדרבה, הן חוזרות ומביאות חברות', time: '22:08', name: 'רחל' },
  { quote: 'היומן שלי מלא שבועות קדימה, כל הסיבה זה האומברה שלמדתי אצל טליה', time: '20:33', name: 'גלית' },
  { quote: 'הייתי מפחדת לגעת לאומברה, היום זה הטיפול הכי מבוקש אצלי. תודה טליה', time: '23:01', name: 'יעל' },
];


const chapters = [
  { n: 'א', title: 'תורת האומברה', desc: 'בחירת צבעים נכונה לפי גלגל הצבעים + הטריקים הקטנים שעושים את ההבדל' },
  { n: 'ב', title: 'אומברה ספוגית', desc: 'כל הסודות לאומברה מושלם בעזרת ספוגית - מהיר, קל, ומדויק' },
  { n: 'ג', title: 'אומברה מברשת', desc: 'השיטה הכי מהירה לאומברה מושלם בעזרת מברשת' },
  { n: 'ד', title: 'קישוטים בסיסיים', desc: 'פרחים, נקודות, גאומטריה - הבסיס שכל מניקוריסטית חייבת' },
  { n: 'ה', title: 'קישוטים מתקדמים', desc: 'עשרות קישוטים מטורפים שלקוחות מתות עליהם' },
  { n: 'ו', title: 'שילוב אומברה עם קישוטים', desc: 'איך ליצור לוק שלם שגורם ללקוחות לצלם ולשתף' },
  { n: 'ז', title: 'עבודה עם ג\'ל צבע', desc: 'כל הטיפים לעבודה נכונה עם ג\'ל - ייבוש, ריפוי ואחידות' },
  { n: 'ח', title: 'ציורים - רמה 1', desc: 'ציורים פשוטים שנראים מורכבים - פרפרים, פרחים, לבבות' },
  { n: 'ט', title: 'ציורים - רמה 2', desc: 'ציורים מתקדמים שאף מניקוריסטית אצלך באזור לא יודעת לעשות' },
  { n: 'י', title: 'פרנץ\' מושלם', desc: 'השיטה הסודית לפרנץ\' ב-5 שניות שנראה כאילו נעשה בסלון יוקרה' },
  { n: 'יא', title: 'ניל ארט מינימליסטי', desc: 'הסגנון הכי מבוקש ב-2025 - פשוט, אלגנטי, ומושלם' },
  { n: 'יב', title: 'טיפולים מלאים', desc: 'צפי בטיפולים שלמים מהתחלה לסוף - כמו שיעור פרטי' },
  { n: 'יג', title: 'מחירון ובידול', desc: 'איך לתמחר נכון, כמה לגבות, ואיך לשווק את היכולות החדשות' },
  { n: 'יד', title: 'צילום מקצועי לאינסטגרם', desc: 'איך לצלם שתמונות מוכרות - גם בלי ציוד צילום יקר' },
  { n: 'טו', title: 'תעודת מאסטרית', desc: 'תעודה מקצועית מאקדמיית טליה בוזורגי - תלי אותה בקליניקה בגאווה' },
];

const bonuses = [
  { icon: '⚡', name: 'פרנץ\' ב-5 שניות', desc: 'השיטה הקצרה ביותר שפיתחתי לפרנץ\' ב-2 שניות בלבד', val: '197₪' },
  { icon: '📋', name: 'רשימת צ\'ק ליסט מוצרים', desc: 'כל המוצרים שאת צריכה, עם הלינקים לרכישה במקום הכי זול', val: '97₪' },
  { icon: '📸', name: 'צילום אינסטגרמי', desc: 'איך להפוך את התמונות שלך לאיש השיווק שלך שמושך לקוחות חדשות', val: '150₪' },
  { icon: '🎓', name: 'תעודת מאסטרית', desc: 'תעודה שמוכיחה ללקוחות שאת השקעת ולמדת - תלי אותה בגאווה', val: '97₪' },
];

const faqs = [
  { q: 'כמה זמן יקח לי לעשות אומברה אחרי הקורס?', a: 'אחרי שתלמדי ותתאמני על 5-10 טיפסים - תוכלי לעשות אומברה מושלם על 10 אצבעות ב-30 דקות בלבד.' },
  { q: 'ניסיתי קורסים על אומברה שלא עזרו לי, מה שונה כאן?', a: 'השיטה שלי מבוססת על תיאוריית צבעים מדויקת ושלבי עבודה ברורים. מי שיישמה אותם הצליחה לעשות אומברה מושלם כבר מהנסיונות הראשונים - בהבטחה.' },
  { q: 'מתי יגיע אלי הקורס?', a: 'הקורס יגיע ישירות למייל שלך דקות ספורות לאחר התשלום עם שם משתמש וסיסמה אישיים. אם לא קיבלת - בדקי בספאם.' },
  { q: 'האם הגישה לקורס פגה?', a: 'לא. הקורס זמין לצפייה תמיד, בלי הגבלת זמן. חוזרים כמה פעמים שרוצים.' },
  { q: 'אפשר ללמוד באמצעות קורס דיגיטלי בלי מורה לידי?', a: 'בניתי את הקורס בצורה מפורטת ומובנת שמאפשרת ללמוד באופן עצמאי. היתרון הגדול - את יכולה לעצור, לחזור, ולהתאמן כמה פעמים שרוצים.' },
  { q: 'האם יש החזר כספי?', a: 'הקורס מכיל מידע דיגיטלי יקר ערך. בשל אופי המוצר לא ינתנו החזרים לאחר הצפייה בשיעורים.' },
  { q: 'האם מקבלים תעודה בסיום?', a: 'כן! תעודת מאסטרית באומברה וקישוטים מאקדמיית טליה בוזורגי - שתציגי בגאווה בקליניקה.' },
];

export default function OmbreCoursePage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [pricingForm, setPricingForm] = useState({ name: '', phone: '', email: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const countdown = useCountdown();

  const scrollToForm = () => document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await redirectToCardcom({ name: form.name, email: form.email, phone: form.phone });
    setLoading(false);
  };

  const handlePricingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await redirectToCardcom({ name: pricingForm.name, email: pricingForm.email, phone: pricingForm.phone });
    setLoading(false);
  };

  return (
    <main dir="rtl" className="font-[Assistant,sans-serif] bg-[#FDFAF7] text-[#1A1A1A] overflow-x-hidden pb-24">

      {/* ─── STICKY CTA ─── */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-3"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
      >
        <button
          onClick={scrollToForm}
          className="w-full max-w-lg mx-auto flex items-center justify-center gap-3 bg-[#C9A96E] text-[#1A1A1A] py-4 rounded-2xl font-black text-xl shadow-2xl"
          style={{ display: 'flex' }}
        >
          <span>אני רוצה להיות מאסטרית</span>
          <span className="text-2xl">✋</span>
        </button>
      </motion.div>

      {/* ─── HERO ─── */}
      <section className="min-h-screen bg-[#1A1A1A] flex flex-col items-center justify-center px-5 pb-14 pt-0 text-center relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ backgroundImage: 'url(/nail3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-transparent to-[#1A1A1A] opacity-80" />

        {/* White bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          className="relative z-10 w-full bg-white py-3 px-6 text-center mb-0">
          <p className="text-[#1A1A1A] font-bold text-sm sm:text-base tracking-wide">
            ככה תבדלי את עצמך מהמתחרות ותשאירי להן אבק
          </p>
        </motion.div>

        <motion.div className="relative z-10 max-w-3xl mt-10" initial="hidden" animate="visible" variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-[#D4C5B5] text-2xl font-semibold mb-4">
            מגיע לך יומן מלא.
          </motion.h2>
          <motion.h1 variants={fadeUp} className="text-white text-3xl sm:text-5xl font-extrabold leading-tight mb-6">
            השיטה הקלה שהפכה מניקוריסטיות
            <span className="text-[#C9A96E]"> רגילות </span>
            למאסטריות
            <span className="underline underline-offset-4 decoration-[#C9A96E] whitespace-nowrap"> מבוקשות באזור</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-gray-300 text-lg mb-6 leading-relaxed">
            גם אם אין לך מושג איך לצייר.<br />
            גם אם ניסית בעבר ולא הצלחת.<br />
            גם אם את חושבת שזה מסובך.
          </motion.p>

          {/* Countdown */}
          <motion.div variants={fadeUp} className="inline-flex flex-col items-center gap-2 bg-white/10 border border-[#D4C5B5]/30 rounded-2xl px-8 py-4 mb-5">
            <p className="text-[#D4C5B5] text-xs tracking-widest uppercase">⏳ מחיר ההשקה נגמר בעוד</p>
            <div className="flex gap-4 items-center">
              {[{ v: countdown.s, l: 'שניות' }, { v: countdown.m, l: 'דקות' }].map((u, i) => (
                <div key={i} className="flex gap-4 items-center">
                  {i > 0 && <span className="text-[#D4C5B5] text-2xl font-bold -mt-3">:</span>}
                  <div className="text-center">
                    <span className="block text-3xl font-black text-[#D4C5B5]">{String(u.v).padStart(2, '0')}</span>
                    <span className="text-[10px] text-gray-400 tracking-wider">{u.l}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FDFAF7] to-transparent" />
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="bg-[#FDFAF7] py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] font-semibold mb-2 tracking-wide uppercase text-sm">את מכירה את הרגע הזה?</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-center mb-6">
            הלקוחה מוציאה את הטלפון ומראה לך תמונה מפינטרסט...
          </motion.h2>

          <motion.div variants={fadeUp} className="text-right leading-loose space-y-4 text-gray-700 text-lg px-2">
            <p>היא שואלת: <strong className="text-[#1A1A1A]">"את יכולה לעשות לי ככה?"</strong></p>
            <p>ואת מוצאת את עצמך מתכווצת בכיסא.</p>
            <p>יודעת שפשוט אין לך מושג איך לגשת לזה.</p>
            <p className="text-[#8B7355]">
              יש איזה קול קטן בראש שאומר לך שאם תנסי - זה לא יצא כמו בתמונה.<br />
              שתיראי לא מקצועית. שהלקוחה לא תחזור.
            </p>
            <p className="font-bold text-[#1A1A1A]">
              אז את אומרת "לא עושים את זה" ומאבדת לקוחה שיכלה להיות שלך לתמיד.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── AGITATE ─── */}
      <section className="bg-[#1A1A1A] py-12 px-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'url(/nail5.jpg)', backgroundSize: 'cover' }} />
        <motion.div className="relative z-10 max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-6 text-white">
            את לא אשמה. אף אחד לא לימד אותך נכון.
          </motion.h2>
          <motion.div variants={fadeUp}
            className="bg-white/5 border border-[#D4C5B5]/20 rounded-3xl p-8 text-right leading-loose space-y-4 text-gray-300 text-lg">
            <p>רוב הקורסים מלמדים טכניקה בלי תיאוריה.<br />
            בלי להסביר <strong className="text-white">למה</strong> האומברה יוצא כמו שיוצא.</p>
            <p>אז את מנסה, לא יוצא, מוחקת, מנסה שוב - וזה מתיש.</p>
            <p className="text-[#D4C5B5]">
              אבל כשמבינים את <strong className="text-white">הנוסחה המדויקת</strong> - זה פשוט עובד.<br />
              כבר מהנסיון הראשון.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-[#FDFAF7] py-8 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h3 variants={fadeUp} className="text-xl sm:text-2xl font-bold text-center mb-6">
            הביקוש לאומברה בשוק - עצום
          </motion.h3>
          <div className="space-y-3 mb-8">
            {[
              { icon: '📈', text: 'היום 2025 - יש יותר ביקוש מאשר היצע למניקוריסטיות שיודעות אומברה.' },
              { icon: '💰', text: 'מי שרצתה אומברה שילמה 50-80 שקל יותר לטיפול - בלי להתלונן.' },
              { icon: '📅', text: 'יומן מלא שבועות קדימה - רק בגלל השמועה על האומברה.' },
              { icon: '📱', text: 'לקוחות מצלמות, מעלות לאינסטגרם ומביאות חברות - בחינם.' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-center gap-4 bg-white border border-[#E8DDD4] rounded-2xl p-4 shadow-sm">
                <span className="text-xl flex-shrink-0">{stat.icon}</span>
                <p className="text-[#1A1A1A] font-medium text-base">{stat.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: '✦', label: 'בידול מיידי', sub: 'אוטומטית מעל כל מתחרה שלא יודעת אומברה' },
              { icon: '✦', label: 'הכנסה גבוהה יותר', sub: '+50-80₪ לכל טיפול שכבר ממילא עושה' },
              { icon: '✦', label: 'שיווק אורגני', sub: 'הלקוחות מצלמות ומפרסמות לך בחינם' },
            ].map((p, i) => (
              <div key={i} className="bg-[#1A1A1A] text-[#D4C5B5] rounded-2xl p-5 text-center">
                <span className="block text-[#D4C5B5] text-xl mb-2">{p.icon}</span>
                <p className="font-bold text-base mb-1">{p.label}</p>
                <p className="text-gray-400 text-xs leading-snug">{p.sub}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="bg-[#FDFAF7] py-8 px-5">
        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm uppercase tracking-widest font-semibold mb-2">התוצאות מדברות בעד עצמן</motion.p>
          <motion.h3 variants={fadeUp} className="text-center text-2xl font-bold mb-5">עבודות של תלמידות הקורס</motion.h3>
          <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {['/nail1.jpg','/nail2.jpg','/nail3.jpg','/nail4.jpg','/nail5.jpg','/nail6.jpg'].map((src, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative rounded-2xl overflow-hidden shadow-md aspect-square"
                whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <img src={src} alt="עבודת אומברה" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── MECHANISM ─── */}
      <section className="bg-[#FAF7F4] py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">החשבון שמשנה הכל</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-8">
            כמה שווה אומברה ללקוחה הממוצעת שלך?
          </motion.h2>

          <motion.div variants={fadeUp}
            className="bg-white border border-[#E8DDD4] rounded-3xl p-8 shadow-sm mb-8">
            <div className="flex items-center justify-center gap-4 flex-wrap mb-6">
              <div className="text-center">
                <p className="text-4xl font-black text-[#1A1A1A]">160₪</p>
                <p className="text-gray-400 text-sm mt-1">טיפול לק רגיל</p>
              </div>
              <span className="text-3xl text-[#D4C5B5] font-bold">+</span>
              <div className="text-center">
                <p className="text-4xl font-black text-[#8B7355]">30₪</p>
                <p className="text-gray-400 text-sm mt-1">תוספת אומברה</p>
              </div>
              <span className="text-3xl text-[#D4C5B5] font-bold">=</span>
              <div className="text-center bg-[#1A1A1A] rounded-2xl px-6 py-3">
                <p className="text-4xl font-black text-[#D4C5B5]">190₪</p>
                <p className="text-[#D4C5B5]/70 text-sm mt-1">לטיפול אחד</p>
              </div>
            </div>
            <div className="border-t border-[#E8DDD4] pt-5 text-center">
              <p className="text-gray-600 text-lg">
                20 לקוחות בחודש × 30₪ נוספים =
                <strong className="text-[#1A1A1A] text-xl"> 600₪ נוספים בחודש</strong>
              </p>
              <p className="text-gray-400 text-sm mt-2">בלי לקוחה חדשה אחת.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { n: '15', l: 'פרקי וידאו' },
              { n: '+50₪', l: 'לכל טיפול' },
              { n: '30 דק\'', l: 'לאומברה מושלם' },
              { n: '×2', l: 'הכנסה שהוכפלה' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-[#1A1A1A] rounded-2xl p-4 text-center">
                <p className="text-3xl font-black text-[#D4C5B5]">{s.n}</p>
                <p className="text-gray-400 text-xs mt-1 leading-tight">{s.l}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── STORY ─── */}
      <section className="bg-white py-12 px-5">
        <motion.div className="max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm uppercase tracking-wide font-semibold mb-2">הסיפור שלי</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-6">
            גם אני חשבתי שחייב כישרון מיוחד.
          </motion.h2>

          <motion.div variants={fadeUp} className="text-right text-gray-700 text-lg leading-loose space-y-4 mb-8">
            <p>כל היום הייתי רואה סרטוני הדרכה על אומברה ביוטיוב ובאינסטגרם.</p>
            <p>ובהתחלה הכל יצא עקום. כל אומברה שניסיתי - לא יצא.</p>
            <p>הייתי מוחקת ומנסה שוב ושוב עד שהחלטתי שזה פשוט לא מקצועי.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="text-right text-gray-700 text-lg leading-loose space-y-4 mb-8">
            <p>אז למדתי מהטובות ביותר.</p>
            <p>הבנתי את <strong className="text-[#1A1A1A]">הנוסחה המדויקת</strong> - תיאוריית צבעים, שלבי עבודה, הטריקים הקטנים.</p>
            <p>ואז קרה משהו מדהים.</p>
          </motion.div>

          <motion.div variants={fadeUp}
            className="bg-[#1A1A1A] rounded-3xl p-7 text-center">
            <p className="text-[#D4C5B5] text-lg leading-relaxed">
              הלקוחות עפו על הקישוטים.<br />
              <strong className="text-white">היומן שלי התמלא רק מפה לאוזן.</strong><br />
              ההכנסה שלי הוכפלה.<br /><br />
              בניתי את הקורס הזה כדי שאת לא תצטרכי לגלות את זה לבד.
            </p>
            <p className="text-white font-bold mt-5 text-xl">מאמינה בך, טליה ✨</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── AUTHORITY ─── */}
      <section className="bg-white py-12 px-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4C5B5] to-transparent" />
        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <motion.div variants={fadeUp} className="flex-shrink-0 relative">
              <div className="absolute inset-0 rounded-full bg-[#D4C5B5]/30 blur-2xl scale-110" />
              <div className="relative w-52 h-52 rounded-full border-4 border-[#D4C5B5] shadow-2xl overflow-hidden">
                <img src="/talya-pro.jpg" alt="טליה בוזורגי"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', transform: 'scale(1.6)', transformOrigin: 'center 20%' }} />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="text-right flex-1">
              <p className="text-[#8B7355] font-semibold text-sm uppercase tracking-wide mb-1">מי אני?</p>
              <h2 className="text-3xl font-extrabold mb-1">היי, אני טליה.</h2>
              <p className="text-[#8B7355] font-semibold mb-4">מומחית ניל ארט ואומברה | 6 שנות ניסיון</p>
              <p className="text-gray-700 text-lg leading-relaxed">
                בעלת קליניקה לטיפוח וקוסמטיקה ומנהלת אקדמיה ללימודי מקצועות היופי.<br />
                עשיתי למאות לקוחות קישוטים ואומברה בשיטות שפיתחתי.<br />
                זה הדבר שהפך אותי למניקוריסטית הכי מבוקשת באזור.
              </p>
            </motion.div>
          </div>

          <motion.div variants={fadeUp}
            className="mt-8 bg-[#1A1A1A] rounded-3xl p-7 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4C5B5] to-transparent" />
            <p className="text-[#D4C5B5] text-lg leading-relaxed">
              השליחות שלי היא אחת.<br />
              לעזור לכל מניקוריסטית שאוהבת את המקצוע<br />
              <strong className="text-white">להפוך ליוצרת שלקוחות מחכות לה בתור.</strong>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SOLUTION ─── */}
      <section className="bg-[#FAF7F4] py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">התוכנית הדיגיטלית</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-extrabold text-center mb-2">
            מאסטרית בקישוטים ואומברה
          </motion.h2>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] font-semibold mb-2">15 פרקים שישדרגו את היכולות שלך</motion.p>
          <motion.div variants={fadeUp} className="w-16 h-1 bg-[#D4C5B5] mx-auto rounded-full my-4" />

          <div className="space-y-3 mb-6">
            {chapters.map((c) => (
              <motion.div key={c.n} variants={fadeUp}
                className="flex items-center gap-4 bg-white border border-[#E8DDD4] rounded-2xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                <span className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#D4C5B5] text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {c.n}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1A1A1A] text-base">{c.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="bg-[#1A1A1A] rounded-2xl p-5">
            <p className="text-[#D4C5B5] font-semibold mb-3 text-center text-sm uppercase tracking-wide">מה כלול בקורס</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['✅ 15 פרקי וידאו', '✅ גישה לצמיתות', '✅ 4 בונוסים', '✅ תעודת מאסטרית', '✅ תמיכה'].map((t) => (
                <span key={t} className="bg-white/10 text-[#D4C5B5] text-sm px-3 py-1 rounded-full border border-[#D4C5B5]/20">{t}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── CERTIFICATE ─── */}
      <section className="bg-white py-10 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">בסיום הקורס</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-extrabold text-center mb-6">
            תקבלי תעודת מאסטרית רשמית
          </motion.h2>
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <motion.div variants={fadeUp} className="w-full sm:w-96 rounded-2xl overflow-hidden shadow-xl border border-[#E8DDD4]">
              <img src="/cert-ombre.png" alt="תעודת מאסטרית" className="w-full h-auto" />
            </motion.div>
            <motion.div variants={fadeUp} className="w-full sm:w-64 rounded-2xl overflow-hidden shadow-xl border border-[#E8DDD4]">
              <img src="/ombre-mockup.png" alt="מוקאפ קורס" className="w-full h-auto" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── BONUSES ─── */}
      <section className="bg-[#1A1A1A] py-12 px-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#2a2010_0%,_transparent_60%)]" />
        <motion.div className="max-w-3xl mx-auto relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#C9A96E] text-xs uppercase tracking-[4px] mb-3">ועוד לא הכל</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-2">
            4 בונוסים מתנה
          </motion.h2>
          <motion.p variants={fadeUp} className="text-center text-[#C9A96E] font-semibold text-lg mb-1">שווי 541₪ - שלך בחינם</motion.p>
          <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-8">כשאת רוכשת היום</motion.p>

          <div className="space-y-4">
            {bonuses.map((b, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative border border-[#C9A96E]/30 rounded-2xl overflow-hidden flex items-stretch"
                whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                <div className="absolute inset-0 bg-gradient-to-l from-[#C9A96E]/10 to-transparent pointer-events-none" />
                <div className="relative flex-shrink-0 w-16 bg-[#C9A96E]/10 border-l border-[#C9A96E]/20 flex items-center justify-center text-3xl">
                  {b.icon}
                </div>
                <div className="flex-1 p-4 text-right">
                  <span className="text-[#C9A96E] text-xs font-bold tracking-wider">בונוס {i + 1}</span>
                  <h3 className="font-bold text-base text-white mt-0.5 mb-1">{b.name}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-2">{b.desc}</p>
                  <div className="flex items-center justify-end gap-2">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">חינם</span>
                    <span className="text-gray-500 line-through text-xs">{b.val}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-8 relative">
            <div className="absolute inset-0 bg-[#C9A96E]/10 rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-b from-white/5 to-white/0 border border-[#C9A96E]/40 rounded-3xl p-8 text-center">
              <p className="text-[#C9A96E] text-xs uppercase tracking-[3px] mb-4">הכל כלול - בלי הפתעות</p>
              <div className="flex items-center justify-center gap-3 flex-wrap mb-2">
                <span className="text-gray-600 line-through text-lg">1,838₪</span>
                <span className="text-white text-6xl font-black">197₪</span>
              </div>
              <p className="text-gray-400 text-sm">או 2 תשלומים נוחים של 99₪</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="bg-[#FDFAF7] py-12 px-5">
        <motion.div className="max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm uppercase tracking-wide font-semibold mb-2">עדויות</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-center mb-2">מה הן כותבות אחרי הקורס</motion.h2>
          <motion.div variants={fadeUp} className="w-16 h-1 bg-[#D4C5B5] mx-auto rounded-full mt-3 mb-10" />

          <div className="space-y-5">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="flex justify-end items-end gap-2">
                <div className="relative max-w-xs sm:max-w-sm bg-[#DCF8C6] px-4 py-3 shadow-sm"
                  style={{ borderRadius: '18px 18px 4px 18px' }}>
                  <p className="text-[#1A1A1A] text-sm leading-relaxed text-right">{t.quote}</p>
                  <p className="text-gray-400 text-xs mt-1 text-left">{t.time} ✓✓</p>
                </div>
                <div className="flex flex-col items-center gap-1 flex-shrink-0 order-first">
                  <div className="w-10 h-10 rounded-full bg-[#D4C5B5] border-2 border-[#D4C5B5] flex items-center justify-center font-bold text-[#1A1A1A]">
                    {t.name[0]}
                  </div>
                  <span className="text-[10px] text-gray-400">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="text-center text-gray-500 mt-10 text-base">
            הודעות אמיתיות מתלמידות. לא פרסומת. תוצאות.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── FOR WHO ─── */}
      <section className="bg-white py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">למי זה מתאים</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-8">
            התוכנית הזו בשבילך אם...
          </motion.h2>
          <div className="space-y-3">
            {[
              'ניסית בעבר לעשות אומברה ולא הצלחת',
              'לקוחות מבקשות ממך קישוטים ואומברה ואת לא בטוחה',
              'רוצה להכניס שירות נוסף שיגדיל את ההכנסה בלי לקוחות חדשות',
              'חולמת לבדל את עמוד האינסטגרם שלך עם עבודות שנראות מושלמות',
              'רוצה יומן מלא שבועות קדימה בלי לרדוף אחרי לקוחות',
              'רוצה להיות המניקוריסטית הכי מבוקשת באזור שלך',
            ].map((t, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-start gap-4 bg-[#FAF7F4] border border-[#E8DDD4] rounded-2xl px-5 py-4">
                <span className="text-[#D4C5B5] text-xl mt-0.5 flex-shrink-0">←</span>
                <span className="text-[#1A1A1A] text-base">{t}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="bg-[#1A1A1A] py-12 px-5">
        <motion.div className="max-w-lg mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-[#D4C5B5]/60 text-sm uppercase tracking-wide mb-2">ההשקעה שלך</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-white mb-8">
            כמה עולה לשנות את ההכנסות שלך?
          </motion.h2>

          <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 mb-6 shadow-2xl">
            <p className="text-gray-400 line-through text-base mb-1 text-center">שווי מוצהר: 1,297₪</p>
            <p className="text-7xl font-black text-[#1A1A1A] leading-none mb-1 text-center">197₪</p>
            <p className="text-gray-500 text-sm mb-1 text-center">או 2 תשלומים נוחים של 99₪</p>
            <p className="text-gray-400 text-xs mb-6 text-center">תוך דקה מהרכישה יגיע למייל שלך הקורס עם שם משתמש וסיסמה אישיים.</p>

            <form onSubmit={handlePricingSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">שם מלא</label>
                <input type="text" required placeholder="הכניסי את שמך"
                  value={pricingForm.name} onChange={e => setPricingForm({ ...pricingForm, name: e.target.value })}
                  className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-right text-[#1A1A1A] focus:border-[#D4C5B5] focus:outline-none transition-colors text-base" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">טלפון נייד</label>
                <input type="tel" required placeholder="050-0000000"
                  value={pricingForm.phone} onChange={e => setPricingForm({ ...pricingForm, phone: e.target.value })}
                  className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#D4C5B5] focus:outline-none transition-colors text-base" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">כתובת מייל</label>
                <input type="email" required placeholder="example@gmail.com"
                  value={pricingForm.email} onChange={e => setPricingForm({ ...pricingForm, email: e.target.value })}
                  className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#D4C5B5] focus:outline-none transition-colors text-base" dir="ltr" />
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="mt-1 flex-shrink-0 accent-[#1A1A1A]" />
                <span className="text-xs text-gray-500 text-right leading-snug">
                  אני מאשרת קבלת עדכונים, מבצעים ותכנים שיווקיים למייל מטליה בוזורגי. ניתן לבטל בכל עת.
                </span>
              </label>
              <motion.button type="submit"
                className="w-full bg-[#1A1A1A] text-[#D4C5B5] py-4 rounded-2xl font-bold text-xl hover:bg-[#D4C5B5] hover:text-[#1A1A1A] transition-colors mt-2"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                אני רוצה להיות מאסטרית ✋
              </motion.button>
            </form>
            <div className="mt-4 bg-gray-50 border border-[#E8DDD4] rounded-xl px-4 py-3 text-center space-y-1">
              <p className="text-[#8B7355] text-xs font-semibold">מה קורה אחרי התשלום?</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                תועברי לדף סליקה מאובטח. תוך דקה אחת מהרכישה יגיע למייל שלך הקורס עם שם משתמש וסיסמה אישיים.
              </p>
              <p className="text-gray-400 text-xs">גישה לצמיתות • בלי הגבלת זמן</p>
            </div>
          </motion.div>

          {/* Guarantee */}
          <motion.div variants={fadeUp}
            className="flex items-start gap-4 text-right bg-white/5 border border-[#D4C5B5]/20 rounded-2xl p-5 mb-4">
            <span className="text-4xl flex-shrink-0">🛡️</span>
            <div>
              <p className="text-[#D4C5B5] font-bold mb-1">גישה לצמיתות</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                הקורס יהיה זמין לצפייה תמיד. חוזרים לתרגל כמה פעמים שרוצים, בלי הגבלת זמן.
              </p>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div variants={fadeUp}
            className="bg-white/5 border border-[#C9A96E]/30 rounded-2xl px-6 py-4 text-center">
            <p className="text-[#C9A96E] text-xs tracking-widest uppercase mb-3">⏳ מחיר ההשקה נגמר בעוד</p>
            <div className="flex gap-4 items-center justify-center">
              {[{ v: countdown.s, l: 'שניות' }, { v: countdown.m, l: 'דקות' }].map((u, i) => (
                <div key={i} className="flex gap-4 items-center">
                  {i > 0 && <span className="text-[#C9A96E] text-2xl font-bold -mt-3">:</span>}
                  <div className="text-center">
                    <span className="block text-3xl font-black text-[#C9A96E]">{String(u.v).padStart(2, '0')}</span>
                    <span className="text-[10px] text-gray-400 tracking-wider">{u.l}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-[#FAF7F4] py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">שאלות ותשובות</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-6">שאלות שבטח עולות לך</motion.h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white border border-[#E8DDD4] rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-right font-semibold text-[#1A1A1A] hover:bg-[#FAF7F4] transition-colors">
                  <span className="text-[#D4C5B5] text-2xl font-light ml-2">{openFaq === i ? '−' : '+'}</span>
                  <span className="flex-1">{f.q}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-[#E8DDD4] pt-4 text-gray-600 leading-relaxed">{f.a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── CTA FORM ─── */}
      <section id="cta-form" className="bg-[#1A1A1A] py-14 px-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'url(/nail5.jpg)', backgroundSize: 'cover' }} />
        <motion.div className="relative z-10 max-w-md mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-white text-3xl sm:text-4xl font-extrabold text-center mb-2">
            מוכנה להיות מאסטרית?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#D4C5B5] text-center mb-2 text-lg">
            מלאי פרטים ותועברי ישירות לדף התשלום המאובטח.
          </motion.p>
          <motion.p variants={fadeUp} className="text-gray-400 text-sm text-center mb-6">
            תוך דקה מהרכישה יגיע למייל שלך הקורס עם שם משתמש וסיסמה אישיים.
          </motion.p>

          <motion.form variants={fadeUp} onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">שם מלא</label>
              <input type="text" required placeholder="הכניסי את שמך"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-right text-[#1A1A1A] focus:border-[#D4C5B5] focus:outline-none transition-colors text-base" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">טלפון נייד</label>
              <input type="tel" required placeholder="050-0000000"
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#D4C5B5] focus:outline-none transition-colors text-base" dir="ltr" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">כתובת מייל</label>
              <input type="email" required placeholder="example@gmail.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#D4C5B5] focus:outline-none transition-colors text-base" dir="ltr" />
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" required className="mt-1 flex-shrink-0 accent-[#1A1A1A]" />
              <span className="text-xs text-gray-500 text-right leading-snug">
                אני מאשרת קבלת עדכונים, מבצעים ותכנים שיווקיים למייל מטליה בוזורגי. ניתן לבטל בכל עת.
              </span>
            </label>
            <motion.button type="submit"
              className="w-full bg-[#1A1A1A] text-[#D4C5B5] py-4 rounded-2xl font-bold text-xl hover:bg-[#D4C5B5] hover:text-[#1A1A1A] border-2 border-[#1A1A1A] transition-all duration-300"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              אני רוצה להיות מאסטרית ✋
            </motion.button>
            <div className="bg-gray-50 border border-[#E8DDD4] rounded-xl px-4 py-3 text-center space-y-1">
              <p className="text-[#8B7355] text-xs font-semibold">מה קורה אחרי התשלום?</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                תועברי לדף סליקה מאובטח. תוך דקה אחת מהרכישה יגיע למייל שלך הקורס עם שם משתמש וסיסמה אישיים.
              </p>
              <p className="text-gray-400 text-xs">גישה לצמיתות • בלי סיכון</p>
            </div>
          </motion.form>

          <motion.p variants={fadeUp} className="text-[#D4C5B5] text-center mt-8 font-semibold text-xl">
            מאמינה בך, טליה ✨
          </motion.p>
        </motion.div>
      </section>

    </main>
  );
}
