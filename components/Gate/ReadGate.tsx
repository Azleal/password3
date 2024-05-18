
import { readGates } from "@/app/irys/retriever";
import Query from "@irys/query";
import { useEffect, useMemo, useState } from "react";
import { Address } from "viem";
import { useAccount, useConfig } from "wagmi";
import Password3Contract, { VaultType } from "../Contract/Password3Contract";
import { GateData, GateType } from "./GateSetup";

const queryClient = 
        new Query({ url: 'https://arweave.devnet.irys.xyz/graphql'});
        

export default function ReadGate({vaultId}: {vaultId: number}) {
  const {address} = useAccount()
  const config = useConfig()
  const [vault, setVault] = useState<VaultType|null>(null)
  const [gate, setGate] = useState<GateData>()
  const [rest, setRest] = useState<any[]>()
  const [encryptInfo, setEncryptInfo] = useState<any>()
  const [loading, setLoading] = useState(true)
  
  const contract = useMemo(() => new Password3Contract(config), [config]) 
  

  useEffect(() => {
    
    async function getVaults(address: Address){
      const v = await contract.getVault(BigInt(vaultId))
      setVault(v)
      if(v && v.entrypoint){
        const {first, rest, ..._encryptInfo} = await readGates(v.id, v.entrypoint)
        console.log(`first gate: ${JSON.stringify(first)}, rest: ${rest}`)
        
        setGate(first)
        setRest(rest)
        setEncryptInfo(_encryptInfo)
        // const secondJson = rest[0]
        // console.log(`second rest[0]: ${secondJson.data}`)
        // const secondGate = await decryptGateData(Buffer.from(secondJson.data), hashMessage('123') , encryptInfo.iv, encryptInfo.salt)
        // console.log(`gate2 decrypted: ${JSON.stringify(secondGate)}`)

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
      <div> {gate?.type === GateType.PASSCODE ? (
        // <PassGate  />
        <></>
      ) : (
        <></>
      )} </div>
    </>
    

  )
}
