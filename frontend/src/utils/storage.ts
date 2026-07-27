export function safeGetItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Erro ao ler '${key}' do localStorage:`, error);
    return fallback;
  }
}

export function safeSetItem(key: string, value: any): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Erro ao salvar '${key}' no localStorage (quota excedida ou indisponível):`, error);
    return false;
  }
}

export function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Erro ao remover '${key}' do localStorage:`, error);
  }
}
