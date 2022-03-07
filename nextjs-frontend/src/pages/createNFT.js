import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';
import Image from 'next/image';
import styles from '../../styles/Home.module.css'
import ReactTooltip from "react-tooltip";
import { Watch, Audio } from "react-loader-spinner";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")
import { 
    nftmarketaddress
} from '../../../nftConfig';


const watchLoadingSpinner = {
   
}

import Market from "../../../artifacts/contracts/Market.sol/NFTMarket.json";

export default function CreateItem() {
 
}