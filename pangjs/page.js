
const fs = require("fs");
const path = require("path");



function PangPage (app, number) {
	this.app = app;
	this.number = number;

	this.start = app.pageLength * (number - 1);
	this.end = this.start + this.app.pageLength;
	this.palettes = this.app.palettes.slice(this.start, this.end);
	for (let palette of this.palettes) {
		palette.page = this;
	}

	this.next = null;
	this.prev = this.app.getLastPage();
	if (this.prev) {
		this.prev.next = this;
	}

	this.relativeURL = (this.number == 1) ? "" : `page/${this.number}`;
	this.htmlPath = path.join(this.app.paths.output, this.relativeURL, "index.html");

	this.cssURL = `dist/css/pages/${this.number}.css`;
	this.cssPath = path.join(this.app.paths.output, this.cssURL);
}



PangPage.prototype.getTitle = function () {
	return (this.number == 1) ? `${this.app.getTitle()} | home` : `${this.app.getTitle()} | page | ` + this.number;
}

PangPage.prototype.getSubTitle = function () {
	return `${this.palettes.length} palettes`;
}

PangPage.prototype.getBaseDepth = function () {
	if (this.number == 1) {
		return 0;
	}
	return 2;
}

PangPage.prototype.getRelativeURL = function () {
	return this.relativeURL;
}



PangPage.prototype.getCssText = function () {
	let cssText = "";
	for (let palette of this.palettes) {
		cssText += palette.getCssText();
	}
	return cssText;
}

PangPage.prototype.saveCss = function () {
	let cssText = this.getCssText();
	fs.writeFileSync(this.cssPath, cssText);
	console.log(`\tSaved CSS for page: ${this.cssPath}`);
}

PangPage.prototype.saveHtml = function () {
	let template = this.app.templates.page.getPug();
	fs.writeFileSync(this.htmlPath, template({
		me: this,
		page: this,
		app: this.app
	}));
	console.log(`\tSaved HTML for page: ${this.htmlPath}`);
}



PangPage.prototype.consoleLog = function () {
	console.log(`Page ${this.number} (${this.palettes.length} palettes):`);
	console.log(`\tHTML: ${this.htmlPath}`);
	console.log(`\t CSS: ${this.cssPath}`);
}



module.exports = PangPage;
