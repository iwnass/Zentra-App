// src/App.jsx
import React, { useState } from 'react';
import Layout from './Components/Layout/Layout';
import Analytics from './Components/Analytics/Analytics';
import Main from './Components/Main/Main';
import Security from './Pages/Security';
import AuditLog from './Pages/AuditLog';  
import Users from './Pages/Users';
import Settings from './Pages/Settings';

function App() {
  // Set Dashboard as the default page
  const [currentPage, setCurrentPage] = useState('Dashboard');

  // Content to render based on selected page
  const renderContent = () => {
    switch (currentPage) {
      case 'Analytics':
        return <Analytics />;
      case 'Dashboard':
        return (
          <Main></Main>
        );
      case 'Security':
        return <Security />;
      case 'Audit Log':
        return <AuditLog></AuditLog>;
      case 'Users':
        return <Users></Users>;
      case 'Settings':
        return <Settings></Settings>;
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