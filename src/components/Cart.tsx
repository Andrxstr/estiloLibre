import React from 'react';
import { useCartStore } from '../store/cartStore';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, checkout } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <ShoppingCart className="mx-auto h-12 w-12 mb-2" />
        <p>Tu carrito está vacío</p>
      </div>
    );
  }

  const handleCheckout = () => {
    checkout();
    alert('¡Compra realizada con éxito!');
  };

  return (
    <div className="p-4">
      {items.map(({ product, quantity }) => (
        <div key={product.id} className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center space-x-4">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-gray-500">${product.price}</p>
              <p className="text-sm text-gray-500">Stock disponible: {product.stock}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
                disabled={quantity >= product.stock}
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(product.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-lg font-bold">Total: ${total().toFixed(2)}</p>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Pagar
        </button>
      </div>
    </div>
  );
}