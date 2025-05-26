// import React, { useState } from 'react';

// const AuditLog = () => {
//   // Static audit log data
//   const auditEvents = [
//     {
//       id: 1,
//       type: 'Member Ban',
//       user: 'ModeratorAlpha#1234',
//       target: 'ToxicGamer#5678',
//       timestamp: new Date('2025-04-27T15:30:00+03:00'),
//       status: 'success',
//     },
//     {
//       id: 2,
//       type: 'Channel Create',
//       user: 'ServerAdmin#0001',
//       target: '#announcements',
//       timestamp: new Date('2025-04-27T14:15:00+03:00'),
//       status: 'success',
//     },
//     {
//       id: 3,
//       type: 'Role Update',
//       user: 'SuperMod#4321',
//       target: '"VIP Members"',
//       timestamp: new Date('2025-04-26T20:45:00+03:00'),
//       status: 'fail',
//     },
//     {
//       id: 4,
//       type: 'Settings Update',
//       user: 'ServerOwner#9999',
//       target: 'Server Verification Level',
//       timestamp: new Date('2025-04-26T18:30:00+03:00'),
//       status: 'success',
//     },
//     {
//       id: 5,
//       type: 'Member Ban',
//       user: 'ModeratorBeta#5555',
//       target: 'Spammer#1212',
//       timestamp: new Date('2025-04-25T22:10:00+03:00'),
//       status: 'success',
//     },
//     {
//       id: 6,
//       type: 'Channel Delete',
//       user: 'ServerAdmin#0001',
//       target: '#old-stuff',
//       timestamp: new Date('2025-04-25T17:45:00+03:00'),
//       status: 'success',
//     },
//     {
//       id: 7,
//       type: 'Role Create',
//       user: 'ServerOwner#9999',
//       target: '"Contest Winners"',
//       timestamp: new Date('2025-04-25T14:20:00+03:00'),
//       status: 'success',
//     },
//     {
//       id: 8,
//       type: 'Settings Update',
//       user: 'ServerAdmin#0001',
//       target: 'Server Name',
//       timestamp: new Date('2025-04-24T10:15:00+03:00'),
//       status: 'fail',
//     },
//     {
//       id: 9,
//       type: 'Role Delete',
//       user: 'SuperMod#4321',
//       target: '"Inactive Members"',
//       timestamp: new Date('2025-04-24T09:30:00+03:00'),
//       status: 'success',
//     },
//   ];

//   // State for filtering
//   const [filter, setFilter] = useState('All Events');

//   // Filter options
//   const filterOptions = [
//     'All Events',
//     'Member Bans',
//     'Channel Changes',
//     'Role Changes',
//     'Settings Updates',
//   ];

//   // Filter events based on selection
//   const filteredEvents = auditEvents.filter(event => {
//     if (filter === 'All Events') return true;
//     if (filter === 'Member Bans' && event.type.includes('Member Ban')) return true;
//     if (filter === 'Channel Changes' && event.type.includes('Channel')) return true;
//     if (filter === 'Role Changes' && event.type.includes('Role')) return true;
//     if (filter === 'Settings Updates' && event.type.includes('Settings')) return true;
//     return false;
//   });

//   // Format timestamp to numeric format in Greek timezone
//   const formatTimestamp = (timestamp) => {
//     const options = {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       timeZone: 'Europe/Athens',
//       hour12: false
//     };
    
//     // Format as DD/MM/YYYY HH:MM in Greece's timezone
//     const formattedDate = timestamp.toLocaleString('en-GB', options).replace(',', '');
//     return `${formattedDate} (GMT+${timestamp.getTimezoneOffset() === -180 ? '3' : '2'})`;
//   };

//   // Status indicators
//   const statusIndicator = (status) => {
//     return status === 'success' ? (
//       <span className="text-meadow">✅</span>
//     ) : (
//       <span className="text-rose">❌</span>
//     );
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-7xl">
//       <h1 className="text-2xl font-bold mb-6 text-snow">Audit Log</h1>
      
