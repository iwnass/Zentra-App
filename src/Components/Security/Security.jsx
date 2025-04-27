import React, { useState } from 'react';
import { Shield, Ban, UserMinus, AtSign, AlertTriangle } from 'lucide-react';

const SecurityPage = () => {
  // Security settings data structure
  const [securitySettings, setSecuritySettings] = useState([
    {
      id: 'anti-raid',
      name: 'Anti-Raid Protection',
      description: 'Automatically detect and block raid attacks on your server',
      enabled: true,
      icon: <Shield className="text-amethyst" size={24} />,
    },
    {
      id: 'anti-spam',
      name: 'Anti-Spam Filter',
      description: 'Prevent spam messages from flooding your channels',
      enabled: true,
      icon: <Ban className="text-amethyst" size={24} />,
    },
    {
      id: 'new-accounts',
      name: 'Kick Newly Created Accounts',
      description: 'Automatically kick accounts younger than 7 days',
      enabled: false,
      icon: <UserMinus className="text-amethyst" size={24} />,
    },
    {
      id: 'mass-mentions',
      name: 'Block Mass Mentions',
      description: 'Prevent abuse of @everyone and @here mentions',
      enabled: true,
      icon: <AtSign className="text-amethyst" size={24} />,
    },
  ]);

  const [punishment, setPunishment] = useState('mute');

  // Toggle handler for security settings
  const handleToggle = (id) => {
    setSecuritySettings(
      securitySettings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  // Punishment type handler
  const handlePunishmentChange = (e) => {
    setPunishment(e.target.value);
  };

  return (
    <div className="min-h-screen bg-coal p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-snow mb-2">Security Settings</h1>
          <p className="text-ash">Configure protection features for your Discord server</p>
        </header>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Security Features Card */}
          <div className="bg-[#212121] rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-snow mb-6 flex items-center">
              <Shield className="mr-2 text-orchid" size={20} />
              Protection Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securitySettings.map((setting) => (
                <div 
                  key={setting.id}
                  className="bg-[#262626] rounded-xl p-4 hover:bg-[#2A2A2A] transition duration-200 border border-[#333333]"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      {setting.icon}
                      <div className="ml-3">
                        <h3 className="font-medium text-snow">{setting.name}</h3>
                        <p className="text-sm text-ash mt-1">{setting.description}</p>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => handleToggle(setting.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orchid focus:ring-offset-1 ${
                          setting.enabled ? 'bg-meadow' : 'bg-[#3A3A3A]'
                        }`}
                        role="switch"
                        aria-checked={setting.enabled}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-snow shadow transition-transform ${
                            setting.enabled ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Punishment System Card */}
          <div className="bg-[#212121] rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-snow mb-6 flex items-center">
              <AlertTriangle className="mr-2 text-orchid" size={20} />
              Punishment System
            </h2>

            <div className="max-w-md">
              <label className="block text-sm font-medium text-lavender mb-2">
                When a rule is broken, automatically:
              </label>
              <div className="relative">
                <select
                  value={punishment}
                  onChange={handlePunishmentChange}
                  className="appearance-none block w-full bg-[#262626] border border-[#333333] rounded-xl px-4 py-3 pr-8 text-snow focus:outline-none focus:ring-2 focus:ring-orchid"
                >
                  <option value="warn">Warn User</option>
                  <option value="mute">Mute User (10 minutes)</option>
                  <option value="kick">Kick User</option>
                  <option value="ban">Ban User</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-lavender">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
              <p className="mt-2 text-sm text-ash">This action will be taken automatically when any of the enabled protections are triggered</p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="px-6 py-3 bg-orchid hover:bg-plum text-snow font-medium rounded-xl transition duration-200 flex items-center"
            >
              Save Settings
            </button>
          </div>
        </div>

        {/* Status Card */}
        <div className="mt-8 bg-[#212121] rounded-2xl p-4 border-l-4 border-meadow">
          <div className="flex">
            <div className="flex-shrink-0">
              <Shield className="h-5 w-5 text-meadow" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-snow">Your server is protected with 3 active security measures</p>
              <p className="text-xs text-ash mt-1">Last update: Today at 2:35 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;