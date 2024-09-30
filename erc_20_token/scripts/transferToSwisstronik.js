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
  // Get the RPC link from the Hardhat network configuration
  const rpcUrl = hre.network.config.url;

  //Encrypt the data being sent
  const [encryptedData] = await encryptDataField(rpcUrl, data);

  //construct and sign transaction with encrypted data

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  /**
   * @constant - Address of the deployedAddress
   */
  const contractAddress = "0x63605b6de24f71EfdAFB90D0De86E00A532Af61A";
  /**
   * @constant - destination address
   */
  const addressToTransferTo = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";

  // get the signer(my account)
  const [signer] = await hre.ethers.getSigners();

  //create a contract instance
  const contractFactory = await hre.ethers.getContractFactory("PHOENIX");
  const contract = contractFactory.attach(contractAddress);

  // Send a shielded transaction to execute a transaction in the contract
  const functionName = "transferToSwisstronik";
  const functionArgs = [addressToTransferTo, "1"];
  const transaction = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, functionArgs),
    0
  );

  await transaction.wait();

  // It should return a TransactionResponse object
  console.log("Transaction Response: ", transaction);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
