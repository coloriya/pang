
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

PangTemplate.prototype.getPug = function () {
	if (!this.template) {
		this.template = pug.compileFile(this.path);
	}
	return this.template;
}



module.exports = PangTemplate;
