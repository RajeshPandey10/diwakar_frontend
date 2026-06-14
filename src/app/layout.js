import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AOSInit from "@/components/shared/AOSInit";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://cadiwakarpandey.com.np";

export const metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/favicon.png',
  },
  title: {
    default: "Diwakar Pandey | Chartered Accountant",
    template: "%s | Diwakar Pandey",
  },
  description:
    "Chartered Accountant (CA) with Certificate of Practice (COP), Partner at K. B. P. S. & Associates. Expert in auditing, taxation, and public finance management.",
  keywords: [
    "Chartered Accountant",
    "CA Nepal",
    "Diwakar Pandey",
    "K.B.P.S & Associates",
    "Auditing",
    "Taxation",
    "Public Finance",
  ],
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
  openGraph: {
    title: "Diwakar Pandey | Chartered Accountant",
    description:
      "Chartered Accountant (CA) with Certificate of Practice (COP), Partner at K. B. P. S. & Associates.",
    url: siteUrl,
    siteName: "Diwakar Pandey",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diwakar Pandey | Chartered Accountant",
    description:
      "Chartered Accountant (CA) with Certificate of Practice (COP), Partner at K. B. P. S. & Associates.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Diwakar Pandey",
  jobTitle: "Chartered Accountant",
  worksFor: {
    "@type": "Organization",
    name: "K. B. P. S. & Associates",
  },
  description:
    "Chartered Accountant (CA) with Certificate of Practice (COP), Partner at K. B. P. S. & Associates. Expert in auditing, taxation, and public finance management.",
  url: siteUrl,
  knowsAbout: ["Auditing", "Taxation", "Public Finance Management"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#fafbfc] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ToastContainer position="top-right" theme="light" toastClassName="!text-sm !font-medium !rounded-xl" />
        <AOSInit />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
