
const fs = require("fs");
const path = require("path");



function PangDownloadable (app, json) {
	this.app = app;
	this.json = json;
}



module.exports = PangDownloadable;
