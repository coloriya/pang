
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
	let dirPath = `docs/${palette.id}`;
	let htmlPath = `${dirPath}/index.html`;
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath);
		console.log(`Created: (${dirPath})`);
	}
	fs.writeFileSync(htmlPath, pugs.palette({
		alphabet: alphabet,
		title: `Palette no. ${palette.id}`,
		palette: palette,
		base_depth: 1
	}));
	console.log(`Rendered: (${htmlPath})`);
}



const homeHtmlPath = "docs/index.html";
fs.writeFileSync(homeHtmlPath, pugs.home({
	alphabet: alphabet,
	title: "Home",
	palettes: palettes
}));
console.log(`Rendered: (${homeHtmlPath})`);



