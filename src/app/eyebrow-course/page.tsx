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
    const key = 'eyebrow_end';
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

const testimonials = [
  {
    quote: 'היי רכשתי את הקורס הדיגיטלי שלך לעיצוב גבות, רציתי לומר לך תודה רבה על קורס נגיש ויעיל!!',
    time: '20:27',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=faces&q=80',
    name: 'נועה',
  },
  {
    quote: 'תקשיבי חשבתי שאני כבר מרימה ידיים. כי לא הצלחתי להשיג לקוחות חדשות.. והקבועות שלי לא הספיקו.. רכשתי את הקורס שלך ואת הצלת לי את העסק!! ופשוט התאהבתי בעיצוב גבות אז תודה לך',
    time: '22:16',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=faces&q=80',
    name: 'מיכל',
  },
  {
    quote: 'אני התחלתי לשלב גבות ושפם אני עושה לק גל בכללי אבל רציתי כאילו להשתפר והקורס זה בדיוק!! מדהים',
    time: '22:20',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=faces&q=80',
    name: 'שירה',
  },
  {
    quote: 'היי טליה ערב טוב רציתי לומר תודה סיימתי עכשיו את הקורס עיצוב גבות הוא קל, ישר ולעניין את מסבירה ממש טוב, לא מחסירה פרטים אני מרגישה שאני יכולה להתחיל כבר ושיש לי את כל הידע שצריך',
    time: '21:55',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=faces&q=80',
    name: 'רונית',
  },
  {
    quote: 'ואי השתמשתי בפינצטה ובמספריים אימלה איזה איכותתתת כיף ממש לעבוד והקורס מושלם ומדויק את מסבירה ממש טוב ולא מחסירה פרטים ממש תודה רבה על הכל ועל השירותים המדהים שלך מעריכה מאוד ❤️',
    time: '23:06',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces&q=80',
    name: 'לירון',
  },
  {
    quote: 'היי טליה צפיתי בהשתלמות און-ליין עכשיו וזה ממש מושלם שהשם יברך אותך תודה רבה על כל העשייה שלך ועל הרצון הטוב שלך לעזור לבנות תבורכי 😊',
    time: '17:15',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=faces&q=80',
    name: 'תמר',
  },
];

function CTAButton({ text = 'אני רוצה להתחיל ✋' }: { text?: string }) {
  const scrollToForm = () => document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <motion.button
      onClick={scrollToForm}
      className="w-full sm:w-auto bg-[#1A1A1A] text-[#D4C5B5] py-4 px-10 rounded-2xl font-bold text-xl shadow-lg border-2 border-[#1A1A1A] hover:bg-[#D4C5B5] hover:text-[#1A1A1A] transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {text}
    </motion.button>
  );
}

const PURCHASE_URL = 'https://secure.cardcom.solutions/EA/EA5/00YPdJyAU2CAAMHVtWd7A/PaymentSP';

