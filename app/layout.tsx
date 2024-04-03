import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {Providers} from "./providers";
import Navbar from "./components/Navbar";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "raffleX",
  description: "Sell NFTs as raffles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-base-200">
      <body className={`${inter.className} bg-base-200`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
