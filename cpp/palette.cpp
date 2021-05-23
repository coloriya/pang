#include "pang/palette.hpp"

#include "pang/pangapp.hpp"
#include "pang/color.hpp"
#include "pang/resolution.hpp"
#include "pang/pngwriter.hpp"

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
	this->produceSlabsPng(resolution);
	return;
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

	pang::PngWriter png_writer {resolution, png_path};
	int width = resolution->getWidth();
	int height = resolution->getHeight();

	png_bytep row = NULL;
	row = (png_bytep) std::malloc(3 * width * sizeof(png_byte));

	this->colorRow(row, width);
	for (int y = 0; y < height; y++) {
		png_writer.write(row);
	}

	png_writer.save();
	std::free(row);
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

	pang::PngWriter png_writer {resolution, png_path};
	int width = resolution->getWidth();
	int height = resolution->getHeight();

	png_bytep row = NULL;
	row = (png_bytep) std::malloc(3 * width * sizeof(png_byte));

	int slab_height = ceil(height / this->colors.size());
	this->colors[0]->colorRow(row, width);
	for (int y = 0; y < height; y++) {
		int slab_index = y / slab_height;
		int offset = y % slab_height;
		if (offset == 0)
		{
			this->colors[slab_index]->colorRow(row, width);
		}
		png_writer.write(row);
	}

	png_writer.save();
	std::free(row);
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


