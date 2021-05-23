#include "pang/palette.hpp"

#include "pang/pangapp.hpp"
#include "pang/color.hpp"

#include <string>



pang::Palette::Palette (App *app, nj::json json)
{
	this->app = app;
	this->json = json;
	this->index = this->json["id"];

	for (auto cj : this->json["colors"]) {
		auto color = new pang::Color(this, cj);
		this->colors.push_back(color);
	}
}

pang::Palette::~Palette ()
{
	for (auto color : this->colors)
	{
		delete color;
	}
}



fs::path pang::Palette::getPngPath (std::string design_name)
{
	fs::path png_path;
	png_path = fs::path(this->app->args_json["paths"]["output"]);

	std::string filename = "pang_";
	filename += std::to_string(this->index);
	filename += "_" + design_name + ".png";
	png_path.append(filename);
	return png_path;
}

void pang::Palette::producePngs ()
{
	auto png_path = this->getPngPath("squares");
	std::cout << "producePngs()\n";
	std::cout << "\tsaved: (" << png_path << ")\n";
}


