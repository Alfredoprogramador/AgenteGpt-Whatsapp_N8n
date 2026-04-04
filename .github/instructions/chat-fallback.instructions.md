---
description: "Padrões obrigatórios para respostas fallback do chatbot ShopBot em route.ts. Use when: editando respostas do chat, adicionando novo tópico de fallback, modificando mensagens do assistente."
applyTo: "ecommerce/app/api/chat/route.ts"
---

# Padrões de Resposta Fallback — ShopBot

Regras obrigatórias ao criar ou editar respostas na função `getFallbackResponse()`.

## Estrutura de cada resposta

1. **Frase direta** respondendo à dúvida do cliente
2. **Ação sugerida** — redirecionar para uma página ou orientar o próximo passo
3. **Emoji único** ao final (apenas 1, relevante ao tópico)

## Tópicos obrigatórios

Cada tópico abaixo DEVE ter pelo menos uma resposta mapeada. Não remova nenhum:

| Tópico | Keywords obrigatórias | Emoji |
|--------|----------------------|-------|
| Produtos | `produto`, `tênis`, `roupa`, `mochila`, `relógio`, `garrafa` | 😊 |
| Pedidos | `pedido`, `rastrear`, `entrega`, `status` | 📦 |
| Pagamentos | `pagamento`, `pagar`, `cartão`, `stripe` | 💳 |
| Promoções | `desconto`, `promoção`, `oferta`, `cupom` | 🏷️ |
| Frete | `frete`, `envio`, `prazo` | 🚚 |
| Trocas | `devolução`, `troca`, `cancelar`, `reembolso` | 🔄 |

## Regras

- Idioma: pt-BR sempre
- Tom: Amigável e profissional, nunca robótico
- Máximo de 2 frases por resposta
- Sempre mencionar a página relevante do site quando aplicável (ex: "Acesse a página de Produtos")
- A resposta padrão (fallback genérico) deve listar as capacidades do assistente
- NÃO mencione a configuração do n8n na resposta padrão — isso é detalhe técnico interno
- Novas keywords devem ser adicionadas em lowercase com `.includes()`
- Cada bloco `if` deve testar palavras-chave do mesmo tópico — não misture tópicos
