
import { decryptGateData, readGates } from "@/tools/irys/retriever";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Address } from "viem";
import { useAccount, useConfig } from "wagmi";
import Password3Contract, { VaultType } from "../Contract/Password3Contract";
import { GateData, GateType } from "./GateSetup";
import PassGateView from "./PassGateView";
import QuestionGateView from "./QuestionGateView";

        

export default function ReadGate({vaultId, to}: {vaultId: number, to: string}) {
  const {address} = useAccount()
  const config = useConfig()
  const [vault, setVault] = useState<VaultType|null>(null)
  const [gate, setGate] = useState<GateData>()
  const [gateIndex, setGateIndex] = useState<number>(0)
  const [rest, setRest] = useState<any[]>([])
  const [encryptInfo, setEncryptInfo] = useState<any>()
  const [loading, setLoading] = useState(true)
  
  const contract = useMemo(() => new Password3Contract(config), [config]) 
  const router = useRouter()
  

  const tryDecryptNextGate = useCallback(async (key: string)=> {
    const [next, ..._rest] = rest
    const nextGate = await decryptGateData(Buffer.from(next.data), key , encryptInfo.iv, encryptInfo.salt)
    console.log(`nextGate decrypted: ${JSON.stringify(nextGate)}`)
    setGate(nextGate)
    setRest(() => [..._rest])
  }, [encryptInfo?.iv, encryptInfo?.salt, rest])


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
      }
      setLoading(false)
    }
    if(!address || !contract){
      return
    }
    setLoading(true)
    getVaults(address)
  }, [address, contract, vaultId])


  const onNext = useCallback(async (key: string) => {
    if(rest.length > 0){
      setGateIndex(prev => prev + 1)
      await tryDecryptNextGate(key)
      return
    }
    console.log(`no gates left`)
    console.log(`redirect to ${to}  key: ${key}`)
    //redirect page
    router.push(to)

  }, [rest.length, tryDecryptNextGate, router, to])

  if(!gate){
    return <></>
  }

  return (
    <>
      <div> {gate?.type === GateType.PASSCODE ? (
        <PassGateView  index={gateIndex} onNext={onNext} data={gate}/>
      ) : (
        <QuestionGateView index={gateIndex} onNext={onNext} data={gate}/>
      )} </div>
    </>
    

  )
}
