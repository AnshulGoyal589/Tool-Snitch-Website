import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Provider from "@/provider";
import { NavigationBar } from "@/components/private/navbar";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Tool Snitch",
    template: "%s | Tool Snitch",
  },
  description: "A platform for managing and tracking tools and equipment",
  keywords: ["tools", "equipment", "management", "tracking"],
  authors: [{ name: "Your Name" }],
  robots: "index, follow",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body 
        className="antialiased min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <NavigationBar />
        <Provider>
          <main className="flex-1">
            {children}
          </main>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}