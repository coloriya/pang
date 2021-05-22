#ifndef PANG_APP_IS_INCLUDED
#define PANG_APP_IS_INCLUDED

#include <iostream>
#include <filesystem>
#include <vector>

#include <nlohmann/json.hpp>

namespace fs = std::filesystem;
namespace nj = nlohmann;

namespace pang {
	class Palette;

	class App
	{
		nj::json args_json;
		nj::json palettes_json;

		std::string name;
		std::vector<Palette*> palettes;
	public:
		App();
		~App();
		void consoleLog();
	};
};



#endif