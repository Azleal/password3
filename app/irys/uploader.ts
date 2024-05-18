import Password3Contract from "@/components/Contract/Password3Contract"
import { GateData } from "@/components/Gate/GateSetup"
import { encryptWithIv, getRandomIv, getRandomSalt, uint8ArrayToHex } from "../utils/encryption"
import getIrys from "./getIrysClient"


/**
 * 上传gates信息
 * keys, 用来加密, 长度需要一致, 第一个key为空(// TODO 将来第一个key也可以不为空,随机生成后分享给指定地址)
 * 使用统一的iv, salt
 * */ 
export async function uploadGates(vaultId: number, gates: GateData[], keys: string[], contract: Password3Contract){
  const iv = uint8ArrayToHex(getRandomIv())
  const salt = uint8ArrayToHex(getRandomSalt())

  try {
    const items = await Promise.all(gates.map(async (e,i) => {
      const key = keys[i]
      const value = JSON.stringify(e)
      console.log(`encrypting data, key[${i}]: ${key}, value: ${value}, iv: ${iv}, salt: ${salt}`)
      if(!key){
        return value
      }
      const {data} = await encryptWithIv(key, iv, salt, value)
      console.log(`encrypted data: ${data}`)
      return data
    }))
    const client = await getIrys()
    const uploadData = JSON.stringify(items)
    
    console.log(`uploadData: ${uploadData}`)
    const tags = getTags(iv, salt, vaultId, 'entrypoint')
    const {id: txId} = await client.upload(uploadData, {tags: tags})
    console.log(`txId: ${txId}`)
    const hash = await contract.setVaultEntrypoint(vaultId, txId)
  } catch (error) {
    console.error("Error uploading gates info:", error)
  }
}

//上传vault中保存的信息
function uploadVaultItem(){

}

function getTags(iv:string, salt: string, vaultId: number, type: string){
  return [
    {name: "Content-Type", value: "application/json"},
    {name: "iv", value: iv},
    {name: "app", value: process.env.NEXT_PUBLIC_APP_NAME as string || 'test-pass3'},
    {name: "_id", value: vaultId.toString()},
    {name: "salt", value: salt},
    {name: "type", value: type}
  ]
}