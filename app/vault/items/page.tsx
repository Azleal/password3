'use client'

import { BigIntReplacer, VaultType } from "@/components/Contract/Password3Contract";
import usePasswordContract from "@/components/Contract/usePasswordContract";
import useKeyStorage from "@/components/Storage/useKeyStorage";
import { readVaultItems } from "@/tools/irys/retriever";
import { uploadVaultItem } from "@/tools/irys/uploader";
import { Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";
import AddItemBlock from "./components/AddItemBlock";
import ItemBlock from "./components/ItemBlock";
import VaultTip from "./components/VaultTip";
import style from "./index.module.css";
function VaultItems() {

    const [open, SetOpen] = useState(false)
    const [itemList, setItemList] = useState<ItemBlockType[][]>([])
    const { address } = useAccount()
    const searchParams = useSearchParams()
    const vaultId = searchParams.get("vault") ? Number(searchParams.get("vault")) : null;

    const [vault, setVault] = useState<VaultType>()
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const contract = usePasswordContract()
    const {loaded, keyStorage} = useKeyStorage()

    const keyStorageMemo = useMemo(() => keyStorage, [keyStorage])

    useEffect(() => {
      async function getVault(vaultId: number) {
        try {
            const vault = await contract.getVault(vaultId)
            if (!vault) {
                return
            }
            console.log(`query vault[${vaultId}]: ${JSON.stringify(vault, BigIntReplacer)}`)
            setVault(vault)
        } catch (error) {
            console.error("Error fetching vault:", error)
        } finally {
            setLoading(false)
        }
      }
      if(!vaultId || !contract){
        return
      }
      getVault(vaultId)
    }, [vaultId, contract])


    useEffect(() => {
      if (!contract || !vault || !loaded) { // Add a check for vaults
        return
      }
      async function getDecryptedData (vault: VaultType, vaultKey: string ) {
        if (!vault) {
            return
        }
        const {id, owner} = vault
        try {
            const decryptedData = await readVaultItems(id, owner as Address, vaultKey)
            console.log(`OpenVault: decryptedData:`, decryptedData)
            if (decryptedData.length > 0) {
                setItemList([...decryptedData])
            }
        } finally {
            setLoading(false)
        }
      }
      const {id: vaultId} = vault
      const vaultKey = keyStorageMemo.get(vaultId)
      console.log(`OpenVault: vaultId: ${vaultId}, with key ${vaultKey}`)
      setLoading(true)
      getDecryptedData(vault, vaultKey)
    }, [address, contract, loaded, vault, keyStorageMemo]) // Include vaults in the dependency array


    const handleClickItem = (type: string) => {
        console.log(`OpenVault: handleClickItem`)
        if (type === 'add') {
            SetOpen(true)
        } else {
            router.push(`/vault/items/view?vault=${vaultId}`)

        }
    }
    const handleAddItem = (isOpen: boolean, list: ItemBlockType[]) => {
        SetOpen(isOpen)
        if (!list.length) {
            return
        }
        const data = JSON.stringify(list)
        console.log(`OpenVault: handleAddItem`, data)
        if (vaultId) {
            const vaultKey = keyStorageMemo.get(vaultId)
            uploadVaultItem(vaultId, vaultKey, data)
        }
        setItemList([...itemList, list])
    }

    return (
        <Spin spinning={loading} size="large">
            <div className={style.page}>
                <div className={style.content} >
                    <VaultTip onEvent={handleClickItem} type='edit' title={vault?.title} />
                    <ItemBlock onEvent={() => { }} itemList={itemList} />
                </div>
                {open && <AddItemBlock onEvent={handleAddItem} />}
            </div>
        </Spin>

    )
}


export default function SupressedVaultItems() {
    return (
        <Suspense>
            <VaultItems />
        </Suspense>
    )
}