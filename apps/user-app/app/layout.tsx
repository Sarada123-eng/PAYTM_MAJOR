import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "../provider";
import { AppbarClient } from "../components/AppbarClient";

const inter = localFont({
  src: [
    {
      path: "/fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
            <AppbarClient />
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
