import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppinsFont = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const DMSansFont = DM_Sans({
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Event Management",
  description: "Provides your wonderful events manageable!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppinsFont.variable} ${DMSansFont.variable} antialiased`}
      >
        <main>{children}</main>
        <FooterSection />
      </body>
    </html>
  );
}
