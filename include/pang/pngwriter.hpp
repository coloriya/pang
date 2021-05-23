#ifndef PANG_PNG_WRITER_IS_INCLUDED
#define PANG_PNG_WRITER_IS_INCLUDED

#include <iostream>
#include <filesystem>

#include <png.h>

namespace fs = std::filesystem;



namespace pang
{
	class Resolution;

	class PngWriter
	{
		Resolution *resolution;
		fs::path png_path;
		int height;
		int width;
		bool ok = false;

		FILE *fp = NULL;
		png_structp png_ptr = NULL;
		png_infop info_ptr = NULL;
		png_bytep row = NULL;
	public:
		PngWriter(Resolution *resolution, fs::path png_path);
		~PngWriter();

		bool isok();

		int getHeight();
		int getWidth();

		void write(png_bytep row);
		void save();
	};
};



#endif