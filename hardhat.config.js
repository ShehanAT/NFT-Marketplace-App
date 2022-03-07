require("@nomiclabs/hardhat-waffle");
const fs = require("fs");


module.exports = {
  defaultNetwork: "hardhat",
  networks: {
      hardhat: {
          chainId: 1337
      },
      mumbai: {
          url: "https://rpc-mumbai.maticvigil.com",
          accounts: [process.env.POLYGON_ACCOUNT_PRIVATE_KEY]
      }
  },

  solidity: {
      version: "0.8.4",
      settings: {
          optimizer: {
              enabled: true,
              runs: 200
          }
      }
  }
};