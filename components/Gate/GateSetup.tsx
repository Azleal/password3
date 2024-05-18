import { uploadGates } from "@/tools/irys/uploader"
import { Select, Spin } from "antd"
import { useSearchParams } from "next/navigation"
import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { useConfig } from "wagmi"
import Password3Contract, { BigIntReplacer, VaultType } from "../Contract/Password3Contract"
import PassGate from "./PassGate"
import QuestionGate from "./QuestionGate"

export type GateProps = {
  password: string,
  index: number,
  onSetNext: (gateData: GateData, nextKey: string) => void,
  onSetComplete: (gateData: GateData, nextKey: string) => void,
} 

export enum GateType {
  PASSCODE = 'passcode',
  QUESTION = 'question',
}

export type GateData = {
  type: GateType,
  data: string[],
  index: number,
}

export const MAX_GATE_INDEX = 4

function Setup() {
  const searchParams = useSearchParams()
  const config = useConfig()
  const contract = useMemo(() => new Password3Contract(config) , [config])
  const [vault, setVault] = useState<VaultType|null>()
  const [loading, setLoading] = useState(true)
  const [gateType, setGateType] = useState<GateType>(GateType.PASSCODE)

  const [gates, setGates] = useState<GateData[]>([])
  const [keys, setKeys] = useState<string[]>([""])

  useEffect(() => {
    async function getVault(){
      const vaultId = searchParams.get("vault")
      if(!vaultId || !contract){
        return
      }
      setLoading(true)
      try {
        const vault = await contract.getVault(BigInt(vaultId))
        console.log(`useeffect vault: ${JSON.stringify(vault, BigIntReplacer)}`)
        setVault(vault)
      } catch (error) {
        console.error("Error fetching vault:", error)
        // Handle error here
      } finally {
        setLoading(false)
      }
    }
    getVault()
  }, [searchParams, contract])

  const onSetNext = useCallback((gateData: GateData, nextKey: string) => {
    setGates(prevGates => [...prevGates, gateData])
    setKeys(prevKeys => [...prevKeys, nextKey])
    console.log('here entered')
  }, [])

  const onSetComplete = useCallback((gateData: GateData, nextKey: string) => {
    setLoading(true)
    const _gates = [...gates, gateData]
    const _keys = [...keys, nextKey]
    uploadGates(vault?.id as number, _gates, _keys, contract)
    setLoading(false)
  }, [gates, keys, vault?.id, contract])

  const getGateProps = useMemo(() => ({
    password: keys[keys.length - 1],
    index: gates.length,
    onSetNext,
    onSetComplete,
  }), [keys, gates.length, onSetNext, onSetComplete])

  

  function onSelectChange(value: string){
    if(!Object.values(GateType).includes(value as GateType)){
      return
    }
    setGateType(value as GateType)
  }

  if(loading){
    return (<Spin spinning={loading} size="large"></Spin>)
  }

  return (
    <>
      <Spin spinning={loading} size="large">
        <div className=" text-base text-white flex flex-col">
          <div style={{margin: '20px 0 0 50px'}}>
            <Select
              defaultValue={gateType}
              style={{ width: 120 }}
              onChange={onSelectChange}
              options={[
                { value: 'passcode', label: '密码型' },
                { value: 'question', label: '问答型' },
              ]}
            />
          </div>
          <div>
            { gateType === GateType.PASSCODE ? (
              <PassGate {...getGateProps}/>
            ) : (
              <QuestionGate {...getGateProps}/>
            ) }
          </div>
        </div>
      </Spin>
    </>
  )
}


export default function GateSetup() {
  
  return (
    <Suspense>
      <Setup/>
    </Suspense>
  )
}
