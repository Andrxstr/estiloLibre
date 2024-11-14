import { create } from 'zustand';
import { Product } from '../types';
import { useProductStore } from './productStore';

interface CartStore {
  items: { product: Product; quantity: number }[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  checkout: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addToCart: (product) => {
    if (product.stock <= 0) return;

    set((state) => {
      const existingItem = state.items.find(item => item.product.id === product.id);
      if (existingItem) {
        // Verificar si hay suficiente stock
        if (existingItem.quantity >= product.stock) return state;
        
        return {
          items: state.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    });
  },
  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter(item => item.product.id !== productId),
    }));
  },
  updateQuantity: (productId, quantity) => {
    set((state) => {
      const product = state.items.find(item => item.product.id === productId)?.product;
      if (!product) return state;

      // Verificar si hay suficiente stock
      if (quantity > product.stock) return state;

      return {
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        ),
      };
    });
  },
  clearCart: () => set({ items: [] }),
  total: () => {
    const items = get().items;
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },
  checkout: () => {
    const items = get().items;
    const updateStock = useProductStore.getState().updateStock;

    // Actualizar el stock de cada producto
    items.forEach(({ product, quantity }) => {
      updateStock(product.id, product.stock - quantity);
    });

    // Limpiar el carrito
    get().clearCart();
  },
}));