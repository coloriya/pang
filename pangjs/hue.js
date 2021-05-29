


function PangHue (app, hue) {
	this.app = app;
	this.hue_start = hue;
	this.hue_end = hue + 9;
	this.palettes = [];
}

PangHue.prototype.contains = function (arg) {
	arg = Number(arg);
	if (arg >= this.hue_start && arg <= this.hue_end) {
		return true;
	}
	return false;
}

PangHue.prototype.getNumberOfPalettes = function () {
	return this.palettes.length;
}

PangHue.prototype.consoleLog = function () {
	console.log(`Hue '${this.hue}' has ${this.getNumberOfPalettes()} palettes.`);
}



PangHue.prototype.saveCss = function () {
	console.log(`\tSaved CSS for Hue #${this.hue_start}.`)
}

PangHue.prototype.saveHtml = function () {
	console.log(`\tSaved HTML for Hue #${this.hue_start}.`)
}



module.exports = PangHue;
