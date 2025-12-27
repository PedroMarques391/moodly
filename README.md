# Moodly

<div align="center">
  <img alt="Moodly Banner" src="./assets/logo3.png" width="100%" style="max-width: 800px; border-radius: 10px;">
  <br><br>

  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" />
  <img src="https://img.shields.io/badge/Monorepo-Yarn_Workspaces-efefef?style=for-the-badge&logo=threedotjs&logoColor=black" />

  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />

  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge" />
</div>

<br>

> **Moodly** é uma aplicação full-stack projetada para ajudar usuários a registrarem, acompanharem e compreenderem suas emoções ao longo do tempo.

O projeto utiliza a estratégia de **Monorepositório (Monorepo)** para centralizar o desenvolvimento, facilitar o compartilhamento de código, padronizar configurações e manter uma gestão unificada das dependências entre Backend e Mobile.

---

## Arquitetura e Estrutura

Estrutura organizada via **Yarn Workspaces**, separando responsabilidades de forma clara:

### Backend (`apps/backend`)

Focado em performance, escalabilidade e manutenibilidade.

- **Node.js & Fastify** para alta taxa de requisições e baixa latência
- **Clean Architecture**, com regras de negócio isoladas de frameworks
- **Design Patterns**: Injeção de Dependência, Repository Pattern e Singleton
- **Persistência** com **Prisma ORM** e **PostgreSQL**

### 📱 Mobile (`apps/mobile`)

Aplicação voltada à experiência do usuário (UX).

- **React Native & Expo** para desenvolvimento ágil e multiplataforma
- **Zustand** para gerenciamento de estado global simples e escalável
- **Custom Hooks** para abstração da lógica de API e side-effects

### Core (`packages/core`)

Camada compartilhada entre Backend e Mobile.

- **Type Safety** com compartilhamento de `interfaces`, `DTOs` e `enums`
- **Consistência de contrato** entre cliente e servidor
- Aplicação do princípio **DRY (Don't Repeat Yourself)**

---

## Tecnologias

| Escopo      | Stack                                            |
| ----------- | ------------------------------------------------ |
| **Infra**   | TypeScript, Yarn Workspaces, ESLint, Prettier    |
| **Backend** | Node.js, Fastify, Prisma ORM, PostgreSQL, Docker |
| **Mobile**  | React Native, Expo, Zustand, React Navigation    |

---

## Como Executar

### Pré-requisitos

- Node.js (LTS)
- Yarn
- Docker (para o banco de dados)

### 1. Instalação

Na raiz do monorepo:

```bash
yarn install
```

### 2. Configuração do Ambiente

Crie os arquivos `.env` a partir dos exemplos (`.env.example`) em:

- `apps/backend`
- `apps/mobile`

### 3. Executando o Backend

```bash
cd apps/backend && npx prisma migrate dev && yarn run dev
```

### 4. Executando o Mobile

```bash
cd apps/mobile && npx expo start
```
