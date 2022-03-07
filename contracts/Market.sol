// SPDX-License-Identifier: MIT OR Apache-2.0 
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract NFTMarket is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    address payable owner;
    uint256 listingPrice = 0.00001 ether;
    // uint256 listingPrice = 1 ether;

    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
    }
    
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller, 
        address owner,
        uint256 price,
        bool sold
    );

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256){
        return listingPrice;
    }

    function createToken(string memory tokenURI, uint256 price) public payable returns (uint){
       _tokenIds.increment();
       uint256 newTokenId = _tokenIds.current();

       _mint(msg.sender, newTokenId);
       _setTokenURI(newTokenId, tokenURI);
       createMarketItem(newTokenId, price);
       return newTokenId;
    }

    /* Places an item for sale on the marketplace */
    function createMarketItem(
        uint256 tokenId,
        uint256 price
    ) private {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price, 
            false
        );

        _transfer(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }


    /* Creates the sale of a marketplace item  */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(
        uint256 tokenId
    ) public payable {
       uint256 price = idToMarketItem[tokenId].price;
       address seller = idToMarketItem[tokenId].seller;
       require(msg.value == price, "Please submit the asking price in order to complete the transaction");

       idToMarketItem[tokenId].owner = payable(msg.sender);
       idToMarketItem[tokenId].sold = true;
       idToMarketItem[tokenId].seller = payable(address(this));
       _itemsSold.increment();
       _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
       payable(seller).transfer(msg.value);
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory){
        uint itemCount = _tokenIds.current();
        uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for(uint i = 0; i < itemCount; i++){
            if(idToMarketItem[i + 1].owner == address(this)){
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;

    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory){
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalItemCount; i++){
            if(idToMarketItem[i + 1].owner == msg.sender){
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint i = 0; i < totalItemCount; i++){
            if(idToMarketItem[i + 1].owner == msg.sender){
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;

    }

    /* Returns only items a user has created */
    function fetchItemsCreated() public view returns (MarketItem[] memory){
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for(uint i = 0; i < totalItemCount; i++){
          if(idToMarketItem[i + 1].seller == msg.sender){
              itemCount += 1;
          }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for(uint i = 0; i < totalItemCount; i++){
          if(idToMarketItem[i + 1].seller == msg.sender){
              uint currentId = i + 1;
              MarketItem storage currentItem = idToMarketItem[currentId];
              items[currentIndex] = currentItem;
              currentIndex += 1;
          }
      }
      return items;
    }

}