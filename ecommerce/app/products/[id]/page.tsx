'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart, Star, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { mockProducts } from '@/lib/mockData';
import { useCart } from '@/components/CartContext';
import { useState } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = mockProducts.find((p) => p.id === id);
  if (!product) return notFound();

  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const related = mockProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 text-sm transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Voltar aos produtos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative w-full h-80 lg:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <span className="absolute top-4 left-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-gray-500 text-sm">(4.8 – 128 avaliações)</span>
          </div>

          <div className="mt-4">
            <span className="text-4xl font-extrabold text-blue-600">
              R$ {product.price.toFixed(2)}
            </span>
            <span className="text-gray-500 text-sm ml-2">em até 10x sem juros</span>
          </div>

          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-2 mt-4">
            <div className={`w-3 h-3 rounded-full ${product.stock > 5 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-600">
              {product.stock > 5 ? 'Em estoque' : product.stock > 0 ? `Apenas ${product.stock} restante(s)` : 'Esgotado'}
            </span>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="btn-primary flex items-center gap-2 px-8 py-3 text-base"
            >
              {added ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Adicionado!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Adicionar ao Carrinho
                </>
              )}
            </button>
            <Link href="/cart" className="btn-secondary px-6 py-3">
              Ver Carrinho
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="card p-4 hover:shadow-md transition-shadow">
                <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 mb-3">
                  <Image src={p.image_url} alt={p.name} fill className="object-cover" sizes="33vw" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{p.name}</h3>
                <p className="text-blue-600 font-bold mt-1">R$ {p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
