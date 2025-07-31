import { Geist, Geist_Mono, Poppins, DM_Sans } from "next/font/google";
import "./globals.css";
import FooterSection from "@/components/FooterSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import AuthProvider from "./components/AuthProvider";
import Navbar from "@/components/NavBar";

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
  // const initialize = useAuthStore((state) => state.initialize);

  // useEffect(() => {
  //   initialize();
  // }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppinsFont.variable} ${DMSansFont.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main>
            <ToastContainer />
            {children}
          </main>
          <FooterSection />
        </AuthProvider>
      </body>
    </html>
  );
}
