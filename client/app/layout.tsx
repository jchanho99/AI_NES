import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ChatbotModal from "@/components/chatbot_modal";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-NES",
  description: "OSS Project",
  icons: {
    icon: "favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classNames(inter.className, 'bg-gray-800/95')}>
        <Navbar />
        {children}
        <ChatbotModal />
        <Footer />
      </body>
    </html>
  );
}