//       {/* Filter Dropdown */}
//       <div className="mb-6">
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="bg-coal text-snow border border-plum rounded-xl px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-amethyst"
//         >
//           {filterOptions.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </div>
      
//       {/* Audit Log Table */}
//       <div className="bg-[#1e1527] border border-amethyst/30 rounded-2xl overflow-hidden">
//         {/* Table Header */}
//         <div className="grid grid-cols-12 gap-2 bg-[#2a1a35] p-4 font-semibold text-snow border-b border-amethyst/30">
//           <div className="col-span-2">Event Type</div>
//           <div className="col-span-2">Username</div>
//           <div className="col-span-3">Target</div>
//           <div className="col-span-4">Timestamp</div>
//           <div className="col-span-1 text-center">Status</div>
//         </div>
        
//         {/* Table Body */}
//         <div className="divide-y divide-amethyst/20">
//           {filteredEvents.map((event, index) => (
//             <div
//               key={event.id}
//               className={`grid grid-cols-12 gap-2 p-4 ${
//                 index % 2 === 0 ? 'bg-[#1e1527]' : 'bg-[#241a2d]'
//               }`}
//             >
//               <div className="col-span-2 font-medium text-snow">{event.type}</div>
//               <div className="col-span-2 text-amethyst">{event.user}</div>
//               <div className="col-span-3 text-lavender">{event.target}</div>
//               <div className="col-span-4 text-ash">
//                 {formatTimestamp(event.timestamp)}
//               </div>
//               <div className="col-span-1 text-center">
//                 {statusIndicator(event.status)}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {filteredEvents.length === 0 && (
//         <div className="text-center py-8 text-ash bg-[#1e1527] border border-amethyst/30 rounded-2xl">
//           No matching events found.
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuditLog;


import React, { useState, useEffect } from 'react';

// API configuration - you'll want to move this to a config file
const API_CONFIG = {
  baseUrl: 'http://localhost:3000', // Replace with your actual API URL
  apiKey: 'supersecretpaneltoken123' // In production, get this from secure storage
};

