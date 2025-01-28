
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
       
        <ConvexClientProvider>

         
            <Provider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
              >
              
            {children}
            <Toaster />
            </Provider>
              </ConvexClientProvider>
         
       
      </body>
    </html>
  );
}


