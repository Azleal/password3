'use client'

import ReadGate from "@/components/Gate/ReadGate"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"


function OpenVaultGate(){
  const searchParams = useSearchParams()
  const _vaualtId = searchParams.get("vault")
  const vaultId = _vaualtId ? Number(_vaualtId) : null;
  if(vaultId === null){
    return <>invalid vault id</>
  }
  return (<ReadGate vaultId={vaultId} to="/vault/items"/>)
}

export default function OpenVault() {
  
  return (
    <Suspense>
      <OpenVaultGate/>
    </Suspense>
  )
}
