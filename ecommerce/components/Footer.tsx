import Link from 'next/link';
import { Package } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              <Package className="w-5 h-5 text-blue-400" />
              ShopBot
            </div>
            <p className="text-sm text-gray-400">
              Sua loja online com atendimento inteligente 24/7 via chatbot IA.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Produtos</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Carrinho</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Meus Pedidos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Atendimento</h3>
            <p className="text-sm text-gray-400">
              Use nosso chatbot no canto inferior direito para:
            </p>
            <ul className="text-sm text-gray-400 mt-2 space-y-1 list-disc list-inside">
              <li>Buscar produtos</li>
              <li>Rastrear pedidos</li>
              <li>Tirar dúvidas</li>
              <li>Finalizar compras</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ShopBot. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
