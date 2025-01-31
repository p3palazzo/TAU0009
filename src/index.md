---
title         : 'Arquitetura e urbanismo'
subtitle      : '<strike>no Brasil colônia e Império</strike> na tradição luso-brasileira'
layout        : "layouts/base.njk"
classes       : "wide"
toc           : false
read_time     : false
author_profile: true
header:
  overlay_image: "assets/media/br-rj-rj-r_direita-rugendas-1835.jpg"
  overlay_filter: 0.7
  caption: 'Johann Moritz Rugendas, <a href="https://digitalcollections.nypl.org/items/510d47d9-7b85-a3d9-e040-e00a18064a99">Rua Direita no Rio de Janeiro</a>, 1835'
excerpt: |
  <dl>
    <dt>Ementa</dt>
    <dd>
      Produção arquitetônica e processo de urbanização do
      Descobrimento até fins do século
      <span style="font-variant:all-small-caps">XIX</span>. Arquitetura indígena,
      vernácula e dos imigrantes.
    </dd>
    <dt>Objetivo de aprendizagem</dt>
    <dd>
      Capacitar-se para pesquisar e intervir, com critérios
      histórico-arqueológicos e estéticos, no ambiente construído
      tradicional no Brasil e no mundo atlântico de influência
      portuguesa.
    </dd>
  </dl>
templateEngineOverride: njk,md
---

# Unidade I › Lugar # {-}

```{=html}
<div class="row row-cols-md-2 row-cols-xl-4 g-3">
{% for post in collections.lugar %}
{%- include "partials/album.njk" -%}
{% endfor %}
</div>
```

# Unidade II › Elementos da arquitetura # {-}

```{=html}
<div class="row row-cols-md-2 row-cols-xl-4 g-3">
{% for post in collections.materia %}
{%- include "partials/album.njk" -%}
{% endfor %}
</div>
```

# Unidade III › Elementos de composição # {-}

```{=html}
<div class="row row-cols-md-2 row-cols-xl-4 g-3">
{%- for post in collections.tipo -%}
{%- include "partials/album.njk" -%}
{% endfor %}
</div>
```

# Unidade IV › Estilo # {-}

```{=html}
<div class="row row-cols-md-2 row-cols-xl-4 g-3">
{%- for post in collections.estilo -%}
{%- include "partials/album.njk" -%}
{% endfor %}
</div>
```

