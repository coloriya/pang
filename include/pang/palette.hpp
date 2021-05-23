#ifndef PANG_PALETTE_IS_INCLUDED
#define PANG_PALETTE_IS_INCLUDED

#include <iostream>
#include <filesystem>
#include <vector>

#include <nlohmann/json.hpp>

namespace fs = std::filesystem;
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
		int index;
	public:
		Palette(App *app, nj::json json);
		~Palette();

		fs::path getPngPath(std::string design_name);
		void producePngs();
	};
};



#endif