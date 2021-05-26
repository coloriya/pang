
const fs = require("fs");
const path = require("path");



function PangDownloadable (app, json) {
	this.app = app;
	this.json = json;
	this.name = this.json.name;
	this.title = this.json.title;
}



PangDownloadable.prototype.getName = function () {
	return this.name;
}

PangDownloadable.prototype.getTitle = function () {
	return this.title;
}



module.exports = PangDownloadable;
