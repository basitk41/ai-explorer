import { toast } from 'sonner';
import { IUserResponse } from '@/types/index';
import api from '../services/api';
import { AxiosError } from 'axios';

export const auth = {
  login: async (email: string, password: string): Promise<IUserResponse> => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      return data as IUserResponse;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || 'Login failed');
      return {
        user: null,
        token: null,
      };
    }
  },
  signup: async (
    email: string,
    name: string,
    password: string
  ): Promise<IUserResponse> => {
    try {
      const { data } = await api.post('/auth/register', {
        email,
        name,
        password,
      });
      return data as IUserResponse;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || 'Signup failed');
      return {
        user: null,
        token: null,
      };
    }
  },
};