// API service functions
const apiService = {
  async fetchAuditLogs(guildId) {
    const response = await fetch(`${API_CONFIG.baseUrl}/guild/${guildId}/audit-logs`, {
      headers: {
        'Authorization': API_CONFIG.apiKey,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch audit logs: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  },

  async fetchGuilds() {
    const response = await fetch(`${API_CONFIG.baseUrl}/guilds`, {
      headers: {
        'Authorization': API_CONFIG.apiKey,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch guilds: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  }
};

const AuditLog = ({ selectedGuildId = null }) => {
  // State management
  const [auditEvents, setAuditEvents] = useState([]);
  const [guilds, setGuilds] = useState([]);
  const [selectedGuild, setSelectedGuild] = useState(selectedGuildId || '');
  const [filter, setFilter] = useState('All Events');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Filter options
  const filterOptions = [
    'All Events',
    'Member Bans',
    'Channel Changes',
    'Role Changes',
    'Settings Updates',
  ];

  // Load guilds on component mount
  useEffect(() => {
    const loadGuilds = async () => {
      try {
        setLoading(true);
        const guildData = await apiService.fetchGuilds();
        setGuilds(guildData);
        
        // Auto-select first guild if none selected
        if (!selectedGuild && guildData.length > 0) {
          setSelectedGuild(guildData[0].id);
        }
      } catch (err) {
        setError(`Failed to load guilds: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadGuilds();
  }, []);

  // Load audit logs when guild changes
  useEffect(() => {
    if (!selectedGuild) return;

    const loadAuditLogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const logs = await apiService.fetchAuditLogs(selectedGuild);
        
        // Transform API data to match component expectations
        const transformedLogs = logs.map(log => ({
          id: log.id,
          type: log.action_type || log.type,
          user: log.executor?.tag || log.user,
          target: log.target?.name || log.target,
          timestamp: new Date(log.created_at || log.timestamp),
          status: log.status || 'success' // Default to success if not provided
        }));
        
        setAuditEvents(transformedLogs);
        setLastUpdated(new Date());
      } catch (err) {
        setError(`Failed to load audit logs: ${err.message}`);
        setAuditEvents([]); // Clear previous data on error
      } finally {
        setLoading(false);
      }
    };

    loadAuditLogs();
  }, [selectedGuild]);

  // Manual refresh function
  const handleRefresh = () => {
    if (selectedGuild) {
      // Trigger re-fetch by updating the dependency
      setSelectedGuild(selectedGuild);
    }
  };

  // Filter events based on selection
  const filteredEvents = auditEvents.filter(event => {
    if (filter === 'All Events') return true;
    if (filter === 'Member Bans' && event.type.toLowerCase().includes('ban')) return true;
    if (filter === 'Channel Changes' && event.type.toLowerCase().includes('channel')) return true;
    if (filter === 'Role Changes' && event.type.toLowerCase().includes('role')) return true;
    if (filter === 'Settings Updates' && event.type.toLowerCase().includes('settings') || event.type.toLowerCase().includes('update')) return true;
    return false;
  });

  // Format timestamp to numeric format in Greek timezone
  const formatTimestamp = (timestamp) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Athens',
      hour12: false
    };
    
    const formattedDate = timestamp.toLocaleString('en-GB', options).replace(',', '');
    return `${formattedDate} (GMT+${timestamp.getTimezoneOffset() === -180 ? '3' : '2'})`;
  };

  // Status indicators
  const statusIndicator = (status) => {
    return status === 'success' ? (
      <span className="text-green-400">✅</span>
    ) : (
      <span className="text-red-400">❌</span>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Audit Log</h1>
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <span className="text-sm text-gray-400">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {loading ? '🔄' : '↻'} Refresh
          </button>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
          <strong>Error:</strong> {error}
          <button 
            onClick={() => setError(null)}
            className="float-right text-red-300 hover:text-red-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Guild and Filter Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Guild Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Guild
          </label>
          <select
            value={selectedGuild}
            onChange={(e) => setSelectedGuild(e.target.value)}
            disabled={loading}
            className="bg-gray-800 text-white border border-purple-600 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          >
            <option value="">Select a guild...</option>
            {guilds.map((guild) => (
              <option key={guild.id} value={guild.id}>
                {guild.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Filter Events
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            disabled={loading}
            className="bg-gray-800 text-white border border-purple-600 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          <p className="text-gray-400 mt-2">Loading audit logs...</p>
        </div>
      )}

      {/* Audit Log Table */}
      {!loading && selectedGuild && (
        <div className="bg-gray-900 border border-purple-600/30 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 bg-gray-800 p-4 font-semibold text-white border-b border-purple-600/30">
            <div className="col-span-2">Event Type</div>
            <div className="col-span-2">Username</div>
            <div className="col-span-3">Target</div>
            <div className="col-span-4">Timestamp</div>
            <div className="col-span-1 text-center">Status</div>
          </div>
          
          {/* Table Body */}
          <div className="divide-y divide-purple-600/20">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className={`grid grid-cols-12 gap-2 p-4 ${
                  index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                }`}
              >
                <div className="col-span-2 font-medium text-white">{event.type}</div>
                <div className="col-span-2 text-purple-300">{event.user}</div>
                <div className="col-span-3 text-blue-300">{event.target}</div>
                <div className="col-span-4 text-gray-400">
                  {formatTimestamp(event.timestamp)}
                </div>
                <div className="col-span-1 text-center">
                  {statusIndicator(event.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* No Data States */}
      {!loading && !selectedGuild && (
        <div className="text-center py-8 text-gray-400 bg-gray-900 border border-purple-600/30 rounded-2xl">
          Please select a guild to view audit logs.
        </div>
      )}
      
      {!loading && selectedGuild && filteredEvents.length === 0 && !error && (
        <div className="text-center py-8 text-gray-400 bg-gray-900 border border-purple-600/30 rounded-2xl">
          No matching events found for the selected filters.
        </div>
      )}
    </div>
  );
};

export default AuditLog;