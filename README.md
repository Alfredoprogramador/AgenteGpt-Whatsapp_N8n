# 🤖 Agente GPT para WhatsApp com N8n

[![License](https://img.shields.io/badge/License-EPL%202.0-blue.svg)](LICENSE)
[![N8n](https://img.shields.io/badge/N8n-Workflow%20Automation-orange.svg)](https://n8n.io)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green.svg)](https://openai.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Business%20API-25D366.svg)](https://business.whatsapp.com)

> Agente de Inteligência Artificial baseado em GPT, integrado ao WhatsApp através da plataforma N8n para automatização de conversas e atendimento inteligente 24/7.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Características](#características)
- [Documentação](#documentação)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Início Rápido](#início-rápido)
- [Casos de Uso](#casos-de-uso)
- [Custos Estimados](#custos-estimados)
- [Roadmap](#roadmap)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Contato](#contato)

---

## 🎯 Sobre o Projeto

Este projeto fornece uma **solução completa** para implementar um agente conversacional inteligente no WhatsApp, utilizando tecnologias de ponta em IA e automação:

- **GPT-4/GPT-3.5**: Processamento de linguagem natural avançado
- **N8n**: Orquestração visual de workflows sem código
- **WhatsApp Business API**: Comunicação oficial e escalável
- **PostgreSQL**: Persistência de dados e histórico

### 🎁 O Que Este Repositório Oferece

1. **Documentação Completa** de fundamentos, implementação e melhores práticas
2. **Guia Passo a Passo** para configuração e deploy
3. **Estimativas de Tempo** e recursos necessários
4. **Stack Tecnológico** recomendado com justificativas
5. **Orçamento Detalhado** para apresentação ao cliente
6. **Questionário para Cliente** para levantamento de requisitos

---

## ✨ Características

### Core Features

- ✅ **Respostas Inteligentes**: GPT compreende contexto e intenção
- ✅ **Memória Contextual**: Mantém histórico da conversa
- ✅ **24/7 Disponível**: Atendimento automático sem pausas
- ✅ **Escalável**: Suporta centenas de conversas simultâneas
- ✅ **Multimídia**: Suporta texto, imagens, documentos, áudio
- ✅ **Botões Interativos**: Menus e opções do WhatsApp
- ✅ **Transferência Humana**: Escala para atendente quando necessário

### Funcionalidades Avançadas

- 🔄 **Integrações**: CRM, ERP, E-commerce, APIs externas
- 📊 **Analytics**: Dashboard de métricas e relatórios
- 🎨 **Customização**: Personalidade, tom de voz, templates
- 🔒 **Segurança**: Criptografia, LGPD compliance
- 📈 **Machine Learning**: Melhoria contínua baseada em dados
- 🌐 **Multi-idioma**: Suporte a Português BR e outros idiomas

---

## 📚 Documentação

Toda a documentação está organizada em arquivos dedicados:

### 📖 Documentos Principais

| Documento | Descrição | Link |
|-----------|-----------|------|
| **FUNDAMENTOS.md** | Visão geral, arquitetura, requisitos, estratégia | [Ver →](FUNDAMENTOS.md) |
| **IMPLEMENTACAO.md** | Guia passo a passo completo (8 fases) | [Ver →](IMPLEMENTACAO.md) |
| **PERGUNTAS_CLIENTE.md** | Questionário detalhado para levantamento | [Ver →](PERGUNTAS_CLIENTE.md) |
| **ESTIMATIVA_TEMPO.md** | Breakdown de horas, cronograma, cenários | [Ver →](ESTIMATIVA_TEMPO.md) |
| **TECNOLOGIAS.md** | Stack completo, ferramentas, comparações | [Ver →](TECNOLOGIAS.md) |
| **ORCAMENTO.md** | Precificação, modelos de pagamento, ROI | [Ver →](ORCAMENTO.md) |

### 🎓 Para Quem é Cada Documento?

- **Desenvolvedores**: FUNDAMENTOS.md + IMPLEMENTACAO.md + TECNOLOGIAS.md
- **Gestores de Projeto**: ESTIMATIVA_TEMPO.md + ORCAMENTO.md
- **Comercial/Vendas**: PERGUNTAS_CLIENTE.md + ORCAMENTO.md
- **Clientes Técnicos**: FUNDAMENTOS.md + TECNOLOGIAS.md
- **Clientes Não-Técnicos**: README.md (este arquivo) + ORCAMENTO.md

---

## 🛠️ Tecnologias

### Stack Principal

```yaml
Automação:        N8n (Open Source)
Inteligência IA:  OpenAI GPT-4 / GPT-3.5-Turbo
Mensageria:       WhatsApp Business Cloud API
Banco de Dados:   PostgreSQL 14+
Linguagem:        Node.js / TypeScript
Containerização:  Docker + Docker Compose
Web Server:       Nginx
SSL/TLS:          Let's Encrypt
Process Manager:  PM2
Monitoramento:    Prometheus + Grafana (opcional)
```

### Por Que Essas Tecnologias?

- **N8n**: Reduz tempo de desenvolvimento em 60-70%
- **GPT-4**: Estado da arte em compreensão de linguagem
- **WhatsApp Cloud API**: Gratuito, oficial, escalável
- **PostgreSQL**: Confiável, performático, open source
- **Docker**: Facilita deploy e manutenção

[→ Mais detalhes em TECNOLOGIAS.md](TECNOLOGIAS.md)

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                         USUÁRIO                              │
│                      (WhatsApp)                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              WhatsApp Business Cloud API                     │
│              (Meta - Facebook)                               │
└────────────────────────┬────────────────────────────────────┘
                         │ Webhook
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    N8n Workflow Engine                       │
│  ┌───────────┐  ┌───────────┐  ┌─────────────────────┐     │
│  │  Receive  │→ │ Process   │→ │  Call OpenAI GPT    │     │
│  │  Message  │  │ Context   │  │                     │     │
│  └───────────┘  └───────────┘  └─────────────────────┘     │
│                         │                  │                 │
│                         ▼                  ▼                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           PostgreSQL Database                        │   │
│  │  • User profiles  • Conversations  • Metrics         │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                    │
│                         ▼                                    │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐              │
│  │   Send    │  │   Log     │  │  Update   │              │
│  │  Response │  │  Metrics  │  │  Context  │              │
│  └───────────┘  └───────────┘  └───────────┘              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              WhatsApp Business API (Response)                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                         USUÁRIO                              │
│                   (Recebe resposta)                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL 14+ instalado
- Conta Meta Business (para WhatsApp)
- Chave API da OpenAI
- Servidor Linux (Ubuntu recomendado)

### Instalação Rápida (Docker)

```bash
# 1. Clone o repositório
git clone https://github.com/Alfredoprogramador/AgenteGpt-Whatsapp_N8n.git
cd AgenteGpt-Whatsapp_N8n

# 2. Configure variáveis de ambiente
cp .env.example .env
nano .env  # Edite com suas credenciais

# 3. Inicie com Docker Compose
docker-compose up -d

# 4. Acesse N8n
# http://localhost:5678
```

### Configuração Manual

Para configuração detalhada passo a passo, consulte:
[→ IMPLEMENTACAO.md - Seção 1 e 2](IMPLEMENTACAO.md)

---

## 💼 Casos de Uso

### 1. E-commerce 🛒
- Consulta de produtos
- Rastreamento de pedidos
- Suporte pós-venda
- Recomendações personalizadas

### 2. Atendimento ao Cliente 💬
- FAQ automatizado
- Resolução de problemas
- Coleta de feedback
- Escalação para humano

### 3. Agendamento 📅
- Marcar consultas/reuniões
- Confirmações automáticas
- Lembretes
- Reagendamentos

### 4. Suporte Técnico 🔧
- Troubleshooting guiado
- Base de conhecimento
- Abertura de tickets
- Status de chamados

### 5. Vendas e Marketing 📈
- Qualificação de leads
- Apresentação de serviços
- Envio de propostas
- Follow-up automatizado

[→ Mais casos de uso em FUNDAMENTOS.md](FUNDAMENTOS.md)

---

## 💰 Custos Estimados

### Investimento Inicial

| Modelo | Investimento | Prazo | Ideal Para |
|--------|--------------|-------|------------|
| **MVP** | R$ 8.000 - R$ 12.000 | 3-4 semanas | Startups, validação |
| **Profissional** ⭐ | R$ 15.000 - R$ 22.000 | 5-6 semanas | PMEs estabelecidas |
| **Enterprise** | R$ 28.000 - R$ 35.000 | 7-8 semanas | Grandes empresas |

### Custos Mensais (Operação)

```
Infraestrutura: R$ 100 - R$ 400/mês
WhatsApp API:   R$ 0 - R$ 500/mês (primeiras 1000 conversas grátis)
OpenAI API:     R$ 50 - R$ 1.000/mês (depende do volume)
Manutenção:     R$ 800 - R$ 3.000/mês (opcional)

TOTAL: R$ 150 - R$ 4.900/mês
```

### ROI (Retorno sobre Investimento)

**Exemplo para e-commerce médio:**
- Investimento: R$ 18.000 (setup) + R$ 2.200/mês
- Economia com atendentes: 2-3 funcionários = R$ 8.000/mês
- **Payback: 3-4 meses**
- **Economia anual: ~R$ 70.000**

[→ Detalhes completos em ORCAMENTO.md](ORCAMENTO.md)

---

## 🗓️ Roadmap

### ✅ Fase 1: Fundação (Concluída)
- [x] Documentação completa
- [x] Arquitetura definida
- [x] Stack tecnológico escolhido

### 🔄 Fase 2: Implementação Base (Em Planejamento)
- [ ] Workflows N8n básicos
- [ ] Integração WhatsApp + GPT
- [ ] Banco de dados PostgreSQL
- [ ] Deploy Docker

### 📅 Fase 3: Funcionalidades Avançadas
- [ ] Suporte a mídia
- [ ] Botões interativos
- [ ] Sistema de transferência
- [ ] Dashboard analytics

### 🔮 Fase 4: Evolução
- [ ] Fine-tuning de modelos
- [ ] Integrações múltiplas
- [ ] Machine Learning avançado
- [ ] Multi-canal (Telegram, Instagram)

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Este projeto é open source.

### Como Contribuir

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. **Push** para a branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

### Áreas que Precisam de Ajuda

- 📝 Tradução da documentação (EN, ES)
- 🧪 Testes e validação
- 🎨 Templates de workflows N8n
- 🔌 Novas integrações
- 📊 Dashboards e analytics

---

## 📄 Licença

Este projeto está sob a licença **Eclipse Public License 2.0**.

Isso significa que você pode:
- ✅ Usar comercialmente
- ✅ Modificar
- ✅ Distribuir
- ✅ Uso privado

Desde que:
- ℹ️ Inclua a licença e copyright
- ℹ️ Declare mudanças feitas

[Ver licença completa](LICENSE)

---

## 📞 Contato e Suporte

### 👨‍💻 Autor
**Alfredo Programador**
- GitHub: [@Alfredoprogramador](https://github.com/Alfredoprogramador)

### 💬 Comunidade
- **Issues**: Para bugs e sugestões
- **Discussions**: Para perguntas e discussões

### 🆘 Precisa de Ajuda?

1. Consulte a [Documentação](FUNDAMENTOS.md)
2. Veja as [Issues](https://github.com/Alfredoprogramador/AgenteGpt-Whatsapp_N8n/issues)
3. Abra uma nova Issue
4. Para projetos comerciais, veja [ORCAMENTO.md](ORCAMENTO.md)

---

## 🌟 Agradecimentos

- **N8n Team** - Pela incrível plataforma de automação
- **OpenAI** - Pelo GPT revolucionário
- **Meta** - Pela WhatsApp Business API
- **Comunidade Open Source** - Por todas as ferramentas utilizadas

---

## 📊 Status do Projeto

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow.svg)
![Versão](https://img.shields.io/badge/Vers%C3%A3o-1.0.0-blue.svg)
![Contribuidores](https://img.shields.io/badge/Contribuidores-1-green.svg)

**Última atualização:** Dezembro 2024

---

<div align="center">

**Se este projeto foi útil para você, considere dar uma ⭐!**

[⬆ Voltar ao topo](#-agente-gpt-para-whatsapp-com-n8n)

</div>
