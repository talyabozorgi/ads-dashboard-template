'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const PIXEL_ID = '1901161570375773';

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

const testimonials = [
  { name: 'שיר כ\'', tag: 'הגיעה בלי ניסיון', quote: 'תקשיבי את יודעת כמה פחדתי..\nהיום בזכותך הצלחתי לקבל לקוחה למיקרובליידינג!!\nאני מתרגשתתתת 😍\n\nתודה על הביטחון שנתת לי.\nבזכותך אני מצליחה וזה לא מובן באליו בכלל!!\nויצא מושלם!! 🥹', photo: 'https://randomuser.me/api/portraits/women/26.jpg' },
  { name: 'נועה ל\'', tag: 'למדה קורס קודם', quote: 'טליה יקרה ❤️\nאני חייבת להגיד לך שהכי נהנתי היום בעולם!!\nאיזה כיף ללמוד ממך, את כל כך פרפקציוניסטית ומקצועית!\n\nעשיתי בחירה טובה ואני בטוחה שזה רק ההתחלה 😊', photo: 'https://randomuser.me/api/portraits/women/83.jpg' },
  { name: 'ליאור מ\'', tag: 'הגיעה בלי ניסיון', quote: 'חייבת להגיד לך ממש תודה על הקורס.\nלימדת אותי הכל מהתחלה ולא עזבת עד שהבנתי הכל.\n\nכל אחת ששואלת אותי איפה למדתי - אני ממליצה עלייך.\nכי באמת הרגשתי שחשוב לך שאני אבין ואצא הכי טובה שיש. 🙏', photo: 'https://randomuser.me/api/portraits/women/33.jpg' },
  { name: 'רוני ג\'', tag: 'כבר עשתה קורס', quote: 'הביטחון היה חסר לי לגמרי.\nעשיתי קורס לפני - ועדיין לא העזתי לגעת בלקוחה.\n\nיצאתי מההשתלמות אצל טליה עם ידע מדויק וביטחון שלא הרגשתי מעולם.\nמרגישה שאני סוף סוף מוכנה. 💛', photo: 'https://randomuser.me/api/portraits/women/79.jpg' },
  { name: 'דנה פ\'', tag: 'הגיעה בלי ניסיון', quote: 'פחדתי להשקיע ואז לא להשתמש בזה.\nאבל טליה לימדה אותי צעד אחרי צעד ולא הרגשתי שאני לבד.\n\nכל הפחדים שהיו לי לפני הקורס - נעלמו.\nהיום אני עובדת עם לקוחות ומרוויחה יותר ממה שציפיתי. 🙌', photo: 'https://randomuser.me/api/portraits/women/76.jpg' },
  { name: 'מיכל ר\'', tag: 'כבר עשתה קורס', quote: 'ניסיתי לעבוד לבד - לא הצלחתי.\nלא הבנתי מה אני עושה לא נכון.\n\nאחרי ההשתלמות אצל טליה הבנתי בדיוק איפה טעיתי.\nמאז הכל עובד ואני סוף סוף מרגישה בטוחה. 🤍', photo: 'https://randomuser.me/api/portraits/women/55.jpg' },
];

