import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();

    if (!message || !sessionId) {
      return NextResponse.json({ error: 'message e sessionId são obrigatórios' }, { status: 400 });
    }

    const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;

    if (!webhookUrl) {
      // Fallback response when n8n is not configured
      return NextResponse.json({
        response: getFallbackResponse(message),
      });
    }

    const n8nRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!n8nRes.ok) {
      throw new Error(`n8n responded with status ${n8nRes.status}`);
    }

    const data = await n8nRes.json();

    // n8n may return { response: "..." } or { output: "..." } depending on workflow config
    const responseText =
      data.response ??
      data.output ??
      data.text ??
      data.message ??
      'Desculpe, não consegui processar sua solicitação.';

    return NextResponse.json({ response: responseText });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido';
    console.error('[chat] Error proxying to n8n:', message);
    return NextResponse.json({
      response:
        'Desculpe, nosso assistente está temporariamente indisponível. Por favor, tente novamente em instantes.',
    });
  }
}

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('produto') || lower.includes('tênis') || lower.includes('roupa') || lower.includes('mochila')) {
    return 'Temos ótimos produtos disponíveis! Acesse a página de Produtos para ver nosso catálogo completo com tênis, roupas esportivas, acessórios e muito mais. 😊';
  }
  if (lower.includes('pedido') || lower.includes('rastrear') || lower.includes('entrega')) {
    return 'Para rastrear seu pedido, acesse a página "Meus Pedidos" e informe seu e-mail. Você verá o status atualizado de todos os seus pedidos. 📦';
  }
  if (lower.includes('pagamento') || lower.includes('pagar') || lower.includes('cartão')) {
    return 'Aceitamos pagamento via cartão de crédito ou débito, processado com segurança pela Stripe. Seu dados ficam totalmente protegidos. 💳';
  }
  if (lower.includes('desconto') || lower.includes('promoção') || lower.includes('oferta')) {
    return 'Temos promoções especiais periodicamente! Fique de olho na nossa página inicial para as melhores ofertas. 🏷️';
  }
  if (lower.includes('frete') || lower.includes('envio')) {
    return 'Oferecemos frete grátis para todos os pedidos! A entrega é realizada em até 5 dias úteis. 🚚';
  }
  if (lower.includes('devolução') || lower.includes('troca') || lower.includes('cancelar')) {
    return 'Nossa política permite trocas e devoluções em até 30 dias após a compra. Entre em contato conosco pelo chat para mais detalhes. 🔄';
  }

  return 'Olá! Posso te ajudar a encontrar produtos, rastrear pedidos ou responder dúvidas. O que você precisa? Para atendimento completo com IA, configure o n8n com as instruções do README. 🤖';
}
