import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';
import Image from 'next/image';

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")

import { 
    nftaddress, nftmarketaddress
} from '../config';

// import NFT from "../artifacts/contracts/NFT.sol/";
// import Market from "../artifacts/contracts/Market.sol/";

export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: ''});
    const router = useRouter()

    async function onChange(e){
        const file = e.target.files[0]
        try {
            const added = await client.add(
                file, 
                { 
                    progress: (prog)
                }
            )
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        setFileUrl(url);
        } catch(error){
            console.log('Error uploading file: ', error);
        }
    }

    async function createMarket() {
        const { name, description, price } = formInput 
        if(!name || !description || !price || !fileUrl) return 
        const data = JSON.stringify({
            name, description, image: fileUrl
        })
        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            createSale(url)
        }catch(error){
            console.log('Error uploading file: ', error)
        }
    }

}