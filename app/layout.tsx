import Header from '@/components/Header';
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';
import Image from "next/image";
import style from "./layout.module.css";
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
            <div className={style.main_layout}>
                <Header />
                {children}
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
