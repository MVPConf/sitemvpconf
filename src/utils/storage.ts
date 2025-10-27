// ========================================
// 🗄️ UTILITÁRIOS PARA AZURE STORAGE
// ========================================
// Funções para trabalhar com URLs do Azure Storage Account com SAS tokens

/**
 * Constrói URLs corretamente para o Azure Storage com SAS tokens
 * @param baseSasUrl URL base com SAS token (ex: https://storage.blob.core.windows.net/?sv=2024...)
 * @param path Caminho do arquivo/recurso (ex: /speakers.json, /2025/speakers/image.jpg)
 * @returns URL completa com SAS token
 */
export const buildStorageUrl = (baseSasUrl: string, path: string): string => {
  try {
    // Remove barras duplas e garante que o path comece com /
    let cleanPath = path.startsWith('/') ? path : `/${path}`;

    // Se o path não começar com /data/, adiciona automaticamente
    // Isso corrige caminhos como /2025/speakers/image.jpg → /data/2025/speakers/image.jpg
    if (!cleanPath.startsWith('/data/')) {
      cleanPath = `/data${cleanPath}`;
    }

    // Separa a URL base dos parâmetros SAS
    const url = new URL(baseSasUrl);
    const baseUrl = `${url.protocol}//${url.host}`;
    const sasParams = url.search;

    // Constrói a URL final: baseUrl + path + sasParams
    const finalUrl = `${baseUrl}${cleanPath}${sasParams}`;

    //console.log(`[Storage] Building URL: ${cleanPath} → ${finalUrl}`);
    return finalUrl;
  } catch (error) {
    console.error('[Storage] Erro ao construir URL:', error);
    // Fallback: retorna URL sem SAS (pode ser pública)
    return `https://stmvpconf.blob.core.windows.net/data${path}`;
  }
};

/**
 * Obtém a URL do Storage Account do ambiente
 */
export const getStorageAccountUrl = (): string => {
  return import.meta.env.STORAGE_ACCOUNT_URL;
};

/**
 * Constrói uma URL para um recurso no storage usando as configurações do ambiente
 * @param path Caminho do arquivo/recurso
 * @returns URL completa com SAS token
 */
export const getStorageResourceUrl = (path: string): string => {
  return buildStorageUrl(getStorageAccountUrl(), path);
};
