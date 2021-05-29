


function PangPaletteTypePage (type, number) {
	this.type = type;
	this.app = this.type.app;
	this.number = number;

	this.start = this.type.pageLength * (number - 1);
	this.end = this.start + this.type.pageLength;
	this.palettes = this.type.palettes.slice(this.start, this.end);

	this.next = null;
	this.prev = this.type.getLastPage();
	if (this.prev) {
		this.prev.next = this;
	}
}



module.exports = PangPaletteTypePage;