const faqs = [
  { q: 'אני מפחדת שלא אצליח', a: 'רוב הבנות שמגיעות אליי מתחילות בדיוק עם אותו פחד.\nהביטחון לא מגיע לפני שמתחילים — הוא נבנה תוך כדי הליווי והתרגול.\nבגלל זה הקבוצות קטנות, ויש ליווי אישי צמוד עד שאת מרגישה בטוחה באמת.' },
  { q: 'אין לי יד יציבה / אני לא מציירת טוב', a: 'מיקרובליידינג ועיצוב גבות זו שיטה — לא כישרון מולד.\nאת לא צריכה לדעת לצייר כדי ללמוד.\nאני מלמדת אותך שלב אחרי שלב בצורה פשוטה וברורה.' },
  { q: 'איך אדע שאני באמת מוכנה לקבל לקוחות?', a: 'במהלך הקורס את מתרגלת בפועל על מודליסטיות — לא רק רואה הדגמות.\nאני עובדת איתך בזמן אמת, מתקנת ומלווה אותך גם אחרי הקורס — עד שאת מרגישה בטוחה להתחיל.' },
  { q: 'אני עובדת במשרה מלאה / אמא לילדים - זה מתאים לי?', a: 'כן. הרבה מהתלמידות שלי הן אמהות או נשים עובדות שרוצות מקצוע נוסף עם גמישות והכנסה טובה יותר.\nהקורס בנוי בצורה מסודרת וברורה גם למי שמגיעה בלי רקע.' },
  { q: 'כמה אפשר להרוויח בתחום?', a: 'המחירים בתחום משתנים לפי ניסיון ורמת עבודה, אבל גם בתחילת הדרך אפשר להתחיל לבנות הכנסה יפה מלקוחות פרטיות.\nהמטרה בקורס היא לא רק ללמוד טכניקה — אלא לצאת עם ביטחון להתחיל לעבוד באמת.' },
  { q: 'אם כבר למדתי במקום אחר - ההשתלמות באמת תעזור לי?', a: 'כן.\nרוב הבנות שמגיעות להשתלמות כבר עשו קורס בעבר.\nבדרך כלל הבעיה היא לא חוסר ידע — אלא חוסר ביטחון, דיוק וטכניקה נכונה.\nבהשתלמות את מקבלת עבודה מעשית, תיקונים בזמן אמת וליווי אישי שמחזיר לך ביטחון.' },
  { q: 'מה קורה אחרי הקורס? אני לבד?', a: 'ממש לא.\nאת מקבלת ליווי אישי גם אחרי הקורס — אפשר לשאול שאלות, להתייעץ ולקבל הכוונה גם בתחילת העבודה עם לקוחות.' },
  { q: 'תוך כמה זמן אפשר להתחיל לעבוד?', a: 'זה משתנה מבת לבת ותלוי בכמות התרגול וההתמדה, אבל המטרה היא שתצאי עם הכלים והביטחון להתחיל לקבל לקוחות כבר בתחילת הדרך.' },
  { q: 'אני מפחדת להשקיע כסף ואז לא להשתמש בזה', a: 'אני מבינה את הפחד הזה לגמרי.\nבגלל זה הקורס בנוי בצורה מאוד אישית ומעשית — כדי שלא תצאי רק עם ידע, אלא עם ביטחון אמיתי להשתמש בו ולעבוד איתו בפועל.' },
  { q: 'כמה בנות בכל קבוצה?', a: 'קורס בכיתה של 6-10 בנות — לא 2-3.\nזה מה שמאפשר ליווי אישי אמיתי מטליה. כל אחת מקבלת תשומת לב מלאה.' },
];

