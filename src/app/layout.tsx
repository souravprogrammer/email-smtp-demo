import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Email SMTP validator",
  description: `Utilise our Email SMTP validator to determine if an email address is real.
   detects potential bounces and bogus emails without ever sending one.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-900 dark`}>
        {children}
      </body>
    </html>
  );
}
