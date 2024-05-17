import { Chain } from "viem"
import { localhost, scrollSepolia } from "viem/chains"

const abi = [{"inputs":[],"name":"InvalidInitialization","type":"error"},{"inputs":[],"name":"NotInitializing","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"version","type":"uint64"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"vaultId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"VaultCreated","type":"event"},{"inputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"entrypoint","type":"string"}],"name":"createVault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getUserVaults","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"createdAt","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"entrypoint","type":"string"}],"internalType":"struct Password3V1.Vault[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"vaultId","type":"uint256"},{"internalType":"string","name":"entrypoint","type":"string"}],"name":"setVaultEntrypoint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalVaults","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"vaultMapping","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"createdAt","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"entrypoint","type":"string"}],"stateMutability":"view","type":"function"}] as unknown[]


const contracts : { [key: string]: `0x${string}` }= {
  'devnet' : "0x0",
  'localhost' : "0x00C7d8059739C6Bcd43981f06a247EaF3C536f66",
}

function getContract(): {address: `0x${string}`, abi: unknown[], chain: Chain}{
  const network = process.env.NEXT_PUBLIC_NETWORK || 'devnet'
  return {
    address: contracts[network],
    abi,
    chain: network === 'localhost' ? localhost : scrollSepolia
  }
}

const wagmiContract = getContract()

export default wagmiContract