import { GateData } from "@/components/Gate/GateSetup"
import { decryptWithIv } from "@/tools/utils/encryption"
import axios from "axios"

export async function readGates(vaultId: number, entrypoint: string, firstItemKey?: string){

    const {data} = await axios.get(`https://devnet.irys.xyz/${entrypoint}`)
    const {data:{tags}} : {data: {tags: { name: string, value: string }[]}}  = await axios.get(`https://devnet.irys.xyz/tx/${entrypoint}`)
    const iv = tags.filter(e => e["name"] === 'iv')[0].value
    const salt = tags.filter(e => e["name"] === 'salt')[0].value
    console.log(`readGates iv: ${iv}, salt: ${salt}`)

    console.log(`readGates result: ${JSON.stringify(data)}`)
    const encryptInfo= {
      iv, salt
    }
    const [first, ...rest] = data
    if(firstItemKey){
      const decrypted = await decryptGateData(first, firstItemKey, iv, salt)
      return {...encryptInfo, first: decrypted, rest}
    }
    return {...encryptInfo, first: JSON.parse(first) as GateData, rest}
}

export async function decryptGateData(encrypted: Buffer, key: string, iv: string, salt: string): Promise<GateData>{
  // const bufferData = JSON.parse(encrypted)
  console.log(`encrypted:${encrypted}, iv: ${iv}, salt: ${salt}, password: ${key},`)
  const text = await decryptWithIv(key, iv, salt, encrypted)
  console.log(`decrypted text: ${text}`)
  return JSON.parse(text) as GateData
}