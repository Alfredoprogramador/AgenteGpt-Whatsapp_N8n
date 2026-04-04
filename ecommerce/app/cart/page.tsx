'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/components/CartContext';

export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Seu carrinho está vazio</h1>
        <p className="text-gray-500 mb-6">Explore nossos produtos e adicione itens ao carrinho.</p>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Ver Produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Carrinho</h1>
        <span className="text-gray-500 text-sm">{totalItems} item(s)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="card flex gap-4 p-4">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.id}`} className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-sm line-clamp-2">
                  {product.name}
                </Link>
                <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
                <p className="text-blue-600 font-bold mt-1">R$ {product.price.toFixed(2)}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="px-2 py-1 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 text-sm font-medium min-w-[2rem] text-center">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="px-2 py-1 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-sm font-bold text-gray-700">
                  R$ {(product.price * quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="card p-6 h-fit sticky top-20">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Resumo do Pedido</h2>

          <div className="space-y-2 text-sm">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-gray-600">
                <span className="truncate flex-1 pr-2">{product.name} x{quantity}</span>
                <span className="flex-shrink-0">R$ {(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 mt-4 pt-4">
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Subtotal</span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 text-sm mt-1">
              <span>Frete</span>
              <span className="text-green-600">Grátis</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-3">
              <span>Total</span>
              <span className="text-blue-600">R$ {totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <Link href="/checkout" className="btn-primary w-full mt-6 text-center block py-3">
            Finalizar Compra
          </Link>
          <Link href="/products" className="btn-secondary w-full mt-2 text-center block py-3">
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
