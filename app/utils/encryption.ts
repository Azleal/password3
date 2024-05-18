import pako from 'pako';

export type EncryptData = {
  data: Buffer,
  iv: string, 
  salt: string,
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function getRandomIv(): Uint8Array{
  return crypto.getRandomValues(new Uint8Array(12))
}

export function getRandomSalt(): Uint8Array{
  return crypto.getRandomValues(new Uint8Array(16))
}

export function hexToUint8Array(hex: string): Uint8Array{
  return Uint8Array.from((hex.match(/.{1,2}/g) as string[]).map((byte) => parseInt(byte, 16)))
}

export function uint8ArrayToHex(uint8Array: Uint8Array): string{
  return Array.from(uint8Array).map((i) => i.toString(16).padStart(2, '0')).join('')
}

export async function deriveKey(password: string, salt: string) : Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"],
  );

  const saltUint8Array = hexToUint8Array(salt)

  return crypto.subtle.deriveKey({
      name: "PBKDF2",
      salt: saltUint8Array,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );
}

export async function encryptWithIv(password: string,  iv: string, salt: string, plainText: string) : Promise<EncryptData>{
  const ivBuffer = hexToUint8Array(iv)
  const key: CryptoKey = await deriveKey(password, salt)
  const encodedText = encoder.encode(plainText)
  const zipedData = pako.deflate(encodedText)
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: ivBuffer },
    key,
    zipedData,
  );
  return {
    data: Buffer.from(encryptedBuffer),
    iv,
    salt
  }
}
export async function encrypt(password: string,  plainText: string) : Promise<EncryptData>{
  const iv = uint8ArrayToHex(getRandomIv())
  const salt = uint8ArrayToHex(getRandomSalt())
  return encryptWithIv(password, iv, salt, plainText)
}

export async function decryptWithIv(password: string, iv: string, salt: string, cipherText: Buffer) : Promise<string>{
  const ivBuffer = hexToUint8Array(iv)
  const key : CryptoKey= await deriveKey(password, salt)
  const cipherBuffer = cipherText
  const encodedPlainTextBuffer =  await crypto.subtle.decrypt({ name: "AES-GCM", iv: ivBuffer }, key, cipherBuffer);
  const unzippedData = pako.inflate(encodedPlainTextBuffer)
  // console.log(`before inflation size: ${encodedPlainTextBuffer.byteLength}, after size: ${unzippedData.byteLength}`)
  const decryptedData = decoder.decode(unzippedData)
  return decryptedData
}

export async function decrypt(password: string, encrypted: EncryptData) : Promise<string>{
  const {iv, data: cipherText, salt } = encrypted
  return decryptWithIv(password, iv, salt, cipherText)

}