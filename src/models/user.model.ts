import api from '../services/api';
import { AxiosError } from 'axios';
import { IDashboardData } from '@/types/index';

export const user = {
  getDashboardData: async (): Promise<IDashboardData> => {
    try {
      const { data } = await api.get('/user/dashboard');
      return data as IDashboardData;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(
        axiosError.response?.data?.message || 'Failed to fetch dashboard data'
      );
    }
  },
};
