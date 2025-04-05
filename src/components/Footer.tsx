const Footer = () => {
  return (
    <footer className='bg-gray-50 border-t border-gray-100 py-6'>
      <div className='container mx-auto px-4 text-center text-gray-500 text-sm'>
        &copy; {new Date().getFullYear()} AI Explorer Application. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
