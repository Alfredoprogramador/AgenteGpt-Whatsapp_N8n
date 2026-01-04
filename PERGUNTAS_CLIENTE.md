# Perguntas para o Cliente - Projeto Agente GPT WhatsApp

## Objetivo
Este questionário visa coletar informações essenciais para personalizar e implementar o agente GPT para WhatsApp de acordo com suas necessidades específicas.

---

## 1. INFORMAÇÕES DO NEGÓCIO

### 1.1 Sobre a Empresa
- **Qual é o nome da sua empresa?**
- **Qual é o segmento/ramo de atividade?**
  - [ ] E-commerce
  - [ ] Serviços
  - [ ] Saúde
  - [ ] Educação
  - [ ] Financeiro
  - [ ] Outro: ___________

- **Qual o porte da empresa?**
  - [ ] Microempresa (até 10 funcionários)
  - [ ] Pequena empresa (10-50 funcionários)
  - [ ] Média empresa (50-250 funcionários)
  - [ ] Grande empresa (250+ funcionários)

- **Quantos clientes/usuários vocês atendem mensalmente?**
  - [ ] Menos de 100
  - [ ] 100-500
  - [ ] 500-2.000
  - [ ] 2.000-10.000
  - [ ] Mais de 10.000

### 1.2 Público-Alvo
- **Quem são seus principais clientes/usuários?**
  - Faixa etária predominante: ___________
  - Localização geográfica: ___________
  - Perfil (B2B/B2C): ___________

- **Qual o nível de familiaridade do seu público com tecnologia?**
  - [ ] Baixo (preferem atendimento simples e direto)
  - [ ] Médio (confortáveis com chatbots básicos)
  - [ ] Alto (esperam recursos avançados)

---

## 2. OBJETIVOS E CASOS DE USO

### 2.1 Principais Objetivos
**Ordene por prioridade (1 = maior prioridade):**
- __ Reduzir tempo de resposta ao cliente
- __ Reduzir custos operacionais
- __ Atender 24/7
- __ Aumentar satisfação do cliente
- __ Qualificar leads
- __ Automatizar tarefas repetitivas
- __ Escalar operação sem aumentar equipe
- __ Outro: ___________

### 2.2 Casos de Uso Específicos
**Quais tipos de interação o agente deve realizar? (marque todos que se aplicam)**

- [ ] **Atendimento ao Cliente**
  - Responder dúvidas frequentes
  - Fornecer informações sobre produtos/serviços
  - Resolver problemas simples
  - Coletar feedback

- [ ] **Vendas e Marketing**
  - Qualificação de leads
  - Apresentação de produtos/serviços
  - Envio de catálogos
  - Agendamento de demonstrações
  - Follow-up de vendas

- [ ] **Suporte Técnico**
  - Troubleshooting básico
  - Guias de instalação/uso
  - Abertura de tickets
  - Status de chamados

- [ ] **Agendamento**
  - Marcar consultas/reuniões
  - Enviar lembretes
  - Confirmar agendamentos
  - Reagendar

- [ ] **Transações**
  - Consulta de pedidos
  - Rastreamento de entregas
  - Consulta de saldo/faturas
  - Processamento de pagamentos

- [ ] **Notificações**
  - Avisos importantes
  - Promoções
  - Atualizações de status
  - Newsletters

- [ ] **Outro:** ___________

### 2.3 Exemplos de Conversas
**Por favor, forneça 3-5 exemplos de conversas típicas que você espera que o agente tenha:**

**Exemplo 1:**
```
Cliente: [exemplo de pergunta]
Agente: [resposta esperada]
```

**Exemplo 2:**
```
Cliente: ___________
Agente: ___________
```

---

## 3. REQUISITOS FUNCIONAIS

### 3.1 Volume e Disponibilidade
- **Qual o volume esperado de mensagens?**
  - Por dia: ___________
  - Por hora (pico): ___________
  - Mensagens simultâneas (estimativa): ___________

