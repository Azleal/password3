import { GateData } from "@/components/Gate/GateSetup"
import { decryptWithIv } from "@/tools/utils/encryption"
import Query from "@irys/query/node"
import axios from "axios"
import { Address } from "viem"
import { getIrysConfig } from "./getIrysClient"

const irysConfig = getIrysConfig()

export async function readGates(vaultId: number, entrypoint: string, firstItemKey?: string){

    const {data} = await axios.get(`${irysConfig.gateway}${entrypoint}`)
    const {data:{tags}} : {data: {tags: { name: string, value: string }[]}}  = await axios.get(`${irysConfig.gateway}tx/${entrypoint}`)
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

export async function readVaultItems(vaultId: number, owner: Address, key: string): Promise<any[]>{
  const queryClient = new Query({ url: irysConfig.gqlEndpoint });
    const result = await queryClient
        .search("irys:transactions")
        .from([owner])
        .tags([
              { name: "appName", values: [irysConfig.appName] },
              { name: "type", values: ["item"] },
              { name: "_id", values: [vaultId.toString()] },
              ])
        .sort("DESC")

        if(!result || result.length == 0){
          return []
        }

        const itemTxIds = result.map(e => e.id)

        const items = await Promise.all(itemTxIds.map(async (txId,i) => {
          const {data} = await axios.get(`${irysConfig.gateway}${txId}`)

          const {data:{tags}} : {data: {tags: { name: string, value: string }[]}}  = await axios.get(`${irysConfig.gateway}tx/${txId}`)
          const iv = tags.filter(e => e["name"] === 'iv')[0].value
          const salt = tags.filter(e => e["name"] === 'salt')[0].value
          console.log(`read vault items iv: ${iv}, salt: ${salt}`)

          console.log(`read vault items result: ${JSON.stringify(data)}`)
          const decrypted = await decryptWithIv(key, iv, salt, data)
          return JSON.parse(decrypted) as any
        }))
        
        return items
}