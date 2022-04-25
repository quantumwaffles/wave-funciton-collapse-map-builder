<script>
	import TileEditor from './TileEditor.svelte'
	import TilePalette from './TilePalette.svelte'
	import { Tile } from './Tile.js'
	import TileMap from './TileMap.svelte'

	let tiles = [new Tile(5, 5)]

	let selectedIndex = 0
</script>

<div class="w-screen h-screen">
	<div class="flex h-full w-full">
		<div class="border-r p-2 h-full w-[10rem] overflow-y-scroll">
			<TilePalette bind:tiles bind:selectedIndex />
		</div>

		<div class="flex flex-col w-full h-full">
			<div class="p-2 w-[400px] h-[400px]">
				<TileEditor bind:tile={tiles[selectedIndex]} readonly={false} />
			</div>

			<div class="border-t p-2" on:click={() => tiles = tiles}>
				<TileMap {tiles} />
			</div>
		</div>
	</div>
</div>
