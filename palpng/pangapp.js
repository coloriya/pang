
const fs = require("fs");

const PangPalette = require("./palette");
const PangPage = require("./page");
const PangDownloadable = require("./downloadable");
const PangResolution = require("./resolution");

const PangTemplate = require("./template");



function PangApp () {
	this.preferences = JSON.parse(fs.readFileSync("preferences.json"));
	this.paths = this.preferences.paths;
	this.gaText = fs.readFileSync(this.paths.analytics, 'utf8');
	this.alphabet = "abcdefghijklmnopqrstuvwxyz";
	this.nl = "<!-- \n -->";

	this.setupPalettes();
	this.setupPages();
	this.setupDownloadables();
	this.setupResolutions();
	this.setupTemplates();
}

PangApp.prototype.setupPalettes = function () {
	this.paletteJson = JSON.parse(fs.readFileSync(this.paths.palettes));

	this.palettes = [];
	for (let paletteJson of this.paletteJson.palettes) {
		let palette = new PangPalette(this, paletteJson);
		this.palettes.push(palette);
	}
	this.numberOfPalettes = this.palettes.length;
}

PangApp.prototype.setupPages = function () {
	this.pageLength = this.preferences.pageLength;
	this.numberOfPages = Math.ceil(this.numberOfPalettes / this.pageLength);
	this.pages = [];
	for (let pageNumber = 1; pageNumber <= this.numberOfPages; pageNumber++) {
		let page = new PangPage(this, pageNumber);
		this.pages.push(page);
	}
}

PangApp.prototype.setupDownloadables = function () {
	this.downloadables = [];
	for (let json of this.preferences.downloadables) {
		let downloadable = new PangDownloadable(this, json);
		this.downloadables.push(downloadable);
	}
}

PangApp.prototype.setupResolutions = function () {
	this.argsJson = JSON.parse(fs.readFileSync(this.paths.argsJson));
	this.resolutions = [];
	for (let json of this.argsJson.resolutions) {
		let resolution = new PangResolution(this, json);
		this.resolutions.push(resolution);
	}
}

PangApp.prototype.setupTemplates = function () {
	this.templates = {
		page: new PangTemplate(this, "page"),
		palette: new PangTemplate(this, "palette")
	};
}



PangApp.prototype.getLastPage = function () {
	if (this.pages.length) {
		return this.pages[this.pages.length - 1];
	}
	return null;
}

PangApp.prototype.getLastPalette = function () {
	if (this.palettes.length) {
		return this.palettes[this.palettes.length - 1];
	}
	return null;
}



PangApp.prototype.getNumberOfPages = function () {
	return this.pages.length;
}

PangApp.prototype.getNumberOfPalettes = function () {
	return this.palettes.length;
}

PangApp.prototype.getNumberOfDownloadables = function () {
	return this.downloadables.length;
}

PangApp.prototype.getNumberOfResolutions = function () {
	return this.resolutions.length;
}



PangApp.prototype.savePageCss = function () {
	for (let page of this.pages) {
		page.saveCss();
	}
}

PangApp.prototype.savePaletteCss = function () {
	for (let palette of this.palettes) {
		palette.saveCss();
	}
}

PangApp.prototype.saveCss = function () {
	this.savePageCss();
	this.savePaletteCss();
}



PangApp.prototype.savePageHtml = function () {
	for (let page of this.pages) {
		page.saveHtml();
	}
}

PangApp.prototype.savePaletteHtml = function () {
	for (let palette of this.palettes) {
		palette.saveHtml();
		// break; // while I test
	}
}

PangApp.prototype.saveHtml = function () {
	this.savePageHtml();
	this.savePaletteHtml();
}



PangApp.prototype.consoleLog = function () {
	console.log(`\t(${this.getNumberOfPages()} pages)`);
	console.log(`\t(${this.getNumberOfPalettes()} palettes)`);
	console.log(`\t(${this.getNumberOfDownloadables()} downloadables)`);
	console.log(`\t(${this.getNumberOfResolutions()} resolutions)`);
}



module.exports = PangApp;
