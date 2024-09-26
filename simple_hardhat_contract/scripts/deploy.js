const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("Hello_Swisstronik", [
    "Hello Swisstronik Testnet!!",
  ]);
  await contract.waitForDeployment();

  console.log("Contract deployed to address: ", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// Contract deployed to address:  0xfB562d9072e8F49509804732719B49Fa1a141D83