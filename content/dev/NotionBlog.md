---
date: '2025-03-02'
title: Notionblog
description: ''
tags: []
cover: ''
publish: false
permalink: /devnotionblog
---
Tentei pegar um projeto pronto do github que pegaria suas notas do Notion e transformaria em um site mas é em chines

Normalmente eu assustaria e iria embora porque não da para entender nada, mas dessa vez vou tentar.

## Como funciona

1. Você faz suas notas no Notion conforme uma tabela. Você compartilha com o mundo essa nota para torná-la pública, sendo possível acessar os dados pela API do Notion
2. Um app em Next Js com toda estrutra e layout é hidratada na build com os dados da API
3. Você coloca esse app no Vercel ou similar que todo commit ele builda com os dados novos e faz o deploy dos dados estáticos atualizados

## Changelog:
 - 02/03/2025: [added default frontmatter to all posts](https://github.com/bolokoz/yurio/commit/9756dc53320db69a162e10b64f310a555bc90f06)
