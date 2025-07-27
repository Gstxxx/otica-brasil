"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import MainLayout from "@/layouts/MainLayout";
import { metadataInfo as metadata } from "@/layouts/metadata";

export const metadataInfo = metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const isCustomer = pathname.startsWith("/my-area");

  if (isDashboard || isCustomer) {
    <html lang="pt-br">
      <body className={`antialiased`}>{children}</body>
    </html>;
  }

  return (
    <html lang="pt-br">
      <body className={`antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
