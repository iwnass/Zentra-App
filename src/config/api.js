export const API_CONFIG = {
  // In development
  baseUrl: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'http://your-production-api.com',
  
  // For Electron, you might want to store this in electron-store
  // or read from environment variables
  apiKey: process.env.REACT_APP_API_KEY || 'a93fbc6e00b21e431988847623cfb4e3a3e6e23231cb3ffcc6e96c1d75e084e7',
  
  // Request timeout in milliseconds
  timeout: 10000,
  
  // Retry configuration
  retries: 3,
  retryDelay: 1000
};