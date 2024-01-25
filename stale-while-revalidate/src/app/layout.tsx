import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SWRProvider from "@/providers/swr-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stale While Revalidate",
  description: "test library Stale While Revalidate (SWR)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <SWRProvider> */}
          {children}
        {/* </SWRProvider> */}
      </body>
    </html>
  );
}
