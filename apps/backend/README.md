# Moodly API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

API RESTful para o aplicativo Moodly, desenvolvida com **Clean Architecture**, **Repository Pattern** e **Dependency Injection**. Oferece endpoints para gerenciamento de usuários e registros de humor com autenticação JWT.

## Arquitetura

Este projeto segue princípios de **Clean Architecture** e **SOLID**, com separação clara de responsabilidades:

### Padrões de Design

#### Repository Pattern

Abstração da camada de dados com interfaces bem definidas:

```typescript
// Interface (em @moodly/core)
interface UserRepositoryModel {
  findByEmail(email: string): Promise<User | null>;
  createUser(data: createUserDTO): Promise<Payload>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: updateUserDTO): Promise<void>;
}

// Implementação
class UserRepository implements UserRepositoryModel {
  // Implementação usando Prisma
}
```

#### Factory Pattern (Dependency Injection)

Criação de instâncias com dependências injetadas:

```typescript
export function makeUserService() {
  const userRepository: UserRepositoryModel = new UserRepository();
  const userService = new UserService(userRepository);
  return userService;
}
```

#### Service Layer

Lógica de negócio isolada e testável:

```typescript
class UserService {
  constructor(private readonly userRepository: UserRepositoryModel) {}

  async createUser({ name, email, password }: createUserDTO) {
    // Validações e regras de negócio
    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new Error("USER_ALREADY_EXISTS");

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.createUser({...});
  }
}
```

## Stack Tecnológico

### Core

- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Fastify** - Framework web de alta performance
- **Prisma ORM** - ORM type-safe para PostgreSQL

### Autenticação & Segurança

- **@fastify/jwt** - Autenticação JWT
- **bcrypt** - Hash de senhas

### Validação & Documentação

- **Zod** - Validação de schemas
- **fastify-type-provider-zod** - Integração Zod + Fastify
- **@fastify/swagger** - Geração de documentação OpenAPI
- **@fastify/swagger-ui** - Interface Swagger UI

### Upload & Storage

- **@fastify/multipart** - Upload de arquivos
- **Cloudinary** - Armazenamento de imagens na nuvem

### Database

- **PostgreSQL** - Banco de dados relacional

## Estrutura do Banco de Dados

### Model: Users

```prisma
model Users {
  id               String        @id @default(uuid())
  name             String
  email            String        @unique
  password         String
  image            String
  bio              String?
  baselineMood     BaselineMood?
  triggers         String?
  copingStrategies String?
  goals            String?
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt
  moods            Mood[]
}
```

### Model: Mood

```prisma
model Mood {
  id          String       @id @default(cuid())
  rating      BaselineMood
  dateLogged  DateTime
  description String
  emoji       String
  userId      String
  user        Users        @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}
```

### Enum: BaselineMood

```prisma
enum BaselineMood {
  very_low
  low
  neutral
  good
  very_good
}
```

## API Endpoints

### Users

#### POST /api/v1/users

Criar novo usuário

- **Body**: `{ name, email, password }`
- **Response**: `{ token }`
- **Status**: 201

#### POST /api/v1/users/login

Autenticar usuário

- **Body**: `{ email, password }`
- **Response**: `{ token }`
- **Status**: 200

#### GET /api/v1/users/profile

Obter perfil do usuário autenticado

- **Headers**: `Authorization: Bearer <token>`
- **Response**: User object (sem password)
- **Status**: 200

#### PUT /api/v1/users/profile

Atualizar perfil do usuário

- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ name?, email?, bio?, image?, ... }`
- **Response**: `{ message: "User updated" }`
- **Status**: 200

#### POST /api/v1/users/upload

Upload de imagem de perfil

- **Headers**: `Authorization: Bearer <token>`
- **Body**: FormData com arquivo
- **Response**: `{ url }`
- **Status**: 200

### Moods (Protegidas)

Todas as rotas de mood requerem autenticação JWT.

#### POST /api/v1/mood

Criar novo registro de humor

- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ rating, description, emoji, dateLogged }`
- **Response**: Mood object
- **Status**: 201

#### GET /api/v1/mood

Listar todos os moods do usuário

- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array de Mood objects
- **Status**: 200

#### GET /api/v1/mood/:id

Obter mood específico

- **Headers**: `Authorization: Bearer <token>`
- **Params**: `id`
- **Response**: Mood object
- **Status**: 200

#### PUT /api/v1/mood/:id

Atualizar mood

- **Headers**: `Authorization: Bearer <token>`
- **Params**: `id`
- **Body**: `{ rating?, description?, emoji?, dateLogged? }`
- **Response**: `{ message: "Mood updated" }`
- **Status**: 200

#### DELETE /api/v1/mood/:id

Deletar mood

- **Headers**: `Authorization: Bearer <token>`
- **Params**: `id`
- **Response**: `{ message: "Mood deleted" }`
- **Status**: 200

## Plugins

### Auth Plugin

Registra JWT e adiciona decorator `authenticate` para proteção de rotas:

```typescript
fastify.decorate("authenticate", async function (req, reply) {
  try {
    await req.jwtVerify();
  } catch (err) {
    reply.status(401).send({ message: "Operation not permitted" });
  }
});
```

## Documentação Swagger

A API possui documentação interativa gerada automaticamente com Swagger:

- **URL**: `http://localhost:3000/docs`
- **Formato**: OpenAPI 3.0
- **Tags**: User, Mood

## Providers

### CloudinaryStorageProvider

Implementa interface `StorageProvider` para upload de imagens:

```typescript
interface StorageProvider {
  saveFile(
    fileStream: NodeJS.ReadableStream,
    filename: string,
    mimetype: string,
  ): Promise<string>;
  deleteFile(url: string): Promise<void>;
}
```

**Configuração**:

- Pasta: `@moodly_api/avatars`
- Retorna: URL segura da imagem

## Validação com Zod

Todos os endpoints possuem validação de entrada com Zod:

```typescript
const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});
```

Integração com Fastify via `fastify-type-provider-zod` para type-safety completo.

## Variáveis de Ambiente

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbName"

# JWT
JWT_SECRET="your-secret-key"

# Cloudinary
CLOUDINARY_NAME="your-cloud-name"
CLOUDINARY_KEY="your-api-key"
CLOUDINARY_SECRET="your-api-secret"

```

## Segurança

- **Passwords**: Hash com bcrypt (salt rounds: 10)
- **JWT**: Tokens assinados com secret
- **Validação**: Zod schemas em todas as entradas
- **CORS**: Configurável via Fastify

## Logging

Logger Pino configurado por ambiente:

- **Development**: Pretty print com cores
- **Production**: JSON estruturado

## Monorepo

Este projeto faz parte de um monorepo com:

- `@moodly/core` - Tipos e interfaces compartilhadas
- `apps/mobile` - Aplicativo React Native
- `apps/backend` - Esta API

## Princípios SOLID Aplicados

- **S**ingle Responsibility: Cada classe tem uma única responsabilidade
- **O**pen/Closed: Extensível via interfaces (StorageProvider)
- **L**iskov Substitution: Repositories são intercambiáveis
- **I**nterface Segregation: Interfaces específicas e focadas
- **D**ependency Inversion: Dependências via abstrações (interfaces)
