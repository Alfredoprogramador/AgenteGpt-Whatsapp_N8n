'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/navigation';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !name || items.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_email: email,
          customer_name: name,
          items: items.map(({ product, quantity }) => ({
            product_id: product.id,
            product_name: product.name,
            quantity,
            unit_price: product.price,
          })),
          total: totalPrice,
        }),
      });

      const data = await res.json();

      if (data.checkout_url) {
        clearCart();
        window.location.href = data.checkout_url;
      } else if (data.order_id) {
        clearCart();
        router.push(`/orders?email=${encodeURIComponent(email)}&success=true`);
      } else {
        throw new Error('Resposta inválida');
      }
    } catch (err) {
      alert('Erro ao processar pedido. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Seu carrinho está vazio</h1>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Ver Produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/cart" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" />
        Voltar ao carrinho
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-gray-900">Dados do Pedido</h2>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome completo *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="João Silva"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="joao@exemplo.com"
                  className="input"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
                <Lock className="w-4 h-4 inline mr-2" />
                Pagamento processado com segurança via Stripe. Seus dados estão protegidos.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-base flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pagar R$ {totalPrice.toFixed(2)}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Order summary */}
        <div className="card p-6 h-fit">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Resumo</h2>
          <div className="space-y-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3 items-center">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">Qtd: {quantity}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  R$ {(product.price * quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Frete</span>
              <span className="text-green-600 font-medium">Grátis</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t pt-2">
              <span>Total</span>
              <span className="text-blue-600">R$ {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
