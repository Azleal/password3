import { Select, Spin } from "antd"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useMemo, useState } from "react"
import { useConfig } from "wagmi"
import Password3Contract, { BigIntReplacer, VaultType } from "../Contract/Password3Contract"
import PassGate from "./PassGate"
import QuestionGate from "./QuestionGate"

function Setup() {
  const searchParams = useSearchParams()
  const config = useConfig()
  const contract = useMemo(() => new Password3Contract(config) , [config])
  const [vault, setVault] = useState<VaultType|null>()
  const [loading, setLoading] = useState(true)
  const [gateType, setGateType] = useState<'passcode'| 'question'>('passcode')


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
    if(value === 'passcode' || value === 'question'){
      setGateType(value)
    }
  }

  return (
    <>
      <Spin spinning={loading} size="large">
        <div className=" text-base text-white flex flex-col">
          <div>
          <Select
            defaultValue="passcode"
            style={{ width: 120 }}
            onChange={onSelectChange}
            options={[
              { value: 'passcode', label: '密码型' },
              { value: 'question', label: '问答型' },
            ]}
          />
          </div>
          <div>
            { gateType === 'passcode' ? (
              <PassGate />
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
