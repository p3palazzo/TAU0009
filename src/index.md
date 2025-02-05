---
title         : 'Arquitetura e Urbanismo no Brasil Colônia e Império'
layout        : "layouts/splash.njk"
classes       : "wide"
toc           : false
read_time     : false
author_profile: true
header:
  overlay_image: "assets/media/br-rj-rj-r_direita-rugendas-1835.jpg"
  overlay_filter: 0.7
  caption: 'Johann Moritz Rugendas, <a href="https://digitalcollections.nypl.org/items/510d47d9-7b85-a3d9-e040-e00a18064a99">Rua Direita no Rio de Janeiro</a>, 1835'
  actions:
    - href     : "/plano/"
      label    : "Plano de ensino"
      btn_class: "btn-outline-primary btn-lg px-5 py-3 mt-5"
excerpt: >-
  Produção arquitetônica e processo de urbanização do Descobrimento até
  fins do século <span class="smallcaps">XIX</span>.
  Arquitetura indígena, vernácula e dos imigrantes.
templateEngineOverride: njk,md
---

# Unidade I · Identidades e invariantes castiços # {-}

```{=html}
<div class="row row-cols-md-2 row-cols-xl-4 g-3">
{% for post in collections.lugar %}
{%- include "partials/card-lecture.njk" -%}
{% endfor %}
</div>
```

# Unidade II · Formação da tradição # {-}

```{=html}
<div class="row row-cols-md-2 row-cols-xl-4 g-3">
{% for post in collections.casticismo %}
{%- include "partials/card-lecture.njk" -%}
{% endfor %}
</div>
```

# Unidade III · Tradição luso-brasileira # {-}

```{=html}
<div class="row row-cols-md-2 row-cols-xl-4 g-3">
{%- for post in collections.tradicional -%}
{%- include "partials/card-lecture.njk" -%}
{% endfor %}
</div>
```

# Unidade IV · Fim da tradição # {-}

```{=html}
<div class="row row-cols-md-2 row-cols-xl-4 g-3">
{%- for post in collections.fim -%}
{%- include "partials/card-lecture.njk" -%}
{% endfor %}
</div>
```

