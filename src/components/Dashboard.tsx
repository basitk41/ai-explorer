import { useUserQuery } from '@/queries/useUserQuery';
import FullPageSpinner from '@/components/ui/spinner';
function Dashboard() {
  const { data, isLoading: loading, error } = useUserQuery();

  if (loading) {
    return (
      <div className='mt-8'>
        <FullPageSpinner isLoading={loading} />;
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen text-red-500'>
        {error.message}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className='mt-12'>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>AI Technologies</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {data.dashboardData.map((card) => (
          <div
            key={card.id}
            className='bg-white rounded-lg border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='text-4xl mb-4'>{card.icon}</div>
            <h3 className='text-lg font-bold text-gray-900 mb-2'>
              {card.title}
            </h3>
            <p className='text-gray-600 text-sm'>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
