


function PangBaseClass () {
	//
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



module.exports = PangBaseClass;
