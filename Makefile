# {{{1 Variables
#      =========
VPATH = . assets
vpath %.bib _bibliography
vpath %.html . _includes _layouts _site
vpath %.scss _sass slides/reveal.js/css/theme/template
vpath %.yaml . _data
vpath %.json _data

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
_site : bibliografias src
	@echo "####################"
	@docker run --rm -v "`pwd`:/srv/jekyll" \
		$(JEKYLL) /bin/bash -c "chmod 777 /srv/jekyll && jekyll build --future"

.PHONY : serve
serve : bibliografias
	bundle exec jekyll serve --future

src/%.md : docs/%.md _data/biblio.yaml
	@$(PANDOC) -f markdown -t markdown_phpextra --standalone \
		--reference-links --reference-location=block \
		--shift-heading-level-by=1 \
		--filter=pandoc-crossref -C --bibliography=_data/biblio.yaml \
		--csl=_data/chicago-note-bibliography.csl -o $@ $<

_includes/%.html : _data/%.json _data/chicago-note-bibliography.csl
	@$(PANDOC) -f csljson --citeproc -Mlang=pt_BR \
		--csl=$(word 2,$^) \
		-o $@ $<
	@echo "🔄 $@"

.PHONY : bibliografias
bibliografias : _includes/biblio-basica.html \
	_includes/biblio-complementar.html _includes/biblio-dicionarios.html

watch :
	while sleep 1 ; do ls _data/*.json \
		| entr -d make bibliografias ; done
# vim: set foldmethod=marker shiftwidth=2 tabstop=2 :
