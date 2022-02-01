<script>
	export let name;
	import Home from './Home.svelte';
</script>

<main>
	<div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Metaverse Marketplace</p>
        <div className="flex mt-4">
            <a class="mr-4 text-pink-500" href="/">
              Home
            </a>
            <a class="mr-6 text-pink-500" href="/create-item">
              Sell Digital Asset
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

	<Home></Home>
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