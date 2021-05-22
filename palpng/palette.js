


function Palette (app, json) {
	this.app = app;
	this.json = json;
	this.id = json.id;
	this.page = null;

	this.next = null;
	this.prev = this.app.getLastPalette();
	if (this.prev) {
		this.prev.next = this;
	}
}



Palette.prototype.getCssText = function () {
	let cssText = "";
	for (let index in this.json.colors) {
		let color = this.json.colors[index];
		cssText += `.pyp${this.id}${this.app.alphabet[index]} {background: ${color.hex};}\n`;
	}
	cssText += "\n\n";
	return cssText;
}



module.exports = Palette;
