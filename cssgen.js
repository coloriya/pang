
const fs = require("fs");

const pypalettes = JSON.parse(fs.readFileSync("data/palettes.json"));
const alphabet = "abcdefghijklmnopqrstuvwxyz";

let cssText = "";
for (let palette of pypalettes.palettes) {	
	for (let index in palette.colors) {
		let color = palette.colors[index];
		cssText += `.pyp${palette.id}${alphabet[index]} {background: ${color.hex};}\n`;
	}
	cssText += "\n\n";
}

const outpath = "docs/dist/css/pyp.css";
fs.writeFileSync(outpath, cssText);
console.log(`Saved: (${outpath})`);

