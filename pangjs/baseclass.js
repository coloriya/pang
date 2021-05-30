


function PangBaseClass () {
	//
}

PangBaseClass.prototype.getSubTitle = function () {
	return `${this.getNumberOfPalettes()} palettes`;
}

PangBaseClass.prototype.getNumberOfPalettes = function () {
	return this.palettes.length;
}

PangBaseClass.prototype.getNumberOfPages = function () {
	return this.pages.length;
}

PangBaseClass.prototype.getLastPage = function () {
	return this.pages[this.pages.length - 1];
}



PangBaseClass.prototype.getRelativeURL = function () {
	return this.relativeURL;
}

PangBaseClass.prototype.getBaseDepth = function () {
	if (this.htmlPath) {
		return this.htmlPath.split("/").length;
	}
	return 2;
}



module.exports = PangBaseClass;
