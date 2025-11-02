# Guia de Configuração: NestJS, Prisma e GraphQL (Code-First)

Este documento detalha como configurar uma aplicação backend com NestJS, Prisma (ORM) e GraphQL usando a abordagem *Code-First*.

Sumário
- Configuração do NestJS
- Integração com o Prisma
- Configuração do GraphQL (Code-First)
- Execução e verificação

---

## 1. Configuração do ambiente NestJS

### 1.1 Instalar o NestJS CLI

Instale o CLI globalmente (opcional, mas recomendado):

```bash
npm i -g @nestjs/cli
```

### 1.2 Criar o projeto

```bash
nest new nome-do-projeto
cd nome-do-projeto
```

Isso gera a estrutura inicial do projeto com TypeScript.

---

## 2. Integração com o Prisma

### 2.1 Instalar dependências do Prisma

```bash
# CLI do Prisma como dependência de desenvolvimento
npm install prisma --save-dev

# Cliente Prisma em runtime
npm install @prisma/client
```

Isso cria a pasta `prisma/` com `schema.prisma` e um arquivo `.env` com a variável `DATABASE_URL`.

### 2.2 Exemplo de `PrismaService` (NestJS)

Crie `src/database/prisma.service.ts`:

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

---

## 3. Configuração da API GraphQL (Code-First)

### 3.1 Instalar dependências do GraphQL

npm i @nestjs/graphql @nestjs/apollo @apollo/server @as-integrations/express5 graphql
```

### 3.2 Configurar `GraphQLModule` no `AppModule`

Edite `src/app.module.ts` para importar o `PrismaModule` e o `GraphQLModule`:

```typescript
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [AppResolver],
})
export class AppModule {}
```

Opções importantes:
- `driver: ApolloDriver` — usa Apollo Server.
- `autoSchemaFile: true` — gera o schema GraphQL automaticamente a partir dos decorators (Code-First).

### 3.3 Exemplo de `AppResolver`

Crie `src/app.resolver.ts`:

```typescript
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello GraphQL!';
  }
}
```

---

## 4. Executar e verificar

### 4.1 Exemplo de `.env` (local)

```text
DB_USERNAME=sajic
DB_PASSWORD=123456
DB_NAME=sajic_db
DB_PORT=5432

DATABASE_URL=postgresql://sajic:123456@localhost:5432/sajic_db?schema=public
```

Se sua aplicação for executada dentro de um container Docker Compose, use o nome do serviço como host:

```text
DATABASE_URL=postgresql://sajic:123456@sajic_db:5432/sajic_db?schema=public
```

### 4.2 Subir a aplicação em desenvolvimento

```bash
npm run start:dev
```

Acesse o GraphQL Playground em: http://localhost:3000/graphql

### 4.3 Comandos úteis do Prisma

```bash
# gerar/atualizar cliente
npx prisma generate --schema=prisma/schema.prisma

# aplicar migração de desenvolvimento
npx prisma migrate dev --schema=prisma/schema.prisma --name init

# sincronizar schema com o banco (pull)
npx prisma db pull --schema=prisma/schema.prisma
```

### 4.4 Teste rápido (GraphQL)

```graphql
query {
  hello
}
```

Resposta esperada:

```json
{
  "data": { "hello": "Hello GraphQL!" }
}
```

---

## Próximos passos sugeridos

- Definir modelos no `prisma/schema.prisma` (ex.: `model User`).
- Rodar `npx prisma migrate dev --name init` para criar as tabelas.
- Rodar `npx prisma generate` para atualizar o `@prisma/client`.
- Criar módulos e resolvers que injetem o `PrismaService` para operações CRUD.
- Definir tipos GraphQL com `@ObjectType()` e `@Field()` para exposição no schema.

---

Se quiser, eu posso:
- corrigir links/paths no README para se alinhar com a estrutura do projeto atual;
- adicionar exemplos de migração com dados de seed;
- ou formatar o arquivo para incluir badges e instruções de contribuição.
