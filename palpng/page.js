
const fs = require("fs");
const path = require("path");



function Page (app, number) {
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



Page.prototype.getCssText = function () {
	let cssText = "";
	for (let palette of this.palettes) {
		cssText += palette.getCssText();
	}
	return cssText;
}

Page.prototype.saveCss = function () {
	let cssText = this.getCssText();
	fs.writeFileSync(this.cssPath, cssText);
	console.log(`\tSaved CSS for page: ${this.cssPath}`);
}



Page.prototype.consoleLog = function () {
	console.log(`Page ${this.number} (${this.palettes.length} palettes):`);
	console.log(`\tHTML: ${this.htmlPath}`);
	console.log(`\t CSS: ${this.cssPath}`);
}



module.exports = Page;
