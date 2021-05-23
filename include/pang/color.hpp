#ifndef PANG_COLOR_IS_INCLUDED
#define PANG_COLOR_IS_INCLUDED

#include <iostream>

#include <nlohmann/json.hpp>

namespace nj = nlohmann;

namespace pang {
	class Palette;

	class Color
	{

		Palette *palette;
		nj::json json;
	public:
		Color(Palette *palette, nj::json json);
		~Color();

		int getR();
		int getG();
		int getB();
	};
};



#endif