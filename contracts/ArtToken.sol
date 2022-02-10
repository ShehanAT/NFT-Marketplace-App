pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract ArtToken is ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    address public marketplace;

    struct Item {
        uint256 id;
        address creator;
        string uri; // metadata url 
    }

    mapping(uint256 => Item) public Items; // id => Item 

    constructor() ERC721("ArtToken", "ARTK") {}

    function mint(string memory uri) public returns (uint256){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        approve(marketplace, newItemId);

        Items[newItemId] = Item({
            id: newItemId,
            creator: msg.sender,
            uri: uri 
        });

        return newItemId;
    }

    function tokenURI(uint256) public view override returns (string memory){
        require(_exists(_tokenIds), "ERC721URIStorage: URI query for nonexistent token");
        return Items[_tokenIds].uri;
    }

    function setMarketplace(address market) public {
        marketplace = market;
    }
}