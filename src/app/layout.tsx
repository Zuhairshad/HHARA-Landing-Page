import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HHARA · Unapologetically You",
  description:
    "She moves before the world notices. HHARA was made for her, without apology, without compromise. Fashion with purpose. Every piece gives back.",
  openGraph: {
    title: "HHARA · Unapologetically You",
    description:
      "Fashion with purpose. Every piece gives back. Request early access to the HHARA Circle.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
