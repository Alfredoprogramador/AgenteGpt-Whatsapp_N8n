import Link from 'next/link';
import { ArrowRight, Bot, ShieldCheck, Truck, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/lib/mockData';

export default function HomePage() {
  const featured = mockProducts.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Bot className="w-4 h-4" />
            Atendimento 24/7 com IA
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Compre com a ajuda de<br />
            <span className="text-yellow-300">inteligência artificial</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Nossa assistente virtual pode te ajudar a encontrar produtos, rastrear pedidos e finalizar
            compras — direto pelo chat ou pelo WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors flex items-center gap-2 justify-center">
              Ver Produtos
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={() => {}}
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Falar com IA ↓
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-3 p-6">
              <div className="bg-blue-100 rounded-full p-4">
                <Bot className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900">Chatbot IA 24/7</h3>
              <p className="text-gray-500 text-sm">Tire dúvidas e finalize compras a qualquer hora pelo chat ou WhatsApp.</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6">
              <div className="bg-green-100 rounded-full p-4">
                <Truck className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900">Entrega Rápida</h3>
              <p className="text-gray-500 text-sm">Rastreie seu pedido em tempo real diretamente pelo chat.</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6">
              <div className="bg-purple-100 rounded-full p-4">
                <ShieldCheck className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900">Compra Segura</h3>
              <p className="text-gray-500 text-sm">Pagamentos processados com segurança via Stripe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Produtos em Destaque</h2>
            <p className="text-gray-500 mt-1">Os mais pedidos da nossa loja</p>
          </div>
          <Link href="/products" className="btn-secondary flex items-center gap-2">
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Chat */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-y border-blue-100">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Precisa de ajuda para escolher?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Nossa IA pode recomendar produtos personalizados, comparar itens e te ajudar a
            encontrar exatamente o que você precisa.
          </p>
          <p className="text-blue-600 font-semibold flex items-center gap-2 justify-center">
            <Bot className="w-5 h-5" />
            Clique no ícone de chat no canto inferior direito para começar!
          </p>
        </div>
      </section>
    </div>
  );
}
