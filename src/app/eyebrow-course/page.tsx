'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

const PIXEL_ID = '1901161570375773';
const BASE_PURCHASE_URL = 'https://secure.cardcom.solutions/EA/EA5/00YPdJyAU2CAAMHVtWd7A/PaymentSP';
const WHATSAPP_NUMBER = '972509368887';

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; _fbq: unknown; }
}

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
      setTime({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function track(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, params);
  }
}

const bonuses = [
  { img: '/brow3.jpg', name: 'הדרכת צביעת גבות', desc: 'שיטה פשוטה להוסיף 5 דקות ועוד 30-50 שקל לכל תור', val: '297₪' },
  { img: '/brow4.jpg', name: 'פרסום ושיווק באינסטגרם', desc: 'איך לצלם ולפרסם גבות שמשכנעות לקוחות לבוא', val: '150₪' },
  { img: '/brow5.jpg', name: 'חוברת PDF מלאה', desc: 'כל הידע מסודר להדפסה - לצד שולחן העבודה שלך', val: '150₪' },
];

const testimonials = [
  { quote: 'את פשוט אלוהית!! הייתי מפחדת לגעת בגבות ועכשיו לקוחות באות אליי ספציפית בגלל זה', time: '21:14', name: 'מאיה' },
  { quote: 'עשיתי את הקורס ביום שישי ובשבת כבר עשיתי גבות ל-3 לקוחות. לא מאמינה בעצמי', time: '19:42', name: 'שני' },
  { quote: 'הכפלתי את המחיר של הטיפול ואף לקוחה לא התלוננת. הן פשוט אומרות יופי', time: '22:08', name: 'רחל' },
  { quote: 'היומן שלי מלא שבועות קדימה. כל זה בגלל הגבות שלמדתי אצלך', time: '20:33', name: 'גלית' },
  { quote: 'נמאס לי שקורסים לא נותנים ביטחון. אצל טליה יצאתי מוכנה לגמרי', time: '23:01', name: 'יעל' },
  { quote: 'מה שחסר לי כל השנים זה בדיוק השיטה הזאת. פשוטה, מהירה, ומנצחת', time: '18:55', name: 'דנה' },
];

const faqs = [
  { q: 'כמה זמן לוקח טיפול אחרי הקורס?', a: 'עם שיטת הקוויק - 15 דקות לעיצוב מושלם. תוך שבוע-שבועיים של תרגול תגיעי לזמן הזה.' },
  { q: 'האם צריך ניסיון קודם?', a: 'לא. הקורס מתחיל מאפס ומלמד הכל מהבסיס. מתאים גם למי שלא נגעה בגבה בחיים.' },
  { q: 'מתי יגיע הקורס?', a: 'תוך דקה אחת מהרכישה יגיע למייל שלך עם שם משתמש וסיסמה אישיים.' },
  { q: 'האם הגישה פגה?', a: 'לא. הקורס זמין לצמיתות, בלי הגבלת זמן. חוזרים כמה פעמים שרוצים.' },
  { q: 'האם יש החזר כספי?', a: 'כן! ערובה של 14 יום - אם צפית בכל החומר ולא הצלחת ליישם, מחזירים לך את הכסף ללא שאלות.' },
  { q: 'כמה מהר הקורס מחזיר את עצמו?', a: 'טיפול עיצוב גבות מוסיף 80-120₪ ללקוחה. אחרי 2-3 טיפולים בלבד - הקורס כיסה את עצמו. כל השאר? רווח טהור.' },
];

