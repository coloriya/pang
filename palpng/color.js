


function PangColor (palette, json, index) {
	this.palette = palette;
	this.json = json;
	this.index = index;
	this.app = this.palette.app;
}


PangColor.prototype.getCssText = function () {
	return `.pyp${this.palette.id}${this.app.alphabet[this.index]} {background: ${this.json.hex};}\n`;
}


module.exports = PangColor;
