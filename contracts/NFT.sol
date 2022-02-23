// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721 {
    uint private _tokenId = 0;
    
    constructor() ERC721("Coolest NFT", "NFT") {}

    function mint() external returns(uint) {
        _tokenId++;
        _mint(msg.sender, _tokenId);
        return _tokenId;
    }

}