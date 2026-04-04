import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// In-memory store for demo purposes.
// In production this uses Supabase (see lib/supabase.ts) and Stripe Checkout.
const ordersStore: Record<string, {
  id: string;
  customer_email: string;
  customer_name: string;
  items: { product_id: string; product_name: string; quantity: number; unit_price: number }[];
  total: number;
  status: string;
  stripe_session_id?: string;
  created_at: string;
}> = {};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer_email, customer_name, items, total } = body;

    if (!customer_email || !items || items.length === 0) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    const orderId = uuidv4();
    const order = {
      id: orderId,
      customer_email,
      customer_name: customer_name ?? '',
      items,
      total,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    ordersStore[orderId] = order;

    // Try Stripe Checkout if configured
    if (process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_APP_URL) {
      try {
        const { stripe } = await import('@/lib/stripe');
        const lineItems = items.map((item: { product_name: string; unit_price: number; quantity: number }) => ({
          price_data: {
            currency: 'brl',
            product_data: { name: item.product_name },
            unit_amount: Math.round(item.unit_price * 100),
          },
          quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineItems,
          mode: 'payment',
          customer_email,
          metadata: { order_id: orderId },
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders?email=${encodeURIComponent(customer_email)}&success=true`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
        });

        ordersStore[orderId].stripe_session_id = session.id;

        return NextResponse.json({ order_id: orderId, checkout_url: session.url });
      } catch {
        // Stripe not configured – return order ID for demo
      }
    }

    return NextResponse.json({ order_id: orderId });
  } catch {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const orderId = searchParams.get('id');

  if (orderId) {
    const order = ordersStore[orderId];
    if (!order) return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 });
    return NextResponse.json({ order });
  }

  if (email) {
    const orders = Object.values(ordersStore).filter(
      (o) => o.customer_email.toLowerCase() === email.toLowerCase()
    );
    return NextResponse.json({ orders: orders.sort((a, b) => b.created_at.localeCompare(a.created_at)) });
  }

  return NextResponse.json({ error: 'Parâmetro email ou id obrigatório' }, { status: 400 });
}
