import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Image from 'next/image';
import styles from '../../styles/Home.module.css'
import {
  nftmarketaddress
} from '../../../nftConfig';

import Market from '../../../artifacts/contracts/Market.sol/NFTMarket.json';

export default function MyAssets(){
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('loading')

    useEffect(() => {
        loadNFTs()
    }, [])

    async function loadNFTs(){
        const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true,
        });
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        const data = await marketContract.fetchMyNFTs()

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
            }
            return item 
        }))
        setNfts(items)
        setLoadingState('Done')
    }
    
    if(loadingState === "Done" && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets owned</h1>)
    return (
        <>
            <div className="flex justify-center">
                <h3>MY ASSETS</h3>
            </div>
            <div className={styles.container}>
                <div className="flex justify-center">
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                        {
                            nfts.map((nft, i) => (
                                <div key={i} className="border shadow rounded-xl overflow-hidden">
                                    <Image src={nft.image} className="rounded" width="300px" height="300px" />
                                    <div className="p-4 bg-white">
                                        <p className="text-2xl font-bold-text-black">Price - {nft.price} Eth</p>
                                    </div>
                                </div>
                            ))
                        }    
                    </div> 
                </div>
                </div>
            </div>
        </>
    )
}
