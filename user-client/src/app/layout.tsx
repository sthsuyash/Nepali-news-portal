import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Nepali Manch",
  description: "Nepali Manch is a online nepali news portal",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body
        className={poppins.className}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
