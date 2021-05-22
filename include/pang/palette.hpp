#ifndef PANG_PALETTE_IS_INCLUDED
#define PANG_PALETTE_IS_INCLUDED

#include <iostream>
#include <vector>

namespace pang {
	class Palette
	{
		class Color;

		std::string name;
		std::vector<Color*> palettes;
	public:
		Palette();
		~Palette();
	};
};



#endif