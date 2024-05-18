'use client'
import { getRandomIv, getRandomSalt, uint8ArrayToHex } from "@/app/utils/encryption"
import { Select, Spin } from "antd"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useMemo, useState } from "react"
import { useConfig } from "wagmi"
import Password3Contract, { BigIntReplacer, VaultType } from "../Contract/Password3Contract"
import PassGate, { GateType } from "./PassGate"
import QuestionGate from "./QuestionGate"

function Setup() {
  const searchParams = useSearchParams()
  const config = useConfig()
  const contract = useMemo(() => new Password3Contract(config) , [config])
  const [vault, setVault] = useState<VaultType|null>()
  const [loading, setLoading] = useState(true)
  const [gateType, setGateType] = useState<GateType>(GateType.PASSCODE)

  const iv = uint8ArrayToHex(getRandomIv())
  const salt = uint8ArrayToHex(getRandomSalt())

  useEffect(() => {
    async function getVault(){
      const vaultId = searchParams.get("vault")
      if(!vaultId || !contract){
        return
      }
      setLoading(true)
      const vault = await contract.getVault(BigInt(vaultId))
      console.log(`useeffect vault: ${JSON.stringify(vault, BigIntReplacer)}`)
      setVault(vault)
      setLoading(false)
    }
    getVault()
  }, [searchParams, contract])


  function onSelectChange(value: string){
    if(!Object.values(GateType).includes(value as GateType)){
      return
    }
    setGateType(value as GateType)
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
              <PassGate props={{callback: ()=> {}, key:"", index: 0}}/>
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
