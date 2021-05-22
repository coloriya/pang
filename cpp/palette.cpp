#include "pang/palette.hpp"

#include "pang/pangapp.hpp"
#include "pang/color.hpp"



pang::Palette::Palette (App *app, nj::json json)
{
	this->app = app;
	this->json = json;

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


