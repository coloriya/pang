


function PangGroup (palette) {
	this.palette = palette;
	this.index = this.palette.groups.length;
	let start = this.index * this.palette.group_length;
	let end = start + this.palette.group_length;
	this.colors = this.palette.colors.slice(start, end);
}

PangGroup.prototype.getNIndex = function () {
	return this.index + 1;
}



module.exports = PangGroup;
