import "@/styles/globals.css";

import { Inter } from "next/font/google";
import NextAuthProvider from "./NextAuthProvider";
import OsuProvider from "./OsuProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <OsuProvider>
          <body className={`font-sans ${inter.variable}`}>{children}</body>
        </OsuProvider>
      </NextAuthProvider>
    </html>
  );
}
