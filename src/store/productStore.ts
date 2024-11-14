import { create } from 'zustand';
import { Product } from '../types';
import { products as initialProducts } from '../data/products';

interface ProductStore {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  updateStock: (productId: number, stock: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: initialProducts.map(p => ({ ...p, stock: 10 })),
  addProduct: (product) => {
    set((state) => ({
      products: [...state.products, product],
    }));
  },
  updateProduct: (product) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === product.id ? product : p
      ),
    }));
  },
  deleteProduct: (productId) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    }));
  },
  updateStock: (productId, stock) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId ? { ...p, stock } : p
      ),
    }));
  },
}));