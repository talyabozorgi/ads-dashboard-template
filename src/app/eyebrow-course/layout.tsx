import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'קורס עיצוב גבות דיגיטלי | טליה בוזורגי — הוסיפי 2,500-4,000₪ לחודש',
  description: 'קורס דיגיטלי לקוסמטיקאיות ומניקוריסטיות: למדי לעצב גבות מקצועי ב-15 דקות, עם שיטת הקוויק. 427 בוגרות, ערובה 14 יום, גישה מיידית. מחיר השקה 197₪.',
  openGraph: {
    title: 'הוסיפי 2,500-4,000₪ לחודש — בלי אף לקוחה חדשה',
    description: 'קורס עיצוב גבות דיגיטלי לקוסמטיקאיות ומניקוריסטיות. שיטת הקוויק — 15 דקות, 70-90₪ לטיפול, 427 בוגרות. מחיר השקה 197₪ בלבד.',
    url: 'https://talyaacademy.co.il/eyebrow-course',
    siteName: 'Talya Academy',
    images: [
      {
        url: '/talya-pro.jpg',
        width: 1200,
        height: 630,
        alt: 'קורס עיצוב גבות — טליה בוזורגי',
      },
    ],
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'קורס עיצוב גבות דיגיטלי | 197₪ בלבד',
    description: 'הוסיפי 2,500-4,000₪ לחודש ללא לקוחות חדשות. שיטת הקוויק — 15 דקות לטיפול.',
    images: ['/talya-pro.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EyebrowCourseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
