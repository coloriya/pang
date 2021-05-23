
const fs = require("fs");
const path = require("path");

const PangColor = require("./color");
const PangDownload = require("./download");



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

	this.colors = [];
	for (let index in this.json.colors) {
		let colorJson = this.json.colors[index];
		let color = new PangColor(this, colorJson, index);
		this.colors.push(color);
	}

	this.relativeURL = `palette/${this.id}`;
	this.htmlPath = path.join(this.app.paths.output, this.relativeURL, "index.html");

	this.cssURL = `dist/css/palettes/${this.id}.css`;
	this.cssPath = path.join(this.app.paths.output, this.cssURL);
}



PangPalette.prototype.getTitle = function () {
	return `palpng | palette | ${this.id}`;
}

PangPalette.prototype.getBaseDepth = function () {
	return 2;
}



PangPalette.prototype.getDownloads = function () {
	let downloads = [];
	for (let resolution of this.app.resolutions) {
		for (let downloadable of this.app.downloadables) {
			let download = new PangDownload(this, downloadable, resolution);
			downloads.push(download);
		}
	}
	return downloads;
}



PangPalette.prototype.getCssText = function () {
	let cssText = "";
	for (let color of this.colors) {
		cssText += color.getCssText();
	}
	cssText += "\n\n";
	return cssText;
}

PangPalette.prototype.saveCss = function () {
	let cssText = this.getCssText();
	fs.writeFileSync(this.cssPath, cssText);
	console.log(`\tSaved CSS for page: ${this.cssPath}`);
}

PangPalette.prototype.saveHtml = function () {
	let template = this.app.templates.palette.getPug();
	fs.writeFileSync(this.htmlPath, template({
		me: this,
		palette: this,
		app: this.app,
		downloads: this.getDownloads()
	}));
	console.log(`\tSaved HTML for palette: ${this.htmlPath}`);
}



module.exports = PangPalette;
