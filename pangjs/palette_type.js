


function PangPaletteType (app, json) {
	this.app = app;
	this.json = json;
	this.name = this.json.name;
	this.title = this.json.title;

	this.next = null;
	this.prev = this.app.getLastPaletteType();
	if (this.prev) {
		this.prev.next = this;
	}

	this.palettes = [];
	for (let palette of this.app.palettes) {
		if (palette.json.type == this.name) {
			palette.type = this;
			palette.type_index = this.palettes.length;
			this.palettes.push(palette);
		}
	}
}

PangPaletteType.prototype.getHref = function () {
	return this.name;
}

PangPaletteType.prototype.getNumberOfPalettes = function () {
	return this.palettes.length;
}

PangPaletteType.prototype.consoleLog = function () {
	console.log(`Type '${this.name}' has ${this.getNumberOfPalettes()} palettes.`);
}



module.exports = PangPaletteType;
