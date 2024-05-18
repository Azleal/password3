
import { decryptWithIv } from "@/app/utils/encryption";
import Query from "@irys/query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Address } from "viem";
import { useAccount, useConfig } from "wagmi";
import Password3Contract, { VaultType } from "../Contract/Password3Contract";

const queryClient = 
        new Query({ url: 'https://arweave.devnet.irys.xyz/graphql'});
        
async function decryptGateData(data: string, password: string, iv: string, salt: string){
  const bufferData = JSON.parse(data)
  console.log(`data:${JSON.stringify(data)}, iv: ${iv}, salt: ${salt}, password: ${password}, bufferData: ${bufferData}`)
  const text = await decryptWithIv(password, iv, salt, bufferData)
  console.log(`decrypted text: ${text}`)
  return text
}

export default function ReadGate({vaultId}: {vaultId: number}) {
  const {address} = useAccount()
  const config = useConfig()
  const [vault, setVault] = useState<VaultType|null>(null)
  const [gate, setGate] = useState<any>()
  const [iv, setIv] = useState<string>("")
  const [salt, setSalt] = useState<string>("")
  const [loading, setLoading] = useState(true)
  
  const contract = useMemo(() => new Password3Contract(config), [config]) 
  

  useEffect(() => {
    async function getGates(txId: string){
      try{
      const {data} = await axios.get(`https://devnet.irys.xyz/${txId}`)
      console.log(`result: ${JSON.stringify(data)}`)
      setGate(data)
      const {data:{tags}} : {data: {tags: { name: string, value: string }[]}}  = await axios.get(`https://devnet.irys.xyz/tx/${txId}`)
      const iv = tags.filter(e => e["name"] === 'iv')[0].value
      const salt = tags.filter(e => e["name"] === 'salt')[0].value
      setIv(iv)
      setSalt(salt)
      console.log(`iv: ${iv}, salt: ${salt}`)

      const plaintext = await decryptGateData(data[0], '123', iv, salt)

      return plaintext
      }catch(e){
        console.error(`error:`, e)
      }
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
      <div> {gate?.[0].key} </div>
    </>
    

  )
}
