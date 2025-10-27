import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    define: {
      // Mapeia variáveis sem prefixo VITE_ para variáveis com prefixo
      'import.meta.env.STORAGE_ACCOUNT_URL': JSON.stringify(env.STORAGE_ACCOUNT_URL),
      'import.meta.env.TALKS_API_URL': JSON.stringify(env.TALKS_API_URL),
      'import.meta.env.AUTH_API_URL': JSON.stringify(env.AUTH_API_URL),
      'import.meta.env.USE_LOCAL_JSON': JSON.stringify(env.USE_LOCAL_JSON),
      'import.meta.env.API_TIMEOUT': JSON.stringify(env.API_TIMEOUT),
    },
  };
});
