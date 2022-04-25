<script>
	import {Tile} from '$lib/Tile.js';
	import TileEditor from './TileEditor.svelte'	
import TileViewer from './TileViewer.svelte';

	export let tiles
	export let selectedIndex

	function deepClone(obj) {
		return JSON.parse(JSON.stringify(obj))
	}

	function addTile() {
		const lastTile = tiles[tiles.length - 1]

		// tiles = [...tiles, deepClone(lastTile)]
		tiles = [...tiles, new Tile(lastTile.width, lastTile.height)]

		onPickTile(tiles.length - 1)
	}

	function removeTile(i) {
		if (tiles.length <= 1) return

		tiles.splice(i, 1)
		tiles = tiles

		if (selectedIndex >= tiles.length) {
			onPickTile(tiles.length - 1)
		}
	}

	function onPickTile(i) {
		selectedIndex = i
	}

	function dragStart(e, tileIndex) {
		e.dataTransfer.setData('tileIndex', tileIndex)
	}
</script>

<div class="grid grid-cols-[3rem,1rem] gap-4 items-center">
	{#each tiles as tile, i}
		<div
			class="relative w-[50px] h-[50px] border-2 rounded-md overflow-hidden {i === selectedIndex &&
				'outline outline-2 outline-yellow-300'}"
			on:click={() => onPickTile(i)} draggable={true} on:dragstart={e => dragStart(e, i)}>
			<TileViewer {tile} />
		</div>

		<div
			class="relative w-4 h-4 border border-white bg-red-600 rounded-full cursor-pointer select-none transition-all"
			on:click={() => removeTile(i)}>
			<div class="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center">
				<span class="bg-white h-[1px]" />
			</div>
		</div>
	{/each}

	<div
		class="relative w-8 h-8 border-2 rounded-full cursor-pointer select-none hover:rotate-90 transition-all justify-self-center"
		on:click={addTile}>
		<div class="absolute top-1 left-1 right-1 bottom-1 flex justify-center">
			<span class="bg-white w-1 rounded-sm" />
		</div>
		<div class="absolute top-1 left-1 right-1 bottom-1 flex flex-col justify-center">
			<span class="bg-white h-1 rounded-sm" />
		</div>
	</div>
</div>
