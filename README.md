## NFT Marketplace built with Next.js, Polygon, Solidity, IPFA and Hardhat

### Overview 
This is a simple project designed to gain experience building decentralized applications. 

### Screenshots
Marketplace page:
![Marketplace page](/screenshots/marketplace_image1.png)

Sell NFT page:
![Sell NFT page](/screenshots/sellNFT_image1.png)

My Assets page:
![My Assets page](/screenshots/myAssets_image1.png)

### Running this project 

#### Local setup 
Here are the steps to run this project locally:
1. Clone the project locally, change into the directory, and install the project dependencies via: ```npm install```
2. Start the local Hardhat node via: ```npx hardhat node``` 
3. With the Hardhat node running, deploy the contracts to the local network in a seperate terminal window 


### Configuration 
In order to deploy to the Mumbai testnet on the Polygon network, make sure to set an environment variable POLYGON_ACCOUNT_PRIVATE_KEY with the value of your MetaMask account's private key via the ```export``` keyword. If you wish to use some other network just add an extra entry to the ```networks``` field. 



