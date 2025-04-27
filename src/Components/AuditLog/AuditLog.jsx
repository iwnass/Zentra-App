import React, { useState } from 'react';

const AuditLog = () => {
  // Static audit log data
  const auditEvents = [
    {
      id: 1,
      type: 'Member Ban',
      user: 'ModeratorAlpha#1234',
      target: 'ToxicGamer#5678',
      timestamp: new Date('2025-04-27T15:30:00+03:00'),
      status: 'success',
    },
    {
      id: 2,
      type: 'Channel Create',
      user: 'ServerAdmin#0001',
      target: '#announcements',
      timestamp: new Date('2025-04-27T14:15:00+03:00'),
      status: 'success',
    },
    {
      id: 3,
      type: 'Role Update',
      user: 'SuperMod#4321',
      target: '"VIP Members"',
      timestamp: new Date('2025-04-26T20:45:00+03:00'),
      status: 'fail',
    },
    {
      id: 4,
      type: 'Settings Update',
      user: 'ServerOwner#9999',
      target: 'Server Verification Level',
      timestamp: new Date('2025-04-26T18:30:00+03:00'),
      status: 'success',
    },
    {
      id: 5,
      type: 'Member Ban',
      user: 'ModeratorBeta#5555',
      target: 'Spammer#1212',
      timestamp: new Date('2025-04-25T22:10:00+03:00'),
      status: 'success',
    },
    {
      id: 6,
      type: 'Channel Delete',
      user: 'ServerAdmin#0001',
      target: '#old-stuff',
      timestamp: new Date('2025-04-25T17:45:00+03:00'),
      status: 'success',
    },
    {
      id: 7,
      type: 'Role Create',
      user: 'ServerOwner#9999',
      target: '"Contest Winners"',
      timestamp: new Date('2025-04-25T14:20:00+03:00'),
      status: 'success',
    },
    {
      id: 8,
      type: 'Settings Update',
      user: 'ServerAdmin#0001',
      target: 'Server Name',
      timestamp: new Date('2025-04-24T10:15:00+03:00'),
      status: 'fail',
    },
    {
      id: 9,
      type: 'Role Delete',
      user: 'SuperMod#4321',
      target: '"Inactive Members"',
      timestamp: new Date('2025-04-24T09:30:00+03:00'),
      status: 'success',
    },
  ];

  // State for filtering
  const [filter, setFilter] = useState('All Events');

  // Filter options
  const filterOptions = [
    'All Events',
    'Member Bans',
    'Channel Changes',
    'Role Changes',
    'Settings Updates',
  ];

  // Filter events based on selection
  const filteredEvents = auditEvents.filter(event => {
    if (filter === 'All Events') return true;
    if (filter === 'Member Bans' && event.type.includes('Member Ban')) return true;
    if (filter === 'Channel Changes' && event.type.includes('Channel')) return true;
    if (filter === 'Role Changes' && event.type.includes('Role')) return true;
    if (filter === 'Settings Updates' && event.type.includes('Settings')) return true;
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
    
    // Format as DD/MM/YYYY HH:MM in Greece's timezone
    const formattedDate = timestamp.toLocaleString('en-GB', options).replace(',', '');
    return `${formattedDate} (GMT+${timestamp.getTimezoneOffset() === -180 ? '3' : '2'})`;
  };

  // Status indicators
  const statusIndicator = (status) => {
    return status === 'success' ? (
      <span className="text-meadow">✅</span>
    ) : (
      <span className="text-rose">❌</span>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6 text-snow">Audit Log</h1>
      
      {/* Filter Dropdown */}
      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-coal text-snow border border-plum rounded-xl px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-amethyst"
        >
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      {/* Audit Log Table */}
      <div className="bg-[#1e1527] border border-amethyst/30 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 bg-[#2a1a35] p-4 font-semibold text-snow border-b border-amethyst/30">
          <div className="col-span-2">Event Type</div>
          <div className="col-span-2">Username</div>
          <div className="col-span-3">Target</div>
          <div className="col-span-4">Timestamp</div>
          <div className="col-span-1 text-center">Status</div>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-amethyst/20">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`grid grid-cols-12 gap-2 p-4 ${
                index % 2 === 0 ? 'bg-[#1e1527]' : 'bg-[#241a2d]'
              }`}
            >
              <div className="col-span-2 font-medium text-snow">{event.type}</div>
              <div className="col-span-2 text-amethyst">{event.user}</div>
              <div className="col-span-3 text-lavender">{event.target}</div>
              <div className="col-span-4 text-ash">
                {formatTimestamp(event.timestamp)}
              </div>
              <div className="col-span-1 text-center">
                {statusIndicator(event.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {filteredEvents.length === 0 && (
        <div className="text-center py-8 text-ash bg-[#1e1527] border border-amethyst/30 rounded-2xl">
          No matching events found.
        </div>
      )}
    </div>
  );
};

export default AuditLog;