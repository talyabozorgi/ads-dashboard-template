'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';

const PIXEL_ID = '1901161570375773';
const OMBRE_URL = 'https://secure.cardcom.solutions/EA/EA5/5MLJB6WUi0ivCY9FVGYWQ/PaymentSP';

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

function CtaButton({ label = 'כן! אני רוצה מאסטרית באומברה ב-97₪' }: { label?: string }) {
  return (
    <a
      href={OMBRE_URL}
      className="block w-full max-w-sm mx-auto bg-[#C49A8A] hover:bg-[#B5897A] text-white text-center font-extrabold text-lg py-5 rounded-2xl shadow-lg transition-colors"
    >
      {label}
    </a>
  );
}

export default function ThankYouPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Fire Purchase once per session (page is only reached after successful Cardcom payment)
    if (!sessionStorage.getItem('purchase_tracked')) {
      sessionStorage.setItem('purchase_tracked', '1');
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Purchase', { currency: 'ILS', value: 197, content_name: 'eyebrow_course' });
      }
    }

    const raw = localStorage.getItem('pending_buyer');
    if (!raw) { setReady(true); return; }
    let buyer: { name: string; phone: string; email: string; utm_content?: string; utm_campaign?: string; utm_source?: string };
    try { buyer = JSON.parse(raw); } catch { setReady(true); return; }
    localStorage.removeItem('pending_buyer');
    fetch('/api/add-buyer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buyer),
    }).catch(() => {});
    setReady(true);
  }, []);

  if (!ready) return null;

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

      {/* ── THANK YOU BAR ── */}
      <div className="bg-[#1A1A1A] text-center py-3 px-4">
        <p className="text-[#D4C5B5] text-xs tracking-widest">✓ ההזמנה התקבלה · שלב 2 מתוך 3</p>
      </div>

      {/* ── WELCOME SECTION ── */}
      <section className="bg-[#FDF3EE] px-5 py-12 text-center border-b border-[#E8CABB]">
        <div className="max-w-lg mx-auto">
          <div className="text-5xl mb-5">🎉</div>
          <h1 className="text-[#1A1A1A] text-3xl font-extrabold mb-3 leading-snug">
            ברוכה הבאה לקורס!<br />
            <span className="text-[#C49A8A]">הקורס בדרך אליך עכשיו</span>
          </h1>
          <p className="text-[#555] text-base leading-relaxed mb-6">
            שלחנו לך מייל עם פרטי הגישה לקורס גבות בקוויק.
            <br />
            <strong className="text-[#1A1A1A]">בדקי תיבת הדואר הנכנס — ואם לא רואה, בדקי גם ספאם.</strong>
          </p>
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl border border-[#E8CABB] px-6 py-4 shadow-sm">
            <span className="text-2xl">📩</span>
            <div className="text-right">
              <p className="text-[#1A1A1A] font-bold text-sm">הקורס נשלח למייל שלך</p>
              <p className="text-[#888] text-xs">אם לא הגיע תוך 5 דקות, בדקי ספאם</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HERO ── */}
      <section className="bg-white px-5 pt-10 pb-0 text-center">
        <div className="max-w-lg mx-auto">
          <p className="text-[#C49A8A] text-xs font-semibold tracking-widest uppercase mb-3">
            רגע לפני שאת עוזבת — הצעה חד פעמית
          </p>
          <h1 className="text-[#1A1A1A] text-3xl font-extrabold leading-tight mb-3">
            רוצה לדעת איך לעשות<br />
            <span className="text-[#C49A8A]">אומברה שלקוחות משתגעות עליה?</span>
          </h1>
          <p className="text-[#666] text-base leading-relaxed mb-6">
            טיפול של 15 דקות שמכניס לך עוד 70-100 ש״ח לתור.
            <br />מאותן לקוחות שכבר יושבות אצלך.
          </p>
        </div>

        {/* Hero image */}
        <div className="max-w-lg mx-auto rounded-2xl overflow-hidden shadow-md mb-0">
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
      <section className="bg-[#FAF7F4] px-5 py-12 text-center">
        <div className="max-w-lg mx-auto">
          <p className="text-[#888] text-sm mb-6">הסוד שאף אחת לא תגלה לך...</p>
          <div className="bg-white rounded-2xl shadow-sm border border-[#EEE] p-7 mb-6">
            <h2 className="text-[#1A1A1A] text-xl font-extrabold leading-tight mb-4">
              איך להפוך לקוחה שמשלמת 130 ש״ח
              <br />
              <span className="text-[#C49A8A]">ללקוחה שמשלמת 200-300 לתור?</span>
            </h2>
            <p className="text-[#555] text-sm leading-relaxed">
              מספיק שהוספת לחצי מהלקוחות שלך עוד 15 דק׳ של אומברה...
              <br /><br />
              <strong className="text-[#1A1A1A] text-base">את מרוויחה עוד 3,000 ש״ח בשקט.</strong>
              <br />
              <span className="text-[#888] text-xs">מאותה הלקוחה. בלי לקוחות חדשות.</span>
            </p>
          </div>
          <p className="text-[#555] text-sm leading-relaxed">
            ולהפוך יומן של 20 לקוחות בשבוע
            <br />
            <strong className="text-[#1A1A1A]">להכנסה של מעל 15,000 ש״ח בחודש.</strong>
          </p>
        </div>
      </section>

      {/* ── NAIL ART GALLERY ── */}
      <section className="bg-white px-5 py-10 text-center">
        <div className="max-w-lg mx-auto">
          <p className="text-[#888] text-xs uppercase tracking-widest mb-3">מה תלמדי בקורס</p>
          <h3 className="text-[#1A1A1A] text-xl font-bold mb-6">
            הטכניקות שתשלטי בהן — אומברה, ציורים, פרנץ׳
          </h3>
          <div className="rounded-2xl overflow-hidden shadow-md mb-4">
            <Image
              src="/ombre/collage.png"
              alt="טכניקות אומברה וציורים מהקורס"
              width={600}
              height={400}
              className="w-full object-cover"
            />
          </div>
          <p className="text-[#888] text-xs mt-2">חומרי הלימוד — שיטות וטכניקות שמלמדות בקורס</p>
        </div>
      </section>

      {/* ── PAIN ── */}
      <section className="bg-[#FAF7F4] px-5 py-12">
        <div className="max-w-lg mx-auto">
          <p className="text-[#1A1A1A] text-lg font-bold text-center mb-6">
            אני רוצה שתפסיקי להתיש את עצמך ב...
          </p>
          <div className="space-y-3 mb-8">
            {[
              'בזבוז שעות על יצירת תוכן ורילסים שלא מוכרים',
              'מריצה ליומן מלא ומוצאת את עצמך בסוף היום ריקה',
              'מלחמה לשמור את העסק מעל המים',
            ].map(item => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 shadow-sm">
                <span className="text-red-300 mt-0.5">✗</span>
                <p className="text-[#666] text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#FDF3EE] border border-[#E8CABB] rounded-2xl p-6 text-center">
            <p className="text-[#1A1A1A] text-base font-bold leading-relaxed">
              ״איך אפשר להרוויח יותר
              <br />
              <span className="text-[#C49A8A]">בלי לעבוד כל כך קשה?״</span>
            </p>
            <p className="text-[#888] text-sm mt-3">שאלתי את עצמי את זה אחרי שהגעתי ליומן מלא ונשברתי.</p>
          </div>
        </div>
      </section>

      {/* ── COURSE INTRO ── */}
      <section className="bg-white px-5 py-12 text-center">
        <div className="max-w-lg mx-auto">
          <p className="text-[#888] text-xs uppercase tracking-widest mb-3">תכירי את</p>
          <h2 className="text-[#1A1A1A] text-3xl font-extrabold mb-2">מאסטרית באומברה</h2>
          <p className="text-[#C49A8A] font-semibold text-base mb-6">
            ״15 דק׳ לאומברה שלקוחות ישלמו עליה פרימיום״
          </p>

          {/* Device mockup */}
          <div className="mb-6">
            <Image
              src="/ombre/mockup.png"
              alt="קורס מאסטרית באומברה על כל המכשירים"
              width={600}
              height={420}
              className="w-full object-contain"
            />
          </div>

          <p className="text-[#555] text-sm leading-relaxed">
            תוכנית דיגיטלית מצולמת עם 10 פרקים
            <br />
            שהולכת לקצר לך את הדרך להכנסה גבוהה יותר
            <br />
            <strong className="text-[#1A1A1A]">מבלי שתצטרכי להכניס עוד לקוחה אחת ליומן.</strong>
          </p>
        </div>
      </section>

      {/* ── LESSONS ── */}
      <section className="bg-[#FAF7F4] px-5 py-12">
        <div className="max-w-lg mx-auto">
          <p className="text-[#888] text-xs uppercase tracking-widest text-center mb-2">תוכן הקורס</p>
          <h3 className="text-[#1A1A1A] text-xl font-bold text-center mb-8">מה מחכה לך בפנים</h3>

          <div className="space-y-3">
            {[
              { num: 1, icon: '💅', text: 'היכרות עם עולם האומברה — מה נכון, מה לא, ואיך תיראי מקצועית מהרגע הראשון.' },
              { num: 2, icon: '✨', text: 'טכניקת האומברה המושלמת — שלבי הגרדיאנט A, B, C. תדעי בדיוק מה לעשות בכל שלב.' },
              { num: 3, icon: '🖌️', text: 'הכלים שאני עובדת איתם — סקירה מלאה של כל מה שצריך לאומברה מהירה ומדויקת.' },
              { num: 4, icon: '⚡', text: 'שיטות עבודה שפיתחתי — עבודה קלה, מהירה ובטוחה עם כל כלי.' },
              { num: 5, icon: '🎨', text: 'הפיגמנטים והצבעים — סקירה, שילובים, ואיך להגיע לתוצאה עמוקה ועמידה.' },
              { num: 6, icon: '💅', text: 'ציור אומברה שלב אחר שלב — השיטה שפיתחתי לתוצאה מושלמת ובטיחותית.' },
              { num: 7, icon: '🎬', text: 'טיפולים מלאים מהתחלה ועד הסוף — בצילום איכותי כמו שיעור פרטי.' },
              { num: 8, icon: '🌸', text: 'גבות וסגנונות שונים — איך להתנהל עם כל סוג ולא להיות מופתעת.' },
              { num: 9, icon: '🪄', text: 'שיקום גבות ואומברה — תחזירי ללקוחות את הביטחון העצמי.' },
              { num: 10, icon: '🎓', text: 'תעודה מקצועית מאקדמיית טליה בוזורגי — ההכרה שמגיעה לך.' },
            ].map(({ num, icon, text }) => (
              <div key={num} className="flex gap-3 bg-white rounded-xl px-4 py-4 shadow-sm items-start">
                <div className="w-8 h-8 rounded-full bg-[#FDF3EE] border border-[#E8CABB] flex items-center justify-center flex-shrink-0 mt-0.5 text-base">
                  {icon}
                </div>
                <p className="text-[#444] text-sm leading-relaxed">
                  <strong className="text-[#1A1A1A]">שיעור {num}: </strong>{text}
                </p>
              </div>
            ))}
          </div>

          {/* Certificate after lesson 10 */}
          <div className="mt-4 rounded-2xl overflow-hidden shadow-md border border-[#EEE]">
            <Image
              src="/ombre/certificate.png"
              alt="תעודת מאסטרית באומברה"
              width={600}
              height={420}
              className="w-full object-contain bg-white"
            />
          </div>
        </div>
      </section>

      {/* ── BONUSES ── */}
      <section className="bg-white px-5 py-12">
        <div className="max-w-lg mx-auto text-center">
          <Image
            src="/ombre/bonus.png"
            alt="בונוסים"
            width={120}
            height={120}
            className="mx-auto mb-4 object-contain"
          />
          <h3 className="text-[#1A1A1A] text-xl font-bold mb-1">רק רגע, זה לא הכל!</h3>
          <p className="text-[#888] text-sm mb-8">
            בנוסף לכל התוכן המטורף, את מקבלת
            <br />
            <strong className="text-[#1A1A1A]">3 בונוסים בשווי 597 ש״ח — חינם</strong>
          </p>

          <div className="space-y-4 text-right">
            {[
              {
                num: '01',
                title: 'הדרכת צביעת גבות',
                desc: 'מדריך והדגמה מפורטת — איך לצבע ללקוחות את הגבות להשלמת המראה. טיפול נוסף של 5 דק׳ שיגדיל עוד יותר את ההכנסה שלך.',
                value: '297',
              },
              {
                num: '02',
                title: 'הדרכת פרסום ושיווק ברשתות',
                desc: 'מה חשוב באמת כשמפרסמים, וכיצד לצלם עבודות בסגנון אינסטגרמי שגורם ללקוחות לרצות לבוא.',
                value: '150',
              },
              {
                num: '03',
                title: 'חוברת PDF מקצועית',
                desc: 'חוברת מלאה שעבדתי עליה חודשים — כל הידע בצורה הכי ברורה שיש. מוכנה להדפסה ותלווה אותך לתמיד.',
                value: '150',
              },
            ].map(({ num, title, desc, value }) => (
              <div key={num} className="bg-[#FAF7F4] border border-[#EEE] rounded-2xl p-5 flex gap-4">
                <span className="text-[#E8CABB] text-3xl font-extrabold flex-shrink-0 leading-none mt-0.5">{num}</span>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-[#1A1A1A] font-bold text-sm">{title}</h4>
                    <span className="text-[#CCC] text-xs line-through mr-2">₪{value}</span>
                  </div>
                  <p className="text-[#666] text-xs leading-relaxed mb-2">{desc}</p>
                  <span className="text-[#C49A8A] text-xs font-bold">✓ בשבילך: חינם</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#FAF7F4] px-5 py-12">
        <div className="max-w-lg mx-auto">
          <p className="text-[#888] text-xs uppercase tracking-widest text-center mb-2">מה אומרות התלמידות</p>
          <h3 className="text-[#1A1A1A] text-xl font-bold text-center mb-7">
            מניקוריסטיות שעשו את הקורס ומספרות
          </h3>

          <div className="space-y-4">
            {[
              {
                name: 'הודיה',
                role: 'מניקוריסטית, 4 שנות ניסיון',
                avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                text: 'צפיתי בכל הקורס בלילה אחד ולמחרת כבר עשיתי אומברה ראשונה ללקוחה. זה ממש לא מסובך כמו שחשבתי. עכשיו זה השירות שהכי מבקשים אצלי.',
              },
              {
                name: 'אדל',
                role: 'מניקוריסטית עצמאית',
                avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
                text: 'הייתי בטוחה שאני לא יודעת לצייר. טליה הסבירה את הגרדיאנט בצורה כל כך פשוטה שפתאום הכל הגיוני. כבר בתור השלישי יצא לי מושלם.',
              },
              {
                name: 'ליאן',
                role: 'מניקוריסטית ומעצבת ציפורניים',
                avatar: 'https://randomuser.me/api/portraits/women/76.jpg',
                text: 'מה שאהבתי הכי הרבה זה שהיא מראה כלי אחד אחד, לא מניחה שאת יודעת כלום. מרגישה כמו שיעור פרטי ממש. הוספתי 80 שח לכל תור בלי להתעייף.',
              },
              {
                name: 'נורית',
                role: 'מניקוריסטית, 2 שנות ניסיון',
                avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
                text: 'הייתי מפחדת שלקוחות לא ירצו לשלם יותר. בפועל? כל אחת שאני מציעה לה אומברה אומרת כן. עשיתי את הקורס בשבוע שעבר ואני כבר רואה הבדל בהכנסות.',
              },
              {
                name: 'ארטל',
                role: 'מניקוריסטית ועצמאית',
                avatar: 'https://randomuser.me/api/portraits/women/82.jpg',
                text: 'הבונוס של הפרסום שווה לבד את כל הקורס. צילמתי בדיוק כמו שטליה אמרה ויש לי רילס שקיבל המון צפיות. ממליצה בחום לכל מי שרצינית.',
              },
            ].map(({ name, role, avatar, text }) => (
              <div key={name} className="bg-white rounded-2xl shadow-sm border border-[#EEE] p-5">
                <div className="text-[#C49A8A] text-sm mb-3">★★★★★</div>
                <p className="text-[#444] text-sm leading-relaxed mb-4">{`״${text}״`}</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={avatar}
                    alt={name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="text-[#1A1A1A] font-bold text-sm">{name}</p>
                    <p className="text-[#AAA] text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE ── */}
      <section className="bg-white px-5 py-14 text-center">
        <div className="max-w-sm mx-auto">
          <p className="text-[#888] text-sm leading-relaxed mb-6">
            התוכן שאת מקבלת כאן הוא חלק מהכשרה פרונטלית
            שעולה כמה אלפי שקלים.
            <br /><br />
            המחיר המקורי:
          </p>
          <p className="text-[#CCC] text-2xl line-through mb-1">2,197 ש״ח</p>
          <p className="text-[#888] text-sm mb-6">
            אבל בגלל שכבר קנית ממני היום,
            <br />
            המחיר שלך הוא חד פעמי:
          </p>

          <div className="bg-[#FDF3EE] border-2 border-[#E8CABB] rounded-2xl px-8 py-8 mb-6">
            <p className="text-[#C49A8A] text-sm font-semibold mb-1">מחיר מיוחד לדף זה בלבד</p>
            <p className="text-[#1A1A1A] text-6xl font-extrabold mb-1">97<span className="text-3xl">₪</span></p>
            <p className="text-[#888] text-sm">או 2 תשלומים נוחים של 49 ש״ח</p>
            <p className="text-[#CCC] text-xs mt-2">*המחיר זמני ועלול לעלות ללא התראה</p>
          </div>

          <CtaButton />

          <p className="text-[#AAA] text-xs mt-3">
            דף סליקה מאובטח · תוך 15 שניות הקורס במייל
          </p>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="bg-[#FAF7F4] px-5 py-12">
        <div className="max-w-lg mx-auto">
          <h3 className="text-[#1A1A1A] text-xl font-bold text-center mb-6">למי זה מתאים?</h3>
          <div className="space-y-3">
            {[
              'למניקוריסטיות שרוצות להוסיף שירות שמשלמים עליו פרימיום.',
              'למי שיש לה לקוחות קיימות ורוצה להרוויח יותר מכל אחת.',
              'למי שחשבה שאומברה זה מסובך ורוצה לגלות שזה הכי קל שיש.',
              'לכל מי שרוצה תעודה מקצועית שמוסיפה אמינות לעסק.',
              'למי שמגיע לה יותר ויודעת את זה.',
            ].map(item => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 shadow-sm">
                <span className="text-[#C49A8A] mt-0.5 flex-shrink-0">✓</span>
                <p className="text-[#555] text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section className="bg-white px-5 py-12 text-center">
        <div className="max-w-sm mx-auto">
          <div className="text-5xl mb-4">🛡️</div>
          <h3 className="text-[#1A1A1A] text-xl font-bold mb-4">האחריות שלי</h3>
          <div className="bg-[#FAF7F4] border border-[#EEE] rounded-2xl p-6">
            <p className="text-[#555] text-sm leading-relaxed">
              צפית בכל התכנים ולא הצלחת ליישם כלום?
              <br /><br />
              <strong className="text-[#1A1A1A]">החזר כספי מלא עד 14 יום מיום הרכישה. ללא שאלות.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-[#1A1A1A] px-5 py-14 text-center">
        <div className="max-w-sm mx-auto">
          <p className="text-[#D4C5B5] text-sm leading-relaxed mb-6">
            אם הגעת עד לכאן, יש בך תשוקה אמיתית.
            <br /><br />
            את יכולה לצפות בכל התכנים בערב אחד
            <br />
            <strong className="text-white">וכבר למחרת להתחיל ליישם.</strong>
          </p>

          <div className="bg-white/5 border border-[#D4C5B5]/20 rounded-2xl px-6 py-6 mb-6">
            <p className="text-[#D4C5B5]/50 text-lg line-through mb-1">2,197 ש״ח</p>
            <p className="text-white text-5xl font-extrabold mb-1">97<span className="text-2xl">₪</span></p>
            <p className="text-[#D4C5B5]/60 text-sm">או 2 × 49 ש״ח</p>
          </div>

          <CtaButton label="כן, אני רוצה מאסטרית באומברה" />

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="block text-[#555] text-xs underline mt-4"
          >
            לא תודה, אני מוותרת על ההצעה
          </a>

          <p className="text-white font-bold text-xl mt-10">מאמינה בך, טליה ✨</p>
        </div>
      </section>

    </main>
  );
}
