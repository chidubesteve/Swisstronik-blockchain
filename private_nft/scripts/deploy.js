const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  // signer.address can also be used to access the address the of the signer
  console.log("The deployer address is: ", await signer.getAddress());

  console.log("Deploying ERC721 contract....");
  const privateNFT = await hre.ethers.deployContract("PrivateERC721", [
    "Private NFT", "PNT",
  ]);
  await privateNFT.waitForDeployment();
  fs.writeFileSync("contract.txt", await privateNFT.getAddress());

  console.log("privateERC721 contract deployed to: ", privateNFT.target);
}
//NFT ADDRESS: 0xc79dcE8dE5c721694ABB1fA141E01A6E7d388382

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
