import Header from '@/components/Header';
import '@rainbow-me/rainbowkit/styles.css';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import style from "./layout.module.css";
import { Providers } from './providers';
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Password3",
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
            <div className={style.main_layout}>
                <Header />
                {children}
                <Analytics />
                <div className={style.main_bg}>
                    <Image
                        width={184}
                        height={193}
                        className={style.image_1}
                        alt="image_1"
                        src="/bg/bg1.png"
                        />
                    <Image
                    className={style.image_2}
                        width={152}
                        height={270}
                        alt="image_2"
                        src="/bg/bg2.png"
                    />
                </div>
            </div>
 
          </Providers>

        </body>
    </html>
  );
}
