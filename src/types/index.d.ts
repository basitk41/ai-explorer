export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserResponse {
  user: IUser;
  token: string;
}

export interface IAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface IAICard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface IDashboardData {
  message: string;
  user: {
    id: string;
    email: string;
  };
  dashboardData: IAICard[];
}
