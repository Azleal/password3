'use client'

import { useRouter } from "next/navigation";
import VaultTip from "./components/VaultTip"
import ItemBlock from "./components/ItemBlock"
import AddItemBlock from "./components/AddItemBlock"
import style from "./index.module.css";
import { useState } from "react";
export default function OpenVault() {
    const router = useRouter()
    const [open, SetOpen] = useState(false)
    const handleClickItem = () => {
        SetOpen(true)
    }
    const handleAddItem = (isOpen:boolean,list: ItemBlockType[]) => {
        console.log(`OpenVault: handleAddItem, list:`, list)
        SetOpen(isOpen)
    }

    return (
        <div className={style.page}>
            <div className={style.content} >
                <VaultTip onEvent={handleClickItem} title="钱包" />
                <ItemBlock onEvent={handleClickItem} itemList={[]} />
            </div>
            {open&&<AddItemBlock onEvent={handleAddItem}  />}
        </div>

    )
}
