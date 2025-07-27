# Sistema de Autenticação - Ótica Brasil

## Visão Geral

O sistema de autenticação foi implementado com validação de senha real usando **bcrypt** para garantir a segurança das credenciais dos usuários.

## Funcionalidades Implementadas

### 1. **Login** (`/api/auth/login`)

- Validação de email e senha usando bcrypt
- Geração de tokens JWT (access e refresh)
- Redirecionamento baseado no papel do usuário (ADMIN/CUSTOMER)

### 2. **Registro** (`/api/auth/register`)

- Criação de novos usuários com senha hasheada
- Validação de email único
- Criação automática de perfil de cliente

### 3. **Alteração de Senha** (`/api/auth/change-password`)

- Verificação da senha atual
- Hash da nova senha com bcrypt
- Requer autenticação

### 4. **Logout** (`/api/auth/logout`)

- Invalidação de cookies de autenticação
- Redirecionamento para página inicial

### 5. **Refresh Token** (`/api/auth/refresh`)

- Renovação automática de tokens
- Manutenção da sessão do usuário

## Usuários de Teste

### Admin

- **Email**: `admin@otica.com`
- **Senha**: `admin123`
- **Acesso**: Dashboard administrativo

### Cliente

- **Email**: `cliente@teste.com`
- **Senha**: `cliente123`
- **Acesso**: Área do cliente

### Cliente de Teste (via API)

- **Email**: `teste@otica.com`
- **Senha**: `teste123`

## Configuração de Segurança

### Hash de Senha

- **Algoritmo**: bcrypt
- **Salt Rounds**: 12 (recomendado para produção)
- **Tempo de processamento**: ~250ms por hash

### Tokens JWT

- **Access Token**: 15 minutos
- **Refresh Token**: 7 dias
- **Algoritmo**: HS256

## Endpoints da API

### Autenticação

```typescript
POST /api/auth/login
{
  "email": "string",
  "password": "string"
}

POST /api/auth/register
{
  "name": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "phone": "string?",
  "address": "string?"
}

POST /api/auth/change-password
{
  "currentPassword": "string",
  "newPassword": "string",
  "confirmNewPassword": "string"
}

POST /api/auth/logout

POST /api/auth/refresh

GET /api/auth/me
```

### Pedidos

```typescript
POST / api / complete - order;
// Cria usuário automaticamente com senha temporária
// Retorna senha temporária na resposta
```

## Fluxo de Autenticação

1. **Login/Registro**: Usuário fornece credenciais
2. **Validação**: bcrypt verifica a senha
3. **Tokens**: Sistema gera access e refresh tokens
4. **Cookies**: Tokens são armazenados em cookies seguros
5. **Middleware**: Verifica autenticação em rotas protegidas
6. **Refresh**: Renovação automática de tokens

## Segurança

### Medidas Implementadas

- ✅ Senhas hasheadas com bcrypt
- ✅ Tokens JWT com expiração
- ✅ Cookies seguros (httpOnly, secure)
- ✅ Validação de entrada com Zod
- ✅ Middleware de autenticação
- ✅ Refresh tokens para sessões longas

### Boas Práticas

- Senhas mínimas de 6 caracteres
- Validação de email único
- Mensagens de erro genéricas (não revelam se email existe)
- Rate limiting recomendado para produção
- Logs de auditoria recomendados

## Desenvolvimento

### Comandos Úteis

```bash
# Reset do banco e seed
npx prisma migrate reset --force
npm run db:seed

# Gerar cliente Prisma
npx prisma generate

# Studio do banco
npm run db:studio
```

### Variáveis de Ambiente

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="seu-secret-muito-seguro"
JWT_REFRESH_SECRET="seu-refresh-secret-muito-seguro"
```

## Próximos Passos

1. **Rate Limiting**: Implementar limitação de tentativas de login
2. **2FA**: Autenticação de dois fatores
3. **Auditoria**: Logs de tentativas de login
4. **Recuperação**: Sistema de recuperação de senha
5. **Sessões**: Gerenciamento de sessões ativas
