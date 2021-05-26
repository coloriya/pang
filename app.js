
const PangApp = require("./pangjs");
const pang = new PangApp();

const argv = process.argv;
const command = argv[2] ? argv[2].toLowerCase() : null;
const arg = argv[3] ? argv[3].toLowerCase() : null;

switch (command) {
	case "log":
		pang.consoleLog();
		break;

	case "css":
		pang.saveCss(arg);
		break;
	case "pagescss":
		pang.savePageCss(arg);
		break;
	case "palscss":
	case "palettescss":
		pang.savePaletteCss(arg);
		break;

	case "html":
		pang.saveHtml(arg);
		break;
	case "pageshtml":
		pang.savePageHtml(arg);
		break;
	case "palshtml":
	case "paletteshtml":
		pang.savePaletteHtml(arg);
		break;

	default:
		console.log(`Unknown command: '${command}'`);
}


