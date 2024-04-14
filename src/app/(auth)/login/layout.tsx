import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <div >{children}</div>
    </div>
  );
}

export default Layout