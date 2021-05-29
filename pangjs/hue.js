
const PangHuePage = require("./hue_page");



function PangHue (app, hue) {
	this.app = app;
	this.hue_start = hue;
	this.hue_end = hue + 9;

	this.palettes = [];
	for (let palette of this.app.palettes) {
		for (let h of palette.json.hues) {
			if (this.contains(h)) {
				palette.hues.push(this);
				this.palettes.push(palette);
				break;
			}
		}
	}

	this.pageLength = this.app.preferences.pageLength;
	this.numberOfPages = Math.ceil(this.getNumberOfPalettes() / this.pageLength);
	this.pages = [];
	for (let pageNumber = 1; pageNumber <= this.numberOfPages; pageNumber++) {
		let page = new PangHuePage(this, pageNumber);
		this.pages.push(page);
	}
}

const PangBaseClass = require("./baseclass");
PangHue.prototype = new PangBaseClass;



PangHue.prototype.contains = function (arg) {
	arg = Number(arg);
	if (arg >= this.hue_start && arg <= this.hue_end) {
		return true;
	}
	return false;
}

PangHue.prototype.consoleLog = function () {
	console.log(`\tHue '${this.hue_start}' [${this.hue_start} to ${this.hue_end}]`);
	console.log(`\t\t(${this.getNumberOfPalettes()} palettes)`);
	console.log(`\t\t(${this.getNumberOfPages()} pages)`);
}



PangHue.prototype.saveCss = function () {
	this.consoleLog();
	console.log(`\tSaved CSS for Hue #${this.hue_start}.`)
}

PangHue.prototype.saveHtml = function () {
	console.log(`\tSaved HTML for Hue #${this.hue_start}.`)
}



module.exports = PangHue;
