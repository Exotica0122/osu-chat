import "@/styles/globals.css";

import { Inter } from "next/font/google";
import NextAuthProvider from "./NextAuthProvider";
import OsuProvider from "./OsuProvider";
import { ThemeProvider } from "./ThemeProvider";
import { Header } from "@/components/header";

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
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={`font-sans ${inter.variable}`}>
        <NextAuthProvider>
          <OsuProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
            </ThemeProvider>
          </OsuProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
