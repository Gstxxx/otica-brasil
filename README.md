# Ótica Brasil

Sistema completo de gerenciamento para ótica, desenvolvido com Next.js 15, TypeScript, Prisma e PostgreSQL.

## 🚀 Funcionalidades

- **Autenticação Segura**: Sistema de login/registro com bcrypt e JWT
- **Gestão de Pedidos**: Criação e acompanhamento de pedidos de lentes
- **Dashboard Admin**: Interface administrativa para gestão
- **Área do Cliente**: Portal para clientes acompanharem seus pedidos
- **Upload de Arquivos**: Sistema para envio de receitas e documentos

## 📚 Documentação

Consulte nossa [documentação completa](./docs/README.md) para:

- [Sistema de Autenticação](./docs/AUTHENTICATION.md)
- Guias de desenvolvimento
- Configuração de ambiente
- Deploy e produção

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Banco de Dados**: PostgreSQL
- **Autenticação**: bcrypt, JWT
- **Validação**: Zod
- **Formulários**: React Hook Form

## 🚀 Getting Started

### Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

### Instalação

1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd otica-brasil
```

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente

```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Configure o banco de dados

```bash
npx prisma db push
npm run db:seed
```

5. Execute o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o resultado.

## 📋 Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run lint         # Verificar código

# Banco de dados
npm run db:generate  # Gerar cliente Prisma
npm run db:push      # Sincronizar schema
npm run db:seed      # Executar seed
npm run db:studio    # Abrir Prisma Studio

# Deploy
npm run start        # Servidor de produção
```

## 👥 Usuários de Teste

| Tipo    | Email               | Senha        | Acesso          |
| ------- | ------------------- | ------------ | --------------- |
| Admin   | `admin@otica.com`   | `admin123`   | Dashboard       |
| Cliente | `cliente@teste.com` | `cliente123` | Área do Cliente |

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**Desenvolvido com ❤️ para Ótica Brasil**
