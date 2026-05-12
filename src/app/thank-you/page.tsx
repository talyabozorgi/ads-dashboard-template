'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const PIXEL_ID = '1901161570375773';
const OMBRE_URL = 'https://secure.cardcom.solutions/EA/EA5/5MLJB6WUi0ivCY9FVGYWQ/PaymentSP';

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

export default function ThankYouPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('pending_buyer');
    if (!raw) { setReady(true); return; }

    let buyer: { name: string; phone: string; email: string; utm_content?: string; utm_campaign?: string; utm_source?: string };
    try { buyer = JSON.parse(raw); } catch { setReady(true); return; }

    localStorage.removeItem('pending_buyer');

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', { currency: 'ILS', value: 197, content_name: 'eyebrow_course' });
    }

    fetch('/api/add-buyer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buyer),
    }).catch(() => {});

    setReady(true);
  }, []);

  return (
    <main dir="rtl" className="min-h-screen bg-[#1A1A1A] font-[Assistant,sans-serif]">

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

      {/* Thank You Section */}
      <section className="flex flex-col items-center justify-center px-5 pt-14 pb-10 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-white text-2xl font-extrabold mb-3">ברוכה הבאה לקורס גבות בקוויק!</h1>
        <p className="text-[#D4C5B5] text-base leading-relaxed max-w-sm">
          תוך דקה תקבלי מייל עם פרטי הגישה לקורס.
          <br />
          בדקי גם בספאם אם לא מגיע.
        </p>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-[#D4C5B5]/15 mb-0" />

      {/* Upsell Section */}
      <section className="flex flex-col items-center px-5 py-12 text-center bg-[#111111]">

        <p className="text-[#D4C5B5] text-sm font-semibold tracking-widest uppercase mb-4">
          רגע לפני שאת עוזבת
        </p>

        <h2 className="text-white text-3xl font-extrabold leading-tight mb-4 max-w-xs">
          רוצה להוסיף אומברה לעסק שלך?
        </h2>

        <p className="text-[#D4C5B5] text-base leading-relaxed max-w-sm mb-6">
          קורס מאסטרית באומברה הדיגיטלי מחכה לך.
          <br />
          בגלל שכבר קנית אצלי היום, המחיר שלך הוא חד פעמי.
        </p>

        {/* Price box */}
        <div className="bg-white/5 border border-[#D4C5B5]/25 rounded-2xl px-8 py-6 mb-8 w-full max-w-xs">
          <p className="text-[#D4C5B5] text-sm line-through mb-1">מחיר רגיל</p>
          <p className="text-white text-5xl font-extrabold mb-1">97<span className="text-2xl">₪</span></p>
          <p className="text-[#D4C5B5] text-sm">רק להיום. לא יחזור.</p>
        </div>

        {/* What's included */}
        <div className="text-right w-full max-w-sm mb-8 space-y-3">
          {[
            'שיטת אומברה מקצה לקצה בוידאו',
            'ערכת פיגמנטים + כלים בתמונות',
            'תרגול שלב אחר שלב',
            'גישה לנצח + עדכונים חינם',
            'ליווי ישיר ממני',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="text-[#D4C5B5] mt-0.5">✓</span>
              <p className="text-[#D4C5B5] text-sm">{item}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href={OMBRE_URL}
          className="block w-full max-w-sm bg-[#D4C5B5] text-[#1A1A1A] text-center font-extrabold text-lg py-4 rounded-2xl mb-4 active:opacity-80"
        >
          כן, אני רוצה את האומברה ב-97₪
        </a>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-gray-600 text-sm underline"
        >
          לא תודה, אני לא רוצה להוסיף אומברה
        </a>

        <p className="text-white font-bold mt-10 text-lg">מאמינה בך, טליה ✨</p>
      </section>

    </main>
  );
}
