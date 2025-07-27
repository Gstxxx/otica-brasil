# Documentação da API - Ótica Brasil

Esta documentação descreve todos os endpoints da API do sistema Ótica Brasil.

## 📋 Informações Gerais

- **Base URL**: `http://localhost:3000/api` (desenvolvimento)
- **Content-Type**: `application/json`
- **Autenticação**: JWT via cookies (httpOnly)
- **Validação**: Todos os endpoints usam Zod para validação

## 🔐 Autenticação

### POST `/api/auth/login`

Realiza o login do usuário.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "ADMIN" | "CUSTOMER",
      "customer": {
        "id": "string",
        "phone": "string",
        "address": "string",
        "cep": "string",
        "city": "string",
        "state": "string"
      },
      "admin": {
        "id": "string"
      }
    },
    "message": "Login realizado com sucesso"
  }
}
```

**Response (400):**

```json
{
  "success": false,
  "errors": ["Email ou senha inválidos"],
  "message": "Dados de entrada inválidos"
}
```

---

### POST `/api/auth/register`

Registra um novo usuário.

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "phone": "string?",
  "address": "string?"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "CUSTOMER",
      "customer": {
        "id": "string",
        "phone": "string",
        "address": "string"
      }
    },
    "message": "Usuário registrado com sucesso"
  }
}
```

**Response (400):**

```json
{
  "success": false,
  "errors": ["Email já está em uso", "Senhas não coincidem"],
  "message": "Dados de entrada inválidos"
}
```

---

### POST `/api/auth/change-password`

Altera a senha do usuário autenticado.

**Headers:** Requer autenticação

**Request Body:**

```json
{
  "currentPassword": "string",
  "newPassword": "string",
  "confirmNewPassword": "string"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": null,
  "message": "Senha alterada com sucesso"
}
```

**Response (400):**

```json
{
  "success": false,
  "errors": ["Senha atual incorreta"],
  "message": "Dados de entrada inválidos"
}
```

---

### POST `/api/auth/logout`

Realiza o logout do usuário.

**Headers:** Requer autenticação

**Response (200):**

```json
{
  "success": true,
  "data": null,
  "message": "Logout realizado com sucesso"
}
```

---

### POST `/api/auth/refresh`

Renova o token de acesso.

**Headers:** Requer refresh token válido

**Response (200):**

```json
{
  "success": true,
  "data": {
    "accessToken": "string"
  },
  "message": "Token renovado com sucesso"
}
```

---

### GET `/api/auth/me`

Obtém informações do usuário autenticado.

**Headers:** Requer autenticação

**Response (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "ADMIN" | "CUSTOMER",
      "customer": {
        "id": "string",
        "phone": "string",
        "address": "string",
        "cep": "string",
        "city": "string",
        "state": "string",
        "birthDate": "string?"
      },
      "admin": {
        "id": "string"
      }
    }
  }
}
```

## 📦 Pedidos e Produtos

### GET `/api/lens-types`

Lista todos os tipos de lentes disponíveis.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "lensTypes": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "basePrice": "string",
        "isActive": true,
        "createdAt": "string",
        "updatedAt": "string"
      }
    ]
  }
}
```

---

### POST `/api/orders`

Cria um novo pedido (requer autenticação).

**Headers:** Requer autenticação

**Request Body:**

```json
{
  "customerId": "string",
  "lensTypeIds": ["string"],
  "notes": "string?"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "order": {
      "id": "string",
      "customerId": "string",
      "status": "PENDING",
      "totalAmount": "string",
      "notes": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "customer": {
        "id": "string",
        "user": {
          "id": "string",
          "name": "string",
          "email": "string"
        }
      },
      "orderItems": [
        {
          "id": "string",
          "lensTypeId": "string",
          "quantity": 1,
          "price": "string",
          "lensType": {
            "id": "string",
            "name": "string",
            "basePrice": "string"
          }
        }
      ],
      "tracking": [
        {
          "id": "string",
          "status": "ORDER_PLACED",
          "description": "string",
          "createdAt": "string"
        }
      ]
    }
  },
  "message": "Pedido criado com sucesso"
}
```

---

### GET `/api/orders`

Lista pedidos com filtros opcionais.

**Query Parameters:**

