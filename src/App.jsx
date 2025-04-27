// src/App.jsx
import React, { useState } from 'react';
import Layout from './Components/Layout/Layout';
import Analytics from './Components/Analytics/Analytics';
import Main from './Components/Main/Main';
import Security from './Pages/Security';
import AuditLog from './Pages/AuditLog';  

function App() {
  // Set Dashboard as the default page
  const [currentPage, setCurrentPage] = useState('Dashboard');

  // Content to render based on selected page
  const renderContent = () => {
    switch (currentPage) {
      case 'Analytics':
        return <Analytics />;
      case 'Dashboard':
        // This is your default welcome content that should show in Main
        return (
          <Main>
            
          </Main>
        );
      case 'Security':
        return <Security />;
      case 'Audit Log':
        return <AuditLog></AuditLog>;
      case 'Users':
        return <h1 className="text-2xl font-bold text-snow mb-6">Users</h1>;
      case 'Settings':
        return <h1 className="text-2xl font-bold text-snow mb-6">Settings</h1>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderContent()}
      </Layout>
    </div>
  );
}

export default App;