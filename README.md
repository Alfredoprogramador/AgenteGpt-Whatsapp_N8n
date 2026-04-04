# ShopBot – E-commerce com Chatbot IA (n8n + Next.js + GPT-4o)

> Loja online completa com assistente virtual inteligente integrado, orquestrado pelo **n8n** e alimentado pelo **GPT-4o**.

---

## 📋 Visão Geral

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Chatbot Backend | n8n (workflow de automação) |
| IA | OpenAI GPT-4o |
| Banco de Dados | Supabase (PostgreSQL) |
| Pagamentos | Stripe Checkout |
| Deploy | Docker Compose / Vercel + Railway |

### Funcionalidades

- 🛍️ **Catálogo de produtos** com busca, filtros e ordenação
- 🛒 **Carrinho de compras** persistente (localStorage)
- 💳 **Checkout seguro** via Stripe
- 📦 **Rastreamento de pedidos** por e-mail
- 🤖 **Chatbot IA "Bia"** – flutuante no canto inferior direito
  - Busca produtos no catálogo
  - Consulta status de pedidos
  - Responde dúvidas sobre frete, trocas, pagamento
  - Memória de sessão por usuário
- 📱 **WhatsApp** – reutiliza o mesmo workflow n8n

---

## 🚀 Início Rápido (Docker Compose)

