import { Nanum_Gothic, Noto_Sans_KR } from "next/font/google";
import "./fonts.css";

/** Preview fonts for Style Inspector — chrome stays on root Geist. */
const notoSansKr = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-kr",
  preload: false,
});

const nanumGothic = Nanum_Gothic({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nanum-gothic",
  preload: false,
});

export default function GeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${notoSansKr.variable} ${nanumGothic.variable}`}>
      {children}
    </div>
  );
}
