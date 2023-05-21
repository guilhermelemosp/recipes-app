# Descrição

Este projeto foi desenvolvido durante o período de Curso da Trybe e teve como objetivo a aplicação dos conhecimentos adquiridos no módulo de Front End 🚀

:warning: Projeto desenvolvido em um time de 4 integrantes.

### :star: [Acesse](https://thiagomartins367.github.io/Trybe-project-recipes-app) a aplicação agora mesmo

---

# Sumário
- [Descrição](#descrição)
- [Habilidades](#habilidades-requeridas)
- [O que foi desenvolvido](#o-que-foi-desenvolvido)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Demonstração da aplicação](#demonstração-da-aplicação)
- [Protótipo do projeto](#protótipo-do-projeto)
- [ANTES DE INICIALIZAR A APLICAÇÃO](#antes-de-inicializar-a-aplicação)
- [Linter](#linter)
- [APIs](#apis)
  - [TheMealDB API](#themealdb-api)
  - [The CockTailDB API](#the-cocktaildb-api)

- [Usando o Trello como ferramenta kanban](#usando-o-trello-como-ferramenta-kanban)

- [Observações técnicas](#observações-técnicas)
  - [Rotas](#rotas)
  - [Biblioteca clipboard-copy](#biblioteca-clipboard-copy)

---

# Habilidades requeridas

  - Utilizar _Hooks_ para gerenciar estado
  - Utilizar o _React Hook useState_
  - Utilizar o _React Hook useContext_
  - Utilizar o _React Hook useEffect_
  - Criar Hooks customizados

---

## O que foi desenvolvido

Foi implementado, em equipe, um app de receitas, utilizando o que há de mais moderno dentro do ecossistema React: Hooks e Context API!

A base de dados são 2 APIs distintas, uma para comidas e outra para bebidas.

## Tecnologias utilizadas

- `javascript` , `css` , `js` , `React` , `ContextAPI` e `Jest`.

---


## ANTES DE INICIALIZAR A APLICAÇÃO:

1. Clone o repositório
  * `git clone git@github.com:THIAGOMARTINS367/Trybe-project-recipes-app.git`
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd Trybe-project-recipes-app`

2. Instale as dependências e inicialize o projeto
  * Instale as dependências:
    * `npm install`
  * Inicialize o projeto:
    * `npm start` (uma página de Login deve abrir no seu navegador)
    * ⚠️ Lembrando que já deve se estar dentro da pasta do projeto `Trybe-project-recipes-app` ⚠️
---

## Usando o Trello como ferramenta kanban

Para a organização das tarefas foi utilizado o modelo kanban através da ferramenta "Trello", para garantir que todos os integrantes tivessem suas tarefas bem definidas e que a qualidade no geral do projeto se mantivesse.

---

## APIs

### TheMealDB API

O [TheMealDB](https://www.themealdb.com/) é um banco de dados aberto, mantido pela comunidade, com receitas e ingredientes de todo o mundo.

As fotos dos ingredientes vêm de um end-point padronizado com a seguinte lógica:

```
https://www.themealdb.com/images/ingredients/{nome-do-ingrediente}-Small.png
// exemplo com "Lime"
https://www.themealdb.com/images/ingredients/Lime-Small.png
```

### The CockTailDB API

O [TheMealDB](https://www.thecocktaildb.com/) é um banco de dados aberto, mantido pela comunidade, com receitas de drinks.
