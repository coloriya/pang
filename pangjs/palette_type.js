
const PangPaletteTypePage = require("./palette_type_page");



function PangPaletteType (app, json) {
	this.app = app;
	this.json = json;
	this.name = this.json.name;
	this.title = this.json.title;

	this.index = this.app.palette_types.length;
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

	this.pageLength = this.app.preferences.pageLength;
	this.numberOfPages = Math.ceil(this.getNumberOfPalettes() / this.pageLength);
	this.pages = [];
	for (let pageNumber = 1; pageNumber <= this.numberOfPages; pageNumber++) {
		let page = new PangPaletteTypePage(this, pageNumber);
		this.pages.push(page);
	}
}

const PangBaseClass = require("./baseclass");
PangPaletteType.prototype = new PangBaseClass();



PangPaletteType.prototype.getHref = function () {
	return this.name;
}

PangPaletteType.prototype.consoleLog = function () {
	console.log(`\tPalette type '${this.name}':`);
	console.log(`\t\t(${this.getNumberOfPalettes()} palettes)`);
	console.log(`\t\t(${this.getNumberOfPages()} pages)`);
}



PangPaletteType.prototype.saveCss = function () {
	//
}

PangPaletteType.prototype.saveHtml = function () {
	//
}



module.exports = PangPaletteType;
