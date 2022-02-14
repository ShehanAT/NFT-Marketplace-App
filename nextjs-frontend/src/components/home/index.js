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

            


        }catch(error){

        }
    });

    return (
        <div className="home-container">


        </div>

    );
}