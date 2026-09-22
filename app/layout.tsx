import type { Metadata } from "next";
import { Prompt, Rubik } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jidapa | Resume&Portfolio",
  description: "Jidapa's personal resume and portfolio",
};

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="th"
  className={`${rubik.variable} ${prompt.variable} h-full antialiased`}
>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}