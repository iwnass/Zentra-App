import { API_CONFIG } from '../config/api.js';

class ApiService {
  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
    this.apiKey = API_CONFIG.apiKey;
    this.timeout = API_CONFIG.timeout;
  }

  // Generic fetch wrapper with error handling
  async fetchWithAuth(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Authorization': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers
      },
      timeout: this.timeout,
      ...options
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Guild-related API calls
  async fetchGuilds() {
    return this.fetchWithAuth('/guilds');
  }

  async fetchGuildMembers(guildId) {
    return this.fetchWithAuth(`/guild/${guildId}/members`);
  }

  async fetchGuildConfig(guildId) {
    return this.fetchWithAuth(`/guild/${guildId}/config`);
  }

  async updateGuildConfig(guildId, config) {
    return this.fetchWithAuth(`/guild/${guildId}/config`, {
      method: 'POST',
      body: JSON.stringify(config)
    });
  }

  async fetchAuditLogs(guildId) {
    return this.fetchWithAuth(`/guild/${guildId}/audit-logs`);
  }

  // Health check
  async healthCheck() {
    try {
      return this.fetchWithAuth('/health');
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
}

// Create singleton instance
export const apiService = new ApiService();

// src/hooks/useApi.js - Custom React hook for API calls
import { useState, useEffect, useCallback } from 'react';

export function useApi(apiCall, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  useEffect(() => {
    if (dependencies.length > 0 && dependencies.every(dep => dep != null)) {
      execute(...dependencies);
    }
  }, dependencies);

  return { data, loading, error, execute };
}
