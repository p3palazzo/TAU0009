# {{{1 Variables
#      =========
VPATH = . assets
vpath %.bib _bibliography
vpath %.html . _includes _layouts _site
vpath %.scss _sass slides/reveal.js/css/theme/template
vpath %.yaml . _data
vpath %.json _data

PANDOC_V := 3.1.1
PANDOC := docker run --rm -v "`pwd`:/data" \
	-u "`id -u`:`id -g`" pandoc/core:$(PANDOC_V)

ASSETS  = $(wildcard assets/*)
SASS    = _revealjs-settings.scss \
					mixins.scss settings.scss theme.scss

# {{{1 Recipes
#      =======
.PHONY : _site
_site : bibliografias src
	@echo "####################"
	@npm build

.PHONY : serve
serve : bibliografias
	@echo "####################"
	@npm start

src/%.md : docs/%.md _data/biblio.yaml
	@$(PANDOC) -f markdown -t commonmark_x --standalone \
		--reference-links --reference-location=block \
		--shift-heading-level-by=1 \
		--filter=pandoc-crossref -C --bibliography=_data/biblio.yaml \
		--csl=_data/chicago-note-bibliography.csl -o $@ $<
	@echo "🔄 $@"

src/_includes/partials/%.html : _data/%.json _data/chicago-note-bibliography.csl
	@$(PANDOC) -f csljson --citeproc -Mlang=pt_BR \
		--csl=$(word 2,$^) \
		-o $@ $<
	@echo "🔄 $@"

.PHONY : bibliografias
bibliografias : src/_includes/partials/biblio-basica.html \
	src/includes/partials/biblio-complementar.html \
	src/includes/partials/biblio-dicionarios.html

watch :
	while sleep 1 ; do ls _data/*.json \
		| entr -d make bibliografias ; done
# vim: set foldmethod=marker shiftwidth=2 tabstop=2 :
