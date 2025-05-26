// // src/Components/Main/Main.jsx
// import React from 'react';

// const Main = ({ children }) => {
//   return (
//     <main className="flex-1 p-6 overflow-y-auto bg-coal">
//       <div className="container mx-auto">
//         {children || (
//           <div className="flex flex-col h-full items-center justify-center text-center p-6">
//             <div className="p-6 bg-plum/10 rounded-2xl border border-plum/20 max-w-md">
//               <h2 className="text-xl font-semibold mb-2">Welcome to Zentra</h2>
//               <p className="text-ash mb-4">
//                 Your Discord server management panel. Select an option from the sidebar to get started.
//               </p>
//               {/* <div className="flex flex-wrap gap-3 justify-center">
//                 <div className="flex items-center p-3 rounded-xl bg-meadow/10 text-meadow border border-meadow/20">
//                   <div className="w-3 h-3 rounded-full bg-meadow mr-2" />
//                   <span className="text-sm">Discord Connected</span>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default Main;

import React, { useState, useEffect } from 'react';

// Discord OAuth configuration
const DISCORD_CONFIG = {
  clientId: '1376196426123710646', // Replace with your Discord app client ID
  redirectUri: 'http://localhost:3000/api/auth/callback', // Your OAuth redirect URI
  scope: 'identify guilds',
  apiEndpoint: 'https://discord.com/api/v10',
  backendUrl: 'http://localhost:3000'
};

