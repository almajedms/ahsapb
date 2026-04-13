import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoKufi = Noto_Kufi_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "بينتبول الأحساء | Ahsa Paintball",
  description:
    "أفضل تجربة بينتبول في الأحساء والمنطقة الشرقية. احجز ملعبك عبر الإنترنت، اختر باقتك، وأطلق العنان للمتعة مع فريقك.",
  keywords: "paintball, بينتبول, الأحساء, Ahsa, booking, حجز, arena, ملعب, Saudi Arabia, المملكة العربية السعودية",
  openGraph: {
    title: "بينتبول الأحساء | Ahsa Paintball",
    description: "أفضل تجربة بينتبول في الأحساء والمنطقة الشرقية. احجز الآن!",
    url: "https://ahsapb.com",
    siteName: "بينتبول الأحساء",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "بينتبول الأحساء | Ahsa Paintball",
    description: "أفضل تجربة بينتبول في الأحساء والمنطقة الشرقية. احجز الآن!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // dir and lang are set dynamically by LanguageContext on client
    // Default to ar/rtl for SSR
    <html lang="ar" dir="rtl" className={`${geist.variable} ${notoKufi.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-[#080808] text-[#f5f5f5] font-[family-name:var(--font-arabic)]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
