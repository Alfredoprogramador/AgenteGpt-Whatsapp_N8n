# Início Rápido - Agente GPT WhatsApp N8n

## 🚀 Setup em 10 Minutos

Este guia vai te ajudar a ter o sistema rodando rapidamente para testes.

---

## Pré-requisitos Checklist

Antes de começar, certifique-se de ter:

- [ ] **Docker** e **Docker Compose** instalados
- [ ] **Conta OpenAI** com API key ([obter aqui](https://platform.openai.com/api-keys))
- [ ] **Conta Meta Business** criada ([criar aqui](https://business.facebook.com))
- [ ] **Git** instalado
- [ ] **Porta 5678** disponível (para N8n)

---

## Passo 1: Clone o Repositório

```bash
git clone https://github.com/Alfredoprogramador/AgenteGpt-Whatsapp_N8n.git
cd AgenteGpt-Whatsapp_N8n
```

---

## Passo 2: Configure Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env
nano .env  # ou use seu editor favorito
```

**Configurações MÍNIMAS necessárias:**

```env
# N8n
N8N_BASIC_AUTH_USER=seu_usuario
N8N_BASIC_AUTH_PASSWORD=sua_senha_segura

# Database
DB_POSTGRESDB_PASSWORD=sua_senha_db_segura

# OpenAI (OBRIGATÓRIO)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Configurações WhatsApp (pode adicionar depois):**

```env
WHATSAPP_PHONE_NUMBER_ID=seu_phone_id
WHATSAPP_ACCESS_TOKEN=seu_access_token
WHATSAPP_VERIFY_TOKEN=seu_verify_token_unico
```

---

## Passo 3: Inicie os Containers

```bash
# Iniciar todos os serviços
docker-compose up -d

# Verificar se está rodando
docker-compose ps
```

**Você deve ver 3 containers:**
- `n8n_whatsapp_gpt` (N8n)
- `postgres_n8n` (PostgreSQL)
- `redis_n8n` (Redis)

---

## Passo 4: Acesse o N8n

1. Abra o navegador: **http://localhost:5678**
2. Login com as credenciais do `.env`:
   - Usuário: `seu_usuario`
   - Senha: `sua_senha_segura`

---

## Passo 5: Configurar Credenciais no N8n

### 5.1 OpenAI Credential

1. No N8n, clique em **"Credentials"** (menu lateral)
2. Clique em **"Add Credential"**
3. Procure por **"OpenAI"**
4. Configure:
   - **Credential Name**: `OpenAI GPT`
   - **API Key**: Cole sua chave da OpenAI
5. Clique em **"Save"**

### 5.2 WhatsApp Credential (HTTP Request)

1. **"Add Credential"** → **"Header Auth"**
2. Configure:
   - **Credential Name**: `WhatsApp Business API`
   - **Name**: `Authorization`
   - **Value**: `Bearer SEU_ACCESS_TOKEN`
3. **"Save"**

---

## Passo 6: Teste Rápido (Sem WhatsApp)

Vamos testar se o GPT está funcionando:

### Criar Workflow de Teste

1. No N8n, clique em **"Workflows"** → **"Add Workflow"**
2. Nome: `Teste GPT`
3. Adicione os seguintes nodes:

**Node 1: Manual Trigger**
- Arraste o node **"Manual Trigger"** para o canvas
- Deixe as configurações padrão

**Node 2: OpenAI**
- Arraste o node **"OpenAI"**
- Configure:
  - **Credential**: Selecione `OpenAI GPT`
  - **Resource**: `Chat`
  - **Operation**: `Message Model`
  - **Model**: `gpt-3.5-turbo`
  - **Messages** → **Add Message**:
    - **Role**: `User`
    - **Message**: `Olá! Você está funcionando?`

**Node 3: Set (para ver resultado)**
- Adicione node **"Set"**
- Configure para mostrar a resposta

**Conecte os nodes**: Manual Trigger → OpenAI → Set

### Execute o Teste

1. Clique em **"Execute Workflow"**
2. Você deve ver a resposta do GPT!

✅ **Se funcionou, o GPT está conectado corretamente!**

---

## Passo 7: Configurar WhatsApp (Opcional, mas necessário para produção)

### 7.1 Criar App no Meta Developers

1. Acesse [Meta Developers](https://developers.facebook.com/)
2. **"My Apps"** → **"Create App"**
3. Tipo: **"Business"**
4. Preencha informações básicas
5. **"Add Product"** → **"WhatsApp"**

### 7.2 Obter Credenciais

No painel do WhatsApp:

1. **Phone Number ID**: Copie o ID do número de telefone
2. **Access Token**: 
   - Vá em **"Configuration"**
   - Gere um **Token Permanente**
   - Copie e guarde com segurança
3. **Verify Token**: Crie um token único (ex: `meu_token_123456`)

### 7.3 Configurar Webhook

1. No Meta Developers → WhatsApp → **"Configuration"**
2. **Webhook**:
   - **Callback URL**: `https://seu-dominio.com/webhook-test/whatsapp`
   - **Verify Token**: O token que você criou
3. **Subscribe to**: `messages`

⚠️ **Nota**: Para webhook funcionar, você precisa de:
- Domínio público (não localhost)
- HTTPS/SSL configurado

**Para testes locais, use ngrok:**

```bash
# Instalar ngrok
brew install ngrok  # Mac
# ou baixe de https://ngrok.com/

# Criar túnel
ngrok http 5678

# Use a URL fornecida (ex: https://abc123.ngrok.io)
```

---

## Passo 8: Importar Workflow WhatsApp Básico

1. No N8n, **"Workflows"** → **"Import from File"**
2. Use um dos workflows em `/workflows` (quando disponíveis)
3. Ou crie manualmente seguindo [IMPLEMENTACAO.md](IMPLEMENTACAO.md)

---

## 🎉 Pronto! O que fazer agora?

### ✅ Sistema está rodando

**Próximos passos:**

1. **Ler documentação completa**: [FUNDAMENTOS.md](FUNDAMENTOS.md)
2. **Seguir implementação detalhada**: [IMPLEMENTACAO.md](IMPLEMENTACAO.md)
3. **Configurar workflows avançados**
4. **Personalizar prompts do GPT**
5. **Integrar com seu CRM/sistemas**

### 🔧 Comandos Úteis

```bash
# Ver logs do N8n
docker-compose logs -f n8n

# Reiniciar serviços
docker-compose restart

# Parar tudo
docker-compose down

# Parar e remover volumes (CUIDADO: apaga dados)
docker-compose down -v

# Backup do banco de dados
docker exec postgres_n8n pg_dump -U n8n n8n_db > backup_$(date +%Y%m%d).sql

# Restaurar backup
docker exec -i postgres_n8n psql -U n8n n8n_db < backup.sql
```

---

## 🆘 Problemas Comuns

### Erro: "Port 5678 already in use"

```bash
# Verificar o que está usando a porta
lsof -i :5678

# Mudar a porta no docker-compose.yml
ports:
  - "5679:5678"  # Agora acesse em localhost:5679
```

### Erro: "Cannot connect to database"

```bash
# Verificar se postgres está rodando
docker-compose ps postgres

# Ver logs do postgres
docker-compose logs postgres

# Reiniciar postgres
docker-compose restart postgres
```

### Erro: "OpenAI API key invalid"

- Verifique se copiou a chave completa
- Confirme que tem créditos na conta OpenAI
- Gere uma nova chave se necessário

### N8n não carrega

```bash
# Limpar e reiniciar
docker-compose down
docker-compose up -d

# Ver logs para detectar erro
docker-compose logs n8n
```

---

## 📊 Verificar se Tudo Está OK

### Checklist de Saúde do Sistema

```bash
# 1. Containers rodando
docker-compose ps
# Todos devem estar "Up"

# 2. N8n acessível
curl http://localhost:5678
# Deve retornar HTML

# 3. Database conectado
docker exec postgres_n8n psql -U n8n -d n8n_db -c "SELECT COUNT(*) FROM users;"
# Deve retornar 0 (ou número de usuários)

# 4. Redis funcionando
docker exec redis_n8n redis-cli ping
# Deve retornar "PONG"
```

---

## 🎓 Aprendendo Mais

### Tutoriais Recomendados

1. **N8n Basics**: [n8n.io/workflows](https://n8n.io/workflows)
2. **OpenAI API Docs**: [platform.openai.com/docs](https://platform.openai.com/docs)
3. **WhatsApp Business API**: [developers.facebook.com/docs/whatsapp](https://developers.facebook.com/docs/whatsapp)

### Workflows de Exemplo

Explore workflows prontos em:
- [N8n Community](https://n8n.io/workflows)
- [GitHub N8n Workflows](https://github.com/n8n-io/n8n/tree/master/packages/cli/templates)

---

## 💡 Dicas Importantes

1. **Começar Simples**: MVP primeiro, depois adiciona features
2. **Testar Muito**: Use o Manual Trigger para testar cada node
3. **Logs São Seus Amigos**: Sempre verifique logs quando algo falhar
4. **Backup Regular**: Configure backup automático do banco
5. **Segurança**: Nunca commite `.env` com credenciais reais

---

## 🚀 Próximos Níveis

### Nível Intermediário
- [ ] Criar workflow completo WhatsApp
- [ ] Implementar sistema de contexto
- [ ] Adicionar templates de mensagens
- [ ] Configurar transferência para humano

### Nível Avançado
- [ ] Integrar com CRM
- [ ] Dashboard de analytics
- [ ] Fine-tuning do GPT
- [ ] Sistema de A/B testing

---

## 📞 Precisa de Ajuda?

- **Issues**: [GitHub Issues](https://github.com/Alfredoprogramador/AgenteGpt-Whatsapp_N8n/issues)
- **Documentação**: Veja os arquivos `.md` neste repositório
- **Comunidade N8n**: [community.n8n.io](https://community.n8n.io)

---

**Última atualização**: Dezembro 2024

**Próximo passo recomendado**: Ler [IMPLEMENTACAO.md](IMPLEMENTACAO.md) para entender o fluxo completo
