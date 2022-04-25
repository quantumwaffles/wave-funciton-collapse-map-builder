<script>
	import TileEditor from './TileEditor.svelte'

	export let neighbors
	export let tiles
	export let orientation = 'horizontal'

	function drop(e) {
		e.preventDefault()
		const tileIndex = e.dataTransfer.getData('tileIndex')

		neighbors.push(tiles[tileIndex])
		neighbors = neighbors
	}

    function removeNeighbor(i) {
        neighbors.splice(i, 1)
        neighbors = neighbors
    }
</script>

<div
	class="border-2 rounded-lg flex items-center gap-2 p-2"
	class:flex-col={orientation === 'col'}
	on:drop={(e) => drop(e)}
	ondragover="return false">
	{#each neighbors as neighbor, i}
		<div class="w-9 h-9 border-2 rounded-md overflow-hidden cursor-pointer hover:opacity-25" on:click={() => removeNeighbor(i)}>
			<TileEditor bind:tile={neighbor} readonly={true} />
		</div>
	{/each}
</div>