- **Horário de funcionamento do agente:**
  - [ ] 24/7 (sempre ativo)
  - [ ] Horário comercial: _____ às _____
  - [ ] Dias da semana específicos: ___________
  - [ ] Fora do horário: 
    - [ ] Mensagem automática
    - [ ] Desligado
    - [ ] Resposta limitada

### 3.2 Idiomas e Localização
- **Quais idiomas o agente deve suportar?**
  - [ ] Português BR (principal)
  - [ ] Inglês
  - [ ] Espanhol
  - [ ] Outro: ___________

- **O agente deve reconhecer gírias, regionalismos ou linguagem informal?**
  - [ ] Sim
  - [ ] Não
  - [ ] Parcialmente

- **Timezone de operação:**
  - Fuso horário: ___________

### 3.3 Integrações Necessárias
**O agente precisa se integrar com algum sistema existente?**

- [ ] **CRM** (qual?): ___________
- [ ] **ERP** (qual?): ___________
- [ ] **E-commerce** (qual?): ___________
- [ ] **Sistema de Tickets** (qual?): ___________
- [ ] **Calendário** (Google Calendar, Outlook, outro): ___________
- [ ] **Gateway de Pagamento** (qual?): ___________
- [ ] **Sistema de Estoque**: ___________
- [ ] **Planilhas/Banco de dados**: ___________
- [ ] **API própria** (descrever): ___________
- [ ] **Outros:** ___________

**Observações sobre integrações:**
___________

### 3.4 Tipos de Mídia
**Quais tipos de mídia o agente deve suportar?**

**Receber:**
- [ ] Texto
- [ ] Imagens
- [ ] Áudio/Voz
- [ ] Documentos (PDF, Word, etc.)
- [ ] Vídeos
- [ ] Localização

**Enviar:**
- [ ] Texto
- [ ] Imagens
- [ ] Áudio
- [ ] Documentos (catálogos, PDFs)
- [ ] Vídeos
- [ ] Localização
- [ ] Botões interativos
- [ ] Listas de opções
- [ ] Templates de mensagem

---

## 4. COMPORTAMENTO E PERSONALIDADE

### 4.1 Tom de Voz
**Como o agente deve se comunicar?**

- **Formalidade:**
  - [ ] Muito formal (Senhor/Senhora)
  - [ ] Formal (você, sem gírias)
  - [ ] Informal (você, com naturalidade)
  - [ ] Muito informal (gírias, emojis)

- **Personalidade:**
  - [ ] Profissional e objetivo
  - [ ] Amigável e prestativo
  - [ ] Entusiasta e energético
  - [ ] Empático e acolhedor
  - [ ] Técnico e preciso
  - [ ] Outro: ___________

- **Uso de emojis:**
  - [ ] Sim, frequentemente
  - [ ] Sim, moderadamente
  - [ ] Raramente
  - [ ] Nunca

### 4.2 Nome e Identidade
- **O agente deve ter um nome?**
  - [ ] Sim: ___________
  - [ ] Não, apenas "Assistente Virtual"

- **O agente deve se apresentar como:**
  - [ ] Bot/Assistente Virtual (transparente)
  - [ ] Membro da equipe (humano)
  - [ ] Não especificar

### 4.3 Limitações e Escalação
- **Quando o agente deve transferir para atendimento humano?**
  - [ ] Quando não souber responder
  - [ ] Quando cliente solicitar
  - [ ] Para questões complexas/específicas
  - [ ] Para vendas/negociação
  - [ ] Para reclamações
  - [ ] Para transações financeiras
  - [ ] Nunca (apenas bot)
  - [ ] Outro: ___________

- **Como deve ser a transferência?**
  - [ ] Automática (webhook para CRM/sistema de tickets)
  - [ ] Notificação no WhatsApp Business
  - [ ] Email para equipe
  - [ ] Outro: ___________

---

## 5. DADOS E CONHECIMENTO

### 5.1 Base de Conhecimento
- **Você já possui uma base de conhecimento/FAQ?**
  - [ ] Sim (formato: _________)
  - [ ] Não, precisa ser criada
  - [ ] Parcialmente

