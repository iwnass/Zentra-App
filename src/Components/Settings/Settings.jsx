import React, { useState } from 'react';

const Settings = () => {
  // State for form controls
  const [autoModEnabled, setAutoModEnabled] = useState(true);
  const [profanityFilterEnabled, setProfanityFilterEnabled] = useState(true);
  const [raidProtectionEnabled, setRaidProtectionEnabled] = useState(false);
  const [defaultMuteRole, setDefaultMuteRole] = useState('muted');

  // Server information (read-only)
  const serverInfo = {
    name: "Zentra Community",
    id: "839271548302750722",
    description: "The official community server for Zentra app users. Join to get support, share feedback, and connect with other server owners using our tools."
  };

  // Available roles for the dropdown
  const availableRoles = [
    { id: 'muted', name: 'Muted' },
    { id: 'timeout', name: 'Timeout' },
    { id: 'restricted', name: 'Restricted' },
    { id: 'silenced', name: 'Silenced' }
  ];

  // Handle refresh server info
  const handleRefresh = () => {
    console.log('Refreshing server information...');
    // In a real app, this would fetch updated server data
  };

  // Handle save changes
  const handleSave = () => {
    console.log('Saving changes:', {
      autoModEnabled,
      profanityFilterEnabled,
      raidProtectionEnabled,
      defaultMuteRole
    });
    // In a real app, this would send the settings to the server
  };

  // Toggle component
  const Toggle = ({ enabled, onChange, label }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-snow">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amethyst focus:ring-offset-2 focus:ring-offset-coal ${
          enabled ? 'bg-amethyst' : 'bg-ash/30'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-snow shadow transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 text-snow">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-lavender">Server Settings</h1>
      </header>

      <div className="space-y-6">
        {/* Server Info (Non-Editable) */}
        <section className="bg-orchid/10 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-lilac mb-4">Server Information</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl text-snow font-medium">{serverInfo.name}</h3>
              <p className="text-sm text-ash mt-1">ID: {serverInfo.id}</p>
            </div>
            <div className="mt-3">
              <p className="text-ash">{serverInfo.description}</p>
            </div>
          </div>
        </section>

        {/* Moderation Settings */}
        <section className="bg-orchid/10 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-lilac mb-4">Moderation Settings</h2>
          <div className="space-y-4">
            <Toggle
              enabled={autoModEnabled}
              onChange={setAutoModEnabled}
              label="Auto-Moderation Enabled"
            />
            <Toggle
              enabled={profanityFilterEnabled}
              onChange={setProfanityFilterEnabled}
              label="Profanity Filter"
            />
            <Toggle
              enabled={raidProtectionEnabled}
              onChange={setRaidProtectionEnabled}
              label="Raid Protection"
            />
            
            <div className="pt-2">
              <label htmlFor="muteRole" className="block text-sm font-medium text-ash mb-2">
                Default Mute Role
              </label>
              <select
                id="muteRole"
                value={defaultMuteRole}
                onChange={(e) => setDefaultMuteRole(e.target.value)}
                className="w-full bg-coal border border-plum/50 rounded-lg px-3 py-2 text-snow focus:outline-none focus:ring-2 focus:ring-amethyst"
              >
                {availableRoles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* General Server Actions */}
        <section className="bg-orchid/10 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-lilac mb-4">Server Actions</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Refresh Server Info
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-500 text-snow rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;