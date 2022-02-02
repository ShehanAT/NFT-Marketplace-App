<script>
	import Home from './Home.svelte';
	import Navbar from './Navbar.svelte';
</script>

<main>
	<div>
      <nav class="border-b p-6">
        <p class="text-4xl font-bold">Metaverse Marketplaces</p>
		<p class="text-4xl font-bold">Masdfasdf</p>
        <div class="flex mt-4">
            <a class="mr-4 text-pink-500" href="/">
              Home
            </a>
            <a class="mr-6 text-pink-500" href="/create-item">
              Sell Digital Assets
            </a>
            <a class="mr-6 text-pink-500" href="/my-assets">
              My Digital Assets
            </a>
            <a class="mr-6 text-pink-500" href="/creator-dashboard">
              Creator Dashboard
            </a>
        </div>
      </nav>
    </div>
	<!-- <Navbar />
	<Home />
	<CreateNft /> -->
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