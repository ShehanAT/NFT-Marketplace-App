import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "next/link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import getWeb3 from "../../utils/getWeb3";
import { api } from "../../services/api";

import ArtMarketplace from "../../contracts/ArtMarketplace.json";
import ArtToken from "../../contracts/ArtToken.json";

import { useStyles } from "./styles.js";

import {
  setNft,
  setAccount,
  setTokenContract,
  setMarketContract,
} from "../../redux/actions/nftActions";
import Card from "../../components/Card";
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg";
import image5 from "../../assets/images/image5.jpg";
import image6 from "../../assets/images/image6.jpg";
import image7 from "../../assets/images/image7.jpg";
import image8 from "../../assets/images/image8.jpg";
import image9 from "../../assets/images/image9.jpg";

const Home = () => {
    const classes = useStyles();
    const nft = useSelector((state) => state.allNft.nft);
    const dispatch = useDispatch();


    useEffect(() => {
        let itemsList = [];
        const init = async () => {
            try {
                const web3 = await getWeb3();
                const accounts = await web3.eth.getAccounts();

                if(typeof accounts == undefined){
                    alert("Please login with MetaMask!");
                    console.log("Login to MetaMask");
                }

                const networkId = await web3.eth.net.getId();

                try {
                    const artTokenContract = new web3.eth.Contract(
                        ArtToken.abi,
                        ArtToken.networks[networkId].address
                    );
                    const totalSupply = await artTokenContract.methods
                        .totalSupply()
                        .call();
                    const totalItemsForSale = await marketplaceContract.methods
                        .totalItemsForSale()
                        .call();

                }catch(error){
                    console.error("error", error);
                }               
            }catch(error){
                console.error(error);
            }
        }
    });

    return (
        <div className={classes.homepage}>
            <h1>NFT Marketplace</h1>
            <section className={classes.banner}>
            <Grid container spacing={0} className={classes.gridBanner}>
                <Grid item={true} xs={3}>
                    <h3>Hi</h3>
                    <Grid container spacing={0}>
                    <Grid item xs={8}>
                        <img src={image1} alt="dreaming" className={classes.images} />
                    </Grid>
                    <Grid item xs={4}>
                        <img src={image2} alt="veterans" className={classes.images} />
                    </Grid>
                    <Grid item xs={7}>
                        <img src={image3} alt="modeling3d" className={classes.images} />
                    </Grid>
                    <Grid item xs={5}>
                        <img src={image4} alt="lionKing" className={classes.images} />
                    </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} className={classes.main}>
                    <img src={image9} alt="galerie" />
                    <Typography>A decentralized NFT marketplace where you can expose your art.</Typography>
                    {/* <Link href="/create-nft">
                    <Button variant="contained" color="primary" disableElevation>
                        Mint your art
                    </Button>
                    </Link>  */}
                </Grid>
                <Grid item xs={3}>
                    <Grid container spacing={0}>
                    <Grid item xs={8}>
                        <img src={image5} alt="dreaming" className={classes.images} />
                    </Grid>
                    <Grid item xs={4}>
                        <img src={image6} alt="veterans" className={classes.images} />
                    </Grid>
                    <Grid item xs={7}>
                        <img src={image7} alt="modeling3d" className={classes.images} />
                    </Grid>
                    <Grid item xs={5}>
                        <img src={image8} alt="lionKing" className={classes.images} />
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </section>
        </div>
    );
}

export default Home;