
const fs = require("fs");

const PangHue = require("./hue");
const PangPalette = require("./palette");
const PangPaletteType = require("./palette_type");

const PangPage = require("./page");
const PangDownloadable = require("./downloadable");
const PangResolution = require("./resolution");

const PangTemplate = require("./template");



function PangApp () {
	this.preferences = JSON.parse(fs.readFileSync("preferences.json"));
	this.paths = this.preferences.paths;
	this.meta = this.preferences.meta;

	this.gaText = fs.readFileSync(this.paths.analytics, 'utf8');
	this.alphabet = "abcdefghijklmnopqrstuvwxyz";
	this.nl = "<!-- \n -->";
	this.nlx = "\n";

	this.setupPalettes();
	this.setupPaletteTypes();
	this.setupHues();
	this.setupPages();
	this.setupDownloadables();
	this.setupResolutions();
	this.setupTemplates();
}

const PangBaseClass = require("./baseclass");
PangApp.prototype = new PangBaseClass;

PangApp.prototype.setupPalettes = function () {
	this.paletteJson = JSON.parse(fs.readFileSync(this.paths.palettes));

	this.palettes = [];
	for (let paletteJson of this.paletteJson.palettes) {
		let palette = new PangPalette(this, paletteJson);
		this.palettes.push(palette);
	}
	this.numberOfPalettes = this.palettes.length;
}

PangApp.prototype.setupPaletteTypes = function () {
	this.palette_types = [];
	for (let palette_type_json of this.preferences.palette_types) {
		let palette_type = new PangPaletteType(this, palette_type_json);
		this.palette_types.push(palette_type);
	}
}

PangApp.prototype.setupHues = function () {
	this.hues = [];
	for (let h=0; h<36; h++) {
		let hue = new PangHue(this, h*10);
		this.hues.push(hue);
	}
}

PangApp.prototype.setupPages = function () {
	this.pageLength = this.preferences.pageLength;
	this.numberOfPages = Math.ceil(this.numberOfPalettes / this.pageLength);
	this.pages = [];
	for (let pageNumber = 1; pageNumber <= this.numberOfPages; pageNumber++) {
		let page = new PangPage(this, pageNumber);
		this.pages.push(page);
	}
}

PangApp.prototype.setupDownloadables = function () {
	this.downloadables = [];
	for (let json of this.preferences.downloadables) {
		let downloadable = new PangDownloadable(this, json);
		this.downloadables.push(downloadable);
	}
}

PangApp.prototype.setupResolutions = function () {
	this.argsJson = JSON.parse(fs.readFileSync(this.paths.argsJson));
	this.resolutions = [];
	for (let json of this.argsJson.resolutions) {
		let resolution = new PangResolution(this, json);
		this.resolutions.push(resolution);
	}
}

PangApp.prototype.setupTemplates = function () {
	this.templates = {
		home: new PangTemplate(this, "home"),
		page: new PangTemplate(this, "page"),
		hue: new PangTemplate(this, "hue"),

		type: new PangTemplate(this, "type"),
		typepage: new PangTemplate(this, "typepage"),
		palette: new PangTemplate(this, "palette")
	};
}



PangApp.prototype.getTitle = function () {
	return this.meta.title;
}

PangApp.prototype.getLastPage = function () {
	if (this.pages.length) {
		return this.pages[this.pages.length - 1];
	}
	return null;
}

PangApp.prototype.getLastPalette = function () {
	if (this.palettes.length) {
		return this.palettes[this.palettes.length - 1];
	}
	return null;
}

PangApp.prototype.getLastPaletteType = function () {
	if (this.palette_types.length) {
		return this.palette_types[this.palette_types.length - 1];
	}
	return null;
}



PangApp.prototype.getPage = function (arg) {
	if (arg) {
		for (let page of this.pages) {
			if (page.number == arg) {
				return page;
			}
		}
	}
	return null;
}

