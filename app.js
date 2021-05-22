
const PangApp = require("./palpng");
const app = new PangApp();

const argv = process.argv;
const command = argv[2] ? argv[2].toLowerCase() : null;
const arg = argv[3] ? argv[3].toLowerCase() : null;

switch (command) {
	case "log":
		app.consoleLog();
		break;

	case "css":
		app.saveCss();
		break;
	case "pagescss":
		app.savePageCss();
		break;
	case "palscss":
	case "palettescss":
		app.savePaletteCss();
		break;

	case "html":
		app.saveHtml();
		break;
	case "pageshtml":
		app.savePageHtml();
		break;
	case "palshtml":
	case "paletteshtml":
		app.savePaletteHtml();
		break;

	default:
		console.log(`Unknown command: '${command}'`);
}


