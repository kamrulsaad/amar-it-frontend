import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";

const inter = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Amar IT",
  description: "The best internet service provider",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  );
}