// Mock user state - replace with your actual auth context
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userGuilds, setUserGuilds] = useState([]);
  const [loading, setLoading] = useState(false);

  // Generate Discord OAuth URL
  const getDiscordAuthUrl = () => {
    const params = new URLSearchParams({
      client_id: DISCORD_CONFIG.clientId,
      redirect_uri: DISCORD_CONFIG.redirectUri,
      response_type: 'code',
      scope: DISCORD_CONFIG.scope,
    });
    return `https://discord.com/api/oauth2/authorize?${params}`;
  };

  // Handle Discord login
  const loginWithDiscord = () => {
    window.location.href = getDiscordAuthUrl();
  };

  // Exchange code for token and get user data
  const handleAuthCallback = async (code) => {
    try {
      setLoading(true);
      
      // Exchange code for access token (this should be done on your backend)
      const tokenResponse = await fetch(`${DISCORD_CONFIG.backendUrl}/api/auth/discord/callback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      const { access_token } = await tokenResponse.json();
      
      // Get user info
      const userResponse = await fetch(`${DISCORD_CONFIG.apiEndpoint}/users/@me`, {
        headers: { 'Authorization': `Bearer ${access_token}` }
      });
      const userData = await userResponse.json();
      
      // Get user guilds
      const guildsResponse = await fetch(`${DISCORD_CONFIG.apiEndpoint}/users/@me/guilds`, {
        headers: { 'Authorization': `Bearer ${access_token}` }
      });
      const guildsData = await guildsResponse.json();
      
      // Filter guilds that have Zentra bot (you'll need to check this via your API)
      const zentraGuilds = await filterZentraGuilds(guildsData);
      
      setUser(userData);
      setUserGuilds(zentraGuilds);
      
      // Store tokens securely
      localStorage.setItem('discord_token', access_token);
      localStorage.setItem('user_data', JSON.stringify(userData));
      
    } catch (error) {
      console.error('Discord auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter guilds that have Zentra bot
  const filterZentraGuilds = async (guilds) => {
    try {
      // Call your API to check which guilds have Zentra bot
      const response = await fetch(`${DISCORD_CONFIG.backendUrl}/api/guilds/with-zentra`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guild_ids: guilds.map(g => g.id) })
      });
      const zentraGuildIds = await response.json();
      
      return guilds.filter(guild => zentraGuildIds.includes(guild.id));
    } catch (error) {
      console.error('Error filtering Zentra guilds:', error);
      return guilds; // Return all guilds if filter fails
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setUserGuilds([]);
    localStorage.removeItem('discord_token');
    localStorage.removeItem('user_data');
  };

  // Check for existing auth on component mount
  useEffect(() => {
    const token = localStorage.getItem('discord_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      // Optionally refresh guild data
    }

    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      handleAuthCallback(code);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return {
    user,
    userGuilds,
    loading,
    loginWithDiscord,
    logout
  };
};

const Main = ({ children }) => {
  const { user, userGuilds, loading, loginWithDiscord, logout } = useAuth();

  // Get user avatar URL
  const getUserAvatarUrl = (user) => {
    if (!user) return null;
    if (user.avatar) {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
    }
    // Default Discord avatar
    return `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`;
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-plum/10 border-b border-plum/20 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-snow">Zentra Dashboard</h1>
            {user && userGuilds.length > 0 && (
              <p className="text-sm text-ash">
                Managing {userGuilds.length} server{userGuilds.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          
          {/* User Info / Login */}
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="flex items-center gap-2 text-ash">
                <div className="w-4 h-4 border-2 border-plum/30 border-t-plum rounded-full animate-spin"></div>
                <span>Connecting...</span>
              </div>
            ) : user ? (
              <div className="flex items-center gap-3">
                {/* Guild Selection Dropdown */}
                {userGuilds.length > 0 && (
                  <select className="bg-coal border border-plum/30 text-snow rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-plum">
                    <option value="">Select Server</option>
                    {userGuilds.map(guild => (
                      <option key={guild.id} value={guild.id}>
                        {guild.name}
                      </option>
                    ))}
                  </select>
                )}
                
                {/* User Info */}
                <div className="flex items-center gap-2 bg-plum/20 rounded-lg px-3 py-2">
                  <img
                    src={getUserAvatarUrl(user)}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-right">
                    <p className="text-sm font-medium text-snow">
                      {user.global_name || user.username}
                    </p>
                    <p className="text-xs text-ash">
                      {user.username}#{user.discriminator}
                    </p>
                  </div>
                  
                  {/* Logout Button */}
                  <button
                    onClick={logout}
                    className="ml-2 text-ash hover:text-rose transition-colors text-sm"
                    title="Logout"
                  >
                    ×
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={loginWithDiscord}
                className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Login with Discord
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-coal">
        <div className="container mx-auto">
          {children || (
            <div className="flex flex-col h-full items-center justify-center text-center p-6">
              <div className="p-6 bg-plum/10 rounded-2xl border border-plum/20 max-w-md">
                {!user ? (
                  <>
                    <h2 className="text-xl font-semibold mb-2 text-snow">Welcome to Zentra</h2>
                    <p className="text-ash mb-4">
                      Connect your Discord account to manage your servers with Zentra bot.
                    </p>
                    <button
                      onClick={loginWithDiscord}
                      className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-lg font-medium transition-colors mx-auto"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                      Connect Discord Account
                    </button>
                  </>
                ) : userGuilds.length === 0 ? (
                  <>
                    <h2 className="text-xl font-semibold mb-2 text-snow">No Servers Found</h2>
                    <p className="text-ash mb-4">
                      You don't have access to any servers with Zentra bot. Make sure Zentra is added to your server and you have management permissions.
                    </p>
                    <div className="text-center">
                      <a
                        href="https://discord.com/api/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-meadow hover:bg-meadow/80 text-coal px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Add Zentra to Server
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold mb-2 text-snow">Welcome back, {user.global_name || user.username}!</h2>
                    <p className="text-ash mb-4">
                      Select a server from the dropdown above or choose an option from the sidebar to get started.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <div className="flex items-center p-3 rounded-xl bg-meadow/10 text-meadow border border-meadow/20">
                        <div className="w-3 h-3 rounded-full bg-meadow mr-2" />
                        <span className="text-sm">Discord Connected</span>
                      </div>
                      <div className="flex items-center p-3 rounded-xl bg-plum/10 text-plum border border-plum/20">
                        <div className="w-3 h-3 rounded-full bg-plum mr-2" />
                        <span className="text-sm">{userGuilds.length} Server{userGuilds.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Main;