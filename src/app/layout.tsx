import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";
import Header from "@/components/layout/Header";
import MotionProvider from "@/components/layout/MotionProvider";
import IgnitionSequence from "@/components/interactive/IgnitionSequence";
import { Analytics } from "@vercel/analytics/react";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${profile.name}`,
    default: `${profile.name} | ${profile.about.headline}`,
  },
  description: profile.about.summary,
  metadataBase: new URL('https://forged.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://forged.dev',
    siteName: profile.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} | ${profile.about.headline}`,
    description: profile.about.summary,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": profile.name,
  "jobTitle": "Software Engineer",
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "VIT-AP"
  },
  "sameAs": [
    profile.links.linkedin,
    profile.links.github
  ].filter(link => link !== 'TODO' && link !== '')
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${ibmPlexMono.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Standard view check
                if (localStorage.getItem('standardView') === 'true') {
                  document.documentElement.setAttribute('data-view', 'standard');
                }
                // Theme check
                const theme = localStorage.getItem('theme');
                if (theme === 'light' || (!theme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.classList.add('light');
                }
                // Intro animation check
                if (!localStorage.getItem('forged:intro:v2') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                  document.documentElement.setAttribute('data-intro', 'play');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col overflow-x-hidden">
        <IgnitionSequence />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <a href="/standard" className="skip-link" style={{ top: '-40px', left: '160px' }}>Skip to standard view</a>
        <Header />
        <main id="main-content" className="flex-grow">
          <MotionProvider>
            {children}
          </MotionProvider>
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
