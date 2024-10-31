const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  // signer.address can also be used to access the address the of the signer
  console.log("The deployer address is: ", await signer.getAddress());

  console.log("Deploying ERC721 contract....");
  const privateNFT = await hre.ethers.deployContract("privateNFT", [signer.address]);
  await privateNFT.waitForDeployment();

  console.log("privateERC721 contract deployed to: ", privateNFT.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// nft hash QmRPvJCeSG3UxQCw7MkTwCUzQUtnSSRybhGmWzJ54jYT3Q