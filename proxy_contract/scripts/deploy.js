const  {upgrades, ethers} = require("hardhat");
const hre = require("hardhat");

async function main() {
  const Hello = await ethers.getContractFactory("Hello");
  console.log("Deploying Hello contract...");
  const hello = await upgrades.deployProxy(Hello, ["GN Swisstronik"], {
    initializer: "initialize",
  });
  await hello.waitForDeployment();
  console.log("Hello deployed to:", hello.getAddress());
  // for inspection
  console.log(
    await upgrades.erc1967.getImplementationAddress(hello.address),
    " getImplementationAddress"
  );
  console.log(
    await upgrades.erc1967.getAdminAddress(hello.address),
    " getAdminAddress"
  );

  await hre.run("verify:verify", {
    address: hello.address, // address of deployed contract
    constructorArguments: [], // constructor arguments
  });
  // ... rest of your deployment script
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
