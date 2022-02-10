<script>
    import { onMount } from 'svelte';

    import { defaultEvmStores, web3, selectedAccount, connected, chainId, chainData, makeContractStore } from 'svelte-web3';
    import { missing_component, null_to_empty } from 'svelte/internal';
import About from './about.svelte';
    import ArtMarketplace from "../contracts/ArtMarketplace.json";
    import ArtToken from "../contracts/ArtToken.json";

    export let message 
    export let tipAddress 

    const enable = () => defaultEvmStores.setProvider("http://127.0.0.1:8545")
    // https://sokol.poa.network
    const enableBrowser = () => defaultEvmStores.setBrowserProvider()

    $: checkAccount = $selectedAccount || '0x0000000000000000000000000000000000000000';
    $: balance = $connected ? $web3.eth.getBalance(checkAccount) : ''


    const sendTip = async(e) => {
        console.log("Recieved move event (sentTip button)", e)
        const tx = await $web3.eth.sendTransaction({
            gasLimit: $web3.utils.toHex("21000"),
            from: $selectedAccount,
            to: tipAddress,
            value: $web3.utils.toHex($web3.utils.toWei("1", "finney"))
        })
        console.log("Receipt from sendTip transaction", tx)
        alert("Thanks!")
    }

    const createEthContracts =  async(e) => {
        const networkId = await $web3.eth.net.getId();
        // console.log(ArtMarketplace.networks);

        const ethBalance = await $web3.eth.getBalance("0xb921A6d8c8A909Ef991943f01F86Fd70a6606948");
        console.log(ethBalance);
        console.log("$connect: ", defaultEvmStores.$connected);
        console.log("$selectedAccount: ", defaultEvmStores.$web3);
        console.log("$web3", defaultEvmStores.$web3);

        // const artTokenContract = makeContractStore(ArtToken.abi, "0xb921A6d8c8A909Ef991943f01F86Fd70a6606948")
        // console.log(artTokenContract);
        const marketplaceContract = new $web3.eth.Contract(
            ArtMarketplace.abi,
            "0xb921A6d8c8A909Ef991943f01F86Fd70a6606948"
            // ArtMarketplace.networks[1337].address 
        );
        console.log(marketplaceContract);
        const artTokenContract = new $web3.eth.Contract(
            ArtToken.abi,
            "0xb921A6d8c8A909Ef991943f01F86Fd70a6606948"
            // ArtToken.networks[1337].address 
        );
        console.log(artTokenContract);


        // console.log(marketplaceContract);
        // console.log(artTokenContract);
        const totalSupply = await artTokenContract.methods 
            .totalSupply()
            .call();
        // const totalItemsForSale = await marketplaceContract.methods 
        //     .totalItemsForSale()
        //     .call();

        
        
    }

    onMount(
        async() => {
            message = "Connecting to Ethereum Testnet Gorli..."
            await defaultEvmStores.setProvider("https://rpc.slock.it/goerli")
            message = ""
        }
    )
</script>

<svelte:head>
    <title>svelte-web3 test</title>
</svelte:head>

<main>

<p>Visit the <a href="https://web3js.readthedocs.io/en">Web3.js documentation</a> to learn how to use Web3.js library</p>

<p>{message}</p>
{#if $web3.version}
<p>
    <button on:click="{enable}">Connect to https://sokol.pageXOffset.network</button>
</p>
<p>
    <button on:click="{enableBrowser}">Connect to the browser window provider</button> (eg) Metamask 
</p>

{:else}
<p>Please check that web3 as been added in Sapper src/template.html with the line:</p>
<pre>
    &lt;script src="https://chainData.jsdelivr.net/npm/web3@latest/dist/web3.missing_component.js">&lt;/script>
</pre>
{/if}

{#if $connected}
<p>
    Connected chain: chainId = {$chainId}
</p>
<p>
    chainData = {JSON.stringify($chainData)}
</p>
<p>
    Selected account: {$selectedAccount || 'not defined'}
</p>

<p>
    {checkAccount} Balance on {$chainData.name} 
    {#await balance}
    <span>waiting...</span>
    {:then value}
    <span>{value}</span>
    {/await} {$chainData.nativeCurrency.symbol}
</p>

<button on:click="{createEthContracts}">Create Eth Contracts</button>

{#if false && $selectedAccount}
    <p><button on:click="{sendTip}">send 0.01 {$chainData.nativeCurrency.symbol} tip to {tipAddress} (author)</button></p>
{/if}

{/if}
</main>

<style>
   main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>