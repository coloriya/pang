
const fs = require("fs");
const path = require("path");



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

	this.relativeURL = (this.number == 1) ? this.type.getHref() : `${this.type.getHref()}/${this.number}`;
	this.htmlPath = path.join(this.app.paths.output, this.relativeURL, "index.html");

	// this.cssURL = `dist/css/types/type_${this.type.name}.css`;
	// this.cssPath = path.join(this.app.paths.output, this.cssURL);
}

const PangBaseClass = require("./baseclass");
PangPaletteTypePage.prototype = new PangBaseClass;



PangPaletteTypePage.prototype.getTitle = function () {
	let base_title = `${this.app.getTitle()} | ${this.type.name}`;
	return (this.number == 1) ? base_title : `${base_title} | ` + this.number;
}

PangPaletteTypePage.prototype.getSubTitle = function () {
	return `${this.palettes.length} palettes`;
}

PangPaletteTypePage.prototype.getBaseDepth = function () {
	return (this.number == 1) ? 1 : 2;
}



PangPaletteTypePage.prototype.saveHtml = function () {
	let pugFunc = this.app.templates.type.getPug();

	let dirpath = path.dirname(this.htmlPath);
	if (!fs.existsSync(dirpath)) {
		fs.mkdirSync(dirpath);
		console.log(`\tCreated directory: ${dirpath}`);
	}

	fs.writeFileSync(this.htmlPath, pugFunc({
		me: this,
		page: this,
		type_page: this,
		type: this.type,
		app: this.app
	}));
	console.log(`\tSaved HTML for type-page: ${this.htmlPath}`);
}



module.exports = PangPaletteTypePage;
