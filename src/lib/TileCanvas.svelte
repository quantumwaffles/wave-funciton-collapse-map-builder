<script>
	import P5 from 'p5-svelte';

	export let tile;

	const sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(100, 100);
		};

		p5.draw = () => {
			p5.background(20);

			const xSize = p5.width / tile.width;
			const ySize = p5.height / tile.height;

			p5.fill(255);
			for (let y = 0; y < tile.height; y++) {
				for (let x = 0; x < tile.width; x++) {
					if (tile.data[y][x]) {
						p5.rect(x * xSize, y * ySize, xSize, ySize);
					}
				}
			}
		};
	};
</script>

<P5 {sketch} />
