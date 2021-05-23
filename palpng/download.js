
const fs = require("fs");
const path = require("path");



function PangDownload (palette, downloadable, resolution) {
	this.palette = palette;
	this.app = this.palette.app;
	this.downloadable = downloadable;
	this.resolution = resolution;
}



PangDownload.prototype.getFileName = function () {
	let filename = `pang_${this.palette.id}_${this.downloadable.getName()}_${this.resolution.getName()}.png`;
	return filename;
}

PangDownload.prototype.getRelativeURL = function () {
	return path.join("dist/img/palettes", this.resolution.getName(), this.getFileName());
}

PangDownload.prototype.getPath = function () {
	return path.join(this.app.paths.output, this.getRelativeURL());
}



PangDownload.prototype.getName = function () {
	return this.downloadable.getTitle();
}

PangDownload.prototype.getRes = function () {
	return this.resolution.getName();
}

PangDownload.prototype.getResX = function () {
	return this.resolution.getNameX();
}

PangDownload.prototype.exists = function () {
	if (fs.existsSync(this.getPath())) {
		return true;
	}
	return false;
}

PangDownload.prototype.getSize = function () {
	if (fs.existsSync(this.getPath())) {
		return fs.statSync(this.getPath()).size;
	}
	return 0;
}

PangDownload.prototype.getSizeKB = function () {
	let size = this.getSize() / 1000;
	return `${size.toFixed(1)} kB`;
}



module.exports = PangDownload;
