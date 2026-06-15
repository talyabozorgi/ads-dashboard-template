'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';

const PIXEL_ID = '1901161570375773';
const OMBRE_URL_FALLBACK = 'https://secure.cardcom.solutions/EA/EA5/5MLJB6WUi0ivCY9FVGYWQ/PaymentSP';
const TIMER_MINUTES = 15;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

function useCountdown() {
  const [seconds, setSeconds] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const key = 'oto_deadline';
    let deadline = Number(sessionStorage.getItem(key));
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + TIMER_MINUTES * 60 * 1000;
      sessionStorage.setItem(key, String(deadline));
    }
    const tick = () => setSeconds(Math.max(0, Math.floor((deadline - Date.now()) / 1000)));
    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  if (seconds === null) return { mm: '15', ss: '00', expired: false };
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return { mm, ss, expired: seconds === 0 };
}

function CtaButton({ label = 'כן! אני רוצה מאסטרית באומברה ב-97₪', small = false }: { label?: string; small?: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const raw = localStorage.getItem('pending_buyer');
      const buyer = raw ? JSON.parse(raw) : {};
      const res = await fetch('/api/cardcom/create-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: 'ombre_upsell',
          name: buyer.name,
          email: buyer.email,
          phone: buyer.phone,
          utmParams: {
            utm_source: buyer.utm_source,
            utm_campaign: buyer.utm_campaign,
            utm_content: buyer.utm_content,
          },
        }),
      });
      const json = await res.json();
      if (json.url) { window.location.href = json.url; return; }
    } catch {}
    window.location.href = OMBRE_URL_FALLBACK;
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`block w-full max-w-sm mx-auto bg-[#C49A8A] hover:bg-[#B5897A] active:scale-95 text-white text-center font-extrabold rounded-2xl shadow-lg transition-all duration-150 disabled:opacity-60 ${small ? 'text-base py-4' : 'text-lg py-5'}`}
    >
      {loading ? 'מעבירה לתשלום...' : label}
    </button>
  );
}

function CountdownBar({ mm, ss, expired }: { mm: string; ss: string; expired: boolean }) {
  return (
    <div className={`text-center py-3 px-4 transition-colors ${expired ? 'bg-[#888]' : 'bg-[#C49A8A]'}`}>
      {expired ? (
        <p className="text-white text-sm font-bold">ההצעה פגה — צרי קשר לקבלת ההטבה</p>
      ) : (
        <p className="text-white text-sm font-semibold">
          ההצעה הזו תיעלם בעוד{' '}
          <span className="font-extrabold text-lg tabular-nums">{mm}:{ss}</span>
        </p>
      )}
    </div>
  );
}

