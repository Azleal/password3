'use client'
import { VaultType } from "@/components/Contract/Password3Contract";
import usePasswordContract from "@/components/Contract/usePasswordContract";
import NoVault from "@/components/Vault/NoVault";
import VaultList from "@/components/Vault/VaultList";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";

export default function Vault() {
  const {address} = useAccount()
  // const config = useConfig()
  const [vaults, setVaults] = useState<VaultType[]>([])
  const [loading, setLoading] = useState(true)
  const contract = usePasswordContract()
  
  // const contract = useMemo(() => new Password3Contract(config), [config]) 
  
  useEffect(() => {
    async function getVaults(address: Address){
      const v = await contract.getUserVaults(address)
      setVaults(v)
      setLoading(false)
    }
    if(!address || !contract){
      return
    }
    setLoading(true)
    getVaults(address)
  }, [address])

  if(loading){
    return (<div className="flex flex-row w-full h-full align-middle justify-center items-center">
      <Spin spinning={loading} size="large"></Spin>
    </div>)
  }

  return (
    <>
    {
      vaults.length > 0 ? (<><VaultList vaults={vaults} /></>) : (<><NoVault /></>)
    }
    </>
  )
}
