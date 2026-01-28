import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JobNova - AI-Powered Job Board",
  description: "Future job market with AI-powered recommendations and digital human interactions",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full overflow-x-hidden">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 h-full w-full overflow-x-hidden`}>
        <div className="min-h-screen w-full overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
