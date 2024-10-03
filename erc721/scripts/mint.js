const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

/**
 * Send a shielded transaction to the swisstronik blockchain - this is an encrypted transaction that only the sender and the node can decrypt the data
 *
 * @param {object} signer - The account sending the transaction
 * @param {string} destination - the address of the contract your are interacting with
 * @param {string} data - the encoded (must be for swisstronik) data for the transaction
 * @param {number} value - amount of value(token) to send with the transaction
 *
 * @returns {Promise} - the transaction object
 *
 */

const sendShieldedTransaction = async (signer, destination, data, value) => {
  // get RPC url from the Hardhat network configuration
  const rpcUrl = hre.network.config.url;

  // Encrypt the data/request being made to the blockchain
  const [encryptedData] = await encryptDataField(rpcUrl, data);

  //construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value: value,
  });
};

async function main() {
  const rapperNFTAddress = "0xd5eC20f13e1021B8e1cc5C6DD638Dd6DBCC4d6D0";

  // get the signer(my account)
  const [signer] = await hre.ethers.getSigners();

  // create a contract instance
  const rapperNFTFactory = await hre.ethers.getContractFactory("RapperNFT");
  const rapperNFTContract = rapperNFTFactory.attach(rapperNFTAddress);

  // URI(public gateway) of the NFT from pinata
  const tokenURI =
    "https://ipfs.io/ipfs/QmRPvJCeSG3UxQCw7MkTwCUzQUtnSSRybhGmWzJ54jYT3Q";

  // Send a shielded transaction to execute a transaction in the contract
  const functionName = "mintNFT";
  const functionArgs = [signer.address, tokenURI];
  // Interacting with contract
  console.log("Minting NFT...");
  const txn = await sendShieldedTransaction(
    signer,
    rapperNFTAddress,
    rapperNFTContract.interface.encodeFunctionData(functionName, functionArgs),
    0
  );
  await txn.wait();

  // the transaction hash
  console.log("Txn hash: ", txn.hash);

  // It should return a TransactionResponse object
  console.log("Transaction Response: ", txn);

  console.log("Yayy!!, the NFT has been minted");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
