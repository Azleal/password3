'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from "next/image";

export default function Header() {
  return (
    <div className="h-24 flex flex-row justify-center items-center align-middle text-base text-white">
        <div className="gap-2 flex flex-row  w-1/5 justify-center">
          <Image
              src="/logo.png"
              alt="Password3 Logo"
              width={24}
              height={24}
              priority
            />
          Password
        </div>
        <div className="flex flex-row w-3/5">
        </div>
        <div className="flex flex-row w-1/5">
          <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address"/>
        </div>
    </div>
  )
}
