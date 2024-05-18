
import Query from "@irys/query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Address } from "viem";
import { useAccount, useConfig } from "wagmi";
import Password3Contract, { VaultType } from "../Contract/Password3Contract";

const queryClient = 
        new Query({ url: 'https://arweave.devnet.irys.xyz/graphql'});
        
export default function ReadGate({vaultId}: {vaultId: number}) {
  const {address} = useAccount()
  const config = useConfig()
  const [vault, setVault] = useState<VaultType|null>(null)
  const [gate, setGate] = useState<any>()
  const [loading, setLoading] = useState(true)
  
  const contract = useMemo(() => new Password3Contract(config), [config]) 
  

  useEffect(() => {
    async function getGates(txId: string){
      const {data} = await axios.get(`https://devnet.irys.xyz/${txId}`)
      console.log(`result: ${JSON.stringify(data)}`)
      setGate(data)
      return data
    }
    async function getVaults(address: Address){
      const v = await contract.getVault(BigInt(vaultId))
      setVault(v)
      if(v){
        await getGates(v.entrypoint)
      }
      setLoading(false)
    }
    if(!address || !contract){
      return
    }
    setLoading(true)
    getVaults(address)
  }, [address, contract, vaultId])

  return (
    <>
      <div> {gate?.[0]} </div>
    </>
    

  )
}
