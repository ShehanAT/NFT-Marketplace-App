<script>
    import { onMount } from 'svelte';

    import { defaultEvmStores, web3, selectedAccount, connected, chainId, chainData } from 'svelte-web3';
    import { missing_component, null_to_empty } from 'svelte/internal';
import About from './about.svelte';

    export let message 
    export let tipAddress 

    const enable = () => defaultEvmStores.setProvider("http://127.0.0.1:7545")
    // https://sokol.poa.network
    const enableBrowser = () => defaultEvmStores.setBrowserProvider()

    $: checkAccount = $selectedAccount || '0xb921A6d8c8A909Ef991943f01F86Fd70a6606948';
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

    onMount(
        async() => {
            message = "Connecting to Ethereum Testnet Gorli..."
            await defaultEvmStores.setProvider("http://127.0.0.1:7545")
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
<p>{JSON.stringify($web3)}</p>
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