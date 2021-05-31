


function PangBaseClass () {
	//
}

PangBaseClass.prototype.getHeaderTitle = function () {
	return this.getTitle();
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



PangBaseClass.prototype.getSitemapEntryText = function () {
	return `<url>\n<loc>${this.getAbsoluteURL()}</loc>\n<lastmod>${this.app.meta.sitemap_date}</lastmod>\n</url>`;
}

PangBaseClass.prototype.getAbsoluteURL = function () {
	return `${this.app.meta.home_url}/${this.relativeURL}`;
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
