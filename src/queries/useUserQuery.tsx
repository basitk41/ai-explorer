import { useQuery } from '@tanstack/react-query';
import { user } from '@/models/user.model';

export function useUserQuery() {
  return useQuery({
    queryKey: ['dashboardData'],
    queryFn: async () => user.getDashboardData(),
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });
}
