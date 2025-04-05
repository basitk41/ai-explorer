import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className='bg-white shadow-sm'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='flex items-center'>
          <div className='bg-gradient-to-r from-purple-500 to-purple-700 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl mr-3'>
            AI
          </div>
          <h1 className='text-xl font-bold text-gray-900 hidden md:block'>
            AI Explorer
          </h1>
        </div>
        <div className='flex items-center'>
          <span className='text-gray-700 mr-4 hidden md:block'>
            Welcome, <span className='font-medium'>{user?.name}</span>
          </span>
          <Button variant='ghost' onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
