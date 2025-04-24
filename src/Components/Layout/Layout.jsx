// src/Components/Layout/Layout.jsx
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Main from '../Main/Main';

const Layout = ({ children, currentPage, onPageChange }) => {
  return (
    <div className="flex h-screen w-full bg-coal text-snow font-sans">
      <Sidebar currentPage={currentPage} onPageChange={onPageChange} />
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Header />
        <Main>{children}</Main>
      </div>
    </div>
  );
};

export default Layout;