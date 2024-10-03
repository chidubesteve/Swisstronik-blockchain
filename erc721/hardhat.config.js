require("@nomicfoundation/hardhat-toolbox");
const PRIVATE_KEY = vars.get("PRIVATE_KEY")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "swisstronik",
  solidity:{
    version:"0.8.19",
  settings: {
    optimizer: {
      enabled:true,
    runs: 200
  },
}, 
  },
  networks: {
    swisstronik: {

      url: "https://json-rpc.testnet.swisstronik.com/",
      accounts: [`0x` + `${PRIVATE_KEY}`],
    }
  }
};  