const modules = [
  { n: 1, title: 'ברוכה הבאה לעולם עיצוב הגבות', desc: 'הבסיס שרוב הקורסים מדלגים עליו - מה נכון לעשות ומה לא', img: 'https://plus.unsplash.com/premium_photo-1671656333452-7369599f92ee?w=120&h=120&fit=crop&q=80' },
  { n: 2, title: 'מבנה הגבה האידיאלי', desc: 'נקודות A, B, C ואיך לעצב גבה שמחמיאה לכל מבנה פנים', img: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=120&h=120&fit=crop&q=80' },
  { n: 3, title: 'ארגז הכלים של הקוויק', desc: 'כל הכלים שאני עובדת איתם לתוצאה מהירה ומדויקת', img: 'https://images.unsplash.com/photo-1637851497145-0faa2e456081?w=120&h=120&fit=crop&q=80' },
  { n: 4, title: 'עבודה עם כל כלי', desc: 'הסבר מפורט על השיטות שפיתחתי לעבודה קלה, מהירה ובטוחה', img: 'https://images.unsplash.com/photo-1547078902-2911dfaaa53a?w=120&h=120&fit=crop&q=80' },
  { n: 5, title: 'עולם השעוות', desc: 'סקירת סוגים, הדגמות, וטכניקות שמקצרות את זמן הטיפול', img: 'https://plus.unsplash.com/premium_photo-1671717724080-b31452cad3fa?w=120&h=120&fit=crop&q=80' },
  { n: 6, title: 'שיטת הקוויק המלאה', desc: 'הדרך המהירה והבטיחותית - עיצוב + סרטוט לפי מבנה הפנים', img: 'https://images.unsplash.com/photo-1567629307995-b9f33097bd30?w=120&h=120&fit=crop&q=80' },
  { n: 7, title: 'טיפולים מלאים מהתחלה לסוף', desc: 'כאילו קיבלת שיעור פרטי - בצילום איכותי ובקצב שלך', img: 'https://images.unsplash.com/photo-1595550912256-b24059bb08e8?w=120&h=120&fit=crop&q=80' },
  { n: 8, title: 'כל סוגי הגבות', desc: 'לא תהיי מופתעת. לומדים איך להתנהל עם כל גבה שתגיע', img: 'https://images.unsplash.com/photo-1611352110288-9e204ae300bb?w=120&h=120&fit=crop&q=80' },
  { n: 9, title: 'הפכי למשקמת גבות', desc: 'את תהיי זו שמצילה לנשים את הגבות ומחזירה להן את הביטחון', img: 'https://plus.unsplash.com/premium_photo-1663050996462-4671145bf66f?w=120&h=120&fit=crop&q=80' },
  { n: 10, title: 'תעודה מקצועית', desc: 'תעודת סיום מאקדמיית טליה בוזורגי שתציגי בגאווה ללקוחות', img: 'https://images.unsplash.com/photo-1637851496670-2bdc6c548d27?w=120&h=120&fit=crop&q=80' },
];

const bonuses = [
  { icon: '🎨', name: 'הדרכת צביעת גבות', desc: 'מדריך והדגמה מפורטת - טיפול נוסף של 5 דקות שמגדיל את ההכנסה', val: '297₪' },
  { icon: '📱', name: 'שיווק ואינסטגרם', desc: 'מה חשוב באמת כשמפרסמים ברשתות + איך לצלם תמונות שמביאות לקוחות', val: '150₪' },
  { icon: '📖', name: 'חוברת PDF מקצועית מלאה', desc: 'כל הידע מסודר בחוברת מוכנה להדפסה - עבדתי עליה חודשים', val: '150₪' },
];

const faqs = [
  { q: 'אני לא יודעת כלום על גבות - זה מתאים לי?', a: 'בהחלט כן. הקורס מתחיל מאפס מוחלט. שיעור 1 מכסה את הבסיס שרוב הקורסים מדלגים עליו.' },
  { q: 'מה אם אני מפחדת להרוס ללקוחות את הגבות?', a: 'זה הפחד הכי נפוץ - ולכן השיטה שלי בנויה בדיוק על זה. תסרטטי לפי מבנה הפנים, עם בטיחות מלאה. תמיד תהיי בצד המשקם.' },
  { q: 'כמה זמן לוקח ללמוד את כל החומר?', a: 'ניתן לצפות בכל התכנים בערב אחד. למחרת - מתחילות ליישם על הלקוחות.' },
  { q: 'הגישה לחומר פגה?', a: 'לא. גישה לצמיתות, ללא הגבלת זמן. חוזרים בכל עת.' },
  { q: 'מה אם לא מתאים לי?', a: 'ערבות החזר מלא של 14 יום. אם צפית בכל החומר ולא הצלחת ליישם - מחזירה לך את הכסף בלי שאלות.' },
  { q: 'מה כלול במחיר 197₪?', a: '10 שיעורי וידאו + חוברת PDF + תעודת סיום + 3 בונוסים בשווי 597₪ - הכל כלול, בלי תוספות.' },
];

export default function EyebrowCoursePage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [pricingForm, setPricingForm] = useState({ name: '', phone: '', email: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const countdown = useCountdown();

  async function subscribeToRavMeser(data: { name: string; phone: string; email: string }) {
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {
      // don't block the user if this fails
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await subscribeToRavMeser(form);
    window.location.href = PURCHASE_URL;
  };

  const handlePricingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await subscribeToRavMeser(pricingForm);
    window.location.href = PURCHASE_URL;
  };

  const scrollToForm = () => document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' });

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
          <span>אני רוצה להצטרף לקורס</span>
          <span className="text-2xl">✋</span>
        </button>
      </motion.div>

      {/* ─── HERO ─── */}
      <section className="min-h-screen bg-[#1A1A1A] flex flex-col items-center justify-center px-5 py-14 text-center relative overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1400&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.08,
          }} />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-transparent to-[#1A1A1A] opacity-80" />

        {/* Full-width white bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          className="relative z-10 w-full bg-white py-3 px-6 text-center mb-0">
          <p className="text-[#1A1A1A] font-bold text-sm sm:text-base tracking-wide">
            הסוד שממלא יומן של קוסמטיקאיות שוב ושוב – בלי לרדוף אחרי לקוחות חדשים
          </p>
        </motion.div>

        <motion.div className="relative z-10 max-w-3xl mt-10" initial="hidden" animate="visible" variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-[#D4C5B5] text-2xl font-semibold mb-4">
            מגיע לך יותר.
          </motion.h2>
          <motion.h1 variants={fadeUp} className="text-white text-3xl sm:text-5xl font-extrabold leading-tight mb-6">
            איך מאות קוסמטיקאיות הוסיפו טיפול אחד של
            <span className="text-[#C9A96E]"> 15 דקות </span>
            לקליניקה והגדילו הכנסה <span className="underline underline-offset-4 decoration-[#C9A96E] whitespace-nowrap">בלי למלא יומן</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-gray-300 text-lg mb-6 leading-relaxed">
            בלי ציוד יקר.<br />
            בלי לפתוח עסק חדש.<br />
            רק שירות אחד שהלקוחות שלך כבר מחפשות.
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

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FDFAF7] to-transparent" />
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="bg-[#FDFAF7] py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] font-semibold mb-2 tracking-wide uppercase text-sm">קצר ולעניין</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-center mb-2">
            את עובדת קשה. שעות ארוכות.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-center text-gray-500 text-lg mb-6">
            ובסוף החודש המספרים לא מתגמלים כמו שחשבת.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── PAIN ─── */}
      <section className="bg-[#1A1A1A] py-12 px-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=80)', backgroundSize: 'cover' }} />
        <motion.div className="relative z-10 max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>

          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-6 text-white">
            חשוב שתדעי - את לא אשמה.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-center text-gray-400 text-lg mb-6 leading-relaxed">
            יש מצב שאת קוסמטיקאית מעולה.<br />
            אבל תחום הציפורניים לבד פשוט לא מספיק כדי להגיע להכנסות שאת רוצה.
          </motion.p>

          <motion.div variants={fadeUp}
            className="bg-white/5 border border-[#D4C5B5]/20 rounded-3xl p-8 text-right leading-loose space-y-4 text-gray-300 text-lg">
            <p>אני יודעת איך נראה היום שלך.</p>
            <p>
              את קמה בבוקר, מכינה את הקליניקה, לקוחה אחרי לקוחה - ידיים עובדות בלי הפסקה.
              כאבי גב שמלווים אותך כבר מזמן. כאבי ידיים שפשוט הפכו לחלק מהשגרה.
            </p>
            <p>
              ובסוף יום ארוך, כשאת סוף סוף יושבת - את עושה חשבון.
              ומשהו לא מסתדר.
            </p>
            <p>
              עבדת קשה. היומן היה מלא.
              <span className="text-white font-semibold"> אבל הסכום בסוף החודש לא מתאים למאמץ שהשקעת.</span>
            </p>
            <p className="text-[#D4C5B5]">
              ואת לא אשמה בזה.<br />
              תחום הציפורניים לבד פשוט לא מספיק כדי להגיע למקום שאת רוצה להיות בו.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-[#FDFAF7] py-8 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h3 variants={fadeUp} className="text-xl sm:text-2xl font-bold text-center mb-6">
            למה דווקא עיצוב גבות?
          </motion.h3>
          <div className="space-y-3 mb-8">
            {[
              { icon: '⏱️', text: 'טיפול עיצוב גבות לוקח 15 דקות בלבד.' },
              { icon: '💰', text: 'תוסיפי 80 עד 120 שקל לטיפול - מעל מה שאת כבר מרוויחה היום.' },
              { icon: '📅', text: '5 טיפולים ביום = עוד 400-600 שקל על גבי ההכנסה הקיימת שלך.' },
              { icon: '🌟', text: 'מאות בנות כבר הוסיפו את זה לקליניקה. ההכנסה עלתה.' },
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
              { icon: '✦', label: 'טכניקה מדויקת', sub: 'שיטה ברורה שמביאה תוצאה בכל פעם' },
              { icon: '✦', label: 'ביטחון אמיתי', sub: 'יוצאת מוכנה לגעת בלקוחות מהיום הראשון' },
              { icon: '✦', label: 'שיטת סקיצה 3/3', sub: 'שלוש נקודות מדידה לגבה מדויקת ומהירה' },
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
          <motion.h3 variants={fadeUp} className="text-center text-2xl font-bold mb-5">גבות שעיצבנו בשיטת הקוויק</motion.h3>
          <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { src: '/brow1.jpg', pos: 'center 20%' },
              { src: '/brow2.jpg', pos: 'center 40%' },
              { src: '/brow3.jpg', pos: 'center 30%' },
              { src: '/brow4.jpg', pos: 'center 35%' },
              { src: '/brow5.jpg', pos: 'center 25%' },
              { src: '/brow6.jpg', pos: 'center 30%' },
            ].map((img, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative rounded-2xl overflow-hidden shadow-md aspect-square"
                whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <img src={img.src} alt="גבות לאחר עיצוב"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: img.pos }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── CTA מיני ─── */}
      <section className="bg-[#D4C5B5] py-8 px-5 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p className="text-[#1A1A1A] text-xl font-semibold">מוכנה לשנות את זה?</p>
        </motion.div>
      </section>

      {/* ─── MECHANISM (Calculator) ─── */}
      <section className="bg-[#FAF7F4] py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">החשבון שמשנה הכל</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-4">
            הסוד של הקוסמטיקאיות שמרוויחות הכי הרבה
          </motion.h2>
          <motion.p variants={fadeUp} className="text-center text-gray-500 text-lg mb-6 leading-relaxed">
            הן לא מחפשות לקוחות חדשות.<br />
            הן מרוויחות <strong className="text-[#1A1A1A]">יותר</strong> מכל לקוחה שכבר יושבת אצלן.
          </motion.p>

          <motion.div variants={fadeUp}
            className="bg-white border border-[#E8DDD4] rounded-3xl p-8 shadow-sm mb-8">
            <p className="text-center text-[#8B7355] text-sm uppercase tracking-wide mb-6">החישוב הפשוט</p>
            <div className="flex items-center justify-center gap-4 flex-wrap mb-6">
              <div className="text-center">
                <p className="text-4xl font-black text-[#1A1A1A]">150₪</p>
                <p className="text-gray-400 text-sm mt-1">טיפול ציפורניים</p>
              </div>
              <span className="text-3xl text-[#D4C5B5] font-bold">+</span>
              <div className="text-center">
                <p className="text-4xl font-black text-[#8B7355]">80₪</p>
                <p className="text-gray-400 text-sm mt-1">עיצוב גבות 15 דק'</p>
              </div>
              <span className="text-3xl text-[#D4C5B5] font-bold">=</span>
              <div className="text-center bg-[#1A1A1A] rounded-2xl px-6 py-3">
                <p className="text-4xl font-black text-[#D4C5B5]">230₪</p>
                <p className="text-[#D4C5B5]/70 text-sm mt-1">לטיפול אחד</p>
              </div>
            </div>
            <div className="border-t border-[#E8DDD4] pt-5 text-center">
              <p className="text-gray-600 text-lg">
                20 לקוחות בחודש × 80₪ נוספים =
                <strong className="text-[#1A1A1A] text-xl"> 1,600₪ נוספים בחודש</strong>
              </p>
              <p className="text-gray-400 text-sm mt-2">בלי לקוחה חדשה אחת.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { n: '15', l: 'דקות לטיפול' },
              { n: '300+', l: 'קוסמטיקאיות שינו הכנסה' },
              { n: '90%', l: 'לקוחות קיימות יקנו שוב' },
              { n: '×2', l: 'הכנסה שהוכפלה' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-[#1A1A1A] rounded-2xl p-4 text-center">
                <p className="text-3xl font-black text-[#D4C5B5]">{s.n}</p>
                <p className="text-gray-400 text-xs mt-1 leading-tight">{s.l}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── TURNING POINT ─── */}
      <section className="bg-[#FDFAF7] py-12 px-5">
        <motion.div className="max-w-2xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold mb-6">
            הבנתי את זה אחרי שנים בתחום.
          </motion.h2>
          <motion.div variants={fadeUp} className="bg-white border border-[#E8DDD4] rounded-3xl p-8 shadow-sm text-right leading-relaxed text-gray-700 text-lg space-y-4">
            <p>הדבר שהכי חסר לקוסמטיקאיות הוא לא ידע.<br/>זה <strong className="text-[#1A1A1A]">שיטה מסודרת וקלילה</strong> שמאפשרת לעבוד בביטחון מהיום הראשון.</p>
            <p>כשיש לך שיטה ברורה - כל לקוחה שנכנסת הופכת להזדמנות.<br/>את לא מנחשת. לא מפחדת. פשוט עובדת.</p>
            <p className="font-bold text-[#1A1A1A]">וכשעובדים בביטחון, הלקוחות מרגישות את זה.<br/>הן חוזרות. הן ממליצות. היומן מתמלא מעצמו.</p>
            <p>זה הרגע שהחלטתי לבנות משהו אחר.<br/>לא עוד קורס שמלמד טכניקה ושולח אותך הביתה לבד.</p>
          </motion.div>

          {/* Accompaniment box */}
          <motion.div variants={fadeUp}
            className="mt-5 bg-[#1A1A1A] rounded-3xl p-5 text-right space-y-3">
            <p className="text-[#D4C5B5] font-semibold text-base">מה שמייחד את הקורס הזה:</p>
            {[
              { icon: '🎯', text: 'שיטה אחת ברורה - לא 10 גישות שונות שמבלבלות' },
              { icon: '💪', text: 'יוצאת עם ביטחון לגעת בלקוחות כבר ביום שאחרי' },
              { icon: '🤝', text: 'ליווי גם אחרי הקורס - יש שאלה? אני כאן. לא משאירה אותך לבד' },
              { icon: '⚡', text: '15 דקות לטיפול - מהיר, מדויק, עם תוצאות שמדברות בעד עצמן' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <p className="text-gray-300 text-base leading-snug">{item.text}</p>
              </div>
            ))}
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
                <img
                  src="/talya-pro.jpg"
                  alt="טליה בוזורגי"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                    transform: 'scale(1.6)',
                    transformOrigin: 'center 20%',
                  }}
                />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="text-right flex-1">
              <p className="text-[#8B7355] font-semibold text-sm uppercase tracking-wide mb-1">מי אני?</p>
              <h2 className="text-3xl font-extrabold mb-1">היי, אני טליה.</h2>
              <p className="text-[#8B7355] font-semibold mb-4">מומחית עיצוב גבות | 8 שנות ניסיון</p>
              <p className="text-gray-700 text-lg leading-relaxed">
                מאות תלמידות עברו אצלי.<br />
                קוסמטיקאיות שהוסיפו עיצוב גבות לקליניקה וגדלו.<br />
                בנות שהתחילו מאפס ועובדות היום עם לקוחות ובביטחון.
              </p>
            </motion.div>
          </div>

          {/* Social proof - certificate photos */}
          <motion.div variants={fadeUp} className="mt-8">
            <p className="text-center text-[#8B7355] text-sm uppercase tracking-widest font-semibold mb-4">תלמידות שלמדו אצלי מעידות</p>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
              {['/td1.jpg','/td2.jpg','/td3.jpg','/td4.jpg','/td5.jpg','/td6.jpg'].map((src, i) => (
                <motion.div key={i} variants={fadeUp}
                  className="relative rounded-xl overflow-hidden shadow-sm aspect-[3/4]"
                  whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <img src={src} alt="בוגרת קורס עיצוב גבות"
                    className="w-full h-full object-cover object-top" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}
            className="mt-8 bg-[#1A1A1A] rounded-3xl p-7 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4C5B5] to-transparent" />
            <p className="text-[#D4C5B5] text-lg leading-relaxed">
              השליחות שלי היא אחת.<br />
              לעזור לבנות לגדול, להתפתח, ולבנות עסק שהן גאות בו.<br /><br />
              <strong className="text-white">כל תלמידה שמצליחה - היא ההצלחה שלי.</strong><br /><br />
              אני מאמינה שכל אחת שרוצה באמת יכולה.<br />
              שתשאפי גבוה. שלא תתפשרי על פחות ממה שמגיע לך.
            </p>
            <p className="text-white font-bold mt-5 text-xl">מאמינה בך, טליה ✨</p>
          </motion.div>

        </motion.div>
      </section>

      {/* ─── SOLUTION ─── */}
      <section className="bg-[#FAF7F4] py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">אז איך את עושה את זה, ובגדול?</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-extrabold text-center mb-2">
            עיצוב גבות בשיטת הקוויק
          </motion.h2>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] font-semibold mb-2">"15 דקות לגבות סימטריות ומושלמות"</motion.p>
          <motion.div variants={fadeUp} className="w-16 h-1 bg-[#D4C5B5] mx-auto rounded-full my-4" />
          <motion.p variants={fadeUp} className="text-center text-gray-500 mb-6 text-lg">
            תוכנית דיגיטלית מצולמת עם 10 שיעורים שמקצרים לך את הדרך.
          </motion.p>

          <div className="space-y-3 mb-6">
            {modules.map((m) => (
              <motion.div key={m.n} variants={fadeUp}
                className="flex items-center gap-4 bg-white border border-[#E8DDD4] rounded-2xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                <span className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#D4C5B5] text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {m.n}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1A1A1A] text-base">{m.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{m.desc}</p>
                </div>
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-[#E8DDD4]">
                  <img src={m.img} alt={m.title} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary chips */}
          <motion.div variants={fadeUp} className="bg-[#1A1A1A] rounded-2xl p-5">
            <p className="text-[#D4C5B5] font-semibold mb-3 text-center text-sm uppercase tracking-wide">מה כלול בקורס</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['✅ 10 שיעורי וידאו', '✅ גישה לצמיתות', '✅ חוברת PDF', '✅ תעודת סיום', '✅ 3 בונוסים'].map((t) => (
                <span key={t} className="bg-white/10 text-[#D4C5B5] text-sm px-3 py-1 rounded-full border border-[#D4C5B5]/20">{t}</span>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* ─── CERTIFICATE ─── */}
      <section className="bg-white py-10 px-5">
        <motion.div className="max-w-2xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">בסוף הקורס</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold mb-8">
            את מקבלת תעודה מקצועית מהאקדמיה
          </motion.h2>

          <motion.div variants={fadeUp} className="relative shadow-2xl rounded-2xl overflow-hidden border border-[#C9A96E]/30">
            <img src="/cert-eyebrow.png" alt="תעודת סיום קורס עיצוב גבות" className="w-full h-auto" />
          </motion.div>

          <motion.p variants={fadeUp} className="text-gray-400 text-sm mt-6">
            תעודה מקצועית שתציגי בגאווה ללקוחות שלך
          </motion.p>
        </motion.div>
      </section>

      {/* ─── BONUSES ─── */}
      <section className="bg-[#1A1A1A] py-12 px-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#2a2010_0%,_transparent_60%)]" />
        <motion.div className="max-w-3xl mx-auto relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#C9A96E] text-xs uppercase tracking-[4px] mb-3">ועוד לא הכל</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-2">
            3 בונוסים מתנה
          </motion.h2>
          <motion.p variants={fadeUp} className="text-center text-[#C9A96E] font-semibold text-lg mb-1">שווי 597₪ - שלך בחינם</motion.p>
          <motion.p variants={fadeUp} className="text-center text-gray-400 text-sm mb-8">
            כשאת רוכשת היום
          </motion.p>

          <div className="space-y-4">

            {/* בונוס 1 */}
            <motion.div variants={fadeUp} className="relative border border-[#C9A96E]/30 rounded-2xl overflow-hidden flex items-stretch" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
              <div className="absolute inset-0 bg-gradient-to-l from-[#C9A96E]/10 to-transparent pointer-events-none" />
              {/* תמונה מרובעת ימין */}
              <div className="relative w-24 flex-shrink-0 overflow-hidden">
                <img src="/brow3.jpg" alt="צביעת גבות" className="w-full h-full object-cover" style={{ objectPosition: 'center 25%' }} />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/30 border border-white/60 flex items-center justify-center">
                    <div className="w-0 h-0 ml-0.5" style={{ borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '10px solid white' }} />
                  </div>
                </div>
              </div>
              {/* טקסט */}
              <div className="flex-1 p-4 text-right">
                <span className="text-[#C9A96E] text-xs font-bold tracking-wider">בונוס 1</span>
                <h3 className="font-bold text-base text-white mt-0.5 mb-1">הדרכת צביעת גבות</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-2">טיפול נוסף של 5 דקות שמגדיל את ההכנסה</p>
                <div className="flex items-center justify-end gap-2">
                  <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">חינם</span>
                  <span className="text-gray-500 line-through text-xs">297₪</span>
                </div>
              </div>
            </motion.div>

            {/* בונוס 2 */}
            <motion.div variants={fadeUp} className="relative border border-[#C9A96E]/30 rounded-2xl overflow-hidden flex items-stretch" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
              <div className="absolute inset-0 bg-gradient-to-l from-[#C9A96E]/10 to-transparent pointer-events-none" />
              {/* תמונה מרובעת ימין - פלאפון מצלם גבה */}
              <div className="relative w-24 flex-shrink-0 overflow-hidden bg-[#111]">
                <img src="/brow1.jpg" alt="מצלמת גבות" className="w-full h-full object-cover opacity-70" style={{ objectPosition: 'center 20%' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-16 bg-[#111]/70 rounded-xl border border-white/40 flex flex-col overflow-hidden">
                    <div className="flex-1 relative">
                      <img src="/brow1.jpg" alt="" className="w-full h-full object-cover opacity-80" style={{ objectPosition: 'center 20%' }} />
                      <div className="absolute inset-1 border border-[#C9A96E]/80 rounded-sm">
                        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#C9A96E]" />
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#C9A96E]" />
                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#C9A96E]" />
                        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#C9A96E]" />
                      </div>
                    </div>
                    <div className="h-4 bg-[#111] flex justify-center items-center">
                      <div className="w-3 h-3 rounded-full border border-white/50" />
                    </div>
                  </div>
                </div>
              </div>
              {/* טקסט */}
              <div className="flex-1 p-4 text-right">
                <span className="text-[#C9A96E] text-xs font-bold tracking-wider">בונוס 2</span>
                <h3 className="font-bold text-base text-white mt-0.5 mb-1">שיווק ואינסטגרם</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-2">איך לצלם תמונות שמביאות לקוחות ומה לפרסם</p>
                <div className="flex items-center justify-end gap-2">
                  <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">חינם</span>
                  <span className="text-gray-500 line-through text-xs">150₪</span>
                </div>
              </div>
            </motion.div>

            {/* בונוס 3 */}
            <motion.div variants={fadeUp} className="relative border border-[#C9A96E]/30 rounded-2xl overflow-hidden flex items-stretch" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
              <div className="absolute inset-0 bg-gradient-to-l from-[#C9A96E]/10 to-transparent pointer-events-none" />
              {/* מוקאפ PDF */}
              <div className="relative w-24 flex-shrink-0 bg-[#1a1500] flex items-center justify-center overflow-hidden">
                <div className="absolute" style={{ transform: 'rotate(8deg) translate(6px,-2px)' }}>
                  <div className="w-12 h-16 bg-[#2a2200] rounded border border-[#C9A96E]/20" />
                </div>
                <div className="absolute" style={{ transform: 'rotate(4deg) translate(3px,-1px)' }}>
                  <div className="w-12 h-16 bg-[#221b00] rounded border border-[#C9A96E]/20" />
                </div>
                <div className="relative w-12 h-16 bg-white rounded shadow-xl overflow-hidden">
                  <div className="bg-[#1A1A1A] h-4 flex items-center justify-center">
                    <span className="text-[#C9A96E] text-[5px] font-black tracking-wider">TB ACADEMY</span>
                  </div>
                  <div className="p-1.5 space-y-1">
                    <div className="h-1 bg-gray-200 rounded-full w-full" />
                    <div className="h-1 bg-gray-200 rounded-full w-4/5" />
                    <div className="h-3 bg-[#D4C5B5]/30 rounded mt-1" />
                    <div className="h-1 bg-gray-100 rounded-full w-full" />
                    <div className="h-1 bg-gray-100 rounded-full w-3/4" />
                  </div>
                </div>
              </div>
              {/* טקסט */}
              <div className="flex-1 p-4 text-right">
                <span className="text-[#C9A96E] text-xs font-bold tracking-wider">בונוס 3</span>
                <h3 className="font-bold text-base text-white mt-0.5 mb-1">חוברת PDF מקצועית מלאה</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-2">כל הידע מסודר בחוברת מוכנה להדפסה</p>
                <div className="flex items-center justify-end gap-2">
                  <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">חינם</span>
                  <span className="text-gray-500 line-through text-xs">150₪</span>
                </div>
              </div>
            </motion.div>

          </div>

          <motion.div variants={fadeUp} className="mt-8 relative">
            <div className="absolute inset-0 bg-[#C9A96E]/10 rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-b from-white/5 to-white/0 border border-[#C9A96E]/40 rounded-3xl p-8 text-center">
              <p className="text-[#C9A96E] text-xs uppercase tracking-[3px] mb-4">הכל כלול - בלי הפתעות</p>
              <div className="flex items-center justify-center gap-3 flex-wrap mb-2">
                <span className="text-gray-600 line-through text-lg">2,794₪</span>
                <span className="text-white text-6xl font-black">197₪</span>
              </div>
              <p className="text-gray-400 text-sm">או 2 תשלומים נוחים של 98₪</p>
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

          {/* WhatsApp style */}
          <div className="space-y-5">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="flex justify-end items-end gap-2">
                <div className="relative max-w-xs sm:max-w-sm bg-[#DCF8C6] px-4 py-3 shadow-sm"
                  style={{ borderRadius: '18px 18px 4px 18px' }}>
                  <p className="text-[#1A1A1A] text-sm leading-relaxed text-right">{t.quote}</p>
                  <p className="text-gray-400 text-xs mt-1 text-left">{t.time} ✓✓</p>
                </div>
                <div className="flex flex-col items-center gap-1 flex-shrink-0 order-first">
                  <img src={t.avatar} alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#D4C5B5]" />
                  <span className="text-[10px] text-gray-400">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="text-center text-gray-500 mt-10 text-base">
            אלה הודעות אמיתיות מתלמידות.<br />
            לא פרסומת. לא המצאה. תוצאות.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── URGENCY ─── */}
      <section className="bg-[#1A1A1A] py-12 px-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1400&q=80)', backgroundSize: 'cover' }} />
        <motion.div className="relative z-10 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-white text-2xl sm:text-3xl font-bold leading-relaxed mb-4">
            הלקוחות שלך לא מחפשות עוד מקום לגבות.<br />
            הן רוצות לעשות הכל אצלך.<br /><br />
            <span className="text-[#D4C5B5]">לסמוך עלייך. להישאר אצלך.</span><br />
            לעשות ציפורניים, גבות, הכל במקום אחד.
          </p>
          <p className="text-[#D4C5B5] text-xl mt-6 font-medium">את רק צריכה לתת להן את הסיבה להישאר.</p>
        </motion.div>
      </section>

      {/* ─── MY STORY ─── */}
      <section className="bg-white py-12 px-5">
        <motion.div className="max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm uppercase tracking-wide font-semibold mb-2">הסיפור שלי</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-6">
            אני מבינה אותך.<br />כי הייתי בדיוק במקום הזה.
          </motion.h2>

          {/* PAIN */}
          <motion.div variants={fadeUp} className="text-right text-gray-700 text-lg leading-loose space-y-4 mb-8">
            <p>
              עבדתי מהבוקר עד הערב. שעות שלא רציתי לעבוד בהן.
            </p>
            <p>
              לקוחה אחרי לקוחה. ידיים עובדות בלי הפסקה.
              כאבי גב, כאבי ידיים - וזה פשוט הפך לשגרה.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="text-right text-gray-700 text-lg leading-loose space-y-2 mb-8">
            <p>ובסוף כל חודש עשיתי חשבון.</p>
            <p><span className="font-bold text-[#1A1A1A]">המספרים לא תאמו את המאמץ שהשקעתי.</span></p>
            <p>עבדתי קשה. היומן היה מלא. אבל ההכנסה נתקעה באותו מקום.</p>
          </motion.div>

          {/* SOLUTION */}
          <motion.div variants={fadeUp} className="text-right text-gray-700 text-lg leading-loose space-y-4 mb-8">
            <p>
              ואז הכנסתי עיצוב גבות לקליניקה.
            </p>
            <p>
              הורדתי שעות עבודה. מילאתי את היומן. הכפלתי הכנסה.
            </p>
            <p>
              <span className="font-bold text-[#1A1A1A]">לא עם לקוחות חדשות. עם אותן לקוחות שכבר ישבו אצלי על הכיסא.</span>
            </p>
          </motion.div>

          {/* BRIDGE */}
          <motion.div variants={fadeUp}
            className="bg-[#1A1A1A] rounded-3xl p-7 text-center">
            <p className="text-[#D4C5B5] text-lg leading-relaxed">
              בניתי את הקורס הזה כדי שאת לא תצטרכי לגלות את זה לבד.<br />
              <strong className="text-white">הדרך כבר סלולה. את רק צריכה ללכת עליה.</strong>
            </p>
          </motion.div>

          {/* Practice session photos */}
          <motion.div variants={fadeUp} className="mt-6 grid grid-cols-2 gap-3">
            {['/kurs1.jpg','/kurs2.jpg','/kurs3.jpg','/kurs4.jpg'].map((src, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden shadow-sm aspect-[3/4]">
                <img src={src} alt="שיעור עיצוב גבות"
                  className="w-full h-full object-cover object-top" />
              </div>
            ))}
          </motion.div>
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
              'את קוסמטיקאית שלא מצליחה למלא את היומן כמו שרצית',
              'את מרגישה שהיומן שלך לא שווה את המאמץ שאת משקיעה',
              'את רוצה להוסיף שירות נוסף לקליניקה - בלי לצאת להשתלמויות יקרות',
              'את מפחדת להרוס ללקוחות את הגבות ורוצה ביטחון אמיתי לפני שמתחילות',
              'ניסית ללמוד מיוטיוב ויצאת מבולבלת יותר - ורוצה שיטה אחת ברורה',
              'את מרגישה שמגיע לך יותר ורוצה להוכיח את זה לעצמך',
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
            <p className="text-gray-400 line-through text-base mb-1 text-center">שווי מוצהר: 2,197₪</p>
            <p className="text-7xl font-black text-[#1A1A1A] leading-none mb-1 text-center">197₪</p>
            <p className="text-gray-500 text-sm mb-6 text-center">או 2 תשלומים נוחים של 98₪</p>

            <form onSubmit={handlePricingSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">שם מלא</label>
                <input
                  type="text" required placeholder="הכניסי את שמך"
                  value={pricingForm.name} onChange={e => setPricingForm({ ...pricingForm, name: e.target.value })}
                  className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-right text-[#1A1A1A] focus:border-[#D4C5B5] focus:outline-none transition-colors text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">טלפון נייד</label>
                <input
                  type="tel" required placeholder="050-0000000"
                  value={pricingForm.phone} onChange={e => setPricingForm({ ...pricingForm, phone: e.target.value })}
                  className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#D4C5B5] focus:outline-none transition-colors text-base"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">כתובת מייל</label>
                <input
                  type="email" required placeholder="example@gmail.com"
                  value={pricingForm.email} onChange={e => setPricingForm({ ...pricingForm, email: e.target.value })}
                  className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#D4C5B5] focus:outline-none transition-colors text-base"
                  dir="ltr"
                />
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="mt-1 flex-shrink-0 accent-[#1A1A1A]" />
                <span className="text-xs text-gray-500 text-right leading-snug">
                  אני מאשרת קבלת עדכונים, מבצעים ותכנים שיווקיים למייל מטליה בוזורגי. ניתן לבטל בכל עת.
                </span>
              </label>
              <motion.button type="submit"
                className="w-full bg-[#1A1A1A] text-[#D4C5B5] py-4 rounded-2xl font-bold text-xl hover:bg-[#D4C5B5] hover:text-[#1A1A1A] transition-colors mt-2"
                disabled={submitting}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                {submitting ? 'שנייה...' : 'אני רוצה להצטרף ✋'}
              </motion.button>
            </form>
            <div className="mt-4 bg-[#1A1A1A]/50 border border-[#C9A96E]/20 rounded-xl px-4 py-3 text-center space-y-1">
              <p className="text-[#C9A96E] text-xs font-semibold">מה קורה אחרי התשלום?</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                תועברי לדף סליקה מאובטח. תוך דקה אחת מהרכישה יגיע למייל שלך הקורס עם שם משתמש וסיסמה אישיים.
              </p>
              <p className="text-gray-500 text-xs">ערבות החזר מלא 14 יום</p>
            </div>
          </motion.div>

          {/* Guarantee */}
          <motion.div variants={fadeUp}
            className="flex items-start gap-4 text-right bg-white/5 border border-[#D4C5B5]/20 rounded-2xl p-5">
            <span className="text-4xl flex-shrink-0">🛡️</span>
            <div>
              <p className="text-[#D4C5B5] font-bold mb-1">ערבות החזר מלא - 14 יום</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                צפית בכל החומר ולא הצלחת ליישם כלום? מחזירה לך את הכסף במלואו. בלי שאלות מיותרות.
              </p>
            </div>
          </motion.div>

          {/* Synced countdown */}
          <motion.div variants={fadeUp}
            className="mt-4 bg-white/5 border border-[#C9A96E]/30 rounded-2xl px-6 py-4 text-center">
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
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-6">
            שאלות שבטח עולות לך
          </motion.h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white border border-[#E8DDD4] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-right font-semibold text-[#1A1A1A] hover:bg-[#FAF7F4] transition-colors">
                  <span className="text-[#D4C5B5] text-2xl font-light ml-2">{openFaq === i ? '−' : '+'}</span>
                  <span className="flex-1">{f.q}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-[#E8DDD4] pt-4 text-gray-600 leading-relaxed">
                    {f.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── CTA FORM ─── */}
      <section id="cta-form" className="bg-[#1A1A1A] py-14 px-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1400&q=80)', backgroundSize: 'cover' }} />
        <motion.div className="relative z-10 max-w-md mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-white text-3xl sm:text-4xl font-extrabold text-center mb-2">
            מוכנה להתחיל?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#D4C5B5] text-center mb-6 text-lg">
            מלאי פרטים ותועברי ישירות לדף התשלום המאובטח.
          </motion.p>

          <motion.form variants={fadeUp} onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">שם מלא</label>
                <input
                  type="text" required placeholder="הכניסי את שמך"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-right text-[#1A1A1A] focus:border-[#D4C5B5] focus:outline-none transition-colors text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">טלפון נייד</label>
                <input
                  type="tel" required placeholder="050-0000000"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#D4C5B5] focus:outline-none transition-colors text-base"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">כתובת מייל</label>
                <input
                  type="email" required placeholder="example@gmail.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#D4C5B5] focus:outline-none transition-colors text-base"
                  dir="ltr"
                />
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="mt-1 flex-shrink-0 accent-[#1A1A1A]" />
                <span className="text-xs text-gray-500 text-right leading-snug">
                  אני מאשרת קבלת עדכונים, מבצעים ותכנים שיווקיים למייל מטליה בוזורגי. ניתן לבטל בכל עת.
                </span>
              </label>
              <motion.button type="submit"
                className="w-full bg-[#1A1A1A] text-[#D4C5B5] py-4 rounded-2xl font-bold text-xl hover:bg-[#D4C5B5] hover:text-[#1A1A1A] border-2 border-[#1A1A1A] transition-all duration-300"
                disabled={submitting}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                {submitting ? 'שנייה...' : 'אני רוצה להתחיל ✋'}
              </motion.button>
              <div className="bg-[#2a2a2a] border border-[#C9A96E]/20 rounded-xl px-4 py-3 text-center space-y-1">
                <p className="text-[#C9A96E] text-xs font-semibold">מה קורה אחרי התשלום?</p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  תועברי לדף סליקה מאובטח. תוך דקה אחת מהרכישה יגיע למייל שלך הקורס עם שם משתמש וסיסמה אישיים.
                </p>
                <p className="text-gray-500 text-xs">ערבות החזר מלא 14 יום. בלי סיכון.</p>
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
