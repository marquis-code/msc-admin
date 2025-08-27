interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

export const useApi = () => {
  const baseURL = '/api';
  
  const apiCall = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
    const { method = 'GET', body, headers = {} } = options;
    
    try {
      const response = await $fetch<T>(`${baseURL}${endpoint}`, {
        method,
        body,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
      
      return response;
    } catch (error: any) {
      throw new Error(error?.data?.message || error.message || 'An error occurred');
    }
  };
  
  return { apiCall };
};