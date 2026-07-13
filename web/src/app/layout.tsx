import type { Metadata } from "next";
import { Noto_Serif_SC, ZCOOL_XiaoWei } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const display = ZCOOL_XiaoWei({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Noto_Serif_SC({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "文径 · IBDP 中文语言与文学",
  description:
    "IBDP 中文语言与文学交互站点：文本精读、手法识别、分析写作与学习进度 Tracker。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${display.variable} ${body.variable} antialiased site-shell`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
