#include "pang/palette.hpp"

#include "pang/pangapp.hpp"
#include "pang/color.hpp"
#include "pang/resolution.hpp"

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



fs::path pang::Palette::getPngPath (std::string design_name, Resolution *resolution)
{
	fs::path png_path;
	png_path = fs::path(this->app->args_json["paths"]["output"]);

	std::string filename = "pang_";
	filename += std::to_string(this->index);
	filename += "_" + design_name + "_" + resolution->getSuffix() + ".png";
	png_path.append(filename);
	return png_path;
}

void pang::Palette::producePngs (Resolution *resolution)
{
	this->produceBarsPng(resolution);
	return;
	this->produceSlabsPng(resolution);
	this->produceSquaresPng(resolution);
}



void pang::Palette::colorRow(png_bytep row, int width)
{
	int number_of_colors = this->colors.size();
	int bar_width = width / number_of_colors;
	auto color = this->colors[0];
	for (int x=0; x<width; x++)
	{
		int bar_index = x / bar_width;
		int offset = x % bar_width;

		if (offset == 0)
		{
			color = this->colors[bar_index];
		}
		row[x*3] = color->getR();
		row[x*3 + 1] = color->getG();
		row[x*3 + 2] = color->getB();
	}
}



void pang::Palette::produceBarsPng (Resolution *resolution)
{
	auto png_path = this->getPngPath("bars", resolution);
	if (fs::exists(png_path))
	{
		std::cout << "\texists: (" << png_path << ")\n";
		return;
	}

	int width = resolution->getWidth();
	int height = resolution->getHeight();

	FILE *fp = NULL;
	png_structp png_ptr = NULL;
	png_infop info_ptr = NULL;
	png_bytep row = NULL;

	std::string filepath = png_path;
	fp = fopen(filepath.data(), "wb");
	if (fp == NULL) {goto finalise;}

	png_ptr = png_create_write_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);
	if (png_ptr == NULL) {goto finalise;}

	info_ptr = png_create_info_struct(png_ptr);
	if (info_ptr == NULL) {goto finalise;}

	if (setjmp(png_jmpbuf(png_ptr))) {goto finalise;}

	png_init_io(png_ptr, fp);
	png_set_IHDR(png_ptr, info_ptr, width, height, 8, 
		PNG_COLOR_TYPE_RGB, PNG_INTERLACE_NONE, 
		PNG_COMPRESSION_TYPE_BASE, PNG_FILTER_TYPE_BASE);
	png_write_info(png_ptr, info_ptr);
	row = (png_bytep) malloc(3 * width * sizeof(png_byte));

	this->colorRow(row, width);
	for (int y = 0; y < height; y++) {
		png_write_row(png_ptr, row);
	}

	png_write_end(png_ptr, NULL);

	finalise:
	if (fp != NULL) {fclose(fp);}
	if (info_ptr != NULL) {png_free_data(png_ptr, info_ptr, PNG_FREE_ALL, -1);}
	if (png_ptr != NULL) {png_destroy_write_struct(&png_ptr, &info_ptr);}
	if (row != NULL) {free(row);}
	std::cout << "\tsaved: (" << png_path << ")\n";
}



void pang::Palette::produceSlabsPng (Resolution *resolution)
{
	auto png_path = this->getPngPath("slabs", resolution);
	if (fs::exists(png_path))
	{
		std::cout << "\texists: (" << png_path << ")\n";
		return;
	}

	std::cout << "\tsaved: (" << png_path << ")\n";
}



void pang::Palette::produceSquaresPng (Resolution *resolution)
{
	auto png_path = this->getPngPath("squares", resolution);
	if (fs::exists(png_path))
	{
		std::cout << "\texists: (" << png_path << ")\n";
		return;
	}

	std::cout << "\tsaved: (" << png_path << ")\n";
}


