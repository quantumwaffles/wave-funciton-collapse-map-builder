<script>
	import TilePixel from './TilePixel.svelte'

	export let tile

	function range(n) {
		return Array.from({ length: n }, (_, i) => i)
	}
</script>

<div class="flex flex-col w-full h-full">
    {#each range(tile.height) as y}
        <div class="flex flex-row flex-grow">
            {#each range(tile.width) as x}
                {#if tile.data[y][x]}
                    <TilePixel color="#FFFFFF" readonly={true} />
                {:else}
                    <TilePixel color="#333333" readonly={true} />
                {/if}
            {/each}
        </div>
    {/each}
</div>
