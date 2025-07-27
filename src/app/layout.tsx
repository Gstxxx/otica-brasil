import "./globals.css";
import type { Metadata } from "next";
import MainLayout from "@/layouts/MainLayout";
import ClientAuthProvider from "@/components/ClientAuthProvider";

export const metadata: Metadata = {
  title: "Otica Brasil",
  description: "Sua otica no sul do estado",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`antialiased`}>
        <ClientAuthProvider>
          <MainLayout>{children}</MainLayout>
        </ClientAuthProvider>
      </body>
    </html>
  );
}
