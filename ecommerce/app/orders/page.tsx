'use client';

import { useState, useEffect } from 'react';
import { Package, Search, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type Order = {
  id: string;
  customer_email: string;
  items: { product_name: string; quantity: number; unit_price: number }[];
  total: number;
  status: string;
  created_at: string;
};

const STATUS_CONFIG = {
  pending: { label: 'Aguardando Pagamento', icon: Clock, color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  paid: { label: 'Pagamento Confirmado', icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200' },
  shipped: { label: 'Em Trânsito', icon: Truck, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  delivered: { label: 'Entregue', icon: CheckCircle, color: 'text-green-700 bg-green-50 border-green-200' },
  cancelled: { label: 'Cancelado', icon: XCircle, color: 'text-red-600 bg-red-50 border-red-200' },
};

function OrdersContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') ?? '');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const success = searchParams.get('success') === 'true';

  useEffect(() => {
    const initialEmail = searchParams.get('email');
    if (initialEmail) fetchOrders(initialEmail);
  }, [searchParams]);

  async function fetchOrders(emailToSearch: string) {
    if (!emailToSearch) return;
    setLoading(true);
    setSearched(false);
    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(emailToSearch)}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Package className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Meus Pedidos</h1>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3 text-green-700">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">Pedido realizado com sucesso! Você receberá uma confirmação por e-mail.</p>
        </div>
      )}

      <div className="card p-6 mb-8">
        <p className="text-sm text-gray-600 mb-3">Digite seu e-mail para consultar seus pedidos:</p>
        <div className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchOrders(email)}
            placeholder="seu@email.com"
            className="input flex-1"
          />
          <button
            onClick={() => fetchOrders(email)}
            disabled={!email || loading}
            className="btn-primary flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {searched && orders.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">Nenhum pedido encontrado para este e-mail.</p>
        </div>
      )}

      <div className="space-y-4">
        {orders.map((order) => {
          const statusConf = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.pending;
          const StatusIcon = statusConf.icon;

          return (
            <div key={order.id} className="card p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-900">Pedido #{order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(order.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit', month: 'long', year: 'numeric',
                    })}
                  </p>
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-medium border rounded-full px-3 py-1 ${statusConf.color}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  {statusConf.label}
                </div>
              </div>

              <div className="border-t border-gray-50 pt-3 space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm text-gray-600">
                    <span>{item.product_name} × {item.quantity}</span>
                    <span>R$ {(item.unit_price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-blue-600">R$ {order.total.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense>
      <OrdersContent />
    </Suspense>
  );
}
