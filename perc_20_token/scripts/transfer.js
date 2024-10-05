const hre = require("hardhat");
const { encryptDataField } = require("@swisstronik/utils");

const sendShieldedQuery = async (signer, destination, data, value) => {
  // get RPC url from the Hardhat network configuration
  const rpcUrl = hre.network.config.url;

  //Encrypt the data being sent
  const [encryptedData] = await encryptDataField(rpcUrl, data);

  // construct a transaction
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  //get my account
  const [from] = await hre.ethers.getSigners();

  // address of deployed contract
  const contractAddress = "0x497CF72F04e5A179891902CcdF581c0C96074E3b";

  // create contract instance and attach to deployed contract address
  const perc20Factory = await hre.ethers.getContractFactory("PHOENIX_PERC20");
  const perc20_contract = perc20Factory.attach(contractAddress);

  // address to transfer token to
  const to = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";

  // function to  interact with on the contract
  const functionName = "transferToAddress";
  const functionArgs = [to, 1];

  // Interacting with contract
  console.log("Transfering the PERC20 token...");
  const txn = await sendShieldedQuery(
    from,
    contractAddress,
    perc20_contract.interface.encodeFunctionData(functionName, functionArgs),
    0
  );

  // the transaction hash
  console.log("Txn hash: ", txn.hash);

  // It should return a TransactionResponse object
  console.log("Transaction Response: ", txn);

  console.log("Yayy!!, the PERC20 token has been transfered to: " + txn.to + " from: " + txn.from);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
