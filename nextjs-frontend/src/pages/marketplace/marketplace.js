import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from 'ethers'
import Market from "../../../../artifacts/contracts/Market.sol/NFTMarket.json";
import Image from 'next/image';
let rpcEndpoint = "https://rpc-mumbai.maticvigil.com";
import Web3Modal from "web3modal"

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import {
    nftmarketaddress
} from '../../../../nftConfig';

const Marketplace = () => {
    const [nfts, setNfts] = useState([])
    const [selectedNftCategory, setSelectedNftCategory] = useState("All")
    const [loadingState, setLoadingState] = useState('not-loaded')
    const NFTCategories = ["Animals", "Clothes", "Electronics", "Music", "Art"];


    useEffect(() => {
        loadNFTs()
    }, []);

    async function loadNFTs() {
        const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint)
        const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
        const data = await marketContract.fetchMarketItems() 

        console.log(data);
        const items = await Promise.all(data.map(async i => {
            const tokenUri = await marketContract.tokenURI(i.tokenId)

            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
                category: meta.data.category
            }
            return item 
        }))
        setNfts(items)
        setLoadingState('Done')
    }

    async function buyNft(nft){
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
        const transaction = await contract.createMarketSale(nft.tokenId, {
            value: price
        })
        await transaction.wait()
        loadNFTs()
    }

    if(loadingState === 'Done' && !nfts.length) return (<h1 className="px-20 py10 text-3xl">No items in marketplace</h1>)
    return (
        <>
            <div className="flex justify-center">
                <h3>NFTS FOR SALE</h3>
            </div>
           
            <div className="flex justify-center">
                {/* style={{ maxWidth: '1600px' }} */}
                <div className="px-4" >
                    <div className="flex justify-left">
                        <div className="grid grid-cols-4 flex justify-right">
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedNftCategory}
                                    label="Select NFT Category"
                                    onChange={(e) => {setSelectedNftCategory(e.target.value);}}
                                    >
                                        <MenuItem value="All" key="99" defaultValue={true} >All</MenuItem>
                                        {
                                            NFTCategories.map((key, index) => { 
                                                return <MenuItem value={key} key={index}>{key}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                        {
                            (selectedNftCategory == "All") 
                            ?  
                            nfts.map((nft, i) => {
                                if(nft.category){
                                    //  && 
                                    return <div key={i} className="border shadow rounded-xl overflow-hidden">
                                        <Image src={nft.image} width="300px" height="300px"/>
                                        <div className="p-4">
                                        <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                                        <div style={{ height: '70px', overflow: 'hidden' }}>
                                            <p className="text-gray-400">{nft.description}</p>
                                            <p className="text-gray-400">Category {nft.category}</p>
                                        </div>
                                        </div>
                                        <div className="p-4 bg-black">
                                        <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
                                        <button className="w-full bg-blue-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                                        </div>
                                    </div>
                                }else{
                                    return <div> 
                                    <div key={i} className="border shadow rounded-xl overflow-hidden">
                                        <Image src={nft.image} width="300px" height="300px"/>
                                        <div className="p-4">
                                        <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                                        <div style={{ height: '70px', overflow: 'hidden' }}>
                                            <p className="text-gray-400">{nft.description}</p>
                                            <p className="text-gray-400">No category</p>
                                            
                                        </div>
                                        </div>
                                        <div className="p-4 bg-black">
                                        <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
                                        <button className="w-full bg-blue-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                                        </div>
                                    </div>
                                    </div>
                                }
                            })
                            : 
                            nfts.map((nft, i) => {
                                if(nft.category && nft.category == selectedNftCategory){
                                    return <div key={i} className="border shadow rounded-xl overflow-hidden">
                                        <Image src={nft.image} width="300px" height="300px"/>
                                        <div className="p-4">
                                            <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                                            <div style={{ height: '70px', overflow: 'hidden' }}>
                                                <p className="text-gray-400">{nft.description}</p>
                                                <p className="text-gray-400">Category {nft.category}</p>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-black">
                                            <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
                                            <button className="w-full bg-blue-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                                        </div>
                                    </div>
                                }
                                // return <div className="flex justify-center"><h1>No Items Found...</h1></div>  
                            })
                            
                        }  
                    </div>
                </div>
            </div>
          
        </>
    )
}

export default Marketplace;