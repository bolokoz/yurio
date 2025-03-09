---
date: 2017-12-20
title: Android App Numerical Analysis
description: Android App de análise numérica utilizando métodos iterativos
tags:
  - dev
  - projetos
  - android
  - engenharia
  - matematica
cover: https://res.cloudinary.com/boloko/image/upload/f_auto/v1741467764/furushow7/image_vzbbm6.png
publish: true
permalink: /projects-numerical-analysis
modified: 2025-03-08T17:16:41-04:00
created: 2025-03-07T15:17:13-04:00
---

## Links

O aplicativo não está mais na loja pois utilizava um SDK antigo (2017) e agora só está disponível na APKmirror
[APKPure mirror](https://apkpure.com/br/numerical-analysis-3/com.yurifbecker.numericalanalysis3/download)

Código fonte do aplicativo está no GitLab
[Projeto no Gitlab](https://gitlab.com/yurifbeck/NumericalAnalysis3)

## O que é

Android App de métodos numéricos feito em 2016 para aulas na faculdade para matéria de Métodos Numéricos

Não está mais disponível na Google Play pois o SDK necessitava ser atualizado para se manter listado.

![](https://res.cloudinary.com/boloko/image/upload/f_auto/v1741466638/furushow7/image_bluesp.png)


## Por que

Eu estava empolgado com os últimos projetos de desenvolvimento e queria aplicar nesta matéria. Método numéricos são basicamentes diversos algorítmos para aproximar resultados de funções.


![](https://res.cloudinary.com/boloko/image/upload/f_auto/v1741466710/furushow7/image_qjjif2.png)

## Como funciona

Você primeira escolhe um método numérico. Existem diversos e cada um tem uma melhor aplicação. Hoje em dia com o poder de processamento pouco importa, mas é interessante ver como funciona.

Muito desses métodos são iterativos, ou seja, a cada iteração o resultado se aproxima mais do resultado.

![](https://res.cloudinary.com/boloko/image/upload/f_auto/v1741466811/furushow7/image_oodtrb.png)

![](https://res.cloudinary.com/boloko/image/upload/f_auto/v1741466831/furushow7/image_mjfmwf.png)

Para este aplicativo também aprendi a fazer atualizações de versões e lançamentos na loja Google Play

![](https://res.cloudinary.com/boloko/image/upload/f_auto/v1741467733/furushow7/image_r2gb15.png)

Também na época estava aprendendo a fazer desenhos gráficos no GIMP. Esse é o logo do aplicativo

![](https://res.cloudinary.com/boloko/image/upload/f_auto/v1741467764/furushow7/image_vzbbm6.png)

Para este aplicativo também criei uma versão DONATE. Esta versão é exatamente a mesma da 'FREE', que não tinha nenhuma propaganda, apenas se quisesse ajudar

![](https://res.cloudinary.com/boloko/image/upload/f_auto/v1741467823/furushow7/image_seuyio.png)

## Difulculdades

Para este projeto aprendi várias funcionalidades do Android como por exemplo Fragments e bibliotecas externas.

Para escrever uma função matemática, por exemplo, x^2 - 6x+1, é preciso interpretar a letra 'x' como uma variável. Isso pode ser feito de diversas formas

![](https://res.cloudinary.com/boloko/image/upload/f_auto/v1741467093/furushow7/image_n8qpwo.png)

O usuário pode escrever de formas ambíguas também. Como dizer ao algorítmo que 2x é a mesma coisa que 2x. Por isso utiliza-se um math parser 

O math parser também cuida da parte de calcular primeiro as multiplicações e então depois as somas utilizando uma árvore 
![](https://res.cloudinary.com/boloko/image/upload/f_auto/v1741467290/furushow7/image_ecdpuo.png)

## Ferramentas utilizadas

1. Java - linguagem de programação
2. Gradle
3. Google Play - loja de distribuição
4. [MXParser](https://mathparser.org/)

## Resultados

O aplicativo considerei ter sido bem legal como aprendizado e útil. No entanto reprovei na matéria, em grande parte porque a professora em suas provas exigia memorizar as fórmulas e eu tinha a filosofia de não colar. A reprovação na matéria me tirou a oportunidade de uma bolsa de estudar no exterior (ciência sem fronteiras).

Quanto aos resultados financeiros da versão DONATE. Eu sei que uma das compras foi eu mesmo que fiz pelo celular da minha mãe para entender como funcionavam as transações. No total obteve 21 compras e 12 refunds, tendo um lucro bruto total de R$62,52

![](https://res.cloudinary.com/boloko/image/upload/f_auto/v1741465788/furushow7/image_w3swst.png)

## Aprendizado e reflexões

Como eu disse acima, reprovar nesta matéria apesar de ter desenvolvido um aplicativo que aplicava a maioria dos ensinamentos me deixou bem triste. Independente do método de avaliação da professora na época, é preciso se adaptar aos desafios e 