export default function ThankYouPage() {
  const { mm, ss, expired } = useCountdown();

  useEffect(() => {
    if (sessionStorage.getItem('purchase_tracked')) return;

    const firePurchase = (fbq: NonNullable<Window['fbq']>) => {
      sessionStorage.setItem('purchase_tracked', '1');
      fbq('track', 'Purchase', { currency: 'ILS', value: 197, content_name: 'eyebrow_course' });
    };

    if (window.fbq) {
      firePurchase(window.fbq);
    } else {
      const check = setInterval(() => {
        if (window.fbq) {
          clearInterval(check);
          firePurchase(window.fbq!);
        }
      }, 50);
      setTimeout(() => clearInterval(check), 10000);
    }

    const raw = localStorage.getItem('pending_buyer');
    if (!raw) return;
    let buyer: { name: string; phone: string; email: string; utm_content?: string; utm_campaign?: string; utm_source?: string };
    try { buyer = JSON.parse(raw); } catch { return; }
    localStorage.removeItem('pending_buyer');
    fetch('/api/add-buyer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buyer),
    }).catch(() => {});
  }, []);

  return (
    <main dir="rtl" className="min-h-screen bg-[#FAF7F4] font-[Assistant,sans-serif] text-right text-[#1A1A1A]">

      <Script id="clarity" strategy="afterInteractive">{`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "wol6ha22ge");
      `}</Script>

      <Script id="fb-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `}</Script>

      {/* ── COUNTDOWN BAR ── */}
      <CountdownBar mm={mm} ss={ss} expired={expired} />

      {/* ── THANK YOU CONFIRM ── */}
      <div className="bg-[#1A1A1A] text-center py-3 px-4">
        <p className="text-[#D4C5B5] text-xs tracking-widest">✓ ההזמנה התקבלה · הקורס בדרך למייל שלך</p>
      </div>

      {/* ── OTO HERO ── */}
      <section className="bg-[#FDF3EE] px-5 py-10 text-center border-b border-[#E8CABB]">
        <div className="max-w-lg mx-auto">
          <p className="text-[#C49A8A] text-xs font-semibold tracking-widest uppercase mb-3">
            הצעה חד פעמית לתלמידות חדשות בלבד
          </p>
          <h1 className="text-[#1A1A1A] text-3xl font-extrabold mb-3 leading-snug">
            רגע לפני שאת עוזבת:<br />
            <span className="text-[#C49A8A]">איך להוסיף 70-100 ש״ח לכל תור שכבר יש לך</span>
          </h1>
          <p className="text-[#555] text-base leading-relaxed mb-2">
            אומברה. 15 דקות. מאותן לקוחות שממילא יושבות אצלך.
          </p>
          <p className="text-[#1A1A1A] font-bold text-sm mb-6">
            קורס דיגיטלי מלא. רק עכשיו: <span className="text-[#C49A8A]">97 ש״ח</span> (במקום 2,197 ש״ח)
          </p>

          <CtaButton />
          <p className="text-[#AAA] text-xs mt-3">ההצעה תיעלם כשהטיימר יגיע לאפס</p>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <section className="bg-white px-5 pt-8 pb-0 text-center">
        <div className="max-w-lg mx-auto rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/ombre/hero.png"
            alt="אומברה וקישוטים מושלמים"
            width={600}
            height={400}
            className="w-full object-cover"
          />
        </div>
      </section>

      {/* ── THE MATH ── */}
      <section className="bg-white px-5 py-12 text-center">
        <div className="max-w-lg mx-auto">
          <div className="bg-[#FAF7F4] rounded-2xl border border-[#EEE] p-7 mb-6">
            <h2 className="text-[#1A1A1A] text-xl font-extrabold leading-tight mb-4">
              יש לך 20 לקוחות בשבוע?<br />
              <span className="text-[#C49A8A]">זה עוד 3,000+ ש״ח בחודש — בלי לקוחה חדשה אחת.</span>
            </h2>
            <p className="text-[#555] text-sm leading-relaxed">
              מחצית מהלקוחות שלך יאמרו כן לאומברה כשתציעי.
              <br />70 ש״ח × 10 לקוחות × 4 שבועות = <strong className="text-[#1A1A1A]">2,800 ש״ח נוספים.</strong>
              <br /><span className="text-[#888] text-xs">ואת לא צריכה לחפש אף אחת מהן.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET (CONDENSED) ── */}
      <section className="bg-[#FAF7F4] px-5 py-12">
        <div className="max-w-lg mx-auto">
          <p className="text-[#888] text-xs uppercase tracking-widest text-center mb-2">מה מחכה לך בפנים</p>
          <h3 className="text-[#1A1A1A] text-xl font-bold text-center mb-6">קורס מאסטרית באומברה — 10 שיעורים מלאים</h3>

          <div className="space-y-3 mb-8">
            {[
              { icon: '✨', text: 'טכניקת הגרדיאנט המושלמת — שלבי A, B, C שאת יכולה ליישם מחר בבוקר.' },
              { icon: '🎬', text: 'טיפולים מלאים מהתחלה ועד הסוף בצילום איכותי — כמו שיעור פרטי.' },
              { icon: '🎨', text: 'פיגמנטים, שילובי צבעים, שיקום גבות — הכל בפנים.' },
              { icon: '🎓', text: 'תעודה מקצועית מאקדמיית טליה בוזורגי.' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-3 bg-white rounded-xl px-4 py-4 shadow-sm">
                <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                <p className="text-[#444] text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Gallery */}
          <div className="rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/ombre/collage.png"
              alt="טכניקות אומברה מהקורס"
              width={600}
              height={400}
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── BONUSES ── */}
      <section className="bg-white px-5 py-12">
        <div className="max-w-lg mx-auto text-center">
          <h3 className="text-[#1A1A1A] text-xl font-bold mb-1">+ 3 בונוסים בשווי 597 ש״ח — חינם</h3>
          <p className="text-[#888] text-sm mb-6">רק לתלמידות שמצטרפות היום</p>

          <div className="space-y-4 text-right">
            {[
              { num: '01', title: 'הדרכת צביעת גבות', desc: '5 דקות נוספות לתור שמוסיפות עוד הכנסה.' },
              { num: '02', title: 'פרסום ושיווק ברשתות', desc: 'איך לצלם ולפרסם אומברה שמשכנעת לקוחות לבוא.' },
              { num: '03', title: 'חוברת PDF מקצועית', desc: 'כל הידע מוכן להדפסה — לתמיד.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-[#FAF7F4] border border-[#EEE] rounded-2xl p-4 flex gap-4">
                <span className="text-[#E8CABB] text-2xl font-extrabold flex-shrink-0 leading-none mt-0.5">{num}</span>
                <div>
                  <h4 className="text-[#1A1A1A] font-bold text-sm mb-1">{title}</h4>
                  <p className="text-[#666] text-xs leading-relaxed">{desc}</p>
                  <span className="text-[#C49A8A] text-xs font-bold">✓ בשבילך: חינם</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (2 only) ── */}
      <section className="bg-[#FAF7F4] px-5 py-12">
        <div className="max-w-lg mx-auto">
          <h3 className="text-[#1A1A1A] text-xl font-bold text-center mb-6">מה אומרות מי שעשו את זה</h3>
          <div className="space-y-4">
            {[
              {
                name: 'הודיה',
                role: 'מניקוריסטית',
                text: 'צפיתי בכל הקורס בלילה אחד ולמחרת כבר עשיתי אומברה ראשונה ללקוחה. עכשיו זה השירות שהכי מבקשים אצלי.',
              },
              {
                name: 'ליאן',
                role: 'מניקוריסטית ומעצבת ציפורניים',
                text: 'הוספתי 80 ש״ח לכל תור בלי להתעייף. הקורס מראה הכל צעד צעד — מרגיש כמו שיעור פרטי.',
              },
            ].map(({ name, role, text }) => (
              <div key={name} className="bg-white rounded-2xl shadow-sm border border-[#EEE] p-5">
                <div className="text-[#C49A8A] text-sm mb-2">★★★★★</div>
                <p className="text-[#444] text-sm leading-relaxed mb-3">{`״${text}״`}</p>
                <div>
                  <p className="text-[#1A1A1A] font-bold text-sm">{name}</p>
                  <p className="text-[#AAA] text-xs">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE + MAIN CTA ── */}
      <section className="bg-white px-5 py-14 text-center">
        <div className="max-w-sm mx-auto">
          <CountdownBar mm={mm} ss={ss} expired={expired} />

          <div className="bg-[#FDF3EE] border-2 border-[#E8CABB] rounded-2xl px-8 py-8 my-6">
            <p className="text-[#C49A8A] text-sm font-semibold mb-1">מחיר מיוחד לדף זה בלבד</p>
            <p className="text-[#888] text-sm line-through mb-1">2,197 ש״ח</p>
            <p className="text-[#1A1A1A] text-6xl font-extrabold mb-1">97<span className="text-3xl">₪</span></p>
            <p className="text-[#888] text-sm">או 2 תשלומים נוחים של 49 ש״ח</p>
          </div>

          <CtaButton label="כן, אני רוצה מאסטרית באומברה" />

          <p className="text-[#AAA] text-xs mt-3 mb-6">דף סליקה מאובטח · תוך 15 שניות הקורס במייל</p>

          {/* Guarantee */}
          <div className="bg-[#FAF7F4] border border-[#EEE] rounded-2xl p-5 mb-6">
            <p className="text-2xl mb-2">🛡️</p>
            <p className="text-[#1A1A1A] font-bold text-sm mb-1">החזר כספי מלא עד 14 יום</p>
            <p className="text-[#666] text-xs leading-relaxed">צפית בכל התכנים ולא הצלחת ליישם? מחזירה לך הכל בלי שאלות.</p>
          </div>

          <a
            href="/"
            className="block text-[#AAA] text-xs underline mt-2"
          >
            לא תודה, אני מוותרת על ההצעה
          </a>

          <p className="text-[#1A1A1A] font-bold text-xl mt-10">מאמינה בך, טליה ✨</p>
        </div>
      </section>

      {/* ── STICKY MOBILE BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#E8CABB] px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-between gap-3 max-w-sm mx-auto">
          <div className="text-right">
            <p className="text-[#1A1A1A] font-extrabold text-lg leading-none">97₪</p>
            <p className="text-[#888] text-xs">במקום 2,197 ש״ח</p>
          </div>
          <CtaButton label="כן! אני רוצה את זה" small />
        </div>
      </div>

      {/* Bottom padding for sticky bar on mobile */}
      <div className="h-20 md:hidden" />

    </main>
  );
}
