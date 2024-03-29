
const fs = require("fs");
const path = require("path");

const PangColor = require("./color");
const PangGroup = require("./group");
const PangDownload = require("./download");



function PangPalette (app, json) {
	this.app = app;
	this.json = json;
	this.id = json.id;
	this.page = null;

	this.type = null;
	this.type_index = 0;
	this.hues = [];

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

	this.group_length = this.json.color_group_length ? this.json.color_group_length : 4;
	this.groups = [];
	for (let x = 0; x < this.colors.length; x += this.group_length) {
		let group = new PangGroup(this);
		this.groups.push(group);
	}

	this.relativeURL = `palette/${this.id}`;
	this.htmlPath = path.join(this.app.paths.output, this.relativeURL, "index.html");

	this.cssURL = `dist/css/palettes/${this.id}.css`;
	this.cssPath = path.join(this.app.paths.output, this.cssURL);
}

const PangBaseClass = require("./baseclass");
PangPalette.prototype = new PangBaseClass;



PangPalette.prototype.getTitle = function () {
	return `${this.app.getTitle()} | palette | ${this.id}`;
}

PangPalette.prototype.getHeaderTitle = function () {
	return `Palette #${this.id}`;
}

PangPalette.prototype.getSubTitle = function () {
	return `${this.colors.length} colors`;
}

PangPalette.prototype.getBaseDepth = function () {
	return 2;
}

PangPalette.prototype.getRelativeURL = function () {
	return this.relativeURL;
}

PangPalette.prototype.getTypeNIndex = function () {
	return this.type_index + 1;
}



PangPalette.prototype.getDownloads = function () {
	if (!this.downloads) {
		this.downloads = [];
		for (let resolution of this.app.resolutions) {
			for (let downloadable of this.app.downloadables) {
				let download = new PangDownload(this, downloadable, resolution);
				this.downloads.push(download);
			}
		}
	}
	return this.downloads;
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

	let dirpath = path.dirname(this.htmlPath);
	if (!fs.existsSync(dirpath)) {
		fs.mkdirSync(dirpath);
		console.log(`\tCreated directory: ${dirpath}`);
	}

	fs.writeFileSync(this.htmlPath, template({
		me: this,
		palette: this,
		page: this.page,
		app: this.app,
		downloads: this.getDownloads()
	}));
	console.log(`\tSaved HTML for palette: ${this.htmlPath}`);
}

PangPalette.prototype.produceJson = function () {
	let json_filename = `${this.id}.json`;
	let json_path = path.join(this.app.paths.jsonOutputDir, json_filename);
	fs.writeFileSync(json_path, JSON.stringify(this.json));
	console.log(`\t\t- Palette #${this.id}: saved (${json_path})`);
}



module.exports = PangPalette;
