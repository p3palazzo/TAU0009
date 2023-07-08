# {{{1 Variables
#      =========
VPATH = . assets
vpath %.bib _bibliography
vpath %.html . _includes _layouts _site
vpath %.scss _sass slides/reveal.js/css/theme/template
vpath %.yaml . _spec _data

PANDOC_V := 3.1.1
JEKYLL_V := 4.2.2
PANDOC := docker run --rm -v "`pwd`:/data" \
	-u "`id -u`:`id -g`" pandoc/core:$(PANDOC_V)
JEKYLL := palazzo/jekyll-pandoc:$(JEKYLL_V)-$(PANDOC_V)

ASSETS  = $(wildcard assets/*)
SASS    = _revealjs-settings.scss \
					mixins.scss settings.scss theme.scss

# {{{1 Recipes
#      =======
.PHONY : _site
_site :
	@echo "####################"
	@docker run --rm -v "`pwd`:/srv/jekyll" \
		$(JEKYLL) /bin/bash -c "chmod 777 /srv/jekyll && jekyll build --future"

%.pdf : %.md latex.yaml biblio.yaml metadata.yaml
	@pandoc -o $@ -d _spec/latex.yaml $<
	@echo $@

.PHONY : serve
serve :
	@echo "####################"
	@docker run --rm -v "`pwd`:/srv/jekyll" \
		-h "0.0.0.0:127.0.0.1" -p "4000:4000" \
		$(JEKYLL) jekyll serve --future
# vim: set foldmethod=marker shiftwidth=2 tabstop=2 :
