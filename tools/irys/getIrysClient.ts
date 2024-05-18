import { WebIrys } from "@irys/sdk";
import { Network } from "@irys/sdk/common/types";
import { ethers } from "ethers";


/**
 * Creates a new Irys object with the specified configuration.
 *
 * @param {string} url - The Irys network URL.
 * @param {string} currency - The currency to use (e.g., "ethereum").
 * @param {string} providerUrl - The provider URL for the Ethereum network.
 * @returns {Promise<WebIrys>} - A reference to the initialized Irys object.
 */
const getIrys = async (
	network: string = process.env.NEXT_PUBLIC_NETWORK || "devnet",
	token: string = process.env.NEXT_PUBLIC_TOKEN || "ethereum",
): Promise<WebIrys> => {
	await window.ethereum.enable();
	const provider = new ethers.BrowserProvider(window.ethereum);
	const wallet = { name: "ethersv6", provider: provider };
	const webIrys = new WebIrys({ network, token, wallet });
	//@ts-ignore
	webIrys.tokenConfig.getFee = async (): Promise<any> => {
		return 0;
	};
	await webIrys.ready();

	console.log(`Connected to webIrys from ${webIrys.address}`);
	return webIrys;
};

declare type IrysConfig  = {
  network: Network,
  gqlEndpoint: string,
  gateway: string
  token: string,
  providerRpc: string| undefined
  appName: string

} 

/**
 * Irys 配置
 */
const IrysConstants : {
  [key: Network]: IrysConfig,
} = {
  'mainnet' : {
    network : 'mainnet',
    gqlEndpoint: 'https://arweave.mainnet.irys.xyz/graphql',
    gateway: 'https://gateway.irys.xyz/',
    token: 'ethereum',
    providerRpc: undefined,
    appName: 'password3.xyz',
  },
  'devnet' : {
    network : 'devnet',
    gqlEndpoint: 'https://arweave.devnet.irys.xyz/graphql',
    gateway: 'https://devnet.irys.xyz/',
    token: 'ethereum',
    providerRpc: 'https://rpc-mumbai.maticvigil.com',
    appName: 'dev.password3.xyz',
  }
}
export function getIrysConfig(): IrysConfig{
  const network = process.env.NEXT_PUBLIC_NETWORK || 'devnet'
  return IrysConstants[network]
}

export default getIrys