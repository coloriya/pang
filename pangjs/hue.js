


function PangHue (app, hue) {
	this.app = app;
	this.hue_start = hue;
	this.hue_end = hue + 9;
	this.palettes = [];
}

PangHue.prototype.getNumberOfPalettes = function () {
	return this.palettes.length;
}

PangHue.prototype.consoleLog = function () {
	console.log(`Hue '${this.hue}' has ${this.getNumberOfPalettes()} palettes.`);
}



module.exports = PangHue;