export default function VSLPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', path: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const lessonSlides = [
    { src: '/lesson-group.jpg', caption: 'ליווי בזמן אמת' },
    { src: '/lesson-hands1.jpg', caption: 'טליה מנחה ידנית' },
    { src: '/lesson-hands2.jpg', caption: 'תרגול על מודליסטית' },
    { src: '/lesson-clinic.jpg', caption: 'סביבה מקצועית' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(i => (i + 1) % lessonSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.fbq) {
      const s = document.createElement('script');
      s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`;
      document.head.appendChild(s);
    }
  }, []);

  const scrollToForm = (path?: string) => {
    if (path) setForm(f => ({ ...f, path }));
    document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.fbq?.('track', 'Lead', { content_name: 'vsl_eyebrow_micro' });
    try {
      await fetch('/api/add-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, listId: '71507', source: `vsl-micro-${form.path || 'general'}` }),
      });
    } catch {}
    setSubmitted(true);
  };

  return (
    <main dir="rtl" className="font-[Assistant,sans-serif] bg-[#FFF8F5] text-[#1A1A1A] overflow-x-hidden pb-24">

      <noscript><img height="1" width="1" style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} /></noscript>

      {/* ─── STICKY CTA ─── */}
      <motion.div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-3"
        initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2, duration: 0.4 }}>
        <button onClick={() => scrollToForm()}
          className="w-full max-w-lg mx-auto flex items-center justify-center gap-3 bg-[#C9A96E] text-white py-4 rounded-2xl font-black text-xl shadow-2xl"
          style={{ display: 'flex' }}>
          <span>אני רוצה לשמוע פרטים</span>
          <span className="text-2xl">✋</span>
        </button>
      </motion.div>

      {/* ─── HERO ─── */}
      <section className="bg-gradient-to-b from-[#FFF0E8] to-[#FFF8F5] px-5 pt-12 pb-10 text-center">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="text-[#C9A96E] text-sm font-bold uppercase tracking-widest mb-4">
            אקדמיית טליה בוזורגי - עיצוב גבות ומיקרובליידינג
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-3xl sm:text-5xl font-extrabold leading-tight mb-5 text-[#1A1A1A]">
            את מתלבטת איפה ללמוד?<br />
            <span className="text-[#C9A96E]">או שכבר למדת - ועדיין חסר לך ביטחון?</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto">
            יש לי מסלול בשביל שתיכן.<br />
            קורס לאלה שמתחילות. השתלמות לאלה שכבר למדו.
          </motion.p>

        </motion.div>
      </section>

      {/* ─── PROBLEM A ─── */}
      <section className="bg-white py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="inline-block bg-[#C9A96E] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            את שמעוניינת להתחיל
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold mb-6 leading-tight">
            רוצה להיכנס לתחום הגבות?<br />
            <span className="text-[#C9A96E]">השאלה היא איפה כדאי לך ללמוד.</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="text-gray-700 text-lg leading-loose space-y-3 mb-8">
            <p>יש הרבה קורסים בחוץ.</p>
            <p>חלקם ממלאים אותך בתיאוריה ומשחררים אותך בלי ליווי אישי.</p>
            <p>ואז את יושבת עם הידע בראש - <strong className="text-[#1A1A1A]">ולא מעיזה לגעת בלקוחה מהפחד לעשות טעויות.</strong></p>
          </motion.div>
          <motion.div variants={stagger} className="space-y-3">
            {[
              { icon: '✅', text: 'קבוצה של 2-3 בנות בלבד - פרטני וסופר אישי' },
              { icon: '✅', text: 'ערכה מלאה כולל פיגמנטים - לא צריך לקנות כלום' },
              { icon: '✅', text: '2 תרגולים מלאים על מודליסטית במהלך הקורס' },
              { icon: '✅', text: 'ליווי אישי גם אחרי הקורס - מטליה בעצמה' },
            ].map((t, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-center gap-4 bg-[#FFF8F5] border border-[#F0E8E4] rounded-2xl px-5 py-4">
                <span className="text-xl flex-shrink-0">{t.icon}</span>
                <span className="font-semibold text-[#1A1A1A]">{t.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── PROBLEM B ─── */}
      <section className="bg-[#1A1A1A] py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="inline-block bg-white/10 text-[#D4C5B5] text-xs font-bold px-3 py-1 rounded-full mb-4">
            את שכבר למדה
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold mb-6 leading-tight text-white">
            למדת קורס. יש לך ידע.<br />
            <span className="text-[#C9A96E]">אז למה את עדיין מפחדת לקבל לקוחות??</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="text-gray-300 text-lg leading-loose space-y-3 mb-8">
            <p>כי ידע בלי ביטחון - זה לא מספיק.</p>
            <p>מה שחסר לך זה לא עוד שיעור תיאורטי.</p>
            <p>מה שחסר לך זה <strong className="text-white">לעשות את זה בפועל, עם ליווי של מישהי שרואה אותך.</strong></p>
          </motion.div>

          <motion.div variants={fadeUp}
            className="bg-white/5 border border-[#C9A96E]/30 rounded-3xl p-6 mb-6 text-right">
            <p className="text-[#C9A96E] font-bold mb-3 text-sm uppercase tracking-wide">יום השתלמות מיקרובליידינג - 6 שעות</p>
            <div className="text-gray-300 text-base leading-loose space-y-3">
              <p>סקיצה בטכניקת 3/3 — ב-2 דקות עבודה יש לך סקיצה מדויקת.</p>
              <p>טליה מדגימה על מודליסטית, ואת מבצעת על מודליסטית שלך — תוך כדי היא מתקנת אותך בזמן אמת.</p>
              <p>יוצאת עם ביטחון אמיתי לקבל לקוחות ולהתחיל להרוויח.</p>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* ─── INSIDE THE COURSE ─── */}
      <section className="bg-[#FFF8F5] py-12 px-5">
        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#C9A96E] text-sm font-bold uppercase tracking-widest mb-2">רגע מתוך השיעור</motion.p>
          <motion.h2 variants={fadeUp} className="text-center text-2xl sm:text-3xl font-extrabold mb-3">
            ככה נראה השיעור אצלי
          </motion.h2>
          <motion.p variants={fadeUp} className="text-center text-gray-500 text-lg mb-8 max-w-xl mx-auto">
            תרגול אמיתי, ליווי צמוד, ותשומת לב מלאה לכל תלמידה.
          </motion.p>

          {/* Auto slider */}
          <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden shadow-xl mb-4 max-w-sm mx-auto" style={{ aspectRatio: '3/4' }}>
            {lessonSlides.map((slide, i) => (
              <div key={i} className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: i === slideIndex ? 1 : 0 }}>
                <img src={slide.src} alt={slide.caption}
                  className="w-full h-full object-cover object-center" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent py-4 px-5">
                  <p className="text-white font-bold text-sm text-center">{slide.caption}</p>
                </div>
              </div>
            ))}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
              {lessonSlides.map((_, i) => (
                <button key={i} onClick={() => setSlideIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === slideIndex ? 'bg-white w-5' : 'bg-white/50'}`} />
              ))}
            </div>
          </motion.div>

          {/* Kit card */}
          <motion.div variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-5 bg-white rounded-3xl p-5 shadow-sm border border-[#F0E8E4]">
            <img src="/lesson-kit.jpg" alt="ערכת קורס מיקרובליידינג"
              className="w-full sm:w-48 rounded-2xl object-cover" />
            <div className="text-right">
              <p className="font-extrabold text-lg mb-2">הערכה שמקבלת כל תלמידה</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                ערכה מלאה מחכה לך ביום הקורס.<br />
                ציוד מקצועי, חוברת לימוד, פיגמנטים - הכל כלול.<br />
                לא צריך לקנות כלום בנפרד.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── AUTHORITY ─── */}
      <section className="bg-white py-12 px-5">
        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <motion.div variants={fadeUp} className="flex-shrink-0 relative">
              <div className="absolute inset-0 rounded-full bg-[#C9A96E]/20 blur-2xl scale-110" />
              <div className="relative w-52 h-52 rounded-full border-4 border-[#C9A96E] shadow-2xl overflow-hidden">
                <img src="/talya-pro.jpg" alt="טליה בוזורגי"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', transform: 'scale(1.6)', transformOrigin: 'center 20%' }} />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="text-right flex-1">
              <p className="text-[#C9A96E] font-semibold text-sm uppercase tracking-wide mb-1">המורה שלך</p>
              <h2 className="text-3xl font-extrabold mb-1">היי, אני טליה.</h2>
              <p className="text-[#C9A96E] font-semibold mb-5">מומחית עיצוב גבות ומיקרובליידינג | 8 שנות ניסיון</p>
              <div className="text-gray-700 text-lg leading-loose space-y-3">
                <p>לומדות אצלי ויוצאות עם <strong className="text-[#1A1A1A]">ידע מדויק ו-100% ביטחון</strong> - לא רק תיאוריה.</p>
                <p>אני לא מאמינה בלזרוק תלמידות לעולם אחרי יומיים.</p>
                <p className="font-semibold text-[#1A1A1A]">המטרה שלי היא לא רק שתדעי לעשות גבות - אלא שתהיי מסוגלת לקבל לקוחה אמיתית בלי פחד.</p>
                <p className="font-semibold text-[#1A1A1A]">הקורסים שלי בנויים על ליווי אישי ופרטני.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── FUTURE VISION ─── */}
      <section className="bg-gradient-to-b from-[#FFF0E8] to-[#FFF8F5] py-12 px-5">
        <motion.div className="max-w-2xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-[#C9A96E] text-sm font-bold uppercase tracking-widest mb-3">אחרי הקורס</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-extrabold mb-8">
            איך החיים נראים אחרי?
          </motion.h2>
          <motion.div variants={stagger} className="grid grid-cols-2 gap-4 text-right">
            {[
              { icon: '💛', text: 'לקוחות קבועות שחוזרות — בלי לרדוף אחריהן' },
              { icon: '🏠', text: 'לעבוד פחות שעות ולהרוויח יותר' },
              { icon: '✨', text: 'טיפול פרימיום — שמתוגמל בהתאם' },
              { icon: '📈', text: 'המקצוע הכי רווחי בתחום הביוטי' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="bg-white rounded-2xl px-5 py-5 shadow-sm border border-[#F0E8E4] flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-semibold text-[#1A1A1A] text-sm leading-snug">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── RESULTS GALLERY ─── */}
      <section className="bg-[#FFF8F5] py-10 px-5">
        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#C9A96E] text-sm uppercase tracking-widest font-bold mb-2">תוצאות מהקורסים</motion.p>
          <motion.h3 variants={fadeUp} className="text-center text-2xl font-bold mb-6">עבודות של בנות אחרי הלמידה</motion.h3>
          <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {['/micro1.jpg','/micro2.jpg','/micro3.jpg','/micro4.jpg','/micro5.jpg','/micro7.jpg'].map((src, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative rounded-2xl overflow-hidden shadow-md"
                whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <img src={src} alt="לפני ואחרי מיקרובליידינג" className="w-full h-auto object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── WHO IT'S FOR / NOT FOR ─── */}
      <section className="bg-white py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-2xl font-extrabold text-center mb-8">
            הקורס הזה מתאים לך?
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <motion.div variants={fadeUp} className="bg-[#FFF8F5] border border-[#F0E8E4] rounded-3xl p-6">
              <p className="font-bold text-gray-400 text-sm mb-4 uppercase tracking-wide">פחות מתאים למי ש...</p>
              <div className="space-y-3">
                {[
                  'מחפשת רק "תעודה" בלי לתרגל',
                  'לא מוכנה להשקיע ולהתאמן',
                  'רוצה קורס המוני בלי יחס אישי',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-gray-300 font-bold text-lg mt-0.5">✗</span>
                    <span className="text-gray-500 text-sm leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-[#FFF0E8] border-2 border-[#C9A96E]/30 rounded-3xl p-6">
              <p className="font-bold text-[#C9A96E] text-sm mb-4 uppercase tracking-wide">כן מתאים למי ש...</p>
              <div className="space-y-3">
                {[
                  'רוצה מקצוע רווחי שמשלב אהבה לתחום הביוטי',
                  'רוצה ביטחון אמיתי לעבוד עם לקוחות',
                  'מחפשת ליווי אישי ולא להרגיש "עוד תלמידה"',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#C9A96E] font-bold text-lg mt-0.5">✓</span>
                    <span className="text-[#1A1A1A] font-semibold text-sm leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="bg-[#FFF8F5] py-12 px-5">
        <motion.div className="max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#C9A96E] text-sm uppercase tracking-wide font-bold mb-2">מה אומרות הבוגרות</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-center mb-8">מהן ממש כמוך לפני הקורס</motion.h2>
          <div className="space-y-5">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="flex justify-end items-start gap-3">
                <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-1">
                  <img src={t.photo} alt={t.name}
                    className="w-10 h-10 rounded-full border-2 border-[#C9A96E] object-cover" />
                  <span className="text-[10px] text-gray-400">{t.name}</span>
                </div>
                <div>
                  <div className="relative max-w-xs sm:max-w-sm bg-[#DCF8C6] px-4 py-3 shadow-sm mb-1"
                    style={{ borderRadius: '18px 18px 18px 4px' }}>
                    <p className="text-[#1A1A1A] text-sm leading-relaxed text-right whitespace-pre-line">{t.quote}</p>
                    <p className="text-gray-400 text-xs mt-1 text-left">✓✓</p>
                  </div>
                  <span className="text-[10px] font-semibold bg-[#FFF0E8] text-[#C9A96E] px-2 py-0.5 rounded-full ml-1">{t.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── VIDEO TESTIMONIAL ─── */}
      <section className="bg-white py-10 px-5">
        <motion.div className="max-w-lg mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#C9A96E] text-sm font-bold uppercase tracking-widest mb-2">עדות בוידאו</motion.p>
          <motion.h3 variants={fadeUp} className="text-center text-xl font-extrabold mb-6 text-[#1A1A1A]">שמעי ישירות מתלמידה</motion.h3>
          <motion.div variants={fadeUp} className="rounded-3xl overflow-hidden shadow-xl bg-[#1A1A1A]">
            <video
              src="/testimonial-micro.mp4"
              controls
              playsInline
              className="w-full h-auto"
              style={{ maxHeight: '70vh' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── CERTIFICATE ─── */}
      <section className="bg-white py-10 px-5">
        <motion.div className="max-w-md mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-[#C9A96E] text-sm font-bold uppercase tracking-wide mb-2">בסיום הקורס</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl font-extrabold mb-5">תעודה מקצועית רשמית</motion.h2>
          <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden shadow-xl border border-[#F0E8E4]">
            <img src="/cert-micro.png" alt="תעודת סיום מיקרובליידינג" className="w-full h-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── URGENCY ─── */}
      <section className="bg-[#1A1A1A] py-8 px-5">
        <motion.div className="max-w-lg mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-[#C9A96E] text-sm font-bold uppercase tracking-widest mb-3">שימי לב</motion.p>
          <motion.h3 variants={fadeUp} className="text-white text-xl font-extrabold mb-3">
            בגלל שהקבוצות קטנות - יש רק 2-3 מקומות בכל מחזור.
          </motion.h3>
          <motion.p variants={fadeUp} className="text-gray-400 text-base">
            כשהמקומות מתמלאים - הקורס הבא רק בחודש הבא.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── LEAD FORM ─── */}
      <section id="cta-form" className="bg-gradient-to-b from-[#2a1a00] to-[#1A1A1A] py-14 px-5">
        <motion.div className="max-w-md mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-white text-3xl font-extrabold text-center mb-2">
            השאירי פרטים
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-center mb-8 text-lg">
            אחזור אליך תוך 24 שעות, נדבר על מה שמתאים לך - בלי התחייבות.
          </motion.p>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-10 text-center">
              <p className="text-5xl mb-4">🙏</p>
              <p className="text-2xl font-extrabold text-[#1A1A1A] mb-2">קיבלתי!</p>
              <p className="text-gray-600 mb-1">אחזור אליך תוך 24 שעות.</p>
              <p className="text-[#C9A96E] font-bold mt-4 text-lg">מאמינה בך, טליה ✨</p>
            </motion.div>
          ) : (
            <motion.form variants={fadeUp} onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 shadow-2xl space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-2 text-right">מה מתאים לי?</label>
                <div className="grid grid-cols-2 gap-2">
                  {[{ val: 'new', label: 'עדיין לא למדתי' }, { val: 'advanced', label: 'כבר למדתי' }].map(opt => (
                    <button key={opt.val} type="button"
                      onClick={() => setForm(f => ({ ...f, path: opt.val }))}
                      className={`py-3 rounded-xl text-sm font-bold border-2 transition-colors ${form.path === opt.val ? 'bg-[#C9A96E] text-white border-[#C9A96E]' : 'bg-white text-gray-600 border-[#E8DDD4] hover:border-[#C9A96E]'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">שם מלא</label>
                <input type="text" required placeholder="הכניסי את שמך"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-right text-[#1A1A1A] focus:border-[#C9A96E] focus:outline-none text-base" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">טלפון נייד</label>
                <input type="tel" required placeholder="050-0000000"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#C9A96E] focus:outline-none text-base" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">אימייל</label>
                <input type="email" required placeholder="your@email.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#C9A96E] focus:outline-none text-base" dir="ltr" />
              </div>
              <motion.button type="submit"
                className="w-full bg-[#C9A96E] text-white py-4 rounded-2xl font-black text-xl hover:bg-[#B8956A] transition-colors"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                אני רוצה לשמוע פרטים ✋
              </motion.button>
              <p className="text-gray-400 text-xs text-center">בלי התחייבות. אחזור אליך עם כל הפרטים.</p>
            </motion.form>
          )}
        </motion.div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-[#FFF8F5] py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-2xl font-bold text-center mb-6">שאלות שעולות לי</motion.h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white border border-[#F0E8E4] rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-right font-semibold text-[#1A1A1A] hover:bg-[#FFF8F5] transition-colors">
                  <span className="text-[#C9A96E] text-2xl font-light ml-2">{openFaq === i ? '−' : '+'}</span>
                  <span className="flex-1">{f.q}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-[#F0E8E4] pt-4 text-gray-600 leading-relaxed whitespace-pre-line">{f.a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── FINAL ─── */}
      <section className="bg-[#C9A96E] py-12 px-5 text-center">
        <motion.div className="max-w-lg mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-white text-3xl font-extrabold mb-2">
            מגיע לך ללמוד במקום שרואה אותך.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/80 mb-4">לא קורס המוני. ביטחון אמיתי.</motion.p>
          <motion.p variants={fadeUp} className="text-white/70 text-sm">מאמינה בך, טליה ✨</motion.p>
        </motion.div>
      </section>

      {/* ─── SECOND FORM ─── */}
      <section className="bg-[#FFF8F5] py-14 px-5">
        <motion.div className="max-w-md mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#C9A96E] text-sm font-bold uppercase tracking-widest mb-2">עדיין כאן?</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl font-extrabold text-center mb-2 text-[#1A1A1A]">
            השאירי פרטים ואחזור אליך
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-center mb-8">
            נדבר על מה שמתאים לך — בלי התחייבות.
          </motion.p>
          <motion.form variants={fadeUp} onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-lg space-y-4 border border-[#F0E8E4]">
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2 text-right">מה מתאים לי?</label>
              <div className="grid grid-cols-2 gap-2">
                {[{ val: 'new', label: 'עדיין לא למדתי' }, { val: 'advanced', label: 'כבר למדתי' }].map(opt => (
                  <button key={opt.val} type="button"
                    onClick={() => setForm(f => ({ ...f, path: opt.val }))}
                    className={`py-3 rounded-xl text-sm font-bold border-2 transition-colors ${form.path === opt.val ? 'bg-[#C9A96E] text-white border-[#C9A96E]' : 'bg-white text-gray-600 border-[#E8DDD4] hover:border-[#C9A96E]'}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">שם מלא</label>
              <input type="text" required placeholder="הכניסי את שמך"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-right text-[#1A1A1A] focus:border-[#C9A96E] focus:outline-none text-base" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">טלפון נייד</label>
              <input type="tel" required placeholder="050-0000000"
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#C9A96E] focus:outline-none text-base" dir="ltr" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-1 text-right">אימייל</label>
              <input type="email" required placeholder="your@email.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#C9A96E] focus:outline-none text-base" dir="ltr" />
            </div>
            <motion.button type="submit"
              className="w-full bg-[#C9A96E] text-white py-4 rounded-2xl font-black text-xl hover:bg-[#B8956A] transition-colors"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              אני רוצה לשמוע פרטים ✋
            </motion.button>
            <p className="text-gray-400 text-xs text-center">מאמינה בך, טליה ✨</p>
          </motion.form>
        </motion.div>
      </section>

    </main>
  );
}
