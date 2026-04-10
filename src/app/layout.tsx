import type { Metadata } from "next";
import { siteMetadata } from "@/lib/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: [...siteMetadata.keywords],
  metadataBase: new URL(siteMetadata.siteUrl),
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    type: "website",
    images: [{ url: "/durian-react-social.png" }],
  },
  twitter: {
    card: "summary",
    creator: siteMetadata.twitter,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ["/durian-react-social.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
