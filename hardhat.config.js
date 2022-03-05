require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
// const privateKey = fs.readFileSync(".secret").toString().trim() || "01234567890123456789";
// const POLYGON_ACCOUNT_PRIVATE_KEY = require("./config.js");

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 1337
        },
        mumbai: {
            // url: "https://rpc-mumbai.matic.today",
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