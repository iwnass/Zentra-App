import React, { useState } from 'react';

const UserManagement = () => {
  // Dummy user data with consistent timestamp format
  const dummyUsers = [
    {
      id: 1,
      name: "AlexTheGreat#1234",
      createdAt: new Date('2020-03-14T13:22:00+03:00'),
      joinedAt: new Date('2023-01-05T09:45:00+03:00'),
      roles: ["Admin", "Moderator", "VIP"]
    },
    {
      id: 2,
      name: "PixelPerfect#4567",
      createdAt: new Date('2021-07-23T17:30:00+03:00'),
      joinedAt: new Date('2023-02-12T14:15:00+03:00'),
      roles: ["Designer", "Developer"]
    },
    {
      id: 3,
      name: "NightOwl#8901",
      createdAt: new Date('2019-10-02T22:10:00+03:00'),
      joinedAt: new Date('2022-12-27T23:05:00+03:00'),
      roles: ["Moderator", "Nightwatch"]
    },
    {
      id: 4,
      name: "CodeMaster#2345",
      createdAt: new Date('2018-05-15T11:20:00+03:00'),
      joinedAt: new Date('2023-03-03T16:30:00+03:00'),
      roles: ["Developer", "Bot Engineer"]
    },
    {
      id: 5,
      name: "MelodyMaker#6789",
      createdAt: new Date('2022-02-07T19:45:00+03:00'),
      joinedAt: new Date('2023-04-14T12:00:00+03:00'),
      roles: ["Music Producer", "Event Organizer"]
    },
    {
      id: 6,
      name: "ServerSage#0123",
      createdAt: new Date('2020-11-30T08:15:00+03:00'),
      joinedAt: new Date('2023-01-21T10:45:00+03:00'),
      roles: ["Admin", "Support Specialist", "Developer", "Nightwatch", "Event Organizer"]
    }
  ];

  // State for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All Users');

  // Filter options
  const filterOptions = [
    'All Users',
    'Admins',
    'Moderators',
    'Developers',
    'Recent Joins'
  ];

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

  // Filter users based on search term and dropdown filter
  const filteredUsers = dummyUsers.filter(user => {
    // Search filter
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.roles.some(role => role.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Role filter
    let matchesRoleFilter = true;
    if (filter === 'Admins') {
      matchesRoleFilter = user.roles.includes('Admin');
    } else if (filter === 'Moderators') {
      matchesRoleFilter = user.roles.includes('Moderator');
    } else if (filter === 'Developers') {
      matchesRoleFilter = user.roles.includes('Developer') || user.roles.includes('Bot Engineer');
    } else if (filter === 'Recent Joins') {
      // Users who joined in 2023
      matchesRoleFilter = user.joinedAt.getFullYear() >= 2023;
    }
    
    return matchesSearch && matchesRoleFilter;
  });

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-2xl font-bold mb-6 text-snow">User Management</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search users..."
            className="bg-coal text-snow border border-plum rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-amethyst placeholder-ash"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filter Dropdown */}
        <div className="w-full md:w-64">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-coal text-snow border border-plum rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-amethyst"
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* User Table */}
      <div className="bg-[#1e1527] border border-amethyst/30 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 bg-[#2a1a35] p-4 font-semibold text-snow border-b border-amethyst/30">
          <div className="col-span-2">Username</div>
          <div className="col-span-2">Created</div>
          <div className="col-span-2">Joined</div>
          <div className="col-span-4">Roles</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-amethyst/20">
          {filteredUsers.map((user, index) => (
            <div
              key={user.id}
              className={`grid grid-cols-12 gap-2 p-4 ${
                index % 2 === 0 ? 'bg-[#1e1527]' : 'bg-[#241a2d]'
              }`}
            >
              <div className="col-span-2 font-medium text-snow">{user.name}</div>
              <div className="col-span-2 text-ash">{formatTimestamp(user.createdAt)}</div>
              <div className="col-span-2 text-ash">{formatTimestamp(user.joinedAt)}</div>
              <div className="col-span-4">
                <div className="flex flex-wrap gap-1.5">
                  {user.roles.map((role, roleIndex) => (
                    <span 
                      key={roleIndex}
                      className="bg-orchid/20 text-sm px-3 py-1 rounded-full text-lavender font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center gap-1.5">
                <div className="flex items-center">
                  <button className="h-7 border border-amber-400 text-amber-400 px-2 py-0.5 rounded text-xs hover:bg-amber-400/10 transition duration-200">
                    Kick
                  </button>
                </div>
                <div className="flex items-center">
                  <button className="h-7 bg-rose text-snow px-2 py-0.5 rounded text-xs hover:bg-rose/90 transition duration-200">
                    Ban
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-ash bg-[#1e1527] border border-amethyst/30 rounded-2xl">
          No users found matching "{searchTerm}".
        </div>
      )}
    </div>
  );
};

export default UserManagement;