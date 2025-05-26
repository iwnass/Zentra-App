import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../Services/apiService';

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [guilds, setGuilds] = useState([]);
  const [selectedGuild, setSelectedGuild] = useState(null);
  const [apiStatus, setApiStatus] = useState('unknown');

  // Initialize API connection
  useEffect(() => {
    const initializeApi = async () => {
      try {
        const health = await apiService.healthCheck();
        setApiStatus(health.status === 'ok' ? 'connected' : 'error');
        
        // Load guilds on startup
        const guildData = await apiService.fetchGuilds();
        setGuilds(guildData);
        
        // Auto-select first guild
        if (guildData.length > 0) {
          setSelectedGuild(guildData[0]);
        }
      } catch (error) {
        console.error('Failed to initialize API:', error);
        setApiStatus('error');
      }
    };

    initializeApi();
  }, []);

  const value = {
    guilds,
    selectedGuild,
    setSelectedGuild,
    apiStatus,
    apiService
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApiContext() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }
  return context;
}