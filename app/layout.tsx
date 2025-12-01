import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Optimize font loading
  preload: true,
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
})

const siteUrl = "https://www.wuvezye.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wuvè Zyé – Défense des consommateurs en Martinique",
    template: "%s – Wuvè Zyé",
  },
  description:
    "Association militante de défense des consommateurs basée en Martinique. On informe, on accompagne, on lance des actions collectives — pour les Martiniquais et la diaspora.",
  keywords: [
    "consommateurs",
    "Martinique",
    "RGPD",
    "défense",
    "droits",
    "association",
    "Antilles",
    "Guadeloupe",
    "diaspora",
    "protection données",
    "actions collectives",
    "litiges",
    "mawonerie",
  ],
  authors: [{ name: "Wuvè Zyé", url: siteUrl }],
  creator: "Wuvè Zyé",
  publisher: "Wuvè Zyé",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "fr-FR": siteUrl,
      "fr-MQ": siteUrl,
    },
  },
  openGraph: {
    title: "Wuvè Zyé – Défense des consommateurs en Martinique",
    description:
      "Association militante de défense des consommateurs basée en Martinique. On informe, on accompagne, on lance des actions collectives.",
    url: siteUrl,
    siteName: "Wuvè Zyé",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wuvè Zyé – Défense des consommateurs en Martinique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wuvè Zyé – Défense des consommateurs en Martinique",
    description:
      "Association militante de défense des consommateurs basée en Martinique.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add Google Search Console verification if needed
    // google: "your-verification-code",
  },
  category: "Association",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#18181b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

// JSON-LD Structured Data for Organization
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wuvè Zyé",
  alternateName: "Wuve Zye",
  url: siteUrl,
  logo: `${siteUrl}/wuvezye-logo.svg`,
  description:
    "Association loi 1901 de défense des consommateurs basée à Fort-de-France, Martinique.",
  foundingDate: "2006",
  address: {
    "@type": "PostalAddress",
    streetAddress: "23 rue Victor Schoelcher",
    addressLocality: "Fort-de-France",
    postalCode: "97200",
    addressRegion: "Martinique",
    addressCountry: "FR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "wuvezye@gmail.com",
    contactType: "customer service",
    availableLanguage: ["French", "Creole"],
  },
  sameAs: [
    // Add social media URLs when available
    // "https://www.facebook.com/wuvezye",
    // "https://www.instagram.com/wuvezye",
  ],
  areaServed: [
    {
      "@type": "Place",
      name: "Martinique",
    },
    {
      "@type": "Place",
      name: "Guadeloupe",
    },
    {
      "@type": "Place",
      name: "France",
    },
  ],
  knowsAbout: [
    "Consumer Rights",
    "GDPR",
    "Data Protection",
    "Consumer Advocacy",
    "Class Actions",
  ],
}

// JSON-LD for WebSite with search
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Wuvè Zyé",
  url: siteUrl,
  description:
    "Association militante de défense des consommateurs basée en Martinique.",
  inLanguage: ["fr", "en", "es", "pt"],
  publisher: {
    "@type": "Organization",
    name: "Wuvè Zyé",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground"
            >
              Aller au contenu principal
            </a>
            <Header />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
