import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: {
    template: '%s | Social App',
    default: 'Social App', // a default is required when creating a template
  },
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased",fontSans.variable)}>
          {children}
          <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
