// Header.jsx
import React from 'react';
import { Bell, Settings, LogOut } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-coal border-b border-plum/30">
      <div className="flex items-center">
        <h2 className="text-lg font-medium">Zentra Dashboard</h2>
        {/* <span className="ml-2 px-2 py-1 text-xs rounded-full bg-orchid text-snow">Premium</span> */}
      </div>
      
      <div className="flex items-center space-x-4">      
        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">Discord Name</span>
            {/* <span className="text-xs text-ash">Server Owner</span> */}
          </div>
          
          <div className="w-9 h-9 rounded-xl bg-amethyst flex items-center justify-center text-sm font-medium text-snow">
            Discord <br /> pic
          </div>
          
          
        </div>
      </div>
    </header>
  );
};

export default Header;