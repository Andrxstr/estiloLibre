import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  role: 'admin' | 'user';
}

interface AuthStore {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

// En un entorno real, estas credenciales estarían en una base de datos
const MOCK_ADMIN = {
  id: 1,
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin' as const,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      login: async (email: string, password: string) => {
        // Simulación de autenticación
        if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
          set({ user: { id: MOCK_ADMIN.id, email: MOCK_ADMIN.email, role: MOCK_ADMIN.role } });
        } else {
          throw new Error('Credenciales inválidas');
        }
      },
      logout: () => {
        set({ user: null });
      },
      isAdmin: () => {
        const user = get().user;
        return user?.role === 'admin';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);