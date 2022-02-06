<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore.js">

    import jQuery from "jquery";
    // import getWeb3 from "./utils/getWeb3"; // importing this library causes 'util$4 not defined' error
    import _ from "lodash";
    import { onMount } from "svelte";
import Web3 from "web3";
    import {
      defaultEvmStores,
      web3,
      selectedAccount,
      connected,
      chainId,
      chainData
    } from 'svelte-web3';

    import DAI from "./utils/contract-stores";

    let type;
    let connectionPending = false;
    const connect = async() => {
      connectionPending = true;
      try {
        const handler = {
          Browser: () => defaultEvmStores.setProvider(),
        }
        await handler[type]()
        console.log("$connected", defaultEvmStores.$connected);
        connectionPending = false;

      }catch(e){
        console.log(e);
        connectionPending = false 
      }
    
    }

    const disconnect = async() => {
      console.log(await $DAI.methods.totalSupply().call())

      await defaultEvmStores.disconnect();
      connectionPending = false;
    }

    let nfts = [];
    let loadingState = "not-loaded";
  
 
    onMount(async () => {
      let itemsList = [];
      const init = async() => {
        try {
          const provider = new Web3.providers.HttpProvider(
            "http://127.0.0.1:7545"
          );
          // const web3 = new Web3(provider);
          // console.log("web3 invocation!")
          // const accounts = await web3.eth.getAccounts();

          // if(typeof accounts == undefined){
          //   alert("Please login with Metamask!");
          //   console.log("Please login to MetaMask");
          // }

          // const networkId = await web3.eth.net.getId();
          try {
            const artTokenContract = new web3.eth.Contract(
              ArtToken.abi,
              ArtToken.networks[networkId].address 
            );

            const marketplaceContract = new web3.eth.Contract(
              ArtMarketplace.abi,
              ArtMarketplace.networks[networkId].address
            );

            const totalSupply = await artTokenContract.methods 
              .totalSupply()
              .call();
            
            const totalItemsForSale = await marketplaceContract.methods 
              .totalItemsForSale()
              .call();

            // for(var tokenId = 1; tokenId <= totalSupply; tokenId++){
            //   let item = await artTokenContract.methods.Items(tokenId).call();
            //   let owner = await artTokenContract.methods.ownerOf(tokenId).call();

            //   const response = await api 
            // }

          }catch(error){
            console.error("Error", error);
            alert("Contracts not deployed to the current network " + networkId.toString());
          }

        }
        catch(error){
          // alert(`Failed to load web3, accounts or contract. More details: ` + error);
          // console.error(error);
          console.log(error);
        }

      }

    });


    jQuery(document).ready(function() {
      /*=====DUMMY JSON ARRAY======*/
  
      //Object Array
      var dummy = {
        images: [
          // These are JSON objects can be loaded with AJAX call
          // Object 1 - '{}' seperate objects
          {
            title: "Active Surplus",
            description: "Bought a New Geo - why??",
            img_url:
              "https://farm8.staticflickr.com/7491/15643889496_1fb839729b.jpg",
            url: "https://www.flickr.com/photos/128274399@N07/"
          },
          // Object 2
          {
            title: "Umbra Store Front",
            description: "UMBRA - YES Canadian designers!",
            //Replace URL with your own source file
            img_url:
              "https://farm4.staticflickr.com/3936/15481655047_8fcaf90f2e.jpg",
            url: "https://www.flickr.com/photos/128274399@N07/"
          },
          // Object 3
          {
            title: "Ghandis",
            description: "Go back for Butter Chicken!!",
            //Replace URL with your own source file
            img_url:
              "https://farm6.staticflickr.com/5614/15667628115_45a879fb82.jpg",
            url: "https://www.flickr.com/photos/128274399@N07/"
          },
          //Object 4
          {
            title: "Black Market Clothing",
            description: "Vintage T shirts, biker jackets",
            //Replace URL with your own source file
            img_url:
              "https://farm6.staticflickr.com/5611/15046880434_d8a3981dd1.jpg",
            url: "https://www.flickr.com/photos/128274399@N07/"
          },
          //Object 5
          {
            title: "Graffiti on Queen St.",
            description: "Cool graffiti in the heart on Toronto!",
            //Replace URL with your own source file
            img_url:
              "https://farm6.staticflickr.com/5610/15047481463_cb5f7c6d28.jpg",
            url: "https://www.flickr.com/photos/128274399@N07/"
          },
          {
            title: "Statue Near St. Andrew",
            description: "Who would've known metal can be so cool?",
            //Replace URL with your own source file
            img_url:
              "https://farm6.staticflickr.com/5601/15048772403_1a7dd6c208.jpg",
            url: "https://www.flickr.com/photos/128274399@N07/"
          },
          {
            title: "Black Bull Patio",
            description: "Sometimes we just need to kick it and relax",
            img_url:
              "https://farm9.staticflickr.com/8629/15326129214_9baec740bb_n.jpg",
            url: "https://www.flickr.com/photos/128274399@N07/"
          },
          {
            title: "Black Bull Signage",
            description:
              "Gorgeous Black Lettering and styling on the top of the sign.",
            img_url:
              "https://farm8.staticflickr.com/7510/15946443811_a5fcb82e0b_n.jpg",
            url: "https://www.flickr.com/photos/128274399@N07/"
          },
          {
            title: "Shopping at Active Surplus",
            description: "Matt getting the tactile feel of em' old modems",
            img_url:
              "https://farm8.staticflickr.com/7495/15948406325_025e991c27_n.jpg",
            url: "https://www.flickr.com/photos/128274399@N07/"
          },
          {
            title: "Exploring Yorkdale Subway Station",
            description: "Flashing the transfers at Yorkdale",
            img_url:
              "https://farm9.staticflickr.com/8598/15760989838_ca2cbc1538_n.jpg",
            url: "https://www.flickr.com/photos/128274399@N07/"
          },
          {
            title: "Doing Business with Active Surplus",
            description: "Pete took one for the team to complete our assignment",
            img_url:
              "https://farm9.staticflickr.com/8642/15948409085_334cb7263a_n.jpg ",
            url: "https://www.flickr.com/photos/128274399@N07/"
          },
          {
            title: "Shopfronts on Queen St.",
            description: "Candid shot of Matt mwahaha",
            img_url:
              "https://farm9.staticflickr.com/8573/15948409995_a20a0cdd33_n.jpg",
            url: "https://www.flickr.com/photos/128274399@N07/"
          }
        ]
      };
  
      /*============================*/
  
      //Width and Height resized within img tag
      //Using Underscore JS plugin to grab the variables in the JSON objects and put them right in the HTML code
      var compiled = _.template(
        '<div class="contentBox" style="background-image: url(<%= img_url %>); background-size: cover;"><div class="boxCover caption"><a href="<%= url %>" target = "_blank"><%= title %></a><br><%= description %></div></div>'
      );
  
      //Takes the Object Array and writes it into the HTML under the content tag
      for (var i = 0; i < dummy.images.length; i++) {
        var text = compiled(dummy.images[i]);
        jQuery("#content").append(text);
      }
  
      //Javascript Hover
  
      jQuery(".contentBox").hover(
        function() {
          jQuery(this)
            .find(".boxCover")
            .fadeTo("slow", 0.8, function() {});
        },
        function() {
          jQuery(this)
            .find(".boxCover")
            .fadeTo("fast", 0, function() {
              //After complete
            });
        }
      );
    });
    // });
  </script>
  
  <div class="horizontalLine top"></div>
  <div class="title">Responsive Photogallery</div>
  <div class="horizontalLine bottom"></div>
      <div class="subtitle">Queen Street - Toronto</div>
  <!--Wrapper-->
  
      <div id="content" class="cf center">
          
   
      </div>
  
  <div class="credits">Mouse over for description.<br><a href="http://lisamuel.wordpress.com/code/photo-gallery-template-htmlcssjs/" target = "_blank">The Thought Process!</a><br>Samuel Li</div>
  
  
  <style>
      @import url("https://fonts.googleapis.com/css?family=Oswald:400,300,700");
      /*Samuel Li Photo Template Design (CSS) References: https://codepen.io/OddlyTimbot/ https://codepen.io/cheeriottis/pen/inluv */
      /*===Color Scheme==== Using SCSS For easier swapping of colors */
      /*==Variables of Grid==*/
      @media (max-width: 600px) {
        .contentBox {
          width: 50%;
        }
      }
      html {
        box-sizing: border-box;
      }
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
      body,
      html {
        height: 100%;
        margin: 0px;
        background-color: #222;
      }
      /* ========Grid Style======================*/
      .center {
        text-align: center;
      }
      .content {
        text-align: center;
      }
      .contentBox {
        font-family: Oswald, sans-serif;
        font-weight: 300;
        background-color: #53c4e1;
        border: 1px solid #a29e74;
        width: 25%;
        height: 242px;
        box-shadow: 5px 5px 20px 2px #111;
        padding: 0px;
        margin: 5px;
        margin-top: 10px;
        /*Vertical align helps keep the boxes vertically aligned*/
        vertical-align: top;
        display: inline-block;
      }
      .boxCover {
        position: relative;
        top: 60%;
        height: 40%;
        width: 100%;
        background-color: #fff;
        opacity: 0;
      }
      /*======Button Functionality Code======*/
      .animate {
        transition: all 1s;
        -webkit-transition: all 1s;
      }
      .contentBox:hover {
        border: 1px solid #53c4e1;
      }
      /* Clearfix hack curtosy of OddlyTimbot (my prof) codepen.io/team/OddlyTimbot */
      .cf:before,
      .cf:after {
        content: " ";
        /* 1 */
        display: table;
        /* 2 */
      }
      .cf:after {
        clear: both;
      }
      /* ===========Template Style====================== */
      .title {
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), #954c65;
        border: 1px solid #a29e74;
        border-top-style: dotted;
        border-bottom-style: dotted;
        border-left-style: none;
        border-right-style: none;
        padding-top: 3px;
        padding-bottom: 3px;
        /*Text Design-----*/
        color: #fff;
        text-shadow: 1px 1px #3d5665, 2px 2px #3d5665, 3px 3px #3d5665,
          4px 4px #3d5665;
        font-family: "Oswald", sans-serif;
        font-weight: 700;
        text-align: center;
        text-transform: uppercase;
        font-size: 2em;
        letter-spacing: 2px;
      }
      .subtitle {
        font-family: "Oswald", sans-serif;
        font-weight: 400;
        font-size: 1.4em;
        color: #fff;
        text-align: center;
        margin: 10px;
      }
      .caption {
        font-family: "Oswald", sans-serif;
        font-weight: 300;
        font-size: 1.1em;
        color: black;
        text-align: left;
        padding: 5px;
      }
      .horizontalLine {
        background-color: #3d5665;
        padding-bottom: 1px;
        padding-top: 1px;
        padding: 1px;
      }
      .top {
        margin-top: 15px;
      }
      .bottom {
        margin-bottom: 3px;
      }
      .credits {
        position: relative;
        font-family: "Oswald", sans-serif;
        font-weight: 300;
        font-size: 0.9em;
        color: #999;
        text-align: right;
        letter-spacing: 1px;
      }
  </style>