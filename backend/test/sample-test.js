const { expect } = require("chai");
const { ethers } = require("hardhat");
// import { render, screen, fireEvent } from "@testing-library/react";


describe("NFTMarket", function(){
  it("Should create market instance", async function(){
    /* deploy to the marketplace */
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address 

    expect(marketAddress).to.not.equal("");
  });

  it("Should return all unsold market items", async function(){
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address 

    /* deploy to the NFT contract */
    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address 

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    /* create two tokens */
    await nft.createToken("https://www.mytokenlocation2.com")
    await nft.createToken("https://www.mytokenlocation3.com")
    await nft.createToken("https://www.mytokenlocation4.com")

    /* put both tokens for sale */
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })
    await market.createMarketItem(nftContractAddress, 3, auctionPrice, { value: listingPrice })

    const [_, buyerAddress] = await ethers.getSigners()

    items = await market.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri 
      }
      return item 
    }))

    expect(items).to.not.have.lengthOf(0);

  });

  it("Should return empty when all market items are sold", async function(){

    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address 

    /* deploy to the NFT contract */
    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address 

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    /* create two tokens */
    await nft.createToken("https://www.mytokenlocation2.com")
    await nft.createToken("https://www.mytokenlocation3.com")
    await nft.createToken("https://www.mytokenlocation4.com")

    /* put both tokens for sale */
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })
    await market.createMarketItem(nftContractAddress, 3, auctionPrice, { value: listingPrice })

    const [_, buyerAddress] = await ethers.getSigners()

    /* execute sale of token to another user */
    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice })
    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 2, { value: auctionPrice })
    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 3, { value: auctionPrice })


    /* query for and return the unsold items */
    items = await market.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri 
      }
      return item 
    }))
    expect(items).to.have.lengthOf(0);
   });

});


