
const PangApp = require("./palpng");
const pang = new PangApp();

const argv = process.argv;
const command = argv[2] ? argv[2].toLowerCase() : null;
const arg = argv[3] ? argv[3].toLowerCase() : null;

switch (command) {
	case "log":
		pang.consoleLog();
		break;

	case "css":
		pang.saveCss();
		break;
	case "pagescss":
		pang.savePageCss();
		break;
	case "palscss":
	case "palettescss":
		pang.savePaletteCss();
		break;

	case "html":
		pang.saveHtml();
		break;
	case "pageshtml":
		pang.savePageHtml();
		break;
	case "palshtml":
	case "paletteshtml":
		pang.savePaletteHtml();
		break;

	default:
		console.log(`Unknown command: '${command}'`);
}


