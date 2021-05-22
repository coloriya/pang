#ifndef PANG_PALETTE_IS_INCLUDED
#define PANG_PALETTE_IS_INCLUDED

#include <iostream>
#include <vector>

#include <nlohmann/json.hpp>

namespace nj = nlohmann;

namespace pang {
	class App;
	class Color;

	class Palette
	{

		App *app;
		nj::json json;

		std::string name;
		std::vector<Color*> colors;
	public:
		Palette(App *app, nj::json json);
		~Palette();
	};
};



#endif