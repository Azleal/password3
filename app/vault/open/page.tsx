'use client'

import ReadGate from "@/components/Gate/ReadGate"

export default function OpenVault() {
  
  return (
    <>
      <ReadGate vaultId={1} to="/vault/items"/>
    </>
  )
}
