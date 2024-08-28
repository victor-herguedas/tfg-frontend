import { Providers } from './providers'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthComponent from './authComponent';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Aquí puedes agregar etiquetas dentro del head si es necesario */}
      </head>
      <body className={inter.className}>
        <Providers>
          <AuthComponent>
            {children}
          </AuthComponent>
        </Providers>
      </body>
    </html>
  );
}

