const hre = require("hardhat");


async function main() {
    const contract = await hre.ethers.deployContract("PHOENIX", [200]);

    await contract.waitForDeployment()

    console.log("Phoenix contract deployed to: ", contract.target)

}

main().catch(error => {
    console.error(error);
    process.exitCode = 1
})