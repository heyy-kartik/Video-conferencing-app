import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zoom",
  description: "Video Conferencing Appliaction Using webRTC & Nextjs ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <ClerkProvider
          appearance={{
            layout: {
              socialButtonsVariant: "iconButton",
              logoImageUrl: "/icons/yoom-logo.svg",
            },
            elements: {
              card: "rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)]",
              // Or if you need more control:
              // card: {
              //   borderRadius: "12px",
              //   boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              // }
            },
            variables: {
              colorText: "#fff",
              colorPrimary: "#0E78F9",
              colorBackground: "#1C1F2E",
              colorInputBackground: "#252A41",
              colorInputText: "#fff",
            },
          }}
        >
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-(--dark-1)`}
          >
            {children}

            <Toaster />
          </body>
        </ClerkProvider>
      </ThemeProvider>
    </html>
  );
}
