import React from 'react';
import { useApiContext } from '../contexts/ApiContext.js';

export function ApiStatus() {
  const { apiStatus } = useApiContext();
  
  const statusConfig = {
    connected: { color: 'text-green-400', icon: '🟢', text: 'Connected' },
    error: { color: 'text-red-400', icon: '🔴', text: 'Disconnected' },
    unknown: { color: 'text-yellow-400', icon: '🟡', text: 'Connecting...' }
  };
  
  const config = statusConfig[apiStatus] || statusConfig.unknown;
  
  return (
    <div className={`flex items-center gap-2 text-sm ${config.color}`}>
      <span>{config.icon}</span>
      <span>API: {config.text}</span>
    </div>
  );
}