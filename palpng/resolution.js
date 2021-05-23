


function PangResolution (app, json) {
	this.app = app;
	this.json = json;
	this.name = this.json.name;
	this.height = this.json.height;
	this.width = this.json.width;
}



PangResolution.prototype.getName = function () {
	return this.name;
}

PangResolution.prototype.getNameX = function () {
	return `${this.width}x${this.height}`;
}

PangResolution.prototype.getHeight = function () {
	return this.height;
}

PangResolution.prototype.getWidth = function () {
	return this.width;
}



module.exports = PangResolution;