### 1. Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e Docker Compose
- Conta [Supabase](https://supabase.com) (gratuita)
- Conta [Stripe](https://stripe.com) (gratuita para testes)
- Chave [OpenAI API](https://platform.openai.com)

### 2. Clone e configure

```bash
git clone https://github.com/Alfredoprogramador/AgenteGpt-Whatsapp_N8n.git
cd AgenteGpt-Whatsapp_N8n

# Copie e edite as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com seus valores reais
```

### 3. Configure o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Vá em **SQL Editor** e execute o arquivo `supabase/schema.sql`
3. Copie a **URL do projeto** e a **anon key** para o `.env`

### 4. Suba os containers

```bash
docker compose up -d
```

- **Frontend:** http://localhost:3000
- **n8n:** http://localhost:5678

### 5. Configure o workflow n8n

1. Acesse http://localhost:5678 (usuário/senha do `.env`)
2. Vá em **Settings → Credentials → New**:
   - Adicione credencial **OpenAI API** com sua chave
3. Vá em **Workflows → Import from File**
4. Importe o arquivo `n8n/shopbot-workflow.json`
5. **Ative** o workflow clicando no toggle
6. Copie a URL do webhook (ex: `http://localhost:5678/webhook/chat`)
7. Coloque em `N8N_CHAT_WEBHOOK_URL` no `.env` do ecommerce

---

## 🏗️ Desenvolvimento Local (sem Docker)

### Next.js

```bash
cd ecommerce
npm install
cp .env.example .env.local
# Edite .env.local com seus valores
npm run dev
# http://localhost:3000
```

### n8n

```bash
# Instale globalmente (requer Node.js 18+)
npm install -g n8n

# Defina a variável da API OpenAI
export OPENAI_API_KEY=sk-...
export APP_URL=http://localhost:3000

n8n start
# http://localhost:5678
```

---

## 📁 Estrutura do Projeto

```
├── ecommerce/                  # Next.js App
│   ├── app/
│   │   ├── page.tsx            # Home / Landing page
│   │   ├── products/
│   │   │   ├── page.tsx        # Listagem de produtos
│   │   │   └── [id]/page.tsx   # Detalhe do produto
│   │   ├── cart/page.tsx       # Carrinho
│   │   ├── checkout/page.tsx   # Checkout
│   │   ├── orders/page.tsx     # Meus pedidos
│   │   └── api/
│   │       ├── products/       # GET /api/products
│   │       ├── orders/         # GET,POST /api/orders
│   │       ├── chat/           # POST /api/chat → n8n proxy
│   │       └── webhooks/stripe # POST /api/webhooks/stripe
│   ├── components/
│   │   ├── CartContext.tsx      # Estado global do carrinho
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   └── ChatWidget.tsx      # Widget de chat flutuante
│   └── lib/
│       ├── supabase.ts          # Cliente Supabase + tipos
│       ├── stripe.ts            # Cliente Stripe
│       └── mockData.ts          # Produtos de exemplo (MVP)
├── n8n/
│   └── shopbot-workflow.json   # Workflow n8n exportado
├── supabase/
│   └── schema.sql              # Schema do banco + dados de exemplo
├── docker-compose.yml
└── .env.example
```

---

## 🤖 Como o Chatbot Funciona

```
Usuário digita no widget
        ↓
POST /api/chat (Next.js)
        ↓
POST http://n8n:5678/webhook/chat
        ↓
┌─────────────────────────────────────┐
│  n8n Workflow                        │
│                                     │
│  Extrair mensagem + sessionId       │
│           ↓                         │
│  Agente IA "Bia" (GPT-4o)           │
│  + Memória de sessão                │
│  + Ferramenta: buscar_produtos      │  → GET /api/products?search=...
│  + Ferramenta: consultar_pedido     │  → GET /api/orders?email=...
│           ↓                         │
│  Gerar resposta                     │
└─────────────────────────────────────┘
        ↓
{ response: "..." }
        ↓
Exibido no widget do usuário
```

---

## 💳 Fluxo de Pagamento (Stripe)

```
Checkout page → POST /api/orders
     → Cria Stripe Checkout Session
     → Redireciona para stripe.com
     → Usuário paga
     → Stripe envia webhook POST /api/webhooks/stripe
     → Status do pedido atualizado para "paid"
     → Usuário redirecionado para /orders
```

Para testar localmente use o [Stripe CLI](https://stripe.com/docs/stripe-cli):
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 🌐 Deploy em Produção

### Opção A: Vercel (frontend) + Railway (n8n)

1. **Frontend (Vercel):**
   ```bash
   cd ecommerce
   npx vercel --prod
   ```
   Configure as variáveis de ambiente no painel da Vercel.

2. **n8n (Railway):**
   - Crie um projeto no [Railway](https://railway.app)
   - Deploy da imagem `n8nio/n8n:latest`
   - Configure as variáveis de ambiente
   - Atualize `N8N_CHAT_WEBHOOK_URL` no frontend

### Opção B: VPS (Docker Compose)

```bash
# No servidor (Ubuntu/Debian)
git clone ... && cd AgenteGpt-Whatsapp_N8n
cp .env.example .env && nano .env   # Configure variáveis reais
docker compose up -d

# Configure Nginx como reverse proxy para as portas 3000 e 5678
```

---

## 📱 Integração WhatsApp

O n8n já possui suporte nativo ao WhatsApp via **Evolution API** ou **Baileys**. Para integrar:

1. Configure um nó **WhatsApp Trigger** no n8n
2. Conecte ao mesmo agente GPT-4o
3. As ferramentas de busca de produtos e pedidos funcionam automaticamente nos dois canais

---

## 🔧 Variáveis de Ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service role (servidor apenas) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Chave pública Stripe |
| `STRIPE_SECRET_KEY` | Chave secreta Stripe |
| `STRIPE_WEBHOOK_SECRET` | Secret do webhook Stripe |
| `N8N_CHAT_WEBHOOK_URL` | URL do webhook n8n (ex: `http://n8n:5678/webhook/chat`) |
| `OPENAI_API_KEY` | Chave da API OpenAI (usada pelo n8n) |
| `NEXT_PUBLIC_APP_URL` | URL pública do frontend |

> **Nota:** Sem `N8N_CHAT_WEBHOOK_URL`, o chatbot usa respostas de fallback baseadas em palavras-chave. O e-commerce funciona normalmente sem n8n.
