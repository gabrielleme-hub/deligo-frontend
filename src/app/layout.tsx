"use client";

import "./globals.css";
import { Poppins, Roboto } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { AdminProvider } from "@/context/AdminContext";
import { SearchProvider } from "@/context/SearchContext";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Crie o QueryClient apenas uma vez
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable}`}>
        <QueryClientProvider client={queryClient}>
          <AdminProvider>
            <SearchProvider>
              <CartProvider>{children}</CartProvider>
            </SearchProvider>
          </AdminProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
