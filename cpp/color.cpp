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



int pang::Color::getR () {return this->json["rgb"][0];}
int pang::Color::getG () {return this->json["rgb"][1];}
int pang::Color::getB () {return this->json["rgb"][2];}


