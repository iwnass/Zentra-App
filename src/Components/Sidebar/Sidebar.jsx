// src/Components/Sidebar/Sidebar.jsx
import React from 'react';
import {
  Home,
  Shield,
  BarChart2,
  ClipboardList,
  Users,
  Settings,
} from 'lucide-react';

const Sidebar = ({ currentPage, onPageChange }) => {
  const navigation = [
    { name: 'Dashboard', icon: Home, current: currentPage === 'Dashboard' },
    { name: 'Security', icon: Shield, current: currentPage === 'Security' },
    { name: 'Analytics', icon: BarChart2, current: currentPage === 'Analytics' },
    { name: 'Audit Log', icon: ClipboardList, current: currentPage === 'Audit Log' },
    { name: 'Users', icon: Users, current: currentPage === 'Users' },
    { name: 'Settings', icon: Settings, current: currentPage === 'Settings' },
  ];

  return (
    <div className="flex flex-col w-64 bg-plum rounded-r-2xl">
      <div className="flex items-center justify-center h-16 px-6 py-4">
        <h1 className="text-2xl font-bold text-snow">Zentra</h1>
      </div>
      <div className="flex flex-col flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                item.current
                  ? 'bg-orchid text-snow'
                  : 'text-lavender hover:bg-orchid/50 hover:text-snow'
              }`}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(item.name);
              }}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </a>
          );
        })}
      </div>
      <div className="p-4">
        <div className="flex items-center p-3 rounded-xl bg-orchid/30">
          <div className="w-8 h-8 rounded-lg bg-amethyst flex items-center justify-center text-xs font-medium text-snow">
            Server <br /> Icon
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-snow">Server Name</p>
            <p className="text-xs text-lilac">Member Count</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;