const API_URL = import.meta.env.VITE_API_URL;

interface ApiRequestOptions {
  headers?: Record<string, string>;
  body?: unknown; // Para POST, PUT, etc.
}

export const api = {
  request: async <T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<T> => {
    const { headers = {}, body } = options;

    // Configuración básica de headers
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    // Agregar token de autenticación si existe (opcional)
    const token = localStorage.getItem("token");
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    // Configuración de la petición
    const config: RequestInit = {
      method,
      headers: defaultHeaders,
    };

    // Agregar body para POST y PUT
    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || errorData.message || `Errores ${response.status}: ${response.statusText}`
        );
      }

      // Si la respuesta no tiene contenido (ej. DELETE), devolver null
      if (response.status === 204) {
        return null as T;
      }
      return response.json();
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Error desconocido en la petición");
    }
  },

  // Métodos específicos para mayor comodidad
  get: <T>(endpoint: string, headers?: Record<string, string>) =>
    api.request<T>("GET", endpoint, { headers }),
  post: <T>(endpoint: string, body: unknown, headers?: Record<string, string>) =>
    api.request<T>("POST", endpoint, { body, headers }),
  put: <T>(endpoint: string, body: unknown, headers?: Record<string, string>) =>
    api.request<T>("PUT", endpoint, { body, headers }),
  delete: <T>(endpoint: string, headers?: Record<string, string>) =>
    api.request<T>("DELETE", endpoint, { headers }),
};