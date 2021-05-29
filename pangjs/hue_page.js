


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
}

const PangBaseClass = require("./baseclass");
PangHuePage.prototype = new PangBaseClass;



module.exports = PangHuePage;
