import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter_Tight, Instrument_Serif, Roboto } from "next/font/google";
import "./globals.css";

const sans = Inter_Tight({
  variable: "--font-sans-body",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-serif-accent",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

/** The app itself uses Roboto, so the drawn phone screens do too. */
const appFont = Roboto({
  variable: "--font-app",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:43123";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Relay: Give Grok a phone.",
    template: "%s · Relay",
  },
  description:
    "Relay forwards the texts and notifications you pick to Grok. Free for Android.",
  applicationName: "Relay",
  authors: [{ name: "Alvee Alam", url: "https://www.linkedin.com/in/alvee-alam" }],
  creator: "Alvee Alam",
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "Relay: Give Grok a phone.",
    description:
      "Relay forwards the texts and notifications you pick to Grok, so your AI finally knows what's going on.",
    type: "website",
    locale: "en",
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable} ${appFont.variable} h-full antialiased`}>
      <body className="flex min-h-dvh flex-col bg-[#050507] text-white">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
