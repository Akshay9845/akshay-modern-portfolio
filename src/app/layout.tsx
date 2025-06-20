import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: "Akshay Kumar S - AI & Data Science Engineer",
  description: "AI & Data Science Engineer specializing in GPT-driven product design and real-time intelligent systems. Expert in Three.js, Next.js, and AI-powered applications.",
  keywords: ["AI Engineer", "Data Science", "GPT", "Three.js", "Next.js", "Machine Learning", "Web Development"],
  authors: [{ name: "Akshay Kumar S" }],
  robots: "index, follow",
  openGraph: {
    title: "Akshay Kumar S - AI & Data Science Engineer",
    description: "AI & Data Science Engineer specializing in GPT-driven product design and real-time intelligent systems.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Akshay Kumar S" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="apple-touch-icon" sizes="180x180" href="/portfolio pic.JPG" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
