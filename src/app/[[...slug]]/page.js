import HomeContent from "@/components/HomeContent";

const defaultMetadata = {
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
    url: "https://cadiwakarpandey.com.np",
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

const metaMap = {
  about: {
    title: "About | Diwakar Pandey",
    description:
      "CA Diwakar Pandey is a Partner at K.B.P.S & Associates, Chartered Accountants. ICAI & ICAN member with expertise in auditing, taxation, and public finance management.",
  },
  services: {
    title: "Services | Diwakar Pandey",
    description:
      "Comprehensive financial services including auditing, tax compliance, financial consulting, business registration, risk assessment, and corporate advisory.",
  },
  experience: {
    title: "Experience | Diwakar Pandey",
    description:
      "CA Diwakar Pandey's professional and political journey — from article trainee to partner at K.B.P.S & Associates.",
  },
  testimonials: {
    title: "Testimonials | Diwakar Pandey",
    description:
      "What clients and colleagues say about working with CA Diwakar Pandey.",
  },
  blog: {
    title: "Blog | Diwakar Pandey",
    description:
      "Read blog posts by Diwakar Pandey on finance, auditing, politics, and public governance.",
  },
  contact: {
    title: "Contact | Diwakar Pandey",
    description:
      "Get in touch with CA Diwakar Pandey for consultations on auditing, taxation, financial advisory, and corporate services.",
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = slug?.[0];
  if (!s) return defaultMetadata;
  return { ...defaultMetadata, ...metaMap[s] };
}

export function generateStaticParams() {
  return [
    { slug: undefined },
    { slug: ["about"] },
    { slug: ["services"] },
    { slug: ["experience"] },
    { slug: ["testimonials"] },
    { slug: ["blog"] },
    { slug: ["contact"] },
    { slug: ["gallery"] },
  ];
}

export default function Page() {
  return <HomeContent />;
}
