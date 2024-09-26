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
  // get the rpc url from the network configurations
  const rpcUrl = hre.network.config.url;

  //encrypt the data
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
  // address of deployed contract
  const contractAddress = "0xfB562d9072e8F49509804732719B49Fa1a141D83";

  //signer(your account)
  const [signer] = await hre.ethers.getSigners();

  //contract instance
  const contractFactory = await hre.ethers.getContractFactory(
    "Hello_Swisstronik"
  );
  const contract = contractFactory.attach(contractAddress);
  const functionName = "updateMessage";
  const messageToSet = "Hello Swisstronik Testnet!!";

  //send a sheilded transaction to update the mesaage in the contract
  const updateMessageTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, [messageToSet]),
    0
  );

  //wait for the transaction to be mined
  await updateMessageTx.wait();

  console.log(
    "Message updated successfully! Transaction Receipt: ",
    updateMessageTx
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
