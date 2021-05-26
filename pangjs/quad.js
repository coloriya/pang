


function PangQuad (palette) {
	this.palette = palette;
	this.index = this.palette.quads.length;
	let start = this.index * 4;
	let end = start + 4;
	this.colors = this.palette.colors.slice(start, end);
}

PangQuad.prototype.getNIndex = function () {
	return this.index + 1;
}



module.exports = PangQuad;
