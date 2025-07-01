import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';

function Template() {
  const location = useLocation();

  const hideFooterOnPaths = ['/', '/otp', '/emailInp', '/resetPass'];
  const shouldHideFooter = hideFooterOnPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      {!shouldHideFooter && <Footer />}
    </div>
  );
}

export default Template;