- **Quantas perguntas frequentes você estima ter?**
  - [ ] Menos de 20
  - [ ] 20-50
  - [ ] 50-100
  - [ ] 100-200
  - [ ] Mais de 200

- **Você pode fornecer:**
  - [ ] Documentação de produtos/serviços
  - [ ] Manual de atendimento
  - [ ] Políticas da empresa
  - [ ] Catálogo de produtos
  - [ ] Scripts de vendas
  - [ ] Outros: ___________

### 5.2 Dados de Clientes
- **O agente precisa acessar dados de clientes?**
  - [ ] Sim
  - [ ] Não

**Se sim, quais dados?**
- [ ] Nome
- [ ] Histórico de compras
- [ ] Histórico de conversas
- [ ] Preferências
- [ ] Dados de pagamento (segurança alta)
- [ ] Localização
- [ ] Outros: ___________

### 5.3 Aprendizado e Melhoria
- **Você pretende revisar e melhorar o agente regularmente?**
  - [ ] Sim, semanalmente
  - [ ] Sim, mensalmente
  - [ ] Sim, trimestralmente
  - [ ] Não, apenas quando necessário

- **Você deseja relatórios de desempenho?**
  - [ ] Sim, diários
  - [ ] Sim, semanais
  - [ ] Sim, mensais
  - [ ] Não necessário

---

## 6. SEGURANÇA E COMPLIANCE

### 6.1 Dados Sensíveis
- **O agente lidará com dados sensíveis?**
  - [ ] Sim
  - [ ] Não

**Se sim, quais tipos?**
- [ ] Dados pessoais (CPF, RG)
- [ ] Dados financeiros (cartão de crédito, conta bancária)
- [ ] Dados de saúde
- [ ] Dados de menores de idade
- [ ] Outros: ___________

### 6.2 Compliance
- **Sua empresa está sujeita a alguma regulamentação específica?**
  - [ ] LGPD (Lei Geral de Proteção de Dados)
  - [ ] PCI-DSS (pagamentos)
  - [ ] HIPAA (saúde)
  - [ ] Outra: ___________

- **Você precisa de:**
  - [ ] Termo de consentimento para uso de dados
  - [ ] Política de privacidade específica
  - [ ] Auditoria de conversas
  - [ ] Retenção de logs (por quanto tempo: _______)
  - [ ] Criptografia end-to-end adicional

### 6.3 Moderação de Conteúdo
- **É necessário filtrar/bloquear algum tipo de conteúdo?**
  - [ ] Linguagem ofensiva
  - [ ] Spam
  - [ ] Conteúdo adulto
  - [ ] Outros: ___________

---

## 7. INFRAESTRUTURA E TECNOLOGIA

### 7.1 Preferências Técnicas
- **Você já possui infraestrutura de TI?**
  - [ ] Sim, servidor próprio (on-premise)
  - [ ] Sim, cloud (AWS, Azure, Google Cloud)
  - [ ] Não, preciso de recomendação

- **Preferência de deployment:**
  - [ ] Cloud (mais fácil, menos controle)
  - [ ] On-premise (mais controle, mais complexo)
  - [ ] Híbrido
  - [ ] Sem preferência

- **Você tem equipe técnica interna?**
  - [ ] Sim, equipe dedicada
  - [ ] Sim, mas limitada
  - [ ] Não, terceirizado
  - [ ] Não, precisarei de suporte

### 7.2 Número WhatsApp
- **Você já possui número WhatsApp Business?**
  - [ ] Sim, ativo
  - [ ] Sim, mas precisa migrar para API
  - [ ] Não, preciso obter

- **Tipo de número:**
  - [ ] Número novo dedicado
  - [ ] Número existente (migração)
  - [ ] Sem preferência

### 7.3 API do WhatsApp
- **Você já tem conta Meta Business/Facebook Business?**
  - [ ] Sim, verificada
  - [ ] Sim, mas não verificada
  - [ ] Não

- **Você está ciente dos custos da WhatsApp Business API?**
  - [ ] Sim
  - [ ] Não (explicar)

