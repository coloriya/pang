
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
	case "gc":
	case "pagescss":
		pang.savePageCss(arg);
		break;
	case "lc":
	case "palscss":
	case "palettescss":
		pang.savePaletteCss(arg);
		break;
	case "tc":
	case "typescss":
		pang.savePaletteTypeCss(arg);
		break;
	case "hc":
	case "huescss":
		pang.saveHuesCss(arg);
		break;

	case "html":
		pang.saveHtml(arg);
		break;
	case "ah":
	case "apphtml":
		pang.saveAppHtml(arg);
		break;
	case "gh":
	case "pageshtml":
		pang.savePageHtml(arg);
		break;
	case "lh":
	case "palshtml":
	case "paletteshtml":
		pang.savePaletteHtml(arg);
		break;
	case "th":
	case "typeshtml":
		pang.savePaletteTypeHtml(arg);
		break;
	case "hh":
	case "hueshtml":
		pang.saveHuesHtml(arg);
		break;

	case "j":
	case "json":
		pang.produceJsons();
		break;

	case "sitemap":
		pang.produceSitemap();
		break;

	case "x":
	case "experiment":
		pang.doAnExperiment();
		break;

	default:
		console.log(`Unknown command: '${command}'`);
}


