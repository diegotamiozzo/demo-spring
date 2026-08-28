# demo-spring

Aplicação full stack de exemplo com **autenticação** (cadastro, login, logout e sessão) e um **dashboard** protegido.

- **Backend:** Spring Boot 4 (Java 25) + Spring Security + Spring Data JPA + MySQL
- **Frontend:** React 18 + TypeScript + Vite + React Router

---

## Sumário

- [Estrutura do projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do banco de dados (MySQL)](#configuração-do-banco-de-dados-mysql)
- [Rodando o backend](#rodando-o-backend)
- [Rodando o frontend](#rodando-o-frontend)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Endpoints da API](#endpoints-da-api)
- [Segurança](#segurança)
- [Testes](#testes)

---

## Estrutura do projeto

```
├── 📁 backend
│   ├── 📁 .mvn
│   │   └── 📁 wrapper
│   │       └── 📄 maven-wrapper.properties
│   ├── 📁 src
│   │   ├── 📁 main
│   │   │   ├── 📁 java
│   │   │   │   └── 📁 com
│   │   │   │       └── 📁 example
│   │   │   │           └── 📁 demo_spring
│   │   │   │               ├── ☕ AppUser.java
│   │   │   │               ├── ☕ AppUserDetailsService.java
│   │   │   │               ├── ☕ AppUserRepository.java
│   │   │   │               ├── ☕ AuthController.java
│   │   │   │               ├── ☕ DashboardController.java
│   │   │   │               ├── ☕ DemoSpringApplication.java
│   │   │   │               └── ☕ SecurityConfig.java
│   │   │   └── 📁 resources
│   │   │       └── 📄 application.properties
│   │   └── 📁 test
│   │       └── 📁 java
│   │           └── 📁 com
│   │               └── 📁 example
│   │                   └── 📁 demo_spring
│   │                       └── ☕ DemoSpringApplicationTests.java
│   ├── 📄 mvnw
│   ├── 📄 mvnw.cmd
│   └── ⚙️ pom.xml
├── 📁 frontend
│   ├── 📁 public
│   │   ├── 🖼️ dado.png
│   │   └── 🖼️ logo.png
│   ├── 📁 src
│   │   ├── 📁 components
│   │   │   └── 📄 Layout.tsx
│   │   ├── 📁 context
│   │   │   └── 📄 AuthContext.tsx
│   │   ├── 📁 lib
│   │   │   └── 📄 api.ts
│   │   ├── 📁 pages
│   │   │   ├── 📄 DashboardPage.tsx
│   │   │   ├── 📄 LoginPage.tsx
│   │   │   ├── 📄 SettingsPage.tsx
│   │   │   ├── 📄 SignupPage.tsx
│   │   │   └── 📄 WelcomePage.tsx
│   │   ├── 📁 styles
│   │   │   └── 🎨 global.css
│   │   ├── 📄 App.tsx
│   │   ├── 📄 main.tsx
│   │   └── 📄 vite-env.d.ts
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── ⚙️ tsconfig.json
│   └── 📄 vite.config.ts
├── ⚙️ .gitattributes
├── ⚙️ .gitignore
├── 📝 README.md
└── ⚙️ package-lock.json
```

## Pré-requisitos

- **Java 25** (JDK)
- **Maven** (ou use o `mvnw` incluído no projeto, não requer instalação)
- **Node.js 18+** e **npm**
- **MySQL 8+** rodando localmente ou em um servidor acessível

## Configuração do banco de dados (MySQL)

1. Crie o banco de dados no MySQL:

   ```sql
   CREATE DATABASE demo_spring CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. Configure suas credenciais em: backend\src\main\resources\application.properties


> As tabelas são criadas/atualizadas automaticamente pelo Hibernate na primeira execução (`DB_DDL_AUTO=update`). Não é necessário rodar scripts de schema manualmente em desenvolvimento.

## Rodando o backend

```bash
cd backend
./mvnw spring-boot:run
```

A API sobe por padrão em `http://localhost:8080`.

Para gerar o `.jar` de produção:

```bash
./mvnw clean package
java -jar target/demo-spring-0.0.1-SNAPSHOT.jar
```

> Em produção, defina as variáveis de ambiente diretamente no sistema/orquestrador (Docker, servidor, CI/CD) em vez de usar o arquivo `.env`.

## Rodando o frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend sobe por padrão em `http://localhost:5173` e consome a API em `/api/*` (proxy configurado no Vite / CORS liberado no backend para essa origem).

Build de produção:

```bash
npm run build
```

## Variáveis de ambiente

Definidas em `backend/.env` (veja `backend/.env.example` como modelo):

| Variável       | Descrição                                              | Padrão         |
|----------------|----------------------------------------------------------|----------------|
| `DB_HOST`      | Host do servidor MySQL                                   | `localhost`    |
| `DB_PORT`      | Porta do MySQL                                            | `3306`         |
| `DB_NAME`      | Nome do banco de dados                                    | `demo_spring`  |
| `DB_USERNAME`  | Usuário do MySQL                                           | `root`         |
| `DB_PASSWORD`  | Senha do MySQL                                             | *(vazio)*      |
| `DB_DDL_AUTO`  | Estratégia do Hibernate (`update`, `validate`, `none`)     | `update`       |
| `DB_SHOW_SQL`  | Exibir as queries SQL geradas no console                  | `false`        |
| `SERVER_PORT`  | Porta em que o backend sobe                                | `8080`         |

O arquivo `.env` **não deve ser commitado** (já está no `.gitignore`). Use o `.env.example` como referência para novos ambientes.

## Endpoints da API

Todos os endpoints abaixo são prefixados com `/api`.

| Método | Endpoint         | Descrição                                  | Autenticação |
|--------|------------------|---------------------------------------------|--------------|
| POST   | `/auth/signup`   | Cria um novo usuário e inicia a sessão       | Não          |
| POST   | `/auth/login`    | Autentica um usuário existente               | Não          |
| POST   | `/auth/logout`   | Encerra a sessão atual                       | Sim          |
| GET    | `/auth/me`       | Retorna o usuário autenticado                | Sim          |
| GET    | `/dashboard`     | Retorna dados de estatísticas do dashboard   | Sim          |

A autenticação é baseada em **sessão** (cookie de sessão HTTP), não em token JWT. O frontend envia `credentials: "include"` em todas as requisições.

## Segurança

- Senhas são armazenadas com hash **BCrypt** (`BCryptPasswordEncoder`).
- CSRF está desabilitado (API stateless consumida por SPA); ajuste conforme a necessidade do seu ambiente de produção.
- CORS está liberado apenas para `http://localhost:5173` — atualize `SecurityConfig.java` para incluir a origem do seu domínio em produção.

## Testes

```bash
cd backend
./mvnw test
```

---

### Desenvolvido por:

Diego Tamiozzo.
