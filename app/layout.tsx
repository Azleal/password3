import Header from '@/components/Header';
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Password3 App",
  description: "Protect your password securely",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`min-h-screen flex flex-col`}>
         <Providers>
            <Header />
            <main>
              {children}
            </main>
          </Providers>
        </body>
    </html>
  );
}
