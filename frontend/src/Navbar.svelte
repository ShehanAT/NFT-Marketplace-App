<script>
    import { onMount } from "svelte";

    let showMobileMenu = false;

    const navItems = [
        { label: "Home", href: "home" },
        { label: "Create NFT", href: "createNFT" },
    ];

    const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);

    const mediaQueryHandler = e => {
        if(!e.matches){
            showMobileMenu = false;
        }
    };

    onMount(() => {
        const mediaListener = windows.matchMedia("(max-width: 767px)");

        mediaListener.addListener(mediaQueryHandler);
    });
</script>


<nav>
    <div class="inner">
      <div on:click={handleMobileIconClick} class={`mobile-icon${showMobileMenu ? ' active' : ''}`}>
        <div class="middle-line"></div>
      </div>
      <ul class={`navbar-list${showMobileMenu ? ' mobile' : ''}`}>
        {#each navItems as item}
          <li>
            <a href={item.href}>{item.label}</a>
          </li>
        {/each}
      </ul>
    </div>
  </nav>