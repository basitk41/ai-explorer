import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FullPageSpinner from '@/components/ui/spinner';

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <FullPageSpinner isLoading={isLoading} />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-white'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
