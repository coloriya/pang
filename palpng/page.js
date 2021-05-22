


function Page (app, number) {
	this.app = app;
	this.number = number;

	this.start = app.pageLength * (number - 1);
	this.end = this.start + this.app.pageLength;
	this.palettes = this.app.palettes.slice(this.start, this.end);
	for (let palette of this.palettes) {
		palette.page = this;
	}
}

Page.prototype.consoleLog = function () {
	console.log(`Page no. ${this.number} has ${this.palettes.length} palettes (${this.start}, ${this.end})`);
}



module.exports = Page;
