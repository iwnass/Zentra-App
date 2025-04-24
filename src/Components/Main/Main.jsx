// src/Components/Main/Main.jsx
import React from 'react';

const Main = ({ children }) => {
  return (
    <main className="flex-1 p-6 overflow-y-auto bg-coal">
      <div className="container mx-auto">
        {children || (
          <div className="flex flex-col h-full items-center justify-center text-center p-6">
            <div className="p-6 bg-plum/10 rounded-2xl border border-plum/20 max-w-md">
              <h2 className="text-xl font-semibold mb-2">Welcome to Zentra</h2>
              <p className="text-ash mb-4">
                Your Discord server management panel. Select an option from the sidebar to get started.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <div className="flex items-center p-3 rounded-xl bg-meadow/10 text-meadow border border-meadow/20">
                  <div className="w-3 h-3 rounded-full bg-meadow mr-2" />
                  <span className="text-sm">Discord Connected</span>
                </div>
                <div className="flex items-center p-3 rounded-xl bg-orchid/10 text-lavender border border-orchid/20">
                  <div className="w-3 h-3 rounded-full bg-orchid mr-2" />
                  <span className="text-sm">Bot Online</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Main;