const hre = require("hardhat");
const fs = require("fs");

async function main(){
    const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
    const nftMarket = await NFTMarket.deploy();
    await nftMarket.deployed();
    console.log("nftMarket deployed to: " + nftMarket.address);

    let config = `
        export const nftmarketaddress = "${nftMarket.address}"
    `

    let data = JSON.stringify(config);
    fs.writeFileSync("nftConfig.js", JSON.parse(data));

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
    