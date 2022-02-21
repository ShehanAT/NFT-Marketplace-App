import React, { useEffect, useState } from "react";
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
import image1 from "../../assets/images/image1_sm.png";
import image2 from "../../assets/images/image2_sm.png";
import image3 from "../../assets/images/image3_sm.png";
import image4 from "../../assets/images/image4_sm.png";
import image5 from "../../assets/images/image5_sm.png";
import image6 from "../../assets/images/image6_sm.png";
import image7 from "../../assets/images/image7_sm.png";
import image8 from "../../assets/images/image8_sm.png";
import image9 from "../../assets/images/image9_sm.png";

const Home = () => {
    const classes = useStyles();
    const nft = useSelector((state) => state.allNft.nft);
    const dispatch = useDispatch();
    const [ counter, setCounter ] = useState(0);

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
                    console.log(ArtToken);
                    console.log(networkId);
                    console.log(ArtToken.networks[networkId].address);
                    const artTokenContract = new web3.eth.Contract(
                        ArtToken.abi,
                        ArtToken.networks[networkId].address
                    );

                    const marketplaceContract = new web3.eth.Contract(
                        ArtMarketplace.abi,
                        ArtMarketplace.networks[networkId].address
                    )
                    
                    // RUNNING INTO 'RETURN VALUES AREN'T VALID, DID IT RUN OUT OF GAS?' error 
                    const totalSupply = await artTokenContract.methods
                        .totalSupply()
                        .call();
                    console.log(totalSupply);
                    const totalItemsForSale = await marketplaceContract.methods
                        .totalItemsForSale()
                        .call();
                    console.log(totalItemsForSale);
                    for (var tokenId = 1; tokenId <= totalSupply; tokenId++){
                        let item = await artTokenContract.methods.Items(tokenId).call();
                        let owner = await artTokenContract.methods.ownerOf(tokenId).call();

                        const response = await api
                            .get(`/tokens/${tokenId}`)
                            .catch((err) => {
                                console.log("Err: ", err);
                            });
                        console.log("response: ", response);

                        itemsList.push({
                            name: response.data.name,
                            description: response.data.description,
                            image: response.data.image,
                            tokenId: item.id,
                            creator: item.creator,
                            owner: owner,
                            uri: item.uri,
                            isForSale: false,
                            saleId: null,
                            price: 0, 
                            isSold: null,
                        });
                    }

                        if(totalItemsForSale > 0){
                            for(var saleId = 0; saleId < totalItemsForSale; saleId++){
                                let item = await marketplaceContract.methods 
                                    .itemsForSale(saleId)
                                    .call();
                                let active = await marketplaceContract.methods 
                                    .activeItems(item.tokenId)
                                    .call();

                                let itemListIndex = itemsList.findIndex(
                                    (i) => i.tokenId === item.tokenId 
                                );

                                itemsList[itemListIndex] = {
                                    ...itemsList[itemListIndex],
                                    isForSale: active,
                                    saleId: item.id,
                                    price: item.price,
                                    isSold: item.isSold
                                };

                            }
                        }
                    //     // dispatch is the function that is used to trigger state changes in the Redux store
                    //     // Note: dispatch is not availabe as props 
                        dispatch(setAccount(accounts[0])); // these methods are defined as Redux actions methods 
                        dispatch(setTokenContract(artTokenContract));
                        dispatch(setMarketContract(marketplaceContract));
                        dispatch(setNft(itemsList));
                }catch(error){
                    console.error("error", error);
                }               
            }catch(error){
                console.error(error);
            }
        };
        init();
    }, []);

    console.log("Nft :", nft);

    const nftItem = useSelector((state) => state.allNft.nft);

    const handleOnClick = () => {
        init();
        setCounter(counter + 1);
    }

    return (
        <div className={classes.homepage}>
            <h1 style={{ textAlign: "center" }}>NFT Marketplace</h1>
            <section className={classes.banner}>
            <Grid container spacing={0} className={classes.gridBanner}>
                <Grid item={true} xs={3}>
                    <Grid container spacing={0}>
                    <Grid item xs={8}>
                        <img src={image1.src} alt="dreaming" className={classes.images} />
                    </Grid>
                    <Grid item xs={4}>
                        <img src={image2.src} alt="veterans" className={classes.images} />
                    </Grid>
                    <Grid item xs={7}>
                        <img src={image3.src} alt="modeling3d" className={classes.images} />
                    </Grid>
                    <Grid item xs={5}>
                        <img src={image4.src} alt="lionKing" className={classes.images} />
                    </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} className={classes.main}>
                    <img src={image9.src} alt="galerie" />
                    <h2>A decentralized NFT marketplace where you can expose your art</h2>
                    {/* <Link href="/create-nft">
                    <Button variant="contained" color="primary" disableElevation>
                        Mint your art
                    </Button>
                    </Link>  */}
                </Grid>
                <Grid item xs={3}>
                    <Grid container spacing={0}>
                    <Grid item xs={8}>
                        <img src={image5.src} alt="dreaming" className={classes.images} />
                    </Grid>
                    <Grid item xs={4}>
                        <img src={image6.src} alt="veterans" className={classes.images} />
                    </Grid>
                    <Grid item xs={7}>
                        <img src={image7.src} alt="modeling3d" className={classes.images} />
                    </Grid>
                    <Grid item xs={5}>
                        <img src={image8.src} alt="lionKing" className={classes.images} />
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </section>
            <section className={classes.allNfts}>
                <h2 style={{ textAlign: "center" }}>Latest artwork</h2>
                <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                >
                { nftItem.length ? 
                    nftItem.map((nft) => (
                        <Grid item key={nft.tokenId}>
                        <Card {...nft} />
                        </Grid>
                    ))
                : 
                    <h3>No artwork found...</h3>
                }
                </Grid>
            </section>
        </div>
    );
}

export default Home;