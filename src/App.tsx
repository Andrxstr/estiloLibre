import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, ShoppingBag, ShoppingCart, Settings, LogOut } from 'lucide-react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Admin from './pages/Admin';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useProductStore } from './store/productStore';
import { useCartStore } from './store/cartStore';
import { useAuthStore } from './store/authStore';
import { products } from './data/products';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const products = useProductStore((state) => state.products);
  const cartItems = useCartStore((state) => state.items);
  const { user, logout } = useAuthStore();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <ShoppingBag className="h-8 w-8 text-blue-500" />
                <h1 className="text-2xl font-bold text-gray-900">EstiloLibre</h1>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                  />
                </div>
                <button
                  onClick={() => setShowCart(!showCart)}
                  className="relative p-2 text-gray-600 hover:text-blue-600"
                >
                  <ShoppingCart size={24} />
                  {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                {user ? (
                  <>
                    <Link
                      to="/admin"
                      className="p-2 text-gray-600 hover:text-blue-600"
                    >
                      <Settings size={24} />
                    </Link>
                    <button
                      onClick={logout}
                      className="p-2 text-gray-600 hover:text-blue-600"
                    >
                      <LogOut size={24} />
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Iniciar sesión
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold">Carrito de Compras</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <Cart />
            </div>
          </div>
        )}

        {/* Main Content */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
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
            }
          />
        </Routes>

        {/* Footer */}
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-500">
              © 2024 EstiloLibre. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;