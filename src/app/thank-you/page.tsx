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

function Check() {
  return <span className="text-[#D4C5B5] mt-0.5 flex-shrink-0">✓</span>;
}

function SectionDivider() {
  return <div className="w-16 h-px bg-[#D4C5B5]/30 mx-auto my-10" />;
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

  if (!ready) return null;

  return (
    <main dir="rtl" className="min-h-screen bg-[#1A1A1A] font-[Assistant,sans-serif] text-right">

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

      {/* ───── THANK YOU ───── */}
      <section className="bg-[#111] px-5 py-10 text-center border-b border-[#D4C5B5]/10">
        <p className="text-[#D4C5B5] text-xs tracking-widest uppercase mb-3">שלב 2 מתוך 3</p>
        <div className="text-4xl mb-3">🎉</div>
        <h1 className="text-white text-2xl font-extrabold mb-2">ברוכה הבאה לקורס גבות בקוויק!</h1>
        <p className="text-[#D4C5B5] text-sm leading-relaxed max-w-xs mx-auto">
          תוך דקה תקבלי מייל עם פרטי הגישה. בדקי גם בספאם אם לא מגיע.
        </p>
      </section>

      {/* ───── OTO HOOK ───── */}
      <section className="px-5 py-12 text-center max-w-lg mx-auto">
        <p className="text-[#D4C5B5]/60 text-xs tracking-widest uppercase mb-4">רגע! סיימי את ההזמנה שלך</p>
        <h2 className="text-white text-3xl font-extrabold leading-tight mb-4">
          יש לי עוד הצעה<br />
          <span className="text-[#D4C5B5]">חד פעמית עבורך.</span>
        </h2>
        <p className="text-[#D4C5B5]/70 text-sm mb-2">לדף הזה בלבד.</p>
        <p className="text-[#D4C5B5]/50 text-xs">(ברגע שתצאי ההצעה תיעלם)</p>
      </section>

      {/* ───── INTRO ───── */}
      <section className="px-5 pb-10 max-w-lg mx-auto text-center">
        <p className="text-white text-lg font-bold mb-4">היי יקירה, קיבלת החלטה מדהימה.</p>
        <p className="text-[#D4C5B5] text-base leading-relaxed mb-4">
          את סוף סוף הולכת לגלות את השיטה שלי לאיך עושים אומברה, ציורים משגעים, ופרנץ׳ יוצא מגדר הרגיל
          <br />
          <strong className="text-white">גם אם אף פעם לא עשית את זה.</strong>
        </p>
        <p className="text-[#D4C5B5] text-sm leading-relaxed">
          המייל כבר בדרך אלייך. רק שימי לב שהוא לא מגיע לספאם.
        </p>
      </section>

      <div className="w-full h-px bg-[#D4C5B5]/10" />

      {/* ───── THE PROMISE ───── */}
      <section className="px-5 py-14 max-w-lg mx-auto text-center">
        <p className="text-[#D4C5B5] text-sm mb-6">
          רק בגלל שרכשת את התוכנית, החלטתי לפנק אותך
          <br />
          בהצעה חד פעמית לדף הזה בלבד.
          <br />
          <span className="text-[#D4C5B5]/50 text-xs">(אם תחזרי אחורה לא תוכלי לנצל אותה)</span>
        </p>

        <h2 className="text-white text-2xl font-extrabold leading-tight mb-6">
          ״איך תכפילי את ההכנסה בקליניקה
          <br />
          <span className="text-[#D4C5B5]">באמצעות טיפול מבוקש שלוקח 15 דק׳ בלבד״</span>
        </h2>

        <div className="text-[#D4C5B5] text-base leading-loose space-y-1">
          <p>בלי שתצטרכי להוציא עוד כסף על שיווק,</p>
          <p>בלי למכור מוצרים פיזיים,</p>
          <p>ובלי הצורך למלא את היומן.</p>
        </div>
      </section>

      {/* ───── THE MATH ───── */}
      <section className="bg-[#111] px-5 py-12 text-center">
        <p className="text-[#D4C5B5]/60 text-sm mb-4">הסוד שאף אחת לא תגלה לך...</p>
        <h3 className="text-white text-xl font-extrabold leading-tight mb-6 max-w-sm mx-auto">
          איך להפוך כל לקוחה שמשלמת לך 130 ש״ח לטיפול
          <br />
          <span className="text-[#D4C5B5]">ללקוחה שמשלמת לך 200-300 לתור...</span>
        </h3>
        <p className="text-[#D4C5B5] text-base leading-relaxed max-w-sm mx-auto mb-4">
          ולהפוך יומן שבנוי מ-20 לקוחות בשבוע,
          <br />
          <strong className="text-white">להכנסה של מעל ל-15,000 שקל בחודש?</strong>
        </p>
      </section>

      {/* ───── PAIN ───── */}
      <section className="px-5 py-14 max-w-lg mx-auto">
        <p className="text-[#D4C5B5] text-base leading-relaxed text-center mb-8">
          כי בינינו...
          <br />
          הכי פשוט לחשוב שלפוצץ את היומן בעוד לקוחות
          ולהעמיס עוד שעות עבודה יכניס יותר כסף.
          <br /><br />
          ובפועל מה שקורה זה שאת
          <br />
          <strong className="text-white">שוברת את הגב כל היום.</strong>
        </p>

        <p className="text-[#D4C5B5] text-base leading-relaxed text-center mb-8">
          ותאמיני לי... אחרי שהגעתי ליומן מלא והבנתי שאני פשוט לא יכולה להמשיך ככה,
          <br />
          שאלתי את עצמי שאלה פשוטה:
        </p>

        <div className="bg-white/5 border border-[#D4C5B5]/20 rounded-2xl p-6 text-center mb-8">
          <p className="text-white text-lg font-bold leading-relaxed">
            ״איך אפשר לעשות את זה אחרת?
            <br />
            איך אפשר להרוויח יותר אבל בלי לעבוד כל כך קשה?״
          </p>
        </div>

        <p className="text-[#D4C5B5] text-base text-center">
          עד שגיליתי שיטה להכפיל את הרווחים
          <br />
          <strong className="text-white">(מאותן לקוחות קיימות)</strong>
        </p>
      </section>

      {/* ───── THE INSIGHT ───── */}
      <section className="bg-[#111] px-5 py-12 text-center">
        <p className="text-[#D4C5B5] text-base leading-relaxed max-w-sm mx-auto mb-6">
          מכירה את המושג ׳הכל במקום אחד?׳
          <br /><br />
          רוב הלקוחות שמגיעות אלייך לגבות,
          הולכות למישהי אחרת לעשות טיפולים אחרים.
          <br /><br />
          <strong className="text-white">אבל יש כאן פוטנציאל ענק.</strong>
        </p>

        <div className="bg-white/5 border border-[#D4C5B5]/20 rounded-2xl p-6 max-w-sm mx-auto mb-6">
          <p className="text-[#D4C5B5] text-base leading-relaxed">
            מספיק שהוספת לחצי מהלקוחות הקיימות שלך
            <br />
            עוד 15 דק׳ של טיפול אומברה...
            <br /><br />
            <strong className="text-white text-xl">את מרוויחה עוד 3,000 ש״ח בשקט.</strong>
          </p>
        </div>

        <p className="text-[#D4C5B5] text-sm leading-relaxed max-w-sm mx-auto">
          מאותה הלקוחה שכבר נמצאת אצלך,
          שכבר סומכת עלייך.
          <br /><br />
          וכשתציעי את זה? הן ישמחו עד הגג שאת חוסכת להן את הזמן והנסיעה.
        </p>
      </section>

      {/* ───── OBJECTION ───── */}
      <section className="px-5 py-14 max-w-lg mx-auto text-center">
        <p className="text-[#D4C5B5] text-base leading-relaxed mb-6">
          עכשיו רגע אחד, לפני שקופצות לך מחשבות של...
        </p>
        <div className="space-y-3 mb-8">
          {[
            '״אומברה זה לא בשבילי״',
            '״אומברה זה מומחיות שונה״',
            '״לי זה יצא לא טוב״',
          ].map(obj => (
            <div key={obj} className="bg-white/5 border border-[#D4C5B5]/15 rounded-xl px-5 py-3">
              <p className="text-[#D4C5B5] text-base font-semibold">{obj}</p>
            </div>
          ))}
        </div>
        <p className="text-white font-bold text-lg">
          לסדר אומברה זה הכי קל שיש...
          <br />
          <span className="text-[#D4C5B5] text-base font-normal">(כשיש שיטת עבודה מסודרת!)</span>
        </p>
      </section>

      {/* ───── STOP DOING ───── */}
      <section className="bg-[#111] px-5 py-12 max-w-lg mx-auto">
        <p className="text-white text-lg font-bold text-center mb-6">
          אני רוצה שתפסיקי להתיש את עצמך ב...
        </p>
        <div className="space-y-4">
          {[
            'בזבוז שעות ביצירת תוכן ועיצוב סטוריז ורילסים',
            'לנסות למלא את היומן ולמצוא את עצמך בסוף היום באפיסת כוחות',
            'מלחמה שלא נגמרת כדי להחזיק את העסק על הרגליים',
          ].map(item => (
            <div key={item} className="flex gap-3">
              <span className="text-[#D4C5B5]/50 mt-0.5 flex-shrink-0">✗</span>
              <p className="text-[#D4C5B5] text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
        <p className="text-white font-bold text-center mt-8 text-base">
          ובדיוק בגלל זה אני רוצה להראות לך
          <br />
          את הדרך הכי קלה ופשוטה שיש
          <br />
          <span className="text-[#D4C5B5] font-normal text-sm">שאם תיישמי אותה כבר מהיום</span>
          <br />
          <span className="text-[#D4C5B5] font-normal text-sm">את תצליחי להגדיל את ההכנסות מהלקוחה הבאה.</span>
        </p>
      </section>

      {/* ───── COURSE INTRO ───── */}
      <section className="px-5 py-14 text-center max-w-lg mx-auto">
        <p className="text-[#D4C5B5] text-sm mb-3">תכירי את:</p>
        <h2 className="text-white text-3xl font-extrabold leading-tight mb-3">
          מאסטרית באומברה
        </h2>
        <p className="text-[#D4C5B5] text-base font-semibold mb-6">
          ״15 דק׳ לאומברה מושלמת שתגרום ללקוחות לחזור שוב ושוב״
        </p>
        <p className="text-[#D4C5B5] text-sm leading-relaxed max-w-sm mx-auto">
          תוכנית דיגיטלית מצולמת שהולכת לקצר לך
          את הדרך להכנסה גבוהה יותר
          <br />
          <strong className="text-white">מבלי שתצטרכי להכניס עוד לקוחה אחת ליומן!</strong>
        </p>
      </section>

      {/* ───── LESSONS ───── */}
      <section className="bg-[#111] px-5 py-12 max-w-lg mx-auto">
        <p className="text-white text-lg font-bold text-center mb-8">אז מה מחכה לך בפנים...</p>
        <div className="space-y-4">
          {[
            { num: 1, text: 'אקח אותך איתי יד ביד, ונכיר את עולם האומברה. איך תדעי מה נכון ומה לא נכון לעשות.' },
            { num: 2, text: 'אכיר לך את טכניקת האומברה המושלמת ותכירי את שלבי הציור A, B, C. תדעי איך לצור גרדייאנט נכון.' },
            { num: 3, text: 'סקירת הכלים שאני עובדת איתם בשיטת האומברה לציור מדויק ומהיר.' },
            { num: 4, text: 'הסבר מפורט ומדויק על איך עובדים עם כל כלי, בשיטות שפיתחתי לעבודה קלה, מהירה ובטוחה.' },
            { num: 5, text: 'סקירת סוגי הפיגמנטים השונים, לימוד עבודה עם הצבעים, הדגמות וטיפים לתוצאה עמוקה ועמידה.' },
            { num: 6, text: 'בשיעור אלמד אותך את השיטה שפיתחתי - לדרך המהירה והבטוחה לציור אומברה מושלם ובטיחותי.' },
            { num: 7, text: 'טיפולים מלאים מהתחלה ועד הסוף. בצילום איכותי שתרגישי שאת בשיעור פרטי.' },
            { num: 8, text: 'גבות שונות שתיתקלי בהן - אבל לא תהיי מופתעת! כי אני מלמדת אותך איך להתנהל עם כל סוג.' },
            { num: 9, text: 'את הולכת להפוך לא רק ל״מומחית אומברה״ אלא גם למשקמת שתחזיר ללקוחות את הביטחון העצמי.' },
            { num: 10, text: 'קבלת תעודה מקצועית מבית "אקדמיית טליה בוזורגי" - הדרך שלך להצלחה מתחילה כאן!' },
          ].map(({ num, text }) => (
            <div key={num} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#D4C5B5]/15 border border-[#D4C5B5]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#D4C5B5] text-xs font-bold">{num}</span>
              </div>
              <p className="text-[#D4C5B5] text-sm leading-relaxed">
                <strong className="text-white">שיעור {num}:</strong> {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── BONUSES ───── */}
      <section className="px-5 py-14 max-w-lg mx-auto">
        <p className="text-white text-lg font-bold text-center mb-2">רק רגע, זה לא הכל...!</p>
        <p className="text-[#D4C5B5] text-sm text-center mb-8">
          בנוסף לכל התוכן המטורף, את תקבלי גם
          <br />
          <strong className="text-white">בונוסים בשווי 597 ש״ח</strong>
        </p>

        <div className="space-y-4">
          {[
            {
              title: 'הדרכת צביעת גבות',
              desc: 'מדריך והדגמה מפורטת - איך לצבע ללקוחות את הגבות להשלמת המראה. טיפול של 5 דק׳ נוספות שבזכותו תגדילי עוד יותר את ההכנסות שלך.',
              value: '297',
            },
            {
              title: 'הדרכת פרסום ושיווק ברשתות החברתיות',
              desc: 'הדרכה חשובה שתמקד אותך מה חשוב באמת כשאת מפרסמת את עצמך ברשתות. כולל צילום אינסטגרמי.',
              value: '150',
            },
            {
              title: 'חוברת PDF מקצועית',
              desc: 'חוברת מלאה שעבדתי עליה חודשים, להענקת כל הידע בצורה הכי ברורה ומקצועית שיש. מוכנה להדפסה ותלווה אותך לתמיד.',
              value: '150',
            },
          ].map(({ title, desc, value }) => (
            <div key={title} className="bg-white/5 border border-[#D4C5B5]/20 rounded-2xl p-5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-bold text-sm leading-tight flex-1 ml-3">{title}</h4>
                <span className="text-[#D4C5B5]/50 text-xs line-through flex-shrink-0">שווי ₪{value}</span>
              </div>
              <p className="text-[#D4C5B5] text-xs leading-relaxed mb-2">{desc}</p>
              <p className="text-[#D4C5B5] font-bold text-sm">בשבילך: חינם ✓</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── PRICE ───── */}
      <section className="bg-[#111] px-5 py-14 text-center">
        <p className="text-[#D4C5B5] text-sm leading-relaxed max-w-sm mx-auto mb-6">
          בגדול, התוכן שאת מקבלת כאן
          הוא חלק מההכשרה הפרונטלית
          <br />
          שעולה כמה אלפי שקלים...
          <br /><br />
          והמחיר שלה במקור:
        </p>

        <p className="text-[#D4C5B5]/40 text-2xl line-through mb-2">2,197 ש״ח</p>

        <p className="text-[#D4C5B5] text-sm leading-relaxed max-w-sm mx-auto mb-6">
          אבל כאן החלטתי לקצר לך את כל הדרך
          לתוכנית סופר קלה ופשוטה ללימוד
          <br />
          כדי שתוכלי ללמוד מהבית שלך בכיף
          <br />
          וליישם בזמן שנוח לך.
          <br /><br />
          ובגלל שכבר קנית ממני היום,
          <br />
          החלטתי להפוך את המחיר לנגיש עוד יותר:
        </p>

        <div className="bg-white/5 border border-[#D4C5B5]/25 rounded-2xl px-8 py-8 max-w-xs mx-auto mb-8">
          <p className="text-[#D4C5B5] text-sm mb-1">מחיר השקה מיוחד</p>
          <p className="text-white text-6xl font-extrabold mb-1">97<span className="text-3xl">₪</span></p>
          <p className="text-[#D4C5B5]/60 text-sm">או 2 תשלומים נוחים של 49 ש״ח</p>
          <p className="text-[#D4C5B5]/40 text-xs mt-2">*המחיר זמני ועלול לעלות ללא התראה</p>
        </div>

        <a
          href={OMBRE_URL}
          className="block w-full max-w-xs mx-auto bg-[#D4C5B5] text-[#1A1A1A] text-center font-extrabold text-lg py-5 rounded-2xl mb-4 active:opacity-80"
        >
          כן, אני רוצה מאסטרית באומברה ב-97₪
        </a>

        <p className="text-[#D4C5B5]/40 text-xs">
          ברגע שתלחצי תעברי לדף סליקה מאובטח.
          <br />
          תוך 15 שניות התוכנית אצלך במייל.
        </p>
      </section>

      {/* ───── WHO IT'S FOR ───── */}
      <section className="px-5 py-12 max-w-lg mx-auto">
        <p className="text-white text-lg font-bold text-center mb-6">למי התוכנית מתאימה?</p>
        <div className="space-y-3">
          {[
            'למי שרוצה להוסיף שירות פרימיום שמשלמים עליו טוב.',
            'לבעלות קליניקה שיש להן לקוחות קיימות ורוצות להרוויח יותר מכל אחת.',
            'למי שחשבה שאומברה זה מסובך ורוצה לגלות שזה הכי קל שיש.',
            'לכל מי שחשובה לה תוצאה מקצועית שגורמת ללקוחות לחזור.',
            'למי שרוצה תעודה מקצועית ממוכרת בתחום.',
          ].map(item => (
            <div key={item} className="flex gap-3">
              <Check />
              <p className="text-[#D4C5B5] text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── GUARANTEE ───── */}
      <section className="bg-[#111] px-5 py-12 text-center max-w-lg mx-auto">
        <div className="text-4xl mb-4">🛡️</div>
        <h3 className="text-white text-xl font-bold mb-4">האחריות שלי על התוכנית</h3>
        <p className="text-[#D4C5B5] text-sm leading-relaxed max-w-xs mx-auto">
          במידה וצפית בכל התכנים ולא הצלחת
          ליישם כלום מכל סיבה שהיא
          <br /><br />
          <strong className="text-white">את מקבלת ממני החזר כספי מלא עד 14 יום מיום הרכישה.</strong>
        </p>
      </section>

      {/* ───── HOW IT WORKS ───── */}
      <section className="px-5 py-12 max-w-lg mx-auto text-center">
        <p className="text-white text-lg font-bold mb-8">איך זה עובד?</p>
        <div className="space-y-5">
          {[
            { num: '1', text: 'לוחצת על הכפתור למטה' },
            { num: '2', text: 'עוברת לדף סליקה מאובטח' },
            { num: '3', text: 'תוך 15 שניות התוכנית אצלך במייל ואת כבר יכולה להתחיל' },
          ].map(({ num, text }) => (
            <div key={num} className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full border border-[#D4C5B5]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-[#D4C5B5] font-bold">{num}</span>
              </div>
              <p className="text-[#D4C5B5] text-sm text-right">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section className="bg-[#111] px-5 py-14 text-center">
        <p className="text-[#D4C5B5] text-sm leading-relaxed max-w-sm mx-auto mb-6">
          אם הגעת עד לכאן, סימן שיש בך
          תשוקה רצינית ורצון לפתח את העסק שלך.
          <br /><br />
          מאסטרית באומברה זה השלב הבא בשבילך
          כדי להגדיל את הרווחים.
          <br />
          <strong className="text-white">את יכולה לצפות בכל התכנים בערב אחד של בינג׳ וכבר למחרת להתחיל ליישם.</strong>
        </p>

        <div className="bg-white/5 border border-[#D4C5B5]/20 rounded-2xl px-6 py-5 max-w-xs mx-auto mb-6">
          <p className="text-[#D4C5B5]/50 text-sm line-through mb-1">2,197 ש״ח</p>
          <p className="text-white text-5xl font-extrabold mb-1">97<span className="text-2xl">₪</span></p>
          <p className="text-[#D4C5B5]/60 text-xs">או 2 תשלומים של 49 ש״ח</p>
        </div>

        <a
          href={OMBRE_URL}
          className="block w-full max-w-xs mx-auto bg-[#D4C5B5] text-[#1A1A1A] text-center font-extrabold text-lg py-5 rounded-2xl mb-6 active:opacity-80"
        >
          כן! אני רוצה מאסטרית באומברה
        </a>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-[#D4C5B5]/30 text-xs underline block"
        >
          לא תודה, אני מוותרת על ההצעה
        </a>

        <SectionDivider />
        <p className="text-white font-bold text-xl">מאמינה בך, טליה ✨</p>
      </section>

    </main>
  );
}
