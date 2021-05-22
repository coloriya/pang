
const fs = require("fs");

const Palette = require("./palette");
const Page = require("./page");



function PalpngApp () {
	this.preferences = JSON.parse(fs.readFileSync("preferences.json"));
	this.paths = this.preferences.paths;
	this.gaText = fs.readFileSync(this.paths.analytics, 'utf8');

	this.setupPalettes();
	this.setupPages();
}

PalpngApp.prototype.setupPalettes = function () {
	this.paletteJson = JSON.parse(fs.readFileSync(this.paths.palettes));

	this.palettes = [];
	for (let paletteJson of this.paletteJson.palettes) {
		let palette = new Palette(this, paletteJson);
		this.palettes.push(palette);
	}
	this.numberOfPalettes = this.palettes.length;
}

PalpngApp.prototype.setupPages = function () {
	this.pageLength = this.preferences.pageLength;
	this.numberOfPages = Math.ceil(this.numberOfPalettes / this.pageLength);
	this.pages = [];
	for (let pageNumber = 1; pageNumber <= this.numberOfPages; pageNumber++) {
		let page = new Page(this, pageNumber);
		this.pages.push(page);
		page.consoleLog();
	}
}



PalpngApp.prototype.getLastPage = function () {
	if (this.pages.length) {
		return this.pages[this.pages.length - 1];
	}
	return null;
}

PalpngApp.prototype.getLastPalette = function () {
	if (this.palettes.length) {
		return this.palettes[this.palettes.length - 1];
	}
	return null;
}



module.exports = PalpngApp;
