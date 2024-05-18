import { Config, readContract, simulateContract } from '@wagmi/core';
import { Hash } from 'viem';
import { waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import wagmiContract from './abi';

export const BigIntReplacer = (_: any, v: any) => typeof v === 'bigint' ? v.toString() : v

export type VaultType = {
  id: number, 
  owner: string,
  createdAt: number,
  title: string,
  entrypoint: string,
}

export default class Password3Contract{

  private config: Config;

  public constructor(config: Config){
    this.config = config
  }
   
  public async getUserVaults(address: string): Promise<VaultType[]>{
    const vaults: VaultType[] = (await readContract(this.config, {
      ...wagmiContract,
      functionName: 'getUserVaults',
      args: [address],
    })) as VaultType[]
    console.log(`vaults: ${JSON.stringify(vaults,BigIntReplacer)}`)
    return vaults
  }

  public async getVault(vaultId: BigInt): Promise<VaultType|null>{
    console.log(`getVault: ${vaultId}`)
    const vault: any[] = (await readContract(this.config, {
      ...wagmiContract,
      functionName: 'vaultMapping',
      args: [vaultId],
    })) as any[]
    if(vault[0] === 0n){
      return null
    }
    return {
      id: vault[0],
      owner: vault[1],
      createdAt: vault[2],
      title: vault[3],
      entrypoint: vault[4],
    }
  }

  public async getTotalVaultsCount(): Promise<BigInt>{
    const count: BigInt = (await readContract(this.config, {
      ...wagmiContract,
      functionName: 'totalVaults',
    })) as BigInt
    return count
  }

  public async createVault(title: string): Promise<Hash|null>{
    try{
      const {request} = await simulateContract(this.config, {
        ...wagmiContract,
        functionName: 'createVault',
        args: [title, ""]
      })
      console.log(`createVault: ${JSON.stringify(request)}`)
      const txHash = await writeContract(this.config,request)
      return txHash
    }catch(e){
      console.error("simulating createVault with error:", e)
    }
    return null
  }
  

  public async setVaultEntrypoint(vaultId: number, entrypoint: string): Promise<Hash|null>{
    try{
      const {request} = await simulateContract(this.config, {
        ...wagmiContract,
        functionName: 'setVaultEntrypoint',
        args: [vaultId, entrypoint]
      })
      console.log(`setVaultEntrypoint: ${JSON.stringify(request, BigIntReplacer)}`)
      const txHash = await writeContract(this.config,request)
      return txHash
    }catch(e){
      console.error("simulating createVault with error:", e)
    }
    return null
  }


  async waitForTransactionReceipt(hash: Hash) {
    return await waitForTransactionReceipt(this.config, { hash })
  }
  

}

