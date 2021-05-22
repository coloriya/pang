
const fs = require("fs");
const path = require("path");



function PangPalette (app, json) {
	this.app = app;
	this.json = json;
	this.id = json.id;
	this.page = null;

	this.next = null;
	this.prev = this.app.getLastPalette();
	if (this.prev) {
		this.prev.next = this;
	}

	this.relativeURL = `palette/${this.number}`;
	this.htmlPath = path.join(this.app.paths.output, this.relativeURL, "index.html");

	this.cssURL = `dist/css/palettes/${this.id}.css`;
	this.cssPath = path.join(this.app.paths.output, this.cssURL);
}



PangPalette.prototype.getCssText = function () {
	let cssText = "";
	for (let index in this.json.colors) {
		let color = this.json.colors[index];
		cssText += `.pyp${this.id}${this.app.alphabet[index]} {background: ${color.hex};}\n`;
	}
	cssText += "\n\n";
	return cssText;
}

PangPalette.prototype.saveCss = function () {
	let cssText = this.getCssText();
	fs.writeFileSync(this.cssPath, cssText);
	console.log(`\tSaved CSS for page: ${this.cssPath}`);
}



module.exports = PangPalette;
