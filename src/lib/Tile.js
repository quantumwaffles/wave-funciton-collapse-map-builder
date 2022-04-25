export class Tile {
	constructor(width, height) {
		this.width = width
		this.height = height

		this.data = []
		for (let i = 0; i < width; i++) {
			this.data[i] = []
			for (let j = 0; j < height; j++) {
				this.data[i][j] = 0
			}
		}

		this.sockets = {
			top: null,
			right: null,
			bottom: null,
			left: null,
		}
	}
}
