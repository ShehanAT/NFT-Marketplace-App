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
  
}

export default Marketplace;