// ─── EXIT INTENT POPUP ───
function ExitPopup({ onClose }: { onClose: () => void }) {
  const scrollToForm = () => { onClose(); setTimeout(() => document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' }), 300); };
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        className="relative bg-white rounded-3xl p-8 max-w-sm w-full text-right shadow-2xl z-10"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
      >
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 text-2xl font-light">×</button>
        <div className="text-4xl mb-3 text-center">⏸️</div>
        <h3 className="text-2xl font-extrabold text-[#1A1A1A] mb-2 text-center">רגע לפני שעוזבת!</h3>
        <p className="text-[#5C4A3A] text-base leading-relaxed mb-4 text-center">
          הלקוחות שלך כבר הולכות למקום אחר לגבות.<br />
          <strong className="text-[#C49A8A]">כל חודש שמחכה = 1,400₪ שנשארים בכיס של מישהי אחרת.</strong>
        </p>
        <button onClick={scrollToForm}
          className="w-full bg-[#C49A8A] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#B5897A] transition-colors mb-3">
          אני נשארת ורוכשת עכשיו
        </button>
        <button onClick={onClose} className="w-full text-gray-400 text-sm py-2 hover:text-gray-600">לא, אני אפספס את ההזדמנות</button>
      </motion.div>
    </motion.div>
  );
}

// ─── SOCIAL PROOF NOTIFICATION ───
const recentBuyers = ['שירה מתל אביב', 'מיכל מחיפה', 'רונית מירושלים', 'גלית מבאר שבע', 'נועה מרמת גן', 'דנה מנתניה', 'יעל מרחובות'];

function SocialProofNotification() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = (delay: number) => {
      timeout = setTimeout(() => {
        setName(recentBuyers[index % recentBuyers.length]);
        setIndex(i => i + 1);
        setVisible(true);
        setTimeout(() => setVisible(false), 3500 + Math.random() * 1000);
        schedule(18000 + Math.random() * 22000);
      }, delay);
    };
    schedule(7000 + Math.random() * 6000);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-24 right-4 z-40 bg-white border border-[#E8DDD4] rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 max-w-xs"
          initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}
        >
          <div className="w-10 h-10 rounded-full bg-[#C49A8A] flex items-center justify-center text-white font-bold flex-shrink-0">
            {name[0]}
          </div>
          <div className="text-right">
            <p className="text-[#1A1A1A] font-semibold text-sm">{name}</p>
            <p className="text-[#8B7355] text-xs">הצטרפה לקורס לפני מספר דקות ✓</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function EyebrowCoursePage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [pricingForm, setPricingForm] = useState({ name: '', email: '', phone: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const exitShown = useRef(false);
  const countdown = useCountdown();
  const utmRef = useRef('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
    const parts: string[] = [];
    keys.forEach(k => { const v = params.get(k); if (v) parts.push(`${k}=${encodeURIComponent(v)}`); });
    utmRef.current = parts.join('&');
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitShown.current) {
        exitShown.current = true;
        setTimeout(() => setShowExitPopup(true), 300);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  useEffect(() => {
    const fired = new Set<string>();
    const onScroll = () => {
      const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (pct >= 25 && !fired.has('25')) { fired.add('25'); track('ScrollDepth25'); }
      if (pct >= 50 && !fired.has('50')) { fired.add('50'); track('ScrollDepth50'); }
      if (pct >= 75 && !fired.has('75')) { fired.add('75'); track('ScrollDepth75'); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToForm = () => document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' });

  function getPurchaseUrl() {
    return utmRef.current ? `${BASE_PURCHASE_URL}?${utmRef.current}` : BASE_PURCHASE_URL;
  }

  const handleSubmit = async (e: React.FormEvent, isHero = false) => {
    e.preventDefault();
    setLoading(true);
    const data = isHero ? form : pricingForm;
    track('Lead', { content_name: 'eyebrow_course', currency: 'ILS', value: 197 });
    track('InitiateCheckout', { content_name: 'eyebrow_course', currency: 'ILS', value: 197 });
    const params = new URLSearchParams(window.location.search);
    localStorage.setItem('pending_buyer', JSON.stringify({
      ...data,
      utm_source: params.get('utm_source') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
    }));
    try {
      await fetch('/api/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, utm_source: params.get('utm_source') || '', utm_campaign: params.get('utm_campaign') || '' }),
      });
    } catch {}
    window.location.href = getPurchaseUrl();
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <main dir="rtl" className="font-[Assistant,sans-serif] bg-[#FDFAF7] text-[#1A1A1A] overflow-x-hidden pb-24">

      <Script id="clarity" strategy="afterInteractive">{`
        (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window,document,"clarity","script","wol6ha22ge");
      `}</Script>

      <Script id="fb-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${PIXEL_ID}');fbq('track','PageView');
      `}</Script>

      <AnimatePresence>
        {showExitPopup && <ExitPopup onClose={() => setShowExitPopup(false)} />}
      </AnimatePresence>

      <SocialProofNotification />

      {/* WhatsApp Float */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('היי טליה, ראיתי את הקורס עיצוב גבות ויש לי שאלה')}`}
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-20 left-4 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
        onClick={() => track('WhatsAppClick')}
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.543 4.063 1.494 5.776L0 24l6.389-1.676A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.375l-.36-.213-3.716.975.993-3.62-.235-.372A9.818 9.818 0 1112 21.818z"/>
        </svg>
      </a>

      {/* ─── URGENT TOP BAR ─── */}
      <div className="bg-[#FDF5F0] border-b border-[#E8DDD4] text-[#C49A8A] text-center py-2 px-4 text-sm font-bold">
        ⏱️ מחיר השקה נגמר בעוד: {pad(countdown.m)}:{pad(countdown.s)}, אחרי זה המחיר עולה ל-397₪
      </div>

      {/* ─── STICKY CTA ─── */}
      <motion.div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-3 bg-white/95 backdrop-blur border-t border-[#E8DDD4]"
        initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5, duration: 0.4 }}>
        <button onClick={scrollToForm}
          className="w-full max-w-lg mx-auto flex items-center justify-center gap-3 bg-[#C49A8A] text-white py-4 rounded-2xl font-black text-xl shadow-xl hover:bg-[#B5897A] transition-colors"
          style={{ display: 'flex' }}>
          <span>אני רוצה להרוויח יותר מכל לקוחה ✋</span>
        </button>
      </motion.div>

      {/* ─── HERO ─── */}
      <section className="min-h-[85vh] bg-gradient-to-b from-[#EFE5DC] via-[#F5EDE5] to-[#FDFAF7] flex flex-col items-center justify-center px-5 pb-10 pt-0 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/talya-pro.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top', opacity: 0.07 }} />

        <motion.div className="relative z-10 max-w-3xl mt-6" initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="text-[#8B7355] text-sm font-semibold uppercase tracking-widest mb-3">
            427 קוסמטיקאיות ומניקוריסטיות כבר למדו את השיטה
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-[#1A1A1A] text-3xl sm:text-5xl font-extrabold leading-tight mb-5">
            קוסמטיקאית, מניקוריסטית או מאפרת?
            <br />
            <span className="text-[#C49A8A]">הוסיפי 2,500-4,000 ₪ לרווח הנקי </span>
            בכל חודש
            <span className="underline underline-offset-4 decoration-[#C49A8A] whitespace-nowrap"> בלי אף לקוחה חדשה</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[#5C4A3A] text-lg mb-6 leading-relaxed">
            הנוסחה המהירה להפיכת הלקוחות שכבר יושבות אצלך
            <br />
            <span className="font-semibold text-[#1A1A1A]">למנוי חודשי קבוע לעיצוב ושיקום גבות – מהבית, בקורס דיגיטלי קצר.</span>
          </motion.p>

          <motion.div variants={fadeUp} className="inline-flex flex-col items-center gap-2 bg-white border-2 border-[#C49A8A]/40 rounded-2xl px-8 py-4 mb-6 shadow-md">
            <p className="text-[#8B7355] text-xs tracking-widest uppercase font-semibold">מחיר השקה: 197₪ במקום 397₪, נגמר בעוד</p>
            <div className="flex gap-4 items-center">
              {[{ v: countdown.s, l: 'שניות' }, { v: countdown.m, l: 'דקות' }].map((u, i) => (
                <div key={i} className="flex gap-4 items-center">
                  {i > 0 && <span className="text-[#C49A8A] text-2xl font-bold -mt-3">:</span>}
                  <div className="text-center">
                    <span className="block text-4xl font-black text-[#C49A8A]">{pad(u.v)}</span>
                    <span className="text-[10px] text-[#8B7355] tracking-wider">{u.l}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero form */}
          <motion.form variants={fadeUp} onSubmit={e => handleSubmit(e, true)}
            className="bg-white rounded-3xl p-6 shadow-xl border border-[#E8DDD4] max-w-md mx-auto space-y-3">
            <p className="font-bold text-[#1A1A1A] text-lg mb-1">מלאי פרטים ותתחילי עכשיו</p>
            <input type="text" required placeholder="שם מלא" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-right focus:border-[#C49A8A] focus:outline-none text-base" />
            <input type="email" required placeholder="כתובת מייל" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 focus:border-[#C49A8A] focus:outline-none text-base" dir="ltr" />
            <button type="submit" disabled={loading}
              className="w-full bg-[#C49A8A] text-white py-4 rounded-2xl font-bold text-xl hover:bg-[#B5897A] transition-colors disabled:opacity-60">
              {loading ? 'מעבירה לתשלום...' : 'אני רוצה להצטרף לקורס →'}
            </button>
            <p className="text-xs text-gray-400 text-center">🔒 תשלום מאובטח | גישה מיידית | ערובה 14 יום</p>
          </motion.form>
        </motion.div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="bg-white border-b border-[#E8DDD4] py-6 px-5">
        <motion.div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-5"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            { icon: '👩‍🎓', value: '427', label: 'תלמידות בוגרות' },
            { icon: '⭐', value: '4.9 / 5', label: 'דירוג ממוצע' },
            { icon: '🛡️', value: 'ערובה 14 יום', label: 'לא מרוצה? מחזירים' },
            { icon: '🔒', value: 'תשלום מאובטח', label: 'גישה מיידית לצמיתות' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="flex items-center gap-2">
              <span className="text-2xl">{item.icon}</span>
              <div className="text-center">
                <p className="font-black text-[#1A1A1A] text-base leading-none">{item.value}</p>
                <p className="text-[#8B7355] text-xs mt-0.5">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="bg-[#FDFAF7] py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] font-semibold mb-2 tracking-wide uppercase text-sm">הבעיה האמיתית</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-center mb-6">
            השקר של עולם הביוטי: "כדי להרוויח יותר, את חייבת עוד לקוחות ועוד שעות על הרגליים"
          </motion.h2>
          <motion.div variants={fadeUp} className="text-center leading-loose space-y-4 text-[#5C4A3A] text-lg px-2">
            <p className="font-bold text-[#1A1A1A]">בואי נודה באמת. את קורעת את הגב.</p>
            <p>את יושבת שעות על גבי שעות מעל הציפורניים של הלקוחות, או נושמת חומרים ומעסה פנים מהבוקר עד הלילה. את מרגישה שהגעת לתקרת זכוכית ושאת לא יכולה להכניס יותר כסף מהזמן הנוכחי שלך.</p>
            <p className="font-bold text-[#1A1A1A]">המחשבה האוטומטית שלך היא: "אני צריכה עוד לקוחות חדשות". אבל זו טעות שמביאה אותך לשחיקה ולא לעושר.</p>
            <p className="text-[#8B7355]">בשביל להרוויח עוד כמה אלפי שקלים נקיים בחודש, את לא צריכה לרוץ אחרי לקוחות חדשות באינסטגרם או להוציא כסף על שיווק ממומן. את פשוט צריכה להציע שירות משלים ומהיר ללקוחות שכבר יושבות אצלך על הכיסא.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── AGITATE ─── */}
      <section className="bg-[#F5EDE5] py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">המנגנון הסודי</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-8 text-[#1A1A1A]">
            למה דווקא עיצוב גבות?
          </motion.h2>
          <motion.div variants={stagger} className="space-y-4 mb-8">
            {[
              { icon: '💰', title: 'חומרים בגרושים', desc: 'עלות החומרים לטיפול (קצת שעווה, חוט או צבע) היא פחות מ-3 שקלים ללקוחה. המשמעות: 98% מהכסף הולך ישר אלייך לכיס.' },
              { icon: '⚡', title: 'אפס זמן מבוזבז', desc: 'זה לוקח לך בסך הכל עוד 15-20 דקות בזמן שהלקוחה כבר אצלך בקליניקה. לא עוד תור, לא עוד נסיעה.' },
              { icon: '🔄', title: 'תדר חזרה של שעון שוויצרי', desc: 'לקוחה לא יכולה להזניח את הגבות שלה. היא תחזור אלייך מדי 3-4 שבועות כמו שעון, בלי שתצטרכי לשלוח אפילו הודעה אחת.' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm border border-[#E8DDD4]">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div className="text-right flex-1">
                  <h3 className="font-bold text-[#1A1A1A] text-lg mb-1">{item.title}</h3>
                  <p className="text-[#5C4A3A] text-base leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="text-center text-[#5C4A3A] text-lg leading-loose px-2">
            <p>אז במקום שהיא תעשה אצלך לק או טיפול פנים, ואז תלך למעצבת גבות אחרת ותשאיר אצלה את הכסף... <strong className="text-[#1A1A1A]">הגיע הזמן שהיא תעשה את הכל במקום אחד, אצלך.</strong></p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── MECHANISM ─── */}
      <section className="bg-white py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">קבלי גישה מיידית</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-8">
            הקורס הדיגיטלי הפרקטי לעיצוב, פיסול ושיקום גבות
          </motion.h2>
          <motion.div variants={fadeUp} className="text-center text-[#5C4A3A] text-lg leading-loose space-y-4 px-2 mb-10">
            <p>המדריך המלא שלוקח אותך מאפס ניסיון למקצוענית גבות שיודעת לייצר כסף מכל פגישה.</p>
            <p>שרטוט נכון, התאמה למבנה הפנים, עבודה נקייה עם שעווה, פינצטה וצבע – לצד הכלים השיווקיים שיגרמו ללקוחות שלך לבקש את השירות הזה בעצמן. <strong className="text-[#1A1A1A]">הכל מוקלט שלב אחר שלב, עם גישה פתוחה לכל החיים.</strong></p>
          </motion.div>
          <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 border-t border-[#E8DDD4] pt-8">
            {[{ n: '10', l: 'שיעורי וידאו' }, { n: '+70-90₪', l: 'לכל טיפול' }, { n: "15 דק'", l: 'לגבה מושלמת' }, { n: '427', l: 'תלמידות' }].map((s, i) => (
              <div key={i} className="text-center py-4 px-2">
                <p className="text-3xl font-black text-[#C49A8A]">{s.n}</p>
                <p className="text-[#5C4A3A] text-xs mt-1 leading-tight">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="bg-[#F8F0EB] py-8 px-5">
        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm uppercase tracking-widest font-semibold mb-2">התוצאות מדברות בעד עצמן</motion.p>
          <motion.h3 variants={fadeUp} className="text-center text-2xl font-bold mb-5">דוגמאות עיצוב גבות</motion.h3>
          <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {['/brow1.jpg', '/brow2.jpg', '/brow3.jpg', '/brow4.jpg', '/brow5.jpg', '/brow6.jpg'].map((src, i) => (
              <motion.div key={i} variants={fadeUp} className="relative rounded-2xl overflow-hidden shadow-md aspect-square"
                whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                <img src={src} alt="עיצוב גבות" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── MINI CTA ─── */}
      <section className="bg-[#C49A8A] py-8 px-5">
        <motion.div className="max-w-xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p className="text-white text-xl font-bold mb-4">מוכנה להוסיף שירות שישנה את ההכנסה שלך?</p>
          <button onClick={scrollToForm}
            className="bg-white text-[#C49A8A] font-bold text-lg px-8 py-4 rounded-2xl hover:bg-[#F5EDE5] transition-all shadow-lg">
            כן, אני רוצה להתחיל עכשיו
          </button>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-[#FDFAF7] py-14 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">פשוט להתחיל</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-12">3 שלבים ואת מרוויחה יותר</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              { n: '①', title: 'רוכשת', desc: 'גישה מיידית לכל 10 השיעורים ו-3 הבונוסים. מהנייד, מהבית, בלי לצאת לשום מקום.' },
              { n: '②', title: 'לומדת בקצב שלך', desc: 'שיעורי וידאו קצרים ומדויקים. תרגלי על עצמך או על חברה, ותרגישי בטוחה תוך ימים ספורים.' },
              { n: '③', title: 'מתחילה להרוויח', desc: 'מציעה גבות ללקוחות שכבר מגיעות אלייך. 70-90₪ לטיפול של 15 דקות, מהיום הראשון.' },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div className="text-5xl font-black text-[#C49A8A] mb-4 leading-none">{step.n}</div>
                <h3 className="font-bold text-[#1A1A1A] text-xl mb-3">{step.title}</h3>
                <p className="text-[#5C4A3A] text-base leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── STORY ─── */}
      <section className="bg-[#F5EDE5] py-12 px-5">
        <motion.div className="max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm uppercase tracking-wide font-semibold mb-2">הסיפור שלי</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-8">גם אני הייתי שם.</motion.h2>
          <motion.div variants={fadeUp} className="text-center text-[#5C4A3A] text-lg leading-loose space-y-4 mb-6">
            <p>התחלתי כמניקוריסטית. שעות ארוכות, מחירים שלא זזים, ותחושה שאני עובדת קשה מבלי לראות את זה בחשבון הבנק.</p>
            <p>לקוחה אחת שאלה אותי בזמן טיפול: "את עושה גבות?" אמרתי כן, ולא ידעתי בדיוק למה. פשוט הרגשתי שאי אפשר להגיד לא.</p>
            <p>לקחתי 80 שקל נוספים. 15 דקות. ואז היא שלחה לי עוד שלוש חברות.</p>
            <p className="font-semibold text-[#1A1A1A]">מאותו רגע הבנתי: הגבות הן לא "שירות נוסף". הן המפתח להפוך כל תור קיים לעוד 70-90 שקל, בלי לרדוף אחרי אף לקוחה חדשה.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="text-center py-6 border-t border-[#D4C5B5]">
            <p className="text-[#5C4A3A] text-xl italic leading-relaxed">
              "לעבוד פחות שעות. להרוויח יותר כסף.<br />
              <strong className="text-[#1A1A1A] not-italic">עם אותן לקוחות שכבר יש לך."</strong>
            </p>
            <p className="text-[#C49A8A] font-bold mt-5 text-xl">מאמינה בך, טליה</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── AUTHORITY ─── */}
      <section className="bg-white py-12 px-5">
        <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
            <motion.div variants={fadeUp} className="flex-shrink-0 relative">
              <div className="absolute inset-0 rounded-full bg-[#C49A8A]/20 blur-2xl scale-110" />
              <div className="relative w-52 h-52 rounded-full border-4 border-[#C49A8A] shadow-2xl overflow-hidden">
                <img src="/talya-pro.jpg" alt="טליה בוזורגי"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', transform: 'scale(1.6)', transformOrigin: 'center 20%' }} />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="text-center flex-1">
              <p className="text-[#8B7355] font-semibold text-sm uppercase tracking-wide mb-1">מי אני?</p>
              <h2 className="text-3xl font-extrabold mb-1">היי, אני טליה בוזורגי.</h2>
              <p className="text-[#8B7355] font-semibold mb-4">מומחית עיצוב גבות ומיקרובליידינג | 8 שנות ניסיון</p>
              <div className="text-gray-700 text-lg leading-loose space-y-2">
                <p>בעלת קליניקה ואקדמיה ללימודי מקצועות היופי.</p>
                <p>פיתחתי את שיטת הקוויק: עיצוב מהיר, נקי, ובטיחותי.</p>
                <p><strong className="text-[#C49A8A]">427 בנות</strong> למדו אצלי. הן עובדות היום בביטחון.</p>
              </div>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="text-center py-6 border-t border-[#E8DDD4] mb-8">
            <p className="text-[#5C4A3A] text-lg italic leading-relaxed">
              "השליחות שלי: לעזור לכל מניקוריסטית שאוהבת את המקצוע<br />
              <strong className="text-[#1A1A1A] not-italic">להפוך לעסק רווחי שמכבד אותה."</strong>
            </p>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-2 gap-3">
            {['/kurs1.jpg', '/kurs2.jpg', '/kurs3.jpg', '/kurs4.jpg'].map((src, i) => (
              <motion.div key={i} variants={fadeUp} className="rounded-2xl overflow-hidden aspect-[3/4] shadow-md">
                <img src={src} alt="מהקורס" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SOLUTION ─── */}
      <section className="bg-[#F5EDE5] py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">התוכנית הדיגיטלית</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-extrabold text-center mb-2">עיצוב גבות בשיטת הקוויק</motion.h2>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] font-semibold mb-6">מה את מקבלת בפנים?</motion.p>

          {/* כרטיס ערך */}
          <motion.div variants={fadeUp} className="bg-[#1A1A1A] rounded-2xl p-5 mb-6">
            <p className="text-[#C49A8A] text-xs uppercase tracking-widest text-center mb-4">מה שמקבלת בקורס</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[{ n: '10', l: 'שיעורי וידאו' }, { n: '3', l: 'בונוסים מתנה' }, { n: '∞', l: 'גישה לצמיתות' }].map((s, i) => (
                <div key={i} className="text-center bg-white/5 rounded-xl py-3">
                  <p className="text-3xl font-black text-white">{s.n}</p>
                  <p className="text-[#C49A8A] text-xs mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 border-t border-white/10 pt-4 flex-wrap">
              <p className="text-gray-500 line-through text-sm">שווי: 2,100 ₪</p>
              <p className="text-white font-black text-3xl">197 ₪</p>
              <span className="bg-[#C49A8A] text-white text-xs px-3 py-1 rounded-full font-bold">חסכון של 91%</span>
            </div>
          </motion.div>

          {/* מודולים */}
          <motion.div variants={stagger} className="space-y-4 mb-6">
            {[
              {
                num: 'מודול 1',
                val: '700 ₪',
                title: 'אדריכלות ופיצוח מבנה הפנים',
                desc: 'איך ליצור את המסגרת המושלמת לכל לקוחה בלי לפשל ובלי להוריד יותר מדי. תצאי מהמודול הזה עם עין מקצועית ויד בטוחה.',
              },
              {
                num: 'מודול 2',
                val: '900 ₪',
                title: 'טכניקות העבודה של המקצועניות',
                desc: 'הסרת שיער מדויקת בשעווה ופינצטה, וטכניקות צביעה עמידות שמשדרגות כל גבה. הידע שלוקח שנים לצבור, בשיעורים קצרים וממוקדים.',
              },
            ].map((mod, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm border border-[#E8DDD4]">
                <div className="flex-shrink-0 text-center">
                  <div className="bg-[#C49A8A] text-white text-xs font-bold px-3 py-1 rounded-full mb-1">{mod.num}</div>
                  <div className="text-[#8B7355] text-xs line-through">שווי {mod.val}</div>
                </div>
                <div className="text-right flex-1">
                  <h3 className="font-bold text-[#1A1A1A] text-lg mb-1">{mod.title}</h3>
                  <p className="text-[#5C4A3A] text-sm leading-relaxed">{mod.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* בונוס מיוחד */}
            <motion.div variants={fadeUp} className="bg-gradient-to-l from-[#C49A8A] to-[#B5897A] rounded-2xl p-5 flex items-start gap-4 shadow-md">
              <div className="flex-shrink-0 text-center">
                <div className="bg-white text-[#C49A8A] text-xs font-bold px-3 py-1 rounded-full mb-1">בונוס מיוחד</div>
                <div className="text-white/70 text-xs line-through">שווי 500 ₪</div>
              </div>
              <div className="text-right flex-1">
                <h3 className="font-bold text-white text-lg mb-1">נוסחת "על הדרך"</h3>
                <p className="text-white/90 text-sm leading-relaxed">איך להציע את השירות ללקוחות הציפורניים או הקוסמטיקה הקיימות שלך, כך ש-7 מתוך 10 לקוחות יגידו "יאללה, תעשי לי גם גבות היום".</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} className="w-16 h-1 bg-[#C49A8A] mx-auto rounded-full my-4" />
          <motion.div variants={fadeUp} className="bg-[#C49A8A] rounded-2xl p-5">
            <p className="text-white font-semibold mb-3 text-center text-sm uppercase tracking-wide">מה כלול בקורס</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['10 שיעורי וידאו', 'גישה לצמיתות', '3 בונוסים', 'תעודת סיום', 'תמיכה', 'ערובה 14 יום'].map((t) => (
                <span key={t} className="bg-white/20 text-white text-sm px-3 py-1 rounded-full border border-white/30">✅ {t}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="bg-[#FDFAF7] py-12 px-5">
        <motion.div className="max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm uppercase tracking-wide font-semibold mb-2">עדויות</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-center mb-2">מה הן כותבות אחרי הקורס</motion.h2>
          <motion.div variants={fadeUp} className="w-16 h-1 bg-[#C49A8A] mx-auto rounded-full mt-3 mb-10" />
          <div className="space-y-5">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="flex justify-end items-end gap-2">
                <div className="relative max-w-xs sm:max-w-sm bg-[#DCF8C6] px-4 py-3 shadow-sm"
                  style={{ borderRadius: '18px 18px 4px 18px' }}>
                  <p className="text-[#1A1A1A] text-sm leading-relaxed text-right">{t.quote}</p>
                  <p className="text-gray-400 text-xs mt-1 text-left">{t.time} ✓✓</p>
                </div>
                <div className="flex flex-col items-center gap-1 flex-shrink-0 order-first">
                  <div className="w-10 h-10 rounded-full bg-[#C49A8A] border-2 border-white flex items-center justify-center font-bold text-white shadow">
                    {t.name[0]}
                  </div>
                  <span className="text-[10px] text-gray-600">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] mt-10 text-base">
            הודעות אמיתיות מתלמידות. לא פרסומת. תוצאות.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── FOR WHO ─── */}
      <section className="bg-[#F5EDE5] py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">למי זה מתאים</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-8">זה בשבילך?</motion.h2>
          <motion.div variants={fadeUp} className="text-center text-[#5C4A3A] text-lg leading-loose space-y-5 px-2">
            <p>אם את מניקוריסטית עם לקוחות קבועות אבל ההכנסה תקועה באותה נקודה כבר חודשים, זה בדיוק בשבילך. לא צריך לקוחות חדשות. צריך שירות נוסף ללקוחות שכבר מגיעות אלייך.</p>
            <p>אם ניסית ללמוד גבות בעבר ויצא לא ישר, לא בטוח, לא מקצועי, שיטת הקוויק נבנתה בדיוק בשבילך. תוצאה נכונה כבר מהפעם הראשונה, בלי ניחושים ובלי טעויות.</p>
            <p>ואם יש לך לקוחות שמסיימות תור ויוצאות ישר לעוד מקום לגבות, כאן תלמדי לעצור את זה. להפוך כל תור קיים למקור הכנסה נוסף, בלי לרדוף אחרי אנשים ובלי לפרסם כל יום.</p>
            <p className="font-semibold text-[#1A1A1A]">הקורס מתחיל מאפס, בנוי לקצב שלך, ונגמר כשאת מוכנה לגבות 70-90 שקל על 15 דקות עבודה, בביטחון מלא.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── BONUSES ─── */}
      <section className="bg-[#EFE5DC] py-12 px-5 relative overflow-hidden">
        <motion.div className="max-w-3xl mx-auto relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-xs uppercase tracking-[4px] mb-3">ועוד לא הכל</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-center text-[#1A1A1A] mb-2">3 בונוסים מתנה</motion.h2>
          <motion.p variants={fadeUp} className="text-center text-[#C49A8A] font-semibold text-lg mb-1">שווי 597 שקל, שלך בחינם</motion.p>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm mb-8">כשאת רוכשת היום</motion.p>
          <div className="space-y-4">
            {bonuses.map((b, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative border border-[#D4C5B5] rounded-2xl overflow-hidden flex items-stretch bg-white shadow-sm"
                whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                <div className="relative flex-shrink-0 w-20 h-20 self-center overflow-hidden">
                  <img src={b.img} alt={b.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-4 text-center">
                  <span className="text-[#C49A8A] text-xs font-bold tracking-wider">בונוס {i + 1}</span>
                  <h3 className="font-bold text-base text-[#1A1A1A] mt-0.5 mb-1">{b.name}</h3>
                  <p className="text-[#5C4A3A] text-xs leading-relaxed mb-2">{b.desc}</p>
                  <div className="flex items-center justify-end gap-2">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">חינם</span>
                    <span className="text-[#8B7355] line-through text-xs">{b.val}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── CERTIFICATE ─── */}
      <section className="bg-white py-10 px-5">
        <motion.div className="max-w-lg mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">בסיום הקורס</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl font-extrabold mb-5">תעודת סיום קורס עיצוב גבות</motion.h2>
          <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden shadow-xl border border-[#E8DDD4]">
            <img src="/cert-eyebrow.png" alt="תעודת סיום קורס עיצוב גבות" className="w-full h-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="section-pricing" className="bg-[#F5EDE5] py-12 px-5">
        <motion.div className="max-w-lg mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-[#8B7355] text-sm uppercase tracking-wide mb-2">ההשקעה שלך</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-[#1A1A1A] mb-8">כמה עולה לשנות את ההכנסות שלך?</motion.h2>
          <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 mb-6 shadow-2xl">
            <p className="text-gray-400 line-through text-base mb-1 text-center">שווי מוצהר: 397 שקל</p>
            <p className="text-7xl font-black text-[#1A1A1A] leading-none mb-1 text-center">197₪</p>
            <p className="text-gray-500 text-sm mb-1 text-center">או 2 תשלומים נוחים של 99 שקל</p>
            <p className="text-[#C49A8A] text-xs font-bold mb-6 text-center">✅ ערובה של 14 יום, לא מרוצה? מקבלת את הכסף חזרה</p>
            <form onSubmit={e => handleSubmit(e, false)} className="space-y-3">
              <input type="text" required placeholder="שם מלא"
                value={pricingForm.name} onChange={e => setPricingForm({ ...pricingForm, name: e.target.value })}
                className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-right text-[#1A1A1A] focus:border-[#C49A8A] focus:outline-none text-base" />
              <input type="tel" required placeholder="מספר טלפון"
                value={pricingForm.phone} onChange={e => setPricingForm({ ...pricingForm, phone: e.target.value })}
                className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#C49A8A] focus:outline-none text-base" dir="ltr" />
              <input type="email" required placeholder="כתובת מייל"
                value={pricingForm.email} onChange={e => setPricingForm({ ...pricingForm, email: e.target.value })}
                className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#C49A8A] focus:outline-none text-base" dir="ltr" />
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="mt-1 flex-shrink-0 accent-[#C49A8A]" />
                <span className="text-xs text-gray-500 text-right leading-snug">
                  אני מאשרת קבלת עדכונים, מבצעים ותכנים שיווקיים למייל מטליה בוזורגי. ניתן לבטל בכל עת.
                </span>
              </label>
              <motion.button type="submit" disabled={loading}
                className="w-full bg-[#C49A8A] text-white py-4 rounded-2xl font-bold text-xl hover:bg-[#B5897A] transition-colors mt-2 disabled:opacity-60"
                whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.97 }}>
                {loading ? 'מעבירה לתשלום...' : 'אני רוצה להצטרף לקורס →'}
              </motion.button>
            </form>
            <div className="mt-5 bg-gray-50 border border-[#E8DDD4] rounded-xl px-4 py-3 text-center space-y-1">
              <p className="text-[#8B7355] text-xs font-semibold">מה קורה אחרי התשלום?</p>
              <p className="text-gray-500 text-xs leading-relaxed">תועברי לדף סליקה מאובטח. תוך דקה אחת מהרכישה יגיע למייל שלך הקורס עם שם משתמש וסיסמה אישיים.</p>
              <p className="text-gray-400 text-xs">גישה לצמיתות, בלי הגבלת זמן</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-start gap-4 text-center py-5 mb-4 border-t border-[#E8DDD4]">
            <span className="text-4xl flex-shrink-0">🛡️</span>
            <div>
              <p className="text-[#C49A8A] font-bold mb-1">ערובה של 14 יום, בלי שאלות</p>
              <p className="text-[#5C4A3A] text-sm leading-relaxed">צפי בכל החומר. תרגלי. אם לא הרגשת שהשתפרת, מחזירים לך את הכסף במלואו, ללא שאלות.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="px-6 py-4 text-center border-t border-[#E8DDD4]">
            <p className="text-[#8B7355] text-xs tracking-widest uppercase mb-3">מחיר ההשקה נגמר בעוד</p>
            <div className="flex gap-4 items-center justify-center">
              {[{ v: countdown.s, l: 'שניות' }, { v: countdown.m, l: 'דקות' }].map((u, i) => (
                <div key={i} className="flex gap-4 items-center">
                  {i > 0 && <span className="text-[#C49A8A] text-2xl font-bold -mt-3">:</span>}
                  <div className="text-center">
                    <span className="block text-3xl font-black text-[#C49A8A]">{pad(u.v)}</span>
                    <span className="text-[10px] text-[#8B7355] tracking-wider">{u.l}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-[#FDFAF7] py-12 px-5">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-[#8B7355] text-sm font-semibold uppercase tracking-wide mb-2">שאלות ותשובות</motion.p>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-center mb-6">שאלות שבטח עולות לך</motion.h2>
          <div className="divide-y divide-[#E8DDD4] border-t border-[#E8DDD4]">
            {faqs.map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-2 py-5 text-right font-semibold text-[#1A1A1A] hover:text-[#C49A8A] transition-colors">
                  <span className="text-[#C49A8A] text-2xl font-light ml-2">{openFaq === i ? '−' : '+'}</span>
                  <span className="flex-1">{f.q}</span>
                </button>
                {openFaq === i && (
                  <div className="px-2 pb-5 text-gray-600 leading-relaxed">{f.a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── FINAL CTA FORM ─── */}
      <section id="cta-form" className="bg-gradient-to-b from-[#F5EDE5] to-[#EFE5DC] py-14 px-5">
        <motion.div className="max-w-md mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-[#1A1A1A] text-3xl sm:text-4xl font-extrabold text-center mb-2">אל תשארי מאחור בזמן שהלקוחות שלך עושות גבות אצל אחרות</motion.h2>
          <motion.p variants={fadeUp} className="text-[#5C4A3A] text-center mb-6 text-lg">
            לחצי עכשיו, קבלי גישה מיידית לקורס ותתחילי להגדיל את ההכנסה מכל לקוחה כבר מהשבוע.
          </motion.p>
          <motion.form variants={fadeUp} onSubmit={e => handleSubmit(e, false)}
            className="bg-white rounded-3xl p-8 shadow-2xl space-y-4 border border-[#E8DDD4]">
            <input type="text" required placeholder="שם מלא"
              value={pricingForm.name} onChange={e => setPricingForm({ ...pricingForm, name: e.target.value })}
              className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-right text-[#1A1A1A] focus:border-[#C49A8A] focus:outline-none text-base" />
            <input type="tel" required placeholder="מספר טלפון"
              value={pricingForm.phone} onChange={e => setPricingForm({ ...pricingForm, phone: e.target.value })}
              className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#C49A8A] focus:outline-none text-base" dir="ltr" />
            <input type="email" required placeholder="כתובת מייל"
              value={pricingForm.email} onChange={e => setPricingForm({ ...pricingForm, email: e.target.value })}
              className="w-full border border-[#E8DDD4] rounded-xl px-4 py-3 text-[#1A1A1A] focus:border-[#C49A8A] focus:outline-none text-base" dir="ltr" />
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" required className="mt-1 flex-shrink-0 accent-[#C49A8A]" />
              <span className="text-xs text-gray-500 text-right leading-snug">
                אני מאשרת קבלת עדכונים ותכנים שיווקיים מטליה בוזורגי. ניתן לבטל בכל עת.
              </span>
            </label>
            <motion.button type="submit" disabled={loading}
              className="w-full bg-[#C49A8A] text-white py-4 rounded-2xl font-bold text-xl hover:bg-[#B5897A] border-2 border-[#C49A8A] transition-all duration-300 disabled:opacity-60"
              whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.97 }}>
              {loading ? 'מעבירה לתשלום...' : 'אני רוצה גישה מיידית לקורס ולהגדיל את הרווחים →'}
            </motion.button>
            <div className="bg-gray-50 border border-[#E8DDD4] rounded-xl px-4 py-3 text-center space-y-1">
              <p className="text-gray-500 text-xs leading-relaxed">🔒 תשלום מאובטח | גישה מיידית | ערובה 14 יום</p>
            </div>
          </motion.form>
          <motion.p variants={fadeUp} className="text-[#C49A8A] text-center mt-8 font-semibold text-xl">מאמינה בך, טליה</motion.p>
        </motion.div>
      </section>

    </main>
  );
}
