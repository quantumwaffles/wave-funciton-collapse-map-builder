<script>
	import TilePixel from './TilePixel.svelte'

	export let readonly = false
	export let tile

	function range(n) {
		return Array.from({ length: n }, (_, i) => i)
	}

	function toggle(x, y) {
		if (!readonly) {
			tile.data[y][x] = !tile.data[y][x]

			tile.sockets.top = bitArrayToInt(tile.data[0])
			tile.sockets.bottom = bitArrayToInt(tile.data[tile.height - 1])
			tile.sockets.left = bitArrayToInt(tile.data.map(row => row[0]))
			tile.sockets.right = bitArrayToInt(tile.data.map(row => row[tile.width - 1]))
		}
	}

	function bitArrayToInt(bits) {
		let result = 0

		for (let i = 0; i < bits.length; i++) {
			result += bits[i] << i
		}

		return result
	}	
</script>

<div class="w-full h-full grid gap-2 grid-cols-[3rem,auto,3rem] grid-rows-[3rem,auto,3rem]">
	<div />
	<div class="flex justify-center items-end">
		<input type="text" class="border-2 outline-none rounded-md w-[2rem] h-[2rem] text-center bg-transparent text-white uppercase" bind:value={tile.sockets.top}>
	</div>
	<div />
	<div class="flex flex-col justify-center items-end">
		<input type="text" class="border-2 outline-none rounded-md w-[2rem] h-[2rem] text-center bg-transparent text-white uppercase" bind:value={tile.sockets.left}>
	</div>
	<div class="flex flex-col w-full h-full border-2 rounded-md overflow-hidden">
		{#each range(tile.height) as y}
			<div class="flex flex-row flex-grow">
				{#each range(tile.width) as x}
					{#if tile.data[y][x]}
						<TilePixel color="#FFFFFF" on:click={() => toggle(x, y)} {readonly} />
					{:else}
						<TilePixel color="#333333" on:click={() => toggle(x, y)} {readonly} />
					{/if}
				{/each}
			</div>
		{/each}
	</div>
	<div class="flex flex-col justify-center items-start">
		<input type="text" class="border-2 outline-none rounded-md w-[2rem] h-[2rem] text-center bg-transparent text-white uppercase" bind:value={tile.sockets.right}>
	</div>
	<div />
	<div class="flex justify-center items-start">
		<input type="text" class="border-2 outline-none rounded-md w-[2rem] h-[2rem] text-center bg-transparent text-white uppercase" bind:value={tile.sockets.bottom}>
	</div>
	<div />
</div>
