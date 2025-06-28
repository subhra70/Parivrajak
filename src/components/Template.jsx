import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';

function Template() {
  const location = useLocation();

  // Don't show footer on the home page
  const hideFooterOnPaths = ['/','/otp','/emailInp','/resetPass'];
  const shouldHideFooter = hideFooterOnPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex-col">
        <Outlet />
        {!shouldHideFooter && <Footer />}
      </main>
    </div>
  );
}

export default Template;
