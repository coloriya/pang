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
	this->args_json = nj::json::parse(args_fs);

	auto paletts_path = this->args_json["paths"]["palettes"];
	std::ifstream paletts_fs(paletts_path);
	this->palettes_json = nj::json::parse(paletts_fs);

	for (auto pj : this->palettes_json["palettes"]) {
		auto palette = new pang::Palette(this, pj);
		this->palettes.push_back(palette);
	}
}

pang::App::~App ()
{
	for (auto palette : this->palettes)
	{
		delete palette;
	}
}



void pang::App::producePngs ()
{
	for (auto palette : this->palettes)
	{
		palette->producePngs();
		break;
	}
}

void pang::App::consoleLog ()
{
	std::cout << "(" << this->palettes.size() << " palettes)\n";
}



