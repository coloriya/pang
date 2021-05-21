
default: all

all: css

CSS_IN = src/scss/app.scss
CSS_OUT = docs/dist/css/app.css

SASS_FLAGS = --no-source-map

css:
	@sass ${SASS_FLAGS} ${CSS_IN}:${CSS_OUT}

sasswatch:
	@sass --watch ${SASS_FLAGS} ${CSS_IN}:${CSS_OUT}

clean:
	@echo "Cleaning!"
	@rm -f ${CSS_OUT}


