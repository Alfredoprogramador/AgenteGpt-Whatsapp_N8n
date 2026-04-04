'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/lib/supabase';
import { useCart } from './CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="card flex flex-col group hover:shadow-md transition-shadow">
      <Link href={`/products/${product.id}`} className="relative overflow-hidden">
        <div className="relative w-full h-52 bg-gray-100">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
          {product.category}
        </span>
        {product.stock === 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Esgotado
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">{product.description}</p>

        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-gray-400 ml-1">(4.8)</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-blue-600">
            R$ {product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="btn-primary flex items-center gap-1 text-sm py-1.5"
          >
            <ShoppingCart className="w-4 h-4" />
            Adicionar
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {product.stock > 0 ? `${product.stock} em estoque` : 'Indisponível'}
        </p>
      </div>
    </div>
  );
}
