# Moodly

<p align="center">
  <img alt="Moodly Banner" src="./assets/logo3.png" width="100%">
  <p align="center">
  <img src="https://img.shields.io/badge/TypeScript-blue" />
  <img src="https://img.shields.io/badge/yarn-v1.22-blue" />
</p>
</p>

O **Moodly** é uma aplicação full-stack projetada para ajudar usuários a registrarem e acompanharem suas emoções. O projeto foi desenvolvido adotando a estratégia de **monorepositório** para centralizar o desenvolvimento e facilitar o compartilhamento de código entre as diferentes partes da aplicação.

## Arquitetura e Estrutura

O projeto está estruturado de forma modular:

### Backend (`apps/backend`)

Focado em robustez e manutenibilidade, o backend foi desenvolvido com:

- **Node.js** & **Fastify**: Para alta performance.
- **Layered & Clean Architecture**: Separação clara de responsabilidades e regras de negócio agnósticas a frameworks.
- **Design Patterns**: Uso extensivo de Injeção de Dependência, Repository Pattern e Singleton.
- **Database**: Persistência de dados com **Prisma ORM** e **PostgreSQL**.

### Mobile (`apps/mobile`)

A aplicação cliente é focada na experiência do usuário:

- **React Native** & **Expo**: Para desenvolvimento ágil multiplataforma.
- **Zustand**: Gerenciamento de estado simples e escalável.
- **Custom Hooks**: Abstração da camada de rede e requisições API.

### Core (`packages/`)

Um pacote central responsável por definir os contratos da aplicação:

- Compartilhamento de **Models**, **DTOs** e interfaces TypeScript entre front e back-end, garantindo integridade de dados.

## Tecnologias Principais

| Stack       | Tecnologias                            |
| :---------- | :------------------------------------- |
| **Geral**   | TypeScript, Monorepo (Yarn workspaces) |
| **Backend** | Node.js, Fastify, Prisma, PostgreSQL   |
| **Mobile**  | React Native, Expo, Zustand            |
