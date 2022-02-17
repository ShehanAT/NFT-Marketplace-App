import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import getWeb3 from "../../utils/getWeb3";


export default function Home() {

    // useSelector() allows you to extract data from the Redux store state
    const nft = useSelector((state) => state.allNft.nft);
    const dispatch = useDispatch();

    useEffect(async () => {
        let itemsList = [];

        try {
            const web3 = await getWeb3();
            const account = await web3.eth.getAccounts();

            if(typeof accounts === undefined){
                alert("Please login with Metamask!");
                console.log("Please login with Metamask!");
            }
            
            const networkId = await web3.eth.net.getId();

            try {
                // const artTokenContract = new web3.eth.Contract(
                //     ArtToken.abi,
                //     ArtToken.networks[networkId].address
                // );

                // const marketplaceContract = new web3.eth.Contract(
                //     ArtMarketplace.abi,
                //     ArtMarketplace.networks[networkId].address 
                // );


            }catch(error){
                console.error("Error", error);
                alert("Contracts not deployed to the current network " + networkId.toString());
            }

        }catch(error){

        }
    });

    return (
        <div className="home-container">


        </div>

    );
}