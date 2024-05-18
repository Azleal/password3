import { WebIrys } from "@irys/sdk";
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


export default getIrys