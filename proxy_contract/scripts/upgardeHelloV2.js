const hre  = require("hardhat");
const {upgrades} = require("hardhat");

const proxyAddress = "YOUR_PROXY_ADDRESS_FROM_DEPLOYMENT";

async function main() {
    console.log("Original Hello contract proxy address ", proxyAddress);
    const HelloV2 = await hre.ethers.getContractFactory("HelloV2");
    console.log("upgrading to HelloV2...");
    const helloV2 = await upgrades.upgradeProxy(proxyAddress, HelloV2)
    console.log("The HelloV2 address should be the same as the default: ".helloV2.target);
      console.log(
    await upgrades.erc1967.getAdminAddress(helloV2.target),
    " Proxy Admin"
  );


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
