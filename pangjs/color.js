


function PangColor (palette, json, index) {
	this.palette = palette;
	this.json = json;
	this.index = index;
	this.app = this.palette.app;
}


PangColor.prototype.getHexCode = function () {
	return this.json.hex;
}

PangColor.prototype.getNIndex = function () {
	return this.index + 1;
}

PangColor.prototype.getClassName = function () {
	return `pyp${this.palette.id}c${this.getNIndex()}`;
}

PangColor.prototype.getCssText = function () {
	return `.${this.getClassName()} {background: ${this.json.hex};}\n`;
}


module.exports = PangColor;
