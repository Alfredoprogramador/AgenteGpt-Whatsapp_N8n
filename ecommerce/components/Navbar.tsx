'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { ShoppingCart, Package, Home, Search } from 'lucide-react';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Package className="w-6 h-6" />
            ShopBot
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4" />
              Início
            </Link>
            <Link href="/products" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
              <Search className="w-4 h-4" />
              Produtos
            </Link>
            <Link href="/orders" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
              <Package className="w-4 h-4" />
              Meus Pedidos
            </Link>
          </div>

          <Link href="/cart" className="relative flex items-center gap-2 btn-primary">
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Carrinho</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
