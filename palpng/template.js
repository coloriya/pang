
const fs = require("fs");
const path = require("path");

const pug = require("pug");



function PangTemplate (app, name) {
	this.app = app;
	this.name = name;
	this.filename = name + ".pug";
	this.path = path.join(this.app.paths.templates, this.filename);
	console.log(this.path);
}



module.exports = PangTemplate;
