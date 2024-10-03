const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  // signer.address can also be used to access the address the of the signer
  console.log("The deployer address is: ", await signer.getAddress());

  console.log("Deploying ERC721 contract....")
  const rapperNFT = await hre.ethers.deployContract("RapperNFT");
  await rapperNFT.waitForDeployment();

  console.log("ERC721 contract deployed to: ", rapperNFT.target);

    
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// nft hash QmRPvJCeSG3UxQCw7MkTwCUzQUtnSSRybhGmWzJ54jYT3Q
