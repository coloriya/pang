
const fs = require("fs");
const path = require("path");



function PangHuePage (hue, number) {
	this.hue = hue;
	this.app = this.hue.app;
	this.number = number;

	this.start = this.hue.pageLength * (number - 1);
	this.end = this.start + this.hue.pageLength;
	this.palettes = this.hue.palettes.slice(this.start, this.end);

	this.next = null;
	this.prev = this.hue.getLastPage();
	if (this.prev) {
		this.prev.next = this;
	}

	this.relativeURL = (this.number == 1) ? this.hue.getHref() : `${this.hue.getHref()}/${this.number}`;
	this.htmlPath = path.join(this.app.paths.output, this.relativeURL, "index.html");

	this.cssURL = `dist/css/hues/hue_${this.number}.css`;
	this.cssPath = path.join(this.app.paths.output, this.cssURL);
}

const PangBaseClass = require("./baseclass");
PangHuePage.prototype = new PangBaseClass;



PangHuePage.prototype.getTitle = function () {
	let base_title = `${this.app.getTitle()} | hue ${this.hue.hue_start}`;
	return (this.number == 1) ? base_title : `${base_title} | ` + this.number;
}

PangHuePage.prototype.getSubTitle = function () {
	return `${this.palettes.length} palettes`;
}

PangHuePage.prototype.getBaseDepth = function () {
	return (this.number == 1) ? 2 : 3;
}



PangHuePage.prototype.saveHtml = function () {
	let pugFunc = this.app.templates.hue.getPug();

	let dirpath = path.dirname(this.htmlPath);
	if (!fs.existsSync(dirpath)) {
		fs.mkdirSync(dirpath);
		console.log(`\tCreated directory: ${dirpath}`);
	}

	fs.writeFileSync(this.htmlPath, pugFunc({
		me: this,
		page: this,
		hue_page: this,
		hue: this.hue,
		app: this.app
	}));
	console.log(`\tSaved HTML for hue-page: ${this.htmlPath}`);
}



module.exports = PangHuePage;
