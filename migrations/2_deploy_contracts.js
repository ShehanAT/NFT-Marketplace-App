const ArtToken = artifacts.require("ArtToken");
const ArtMarketplace = artifacts.require("ArtMarketplace");
const NFT = artifacts.require("NFT");

module.exports = async function(deployer) {
  await deployer.deploy(ArtToken);

  const token = await ArtToken.deployed()

  await deployer.deploy(ArtMarketplace, token.address)

  const market = await ArtMarketplace.deployed()

  await token.setMarketplace(market.address)

  await deployer.deploy(NFT);
};