- `status` (opcional): Status do pedido
- `customerId` (opcional): ID do cliente
- `page` (opcional): Página (padrão: 1)
- `limit` (opcional): Limite por página (padrão: 10)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "string",
        "customerId": "string",
        "status": "PENDING",
        "totalAmount": "string",
        "notes": "string",
        "createdAt": "string",
        "updatedAt": "string",
        "customer": {
          "id": "string",
          "user": {
            "id": "string",
            "name": "string",
            "email": "string"
          }
        },
        "orderItems": [
          {
            "id": "string",
            "lensTypeId": "string",
            "quantity": 1,
            "price": "string",
            "lensType": {
              "id": "string",
              "name": "string",
              "basePrice": "string"
            }
          }
        ],
        "tracking": [
          {
            "id": "string",
            "status": "ORDER_PLACED",
            "description": "string",
            "createdAt": "string"
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

## 🛒 Pedidos Completos

### POST `/api/complete-order`

Cria um pedido completo incluindo registro do cliente.

**Request Body:**

```json
{
  "customer": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "cep": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "birthDate": "string?"
  },
  "selectedLenses": ["string"],
  "files": {
    "glassesPhoto": "File?",
    "prescriptionPhoto": "File?",
    "identityDocument": "File?"
  }
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "order": {
      "id": "string",
      "customerId": "string",
      "status": "PENDING",
      "totalAmount": "string",
      "notes": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "customer": {
        "id": "string",
        "user": {
          "id": "string",
          "name": "string",
          "email": "string"
        }
      },
      "orderItems": [
        {
          "id": "string",
          "lensTypeId": "string",
          "quantity": 1,
          "price": "string",
          "lensType": {
            "id": "string",
            "name": "string",
            "basePrice": "string"
          }
        }
      ],
      "tracking": [
        {
          "id": "string",
          "status": "ORDER_PLACED",
          "description": "string",
          "createdAt": "string"
        }
      ],
      "attachments": [
        {
          "id": "string",
          "type": "GLASSES_PHOTO",
          "fileName": "string",
          "fileUrl": "string",
          "fileSize": 12345,
          "mimeType": "image/jpeg"
        }
      ]
    },
    "tempPassword": "string"
  },
  "message": "Pedido criado com sucesso! Use a senha temporária fornecida para fazer login."
}
```

## 📊 Códigos de Status HTTP

| Código | Descrição                            |
| ------ | ------------------------------------ |
| 200    | Sucesso                              |
| 400    | Dados inválidos ou erro de validação |
| 401    | Não autenticado                      |
| 403    | Não autorizado                       |
| 404    | Recurso não encontrado               |
| 500    | Erro interno do servidor             |

## 🔒 Autenticação e Autorização

### Rotas Públicas

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/refresh`
- `GET /api/lens-types`
- `POST /api/complete-order`

### Rotas Protegidas

- `POST /api/auth/change-password`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/orders`
- `GET /api/orders`

### Rotas de Admin

- Dashboard (interface)
- Gerenciamento de pedidos (interface)

## 📝 Validações

### Schemas de Validação

**Login:**

```typescript
{
  email: string (email válido)
  password: string (mínimo 6 caracteres)
}
```

**Registro:**

```typescript
{
  name: string (mínimo 2 caracteres)
  email: string (email válido)
  password: string (mínimo 6 caracteres)
  confirmPassword: string (deve ser igual a password)
  phone: string? (opcional)
  address: string? (opcional)
}
```

**Alteração de Senha:**

```typescript
{
  currentPassword: string (obrigatório)
  newPassword: string (mínimo 6 caracteres)
  confirmNewPassword: string (deve ser igual a newPassword)
}
```

**Pedido:**

```typescript
{
  customerId: string (CUID válido)
  lensTypeIds: string[] (mínimo 1 item)
  notes: string? (opcional)
}
```

**Cliente Completo:**

```typescript
{
  name: string (mínimo 2 caracteres)
  email: string (email válido)
  phone: string (mínimo 10 dígitos)
  cep: string (mínimo 8 dígitos)
  address: string (mínimo 5 caracteres)
  city: string (mínimo 2 caracteres)
  state: string (mínimo 2 caracteres)
  birthDate: string? (opcional)
}
```

## 🚀 Exemplos de Uso

### Login de Usuário

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@otica.com",
    "password": "admin123"
  }'
```

### Criar Pedido Completo

```bash
curl -X POST http://localhost:3000/api/complete-order \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "João Silva",
      "email": "joao@email.com",
      "phone": "(11) 99999-9999",
      "cep": "01234-567",
      "address": "Rua das Flores, 123",
      "city": "São Paulo",
      "state": "SP"
    },
    "selectedLenses": ["lens_type_id_1", "lens_type_id_2"]
  }'
```

### Listar Pedidos

```bash
curl -X GET "http://localhost:3000/api/orders?status=PENDING&page=1&limit=10" \
  -H "Cookie: access_token=your_token_here"
```

## 📚 Recursos Adicionais

- [Sistema de Autenticação](./AUTHENTICATION.md)
- [Guia de Desenvolvimento](./README.md)
- [Configuração de Ambiente](./README.md#getting-started)

---

**Última atualização**: Janeiro 2025
