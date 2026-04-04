import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Assinatura ausente' }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe não configurado' }, { status: 500 });
  }

  let event;
  try {
    const { stripe } = await import('@/lib/stripe');
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Erro desconhecido';
    console.error('[stripe-webhook] Signature verification failed:', msg);
    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as { metadata?: { order_id?: string }; payment_status?: string };
    const orderId = session.metadata?.order_id;

    if (orderId && session.payment_status === 'paid') {
      // In production: update order status in Supabase
      // await createServiceClient()
      //   .from('orders')
      //   .update({ status: 'paid', stripe_session_id: session.id })
      //   .eq('id', orderId);
      console.log(`[stripe-webhook] Order ${orderId} marked as paid`);
    }
  }

  return NextResponse.json({ received: true });
}