PangApp.prototype.getPalette = function (arg) {
	if (arg) {
		for (let palette of this.palettes) {
			if (palette.id == arg) {
				return palette;
			}
		}
	}
	return null;
}

PangApp.prototype.getPaletteType = function (arg) {
	if (arg) {
		for (let palette_type of this.palette_types) {
			if (palette_type.index == arg) {
				return palette_type;
			}
		}
	}
	return null;
}

PangApp.prototype.getHue = function (arg) {
	if (arg) {
		for (let hue of this.hues) {
			if (hue.contains(arg)) {
				return hue;
			}
		}
	}
	return null;
}



PangApp.prototype.getNumberOfPages = function () {
	return this.pages.length;
}

PangApp.prototype.getNumberOfPalettes = function () {
	return this.palettes.length;
}

PangApp.prototype.getNumberOfDownloadables = function () {
	return this.downloadables.length;
}

PangApp.prototype.getNumberOfResolutions = function () {
	return this.resolutions.length;
}



PangApp.prototype.savePageCss = function (arg) {
	if (!arg) {
		for (let page of this.pages) {
			page.saveCss();
		}
	} else {
		let page = this.getPage(arg);
		if (page) {
			page.saveCss();
		}
	}
}

PangApp.prototype.savePaletteCss = function (arg) {
	if (!arg) {
		for (let palette of this.palettes) {
			palette.saveCss();
		}
	} else {
		let palette = this.getPalette(arg);
		if (palette) {
			palette.saveCss();
		}
	}
}

PangApp.prototype.savePaletteTypeCss = function (arg) {
	if (!arg) {
		for (let palette_type of this.palette_types) {
			palette_type.saveCss();
		}
	} else {
		let palette_type = this.getPaletteType(arg);
		if (palette_type) {
			palette_type.saveCss();
		}
	}
}

PangApp.prototype.saveHuesCss = function (arg) {
	if (!arg) {
		for (let hue of this.hues) {
			hue.saveCss();
		}
	} else {
		let hue = this.getHue(arg);
		if (hue) {
			hue.saveCss();
		}
	}
}

PangApp.prototype.saveCss = function (arg) {
	this.savePageCss(arg);
	this.savePaletteCss(arg);
	this.savePaletteTypeCss(arg);
	this.saveHuesCss(arg);
}



PangApp.prototype.savePageHtml = function (arg) {
	if (!arg) {
		for (let page of this.pages) {
			page.saveHtml();
		}
	} else {
		let page = this.getPage(arg);
		if (page) {
			page.saveHtml();
		}
	}
}

PangApp.prototype.savePaletteHtml = function (arg) {
	if (!arg) {
		for (let palette of this.palettes) {
			palette.saveHtml();
		}
	} else {
		let palette = this.getPalette(arg);
		if (palette) {
			palette.saveHtml();
		}
	}
}

PangApp.prototype.savePaletteTypeHtml = function (arg) {
	if (!arg) {
		for (let palette_type of this.palette_types) {
			palette_type.saveHtml();
		}
	} else {
		let palette_type = this.getPaletteType(arg);
		if (palette_type) {
			palette_type.saveHtml();
		}
	}
}

PangApp.prototype.saveHuesHtml = function (arg) {
	if (!arg) {
		for (let hue of this.hues) {
			hue.saveHtml();
		}
	} else {
		let hue = this.getHue(arg);
		if (hue) {
			hue.saveHtml();
		}
	}
}

PangApp.prototype.saveHtml = function (arg) {
	this.savePageHtml(arg);
	this.savePaletteHtml(arg);
	this.savePaletteTypeHtml(arg);
	this.saveHuesHtml(arg);
}



PangApp.prototype.consoleLog = function () {
	console.log(`\t(${this.getNumberOfPages()} pages)`);
	console.log(`\t(${this.getNumberOfPalettes()} palettes)`);
	console.log(`\t(${this.getNumberOfDownloadables()} downloadables)`);
	console.log(`\t(${this.getNumberOfResolutions()} resolutions)`);
}



module.exports = PangApp;
