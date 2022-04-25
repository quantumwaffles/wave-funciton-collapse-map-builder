<script>
	import P5 from 'p5-svelte/P5.svelte'
	import TileViewer from './TileViewer.svelte'

	export let tiles
	export let width = 20
	export let height = 20
	export let tileSize = 30

	let map
	$: {
		map = Array.from({ length: height }, () =>
			Array.from({ length: width }, () => {
				return { tile: null }
			}),
		)

		let totalEntropy
		let count = 0
		do {
			count++
			totalEntropy = 0
			let minEntropyCell = null
			for (let y = 0; y < height; y++) {
				for (let x = 0; x < width; x++) {
					let cur = map[y][x]

					if (cur.collapsed) continue

					let n = map[y - 1]?.[x]?.tile
					let s = map[y + 1]?.[x]?.tile
					let w = map[y]?.[x - 1]?.tile
					let e = map[y]?.[x + 1]?.tile

					let possibilities = tiles.filter((tile) => {
						return (
							(n == null ||
								(tile.sockets.top ?? '') === '' ||
								(n.sockets.bottom ?? '') === '' ||
								n.sockets.bottom === tile.sockets.top) &&
							(s == null ||
								(tile.sockets.bottom ?? '') === '' ||
								(s.sockets.top ?? '') === '' ||
								s.sockets.top === tile.sockets.bottom) &&
							(w == null ||
								(tile.sockets.left ?? '') === '' ||
								(w.sockets.right ?? '') === '' ||
								w.sockets.right === tile.sockets.left) &&
							(e == null ||
								(tile.sockets.right ?? '') === '' ||
								(e.sockets.left ?? '') === '' ||
								e.sockets.left === tile.sockets.right)
						)
					})

					cur.possibilities = possibilities
					cur.entropy = possibilities.length

					if (minEntropyCell == null || cur.entropy < minEntropyCell.entropy) {
						minEntropyCell = cur
					}

					totalEntropy += cur.entropy
				}
			}

			// console.log(totalEntropy)

			if (minEntropyCell) {
				minEntropyCell.tile =
					minEntropyCell.possibilities[
						Math.floor(Math.random() * minEntropyCell.possibilities.length)
					]
				minEntropyCell.collapsed = true
			}
		} while (totalEntropy > 0 && count < width * height * 2)
	}

	function sketch(p5) {
		p5.setup = () => {
			p5.createCanvas(width * tileSize, height * tileSize)
		}

		p5.draw = async () => {
			p5.background(20)

			drawMap(map)

			// p5.noLoop()
		}

		function drawMap(map) {
			let j = 0
			for (let row of map) {
				let i = 0
				for (let cell of row) {
					let x = i * tileSize
					let y = j * tileSize
					p5.noStroke()
					// p5.stroke(50)
					p5.noFill()
					p5.rect(x, y, tileSize, tileSize)

					if (cell.entropy === 0) {
						p5.fill('red')
						p5.rect(x, y, tileSize, tileSize)
					}
					drawTile(cell.tile, x, y)
					i++
				}
				j++
			}
		}

		function drawTile(tile, x, y) {
			if (!tile) return

			p5.push()
			p5.translate(x, y)
			p5.noStroke()

			const pixelSizeX = tileSize / tile.width
			const pixelSizeY = tileSize / tile.height

			for (let i = 0; i < tile.height; i++) {
				for (let j = 0; j < tile.width; j++) {
					if (tile.data[j][i]) {
						p5.fill('white')
						p5.rect(i * pixelSizeX, j * pixelSizeY, pixelSizeX, pixelSizeY)
					}
				}
			}

			p5.pop()
		}
	}
</script>

<div class="grid w-fit" style="grid-template-columns: repeat({width}, 1fr);">
    <P5 {sketch} />
	<!-- {#each map as row}
        {#each row as cell}
            <div class="w-4 h-4">
                <TileViewer tile={cell.tile} />
            </div>
        {/each}
    {/each} -->
</div>
