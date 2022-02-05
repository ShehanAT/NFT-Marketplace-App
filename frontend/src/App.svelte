<script>
	import Home from './Home.svelte';
	import Navbar from './Navbar.svelte';
  import CreateNft from './CreateNFT.svelte';
</script>

<main>
	<div>
      <nav class="border-b p-6">
        <p class="text-4xl font-bold">Metaverse Marketplace</p>
        <div class="flex mt-4">
            <a class="mr-4 text-pink-500" href="/">
              Home
            </a>
            <a class="mr-6 text-pink-500" href="/create-item">
              Sell Digital Assets123123123
            </a>
            <a class="mr-6 text-pink-500" href="/my-assets">
              My Digital Assets
            </a>
            <a class="mr-6 text-pink-500" href="/creator-dashboard">
              Creator Dashboard
            </a>
        </div>
        <Home />
        <CreateNft />
      </nav>
    </div>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>