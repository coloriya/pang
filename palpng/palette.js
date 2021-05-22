


function Palette (app, json) {
	this.app = app;
	this.json = json;
	this.page = null;

	this.next = null;
	this.prev = this.app.getLastPalette();
	if (this.prev) {
		this.prev.next = this;
	}
}



module.exports = Palette;
