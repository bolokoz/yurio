---
title: Computadores quanticos
description: Como realmente funcionam os algorítmos quanticos
tags:
  - engenharia
  - programação
  - quantica
  - computação
cover: ""
publish: true
permalink: /computadores-quanticos
modified: 2025-05-04T21:29:39-04:00
created: 2025-05-04T15:34:32-04:00
---

## O que

São computadores que diferentemente dos tradicionais binários, utilizam estados quânticos para processar algoritmos

## Por que

Muito se ouve falar que eles são superiores aos computadores tradicionais porque os 'qubits' estão em superposição e consegue-se calcular todos os resultados em tempo real (paralelismo) mas isso é falso

## Como 

A vantagem do computador quântico está _somente_ na complexidade temporal, que _em teoria_ é mais rápido comparado ao computador mecânico. Não está na capacidade computacional.

A explicação de como funciona é um tema bem complexo, mas tudo que é complexo pode ser quebrado em etapas menores. Vou tentar anotar o que entendi até o momento


### Qubits

O computador tradicional usa a unidade informacional bit. É um conjunto mecânico de transistores que podem estar em dois estados: ligado ou desligado, 0 ou 1.

Já o quântico utiliza unidade informacional o qubit (que ainda não sei como é fisicamente) e seu estado é probabilistico. Para determinar seu estado é preciso fazer uma leitura que vai _colapsar_ o qubit em um estado ligado ou desligado igual o tradicional  

Se utiliza essa notação $|0\rangle$ $|1\rangle$  para escrever um estado quântico


### Teoria quantica

Difere das leis clássicas drasticamente e ainda existem divergências de definições

A mais utilizada seria a interpretação de Copenhagen que define a mecânica quântica como indeterminável e probabilística. 

Para medir e trazer um estado para o mundo real é preciso observar e este ato faz com que as probabilidades se _colapsem ou reduzem_ para um estado clássico

Não entendi ainda bem mas tem uma frase legal

_Einstein suddenly stopped, turned to me and asked whether I really believed that the moon exists only when I look at it_


### Algoritmos

O computador precisa resolver algum problema. Esse problema precisa ser traduzido em um programa ou algoritmo e este, por sua vez, transformado em uma sequencia de operações logic gates

Nenhum problema que não pode ser resolvido no computador clássico também não consegue ser resolvido no quântico

Um dos algoritmos mais famoso:

Grover: Para brute-force ou busca linear. É mais rápido que um computador mecânico na ordem quadrática.

Shor: Achar fator primo de um numero integral 

Ainda assim impossível de chegar perto de quebrar SHA256 ou RSA2048




