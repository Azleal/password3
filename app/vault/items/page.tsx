'use client'

import { useRouter } from "next/navigation";
import VaultTip from "./components/VaultTip"
import ItemBlock from "./components/ItemBlock"
import style from "./index.module.css";
export default function OpenVault() {
    const router = useRouter()
    const handleClickItem = () => {
        console.log(`OpenVault: handleClickItem, item:`)
    }

    return (
        <div className={style.page}>
            <div className={style.content} >
                <VaultTip onEvent={handleClickItem} title="钱包1" />
                <ItemBlock onEvent={handleClickItem} itemList={[]} />
            </div>
        </div>

    )
}
