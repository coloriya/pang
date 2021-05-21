
const fs = require("fs");
const pug = require("pug");

const pypalettes = JSON.parse(fs.readFileSync("data/palettes.json"));
const palettes = pypalettes.palettes;
const alphabet = "abcdefghijklmnopqrstuvwxyz"

const pugs = {
	home: pug.compileFile("src/pug/home.pug"),
	palette: pug.compileFile("src/pug/palette.pug")
};



for (let palette of palettes) {
	let dirPath = `docs/palette/${palette.id}`;
	let htmlPath = `${dirPath}/index.html`;
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath);
		console.log(`Created: (${dirPath})`);
	}
	fs.writeFileSync(htmlPath, pugs.palette({
		alphabet: alphabet,
		title: `palpng | palette | ${palette.id}`,
		palette: palette,
		base_depth: 2
	}));
	console.log(`\tRendered: (${htmlPath})`);
}

const numberOfPalettes = palettes.length;
const numberOfPalettesOnAPage = 10;
const numberOfPages = Math.ceil(numberOfPalettes / numberOfPalettesOnAPage);

for (let x = 1; x <= numberOfPages; x++) {
	let pageTitle = (x == 1) ? "palpng | home" : "palpng | page | " + x;
	let pageDirPath = (x == 1) ? "docs" : `docs/page/${x}`;
	let pageHtmlPath = `${pageDirPath}/index.html`;

	let start = numberOfPalettesOnAPage * (x - 1);
	let end = start + numberOfPalettesOnAPage;
	let pagePalettes = palettes.slice(start, end);

	if (!fs.existsSync(pageDirPath)) {
		fs.mkdirSync(pageDirPath);
		console.log(`Created: (${pageDirPath})`);
	}

	fs.writeFileSync(pageHtmlPath, pugs.home({
		alphabet: alphabet,
		title: pageTitle,
		palettes: pagePalettes
	}));
	console.log(`\tRendered: (${pageHtmlPath})`);
}



