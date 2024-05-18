import { Spin } from "antd"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useMemo, useState } from "react"
import { useConfig } from "wagmi"
import Password3Contract, { BigIntReplacer, VaultType } from "../Contract/Password3Contract"

function Setup() {
  const searchParams = useSearchParams()
  const config = useConfig()
  const contract = useMemo(() => new Password3Contract(config) , [config])
  const [vault, setVault] = useState<VaultType|null>()
  const [loading, setLoading] = useState(true)


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


  return (
    <>
      <Spin spinning={loading} size="large">
        <div className=" text-base text-white">
          vault: 
          {vault? vault?.title : 'nothing'}
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
