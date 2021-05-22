
const PalpngApp = require("./palpng");
const app = new PalpngApp();

app.consoleLog();
app.pages[1].saveCss();

process.exit();

const fs = require("fs");
const pug = require("pug");

const pypalettes = JSON.parse(fs.readFileSync("data/palettes.json"));
const palettes = pypalettes.palettes;
const alphabet = "abcdefghijklmnopqrstuvwxyz";

const gaText = fs.readFileSync("src/txt/analytics.html", 'utf8');

const pugs = {
	page: pug.compileFile("src/pug/page.pug"),
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
		base_depth: 2,
		gaText: gaText
	}));
	console.log(`\tRendered: (${htmlPath})`);

	let cssPath = `docs/dist/css/palettes/${palette.id}.css`;
	let cssText = "";
	for (let index in palette.colors) {
		let color = palette.colors[index];
		cssText += `.pyp${palette.id}${alphabet[index]} {background: ${color.hex};}\n`;
	}

	fs.writeFileSync(cssPath, cssText);
	console.log(`Saved: (${cssPath})`);
}

const numberOfPalettes = palettes.length;
const numberOfPalettesOnAPage = 20;
const numberOfPages = Math.ceil(numberOfPalettes / numberOfPalettesOnAPage);

const pages = [];
for (let x = 1; x <= numberOfPages; x++) {
	let page = {};
	page.number = x;
	page.title = (x == 1) ? "palpng | home" : "palpng | page | " + x;
	page.path = (x == 1) ? "" : `page/${x}`;
	page.dirPath = `docs/${page.path}`;
	page.htmlPath = `${page.dirPath}/index.html`;
	page.baseDepth = (x == 1) ? 0 : 2;
	page.cssPath = `docs/dist/css/pages/${x}.css`;

	let start = numberOfPalettesOnAPage * (x - 1);
	let end = start + numberOfPalettesOnAPage;
	page.palettes = palettes.slice(start, end);
	pages.push(page);
}

for (let page of pages) {
	if (!fs.existsSync(page.dirPath)) {
		fs.mkdirSync(page.dirPath);
		console.log(`Created: (${page.dirPath})`);
	}

	fs.writeFileSync(page.htmlPath, pugs.page({
		alphabet: alphabet,
		title: page.title,
		base_depth: page.baseDepth,
		page: page,
		pages: pages,
		gaText: gaText
	}));
	console.log(`\tRendered: (${page.htmlPath})`);
}


