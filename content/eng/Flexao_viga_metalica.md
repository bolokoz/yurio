---
date: '2020-12-7'
title: Flexões em vigas metálicas
description: Fluxograma para resistência em vigas metálicas
tags: [engenharia, metalicas, revisao, fluxogramas, civil]
cover: https://res.cloudinary.com/boloko/image/upload/f_auto/v1730258930/furushow7/image_ggvvgh.png
publish: true
permalink: /flexao-vigas-metalicas
created: '2025-03-09'
---

# Flexão

## Fluxograma flexão


```mermaid
graph TB
    1[Cálculo de viga metálica Flexão]
    2[Determinar diagrama momento fletor]
    3[Determinar propriedades geométricas do perfil]
    4[Cálculo do momento plástico]
    5[Verificar flambagens]
    6[Determinar momento resistente]
    7[Verificar flecha]
    8[Verificar cortante]


    51[FLM]
    52[FLA]
    53[FLT]
    5 -.-> 51 -.-> 52 -.-> 53 -.-> 6


    click 2 "../analise_estrutural/carregamentos"
    click 3 "./perfis"
    click 4 "./#momento-resistente"
    click 5 "./#flambagem"
    click 51 "./#flm"
    click 52 "./#fla"
    click 53 "./#flt"
    click 7 "./#flecha"
    click 8 "./#cortante"

    1 ==> 2 ==> 3 ==> 4 ==> 5 ==> 6 ==> 7 ==> 8
```

## Momento resistente

O momento resistente máximo no estado limite último de uma viga metálica fletida é igual ao momento de plastificação total da seção $M_{pl}$.

$$Z = b_f t_f (d-t_f) + \frac{t_w}{4} (d-2t_f)^2$$

$$M_{pl} = Z_x f_y$$

$$M_d = M_n / \gamma_1$$

>- $Z$ = Módulo plástico da seção transversal
>- $Z = 1,12 W_x$ ou valor da tabela
>- $b_f$ = (beam flange) largura da mesa
>- $t_f$ = (thickness flange) espessura da mesa
>- $d$ = altura da viga 
>- $t_w$ = (thickness web) espessura da alma 
>- $W_x$ momento de inercia em torno do eixo x (transversal à alma, paralelo às mesas)
>- $f_y$ = tensão de escoamento do aço
>- $M_d$ = momento resistente de projeto
>- $\gamma$ = fator de segurança

## Flambagem

Toda peça sob compressão está sujeita à flambagem. 

Quando uma peça está flexionada, apenas a região comprimida pode sofrer flambagem, portanto **devem ser verificadas individualmente mesa e alma**.

### FLM

>Flambagem Local da Mesa


:::tip Passos para verificar FLM
1. Determinar esbeltez da mesa
2. Comparar esbeltez com valores limites
3. Encontrar o momento resistente
:::

Abaixo seguem fórmulas para cálculo generalizados.

:::warning ATALHO 
Para aços usuais pode-se usar o [fluxograma FLM](#fluxograma-flm)
:::

#### Esbeltez da mesa

$$\lambda_b = \frac{b_f}{2t_f}$$
$$\lambda_p = 0,38 \sqrt{\frac{E}{f_y}}$$
$$\lambda_f = C \sqrt{\frac{E}{0,7 {f_y}/{k_c} }}$$

>- $\lambda_b$ = esbeltez da mesa
>- $b_f$ = (beam flange?) largura da mesa
>- $t_f$ = (thickness flange?) espessura da mesa
>- $C$ =  (constante de empenamento) 0,83 para laminados e 0,95 para soldados

Ao comparar o $\lambda_b$ com os valores limites, categorizar a mesa como **compacta, semicompacta ou esbelta**

:::warning Categorias da mesa
##### FLM compacta

Caso $\lambda_b < \lambda_p$:
$$M_n = M_{pl}$$

##### FLM semicompacta

Caso $\lambda_p < \lambda_b < \lambda_r$, faz-se uma interpolação do caso favorável e desfavorável:
$$M_n = M_{pl} - \frac{(\lambda_b - \lambda_p)}{(\lambda_r - \lambda_p)}(M_{pl} - M_r)$$

##### FLM esbelta

Caso $\lambda_b > \lambda_r$:

- Para laminados:
$$M_n = \frac{0,69 E}{\lambda_{b}^2} W_x$$

- Para soldadas:
$$M_n = \frac{0,9 k_c}{\lambda_{b}^2} W_x$$
$$k_c = \frac{4}{h_0/t_0}$$
:::

#### Fluxograma FLM

```mermaid
graph TD
    i[Valores limites vigas I ou H fletidas no plano da alma]
    A{Aço MR250?}
    B{Aço AR350?}
    E{MR250 Laminado?}
    C[lambda p = 10,7]
    C2[lambda r = 24]
    C-->E
    F[lambda r = 28]
    F2[lambda p = 9,1]
    1[Clique para fórmula geral]
    J{AR350 Laminado?}
    
    i --> A
    A --> |Sim| C
    A ----> |Não| B
    E --> |Sim| F
    E --> |Não| 1
    B --> |Sim| F2
    B --> |Não| 1
    F2 --> J
    J --> |Não| 1
    J --> |Sim| C2

    C2 --> 2
    F --> 2
    1 --> 2

    2{Comparar lambda b com lambda f e lambda r}
    21[Seção compacta]
    22[Seção semicompacta]
    23[Seção esbelta]
    2 --> |lambda B < lambda P| 21
    2 --> |lambda B entre lambda p e lambda r| 22
    2 --> |lambda B > lambda R| 23
    
    21a[Momento nominal = momento plástico]
    22a[Momento interpolado, clique para ver fórmula]
    23a[Momento bem reduzido, clique para ver fórmula]

    21 --> 21a
    22 ---> 22a
    23 ----> 23a


    click 1 "./#flm"
    click 22a "./#flm-semicompacta"
    click 22a "./#flm-esbelta"
```

> Fonte: Tabela 6.1 PFEIL


### FLA

Flambagem Local da Alma

### FLT

Flambagem Lateral com Torção

Ocorre em vigas sem contenção lateral ou parcialmente contidas.
Verificar FLT para os trechos das vigas parcialmente contidas.
Dispensa verificação quando contidas lateralmente em todo trecho (ex: vigas de lajes). 