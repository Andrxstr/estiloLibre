import React, { useState } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import ProductCard from './components/ProductCard';
import { products } from './data/products';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="h-8 w-8 text-emerald-500" />
              <h1 className="text-2xl font-bold text-gray-900">Estilo Libre</h1>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full sm:w-64"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">
            © 2024 Estilo Libre. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;