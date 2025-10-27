// ========================================
// 🔐 HOOK DE AUTENTICAÇÃO
// ========================================
// Hook para gerenciar estado de autenticação da agenda

import { useState, useCallback } from 'react';
import type { AuthState, ApiResponse } from '../types/agenda';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userEmail: null,
    userCode: null
  });

  const [isLoading, setIsLoading] = useState(false);

  // Inicia o fluxo de autenticação enviando e-mail
  const startAuth = useCallback(async (email: string): Promise<ApiResponse> => {
    const url = import.meta.env.AUTH_API_URL;
    
    if (!url) {
      console.error('🚨 AUTH_API_URL não encontrada no .env');
      return { 
        ok: false, 
        message: 'URL da API de autenticação não configurada.' 
      };
    }
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), Number(import.meta.env.API_TIMEOUT) || 12000);

    try {
      setIsLoading(true);
      console.log('🔐 Enviando email de autenticação para:', email);
      console.log('🌐 URL da API:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        signal: controller.signal,
        mode: 'cors'
      });

      clearTimeout(timeout);

      if (!response.ok) {
        console.error('🚨 Erro na API de auth:', {
          status: response.status,
          statusText: response.statusText,
          url: url
        });
        
        if (response.status === 400) {
          return { 
            ok: false, 
            status: 400, 
            message: 'Email inválido. Verifique e tente novamente.' 
          };
        }
        if (response.status === 401) {
          return { 
            ok: false, 
            status: 401, 
            message: 'API de autenticação não autorizada. A URL pode ter expirado.' 
          };
        }
        return { 
          ok: false, 
          status: response.status, 
          message: `Falha ao enviar email (HTTP ${response.status}).` 
        };
      }

      // Atualiza estado local
      setAuthState(prev => ({
        ...prev,
        userEmail: email
      }));

      return { ok: true };
    } catch (err) {
      clearTimeout(timeout);
      console.warn('startAuth error', err);
      
      const aborted = err && (err as any).name === 'AbortError';
      return { 
        ok: false, 
        message: aborted 
          ? 'Tempo esgotado ao enviar e-mail.' 
          : 'Não foi possível iniciar o login.' 
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verifica o código de autenticação
  const verifyCode = useCallback(async (code: string): Promise<ApiResponse> => {
    try {
      setIsLoading(true);
      console.log('🔐 Verificando código de autenticação');

      // TODO: Implementar verificação real do código quando a API estiver disponível
      // Por enquanto, simula sucesso para qualquer código não vazio
      if (!code.trim()) {
        return { 
          ok: false, 
          message: 'Código é obrigatório.' 
        };
      }

      // Simula delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Atualiza estado como autenticado
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: true,
        userCode: code
      }));

      return { ok: true };
    } catch (err) {
      console.warn('verifyCode error', err);
      return { 
        ok: false, 
        message: 'Código inválido ou expirado.' 
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carrega agenda salva do usuário
  const loadUserAgenda = useCallback(async (email: string): Promise<ApiResponse> => {
    try {
      setIsLoading(true);
      console.log('📋 Carregando agenda salva para:', email);

      // TODO: Implementar carregamento real da agenda quando a API estiver disponível
      // Por enquanto, retorna agenda vazia
      await new Promise(resolve => setTimeout(resolve, 500));

      return { 
        ok: true, 
        data: {} // Agenda vazia por enquanto
      };
    } catch (err) {
      console.warn('loadUserAgenda error', err);
      return { 
        ok: false, 
        message: 'Não foi possível carregar sua agenda.' 
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Salva agenda do usuário
  const saveUserAgenda = useCallback(async (email: string, selections: any[]): Promise<ApiResponse> => {
    try {
      setIsLoading(true);
      console.log('💾 Salvando agenda para:', email, 'com', selections.length, 'seleções');

      // TODO: Implementar salvamento real da agenda quando a API estiver disponível
      // Por enquanto, simula sucesso
      await new Promise(resolve => setTimeout(resolve, 1000));

      return { ok: true };
    } catch (err) {
      console.warn('saveUserAgenda error', err);
      return { 
        ok: false, 
        message: 'Não foi possível salvar sua agenda.' 
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reseta estado de autenticação
  const logout = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      userEmail: null,
      userCode: null
    });
  }, []);

  return {
    authState,
    isLoading,
    startAuth,
    verifyCode,
    loadUserAgenda,
    saveUserAgenda,
    logout
  };
}
