const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  // signer.address can also be used to access the address the of the signer
  console.log("The deployer address is: ", signer.address);

  console.log("Deploying PERC20 token....");
  const phoenix_perc20 = await hre.ethers.deployContract("PHOENIX_PERC20", [120]);
  await phoenix_perc20.waitForDeployment();

  console.log("PERC20 contract deployed to: ", phoenix_perc20.target);
  console.log("Minted 100 perc20 tokens to: ", signer.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
