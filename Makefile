# {{{1 Variables
#      =========
VPATH = . assets
vpath %.html . _includes _layouts _site
vpath %.scss _scss slides/reveal.js/css/theme/template
vpath %.yaml . _data
vpath %.json _data

ASSETS  = $(wildcard assets/*)
AULA    = $(wildcard src/aula/*.md)
SLIDES  = $(patsubst src/aula/%.md,src/slides/%/index.html,$(AULA))

# {{{1 Recipes
#      =======
.PHONY : _site
_site : $(SLIDES)
	@npm run build

.PHONY : serve
serve : bibliografias slides
	@echo "####################"
	@npm start

src/%.md : docs/%.md _data/biblio.yaml
	@pandoc -f markdown -t commonmark_x --standalone \
		--reference-links --reference-location=block \
		--shift-heading-level-by=1 \
		--filter=pandoc-crossref -C --bibliography=_data/biblio.yaml \
		--csl=_data/chicago-note-bibliography.csl -o $@ $<
	@echo "🔄 $@"

src/slides/%/index.html : src/aula/%.md revealjs.yaml biblio.yaml
	@-mkdir -p $(@D)
	@pandoc -d _data/revealjs.yaml \
		-o $@ $<
	@echo "🔄 $(@D)"

.PHONY : slides
slides : $(SLIDES)

.PHONY : bibliografias
bibliografias : src/_includes/partials/biblio-basica.html \
	src/includes/partials/biblio-complementar.html \
	src/includes/partials/biblio-dicionarios.html

watch :
	while sleep 1 ; do ls _data/*.json \
		| entr -d make bibliografias ; done
# vim: set foldmethod=marker shiftwidth=2 tabstop=2 :
