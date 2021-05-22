#include "pang/color.hpp"

#include "pang/palette.hpp"



pang::Color::Color (Palette *palette, nj::json json)
{
	this->palette = palette;
	this->json = json;
}

pang::Color::~Color ()
{
	//
}


