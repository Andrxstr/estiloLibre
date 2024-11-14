import React from 'react';
import { MessageCircle, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Product } from '../types';

export default function ProductCard(product: Product) {
  const addToCart = useCartStore((state) => state.addToCart);
  const phoneNumber = "573115557460";
  const message = encodeURIComponent(`Hola! Me interesa el producto: ${product.name} por $${product.price}`);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
          <span className={`px-2 py-1 rounded text-sm ${
            product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
          </span>
        </div>
        <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                product.stock > 0
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={20} />
              <span>Agregar</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="fill-white" size={20} />
              <span>Consultar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}