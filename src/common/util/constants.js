const isProd = import.meta.env.PROD;

export const API_BASE__API_V1_URL = isProd
    ? '/api/v1'  // This will use Vercel's proxy in production
    : import.meta.env.VITE_TURTRACK_MANAGER_SERVER_BASE_URL || 'http://localhost:9999/api/v1';

export const API_BASE_URL = API_BASE__API_V1_URL;