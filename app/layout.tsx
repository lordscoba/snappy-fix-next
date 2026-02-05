import "./globals.css";
import "animate.css";

import type { Metadata } from "next";
import Footer from "../components/Layout/Footer";

export const metadata: Metadata = {
  title: "Snappy-fix Tech",
  description: "Snappy-fix Technologies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
