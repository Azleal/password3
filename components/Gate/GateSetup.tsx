import getIrys from "@/app/irys/getIrysClient"
import { encrypt, encryptWithIv, getRandomIv, getRandomSalt, uint8ArrayToHex } from "@/app/utils/encryption"
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
  data: string | string[],
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

  const iv = useMemo(() => uint8ArrayToHex(getRandomIv()), [])
  const salt = useMemo(() => uint8ArrayToHex(getRandomSalt()), [])

  const [gates, setGates] = useState<GateData[]>([])
  const [keys, setKeys] = useState<string[]>(["password3"])

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
  }, [])

  const uploadGatesInfo = useCallback(async (_gates: GateData[], _keys: string[]) => {
    try {
      const items = await Promise.all(_gates.map(async (e,i) => {
        const key = _keys[i]
        const {data} =  await encryptWithIv(key, iv, salt, JSON.stringify(e))
        return data.toString()
      }))
      const client = await getIrys()
      const {id: txId} = await client.upload(JSON.stringify(items), {tags: [
        {name: "Content-Type", value: "application/json"},
        {name: "iv", value: iv},
        {name: "app", value: process.env.NEXT_PUBLIC_APP_NAME as string},
        {name: "_id", value: vault?.id.toString() as string},
        {name: "salt", value: salt}]})
      console.log(`txId: ${txId}`)
      const hash = await contract.setVaultEntrypoint(vault?.id as number, txId)
    } catch (error) {
      console.error("Error uploading gates info:", error)
      // Handle error here
    }
  }, [iv, salt, vault?.id, contract])

  const onSetComplete = useCallback((gateData: GateData, nextKey: string) => {
    const _gates = [...gates, gateData]
    const _keys = [...keys, nextKey]
    uploadGatesInfo(_gates, _keys)
  }, [gates, keys, uploadGatesInfo])

  const getGateProps = useMemo(() => ({
    password: keys[keys.length - 1],
    index: gates.length,
    onSetNext,
    onSetComplete,
  }), [keys, gates.length, onSetNext, onSetComplete])

  async function upload(){
    try {
      const client = await getIrys()
      const {data, iv, salt} = await encrypt("", "test")
      const {id: txId} = await client.upload(data, {tags: [
        {name: "Content-Type", value: "application/json"},
        {name: "iv", value: iv},
        {name: "salt", value: salt}]})
      console.log(`txId: ${txId}`)
    } catch (error) {
      console.error("Error uploading data:", error)
      // Handle error here
    }
  }

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
          <div>
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
              <QuestionGate />
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