---

## 8. ORÇAMENTO E TIMELINE

### 8.1 Budget
- **Qual o orçamento disponível para o projeto?**
  - [ ] Menos de R$ 5.000
  - [ ] R$ 5.000 - R$ 10.000
  - [ ] R$ 10.000 - R$ 20.000
  - [ ] R$ 20.000 - R$ 50.000
  - [ ] Mais de R$ 50.000
  - [ ] Flexível/A definir

- **Modelo de pagamento preferido:**
  - [ ] Pagamento único (projeto)
  - [ ] Mensalidade (SaaS/manutenção)
  - [ ] Híbrido (setup + mensalidade)
  - [ ] A discutir

### 8.2 Timeline
- **Quando você precisa que o projeto esteja pronto?**
  - [ ] Urgente (menos de 1 mês)
  - [ ] Normal (1-2 meses)
  - [ ] Flexível (2-3 meses)
  - [ ] Sem pressa (3+ meses)

- **Há alguma data crítica (evento, lançamento)?**
  - [ ] Sim: ___________
  - [ ] Não

### 8.3 Fases
- **Você prefere:**
  - [ ] MVP rápido + iterações
  - [ ] Projeto completo de uma vez
  - [ ] Desenvolvimento em fases

---

## 9. PÓS-LANÇAMENTO

### 9.1 Suporte e Manutenção
- **Você precisará de suporte após o lançamento?**
  - [ ] Sim, suporte completo (24/7)
  - [ ] Sim, horário comercial
  - [ ] Sim, sob demanda
  - [ ] Não, gerenciarei internamente

- **Tipo de suporte necessário:**
  - [ ] Técnico (bugs, infraestrutura)
  - [ ] Funcional (ajustes de prompts, workflows)
  - [ ] Treinamento da equipe
  - [ ] Consultoria estratégica
  - [ ] Todos os acima

### 9.2 Evolução
- **Você planeja evoluir o agente no futuro?**
  - [ ] Sim, já tenho ideias
  - [ ] Sim, conforme resultados
  - [ ] Talvez
  - [ ] Não

**Se sim, que tipo de evolução?**
- [ ] Novos canais (Telegram, Instagram, etc.)
- [ ] Mais integrações
- [ ] Recursos de IA avançados
- [ ] Análise preditiva
- [ ] Outro: ___________

---

## 10. INFORMAÇÕES ADICIONAIS

### 10.1 Casos de Sucesso / Referências
- **Você conhece algum chatbot/agente que admira?**
  - Nome/Empresa: ___________
  - O que você gosta: ___________

### 10.2 Preocupações e Prioridades
- **Qual sua maior preocupação com este projeto?**
  - [ ] Complexidade técnica
  - [ ] Custo
  - [ ] Tempo de implementação
  - [ ] Adoção pelos clientes
  - [ ] Qualidade das respostas
  - [ ] Segurança dos dados
  - [ ] Outro: ___________

- **Qual a prioridade máxima?**
  - [ ] Rapidez no atendimento
  - [ ] Qualidade das respostas
  - [ ] Personalização
  - [ ] Custo-benefício
  - [ ] Escalabilidade
  - [ ] Outro: ___________

### 10.3 Observações Gerais
**Há algo mais que devemos saber sobre seu negócio, necessidades ou expectativas?**

___________________________________________
___________________________________________
___________________________________________

---

## PRÓXIMOS PASSOS

Após preencher este questionário, nossa equipe irá:

1. ✅ Analisar suas respostas
2. ✅ Preparar uma proposta personalizada
3. ✅ Agendar reunião para apresentação
4. ✅ Ajustar detalhes e finalizar escopo
5. ✅ Iniciar desenvolvimento

**Prazo para retorno:** 2-3 dias úteis

**Contato para dúvidas:**
- Email: ___________
- WhatsApp: ___________
- Telefone: ___________

---

**Data de preenchimento:** ___/___/______

**Nome do responsável:** _______________________

**Cargo:** _______________________

**Assinatura:** _______________________
