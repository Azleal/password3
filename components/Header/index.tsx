'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from "next/image";
import Link from "next/link";
import style from "./index.module.css";

export default function Header() {
  return (
    <div className={style.header_content}>
        <Link href="/"  className={style.header_link}>
          <Image
            className={style.header_image}
              src="/logo.png"
              alt="Password3 Logo"
              width={24}
              height={24}
              priority
            />
          Password3
        </Link>
 
        <div className={style.connect}>
          <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address"/>
        </div>
    </div>
  )
}
