#include "pang/pangapp.hpp"

#include <fstream>

#include "pang/palette.hpp"



pang::App::App ()
{
	auto args_path = "args.json";
	if (!fs::exists(args_path))
	{
		std::cout << "Not found: " << args_path << "\n";
		return;
	}

	std::ifstream args_fs(args_path);
	auto jo = nj::json::parse(args_fs);

	auto paletts_path = jo["paths"]["palettes"];
	std::ifstream paletts_fs(paletts_path);
	auto pjo = nj::json::parse(paletts_fs);

	for (auto pj : pjo["palettes"]) {
		for (auto color_json : pj["colors"]) {
			std::cout << color_json << "\n";
		}
		break;
	}
}

pang::App::~App ()
{
	//
}



void pang::App::consoleLog ()
{
	std::cout << "(" << this->palettes.size() << " palettes)\n";
}



