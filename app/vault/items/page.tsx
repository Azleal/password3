'use client'

import Password3Contract, { BigIntReplacer, VaultType } from "@/components/Contract/Password3Contract";
import { readVaultItems } from "@/tools/irys/retriever";
import { uploadVaultItem } from "@/tools/irys/uploader";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useAccount, useConfig } from "wagmi";
import AddItemBlock from "./components/AddItemBlock";
import ItemBlock from "./components/ItemBlock";
import VaultTip from "./components/VaultTip";
import style from "./index.module.css";
function VaultItems() {
    const [open, SetOpen] = useState(false)
    const [itemList, setItemList] = useState<ItemBlockType[][]>([])
    const { address } = useAccount()
    const searchParams = useSearchParams()
    const _vaualtId = searchParams.get("vault")
    const _key = searchParams.get("key")
    const vaultId = _vaualtId ? Number(_vaualtId) : null;
    console.log(`OpenVault: vaultId:`, vaultId, address, _key)


    const config = useConfig()
    const [vaults, setVaults] = useState<VaultType>()
    const [loading, setLoading] = useState(true)

    const contract = useMemo(() => new Password3Contract(config), [config])


    useEffect(() => {
        if (!contract || !vaultId) { // Add a check for vaults
            return
        }
        setLoading(true)
        getDecryptedData()
        !vaults && getVault(vaultId)
    }, [address, contract, vaults]) // Include vaults in the dependency array


    async function getVault(vaultId: number) {
        try {
            const vault = await contract.getVault(BigInt(vaultId))
            console.log(`getVault===: ${vaultId}`)
            if (!vault) {
                return
            }
            console.log(`useeffect vault: ${JSON.stringify(vault, BigIntReplacer)}`)
            setVaults(vault)
        } catch (error) {
            console.error("Error fetching vault:", error)
            // Handle error here
        } finally {
            setLoading(false)
        }
    }

    const getDecryptedData = async () => {
        if (!vaultId || !address || !_key) {
            return
        }
        const decryptedData = await readVaultItems(vaultId, address, _key)
        console.log(`OpenVault: decryptedData:`, decryptedData)
    }


    const handleClickItem = () => {
        SetOpen(true)
        console.log(`OpenVault: handleClickItem`)
    }
    const handleAddItem = (isOpen: boolean, list: ItemBlockType[]) => {
        SetOpen(isOpen)
        if (!list.length) {
            return
        }
        const data = JSON.stringify(list)
        console.log(`OpenVault: handleAddItem`, data)
        if (vaultId && _key) {
            uploadVaultItem(vaultId, _key, data)
        }
        setItemList([...itemList, list])
    }

    function handleUpload() {
        console.log(`OpenVault: handleUpload`, itemList)
        const data = JSON.stringify(itemList)
    }

    return (
        <Suspense>
            <div className={style.page}>
                <div className={style.content} >
                    <VaultTip onEvent={handleClickItem} title={vaults?.title} />
                    <ItemBlock onEvent={handleClickItem} itemList={itemList} />

                    <div className={style.upload}>
                        <button onClick={handleUpload}>上传</button>
                    </div>

                </div>
                {open && <AddItemBlock onEvent={handleAddItem} />}
            </div>
        </Suspense>

    )
}


export default function SupressedVaultItems(){
  return (
    <Suspense>
      <VaultItems/>
    </Suspense>
  )
}