import React, { createContext, useState, useEffect, ReactNode } from "react";
import { IAuthContextType } from "@/types/index";
import { toast } from "sonner";
import models from "@/models";


interface User {
  id: string;
  email: string;
  name: string;
}

export const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      const savedUser = localStorage.getItem("auth-user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try { 
      const data = await models.auth.login(email, password);
      
      const loggedInUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email
      };
      
      setUser(loggedInUser);
      localStorage.setItem("auth-token", data.token);
      localStorage.setItem("auth-user", JSON.stringify(loggedInUser));
      toast.success("Logged in successfully");
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, name: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const data = await models.auth.signup(email, name, password);
      
      const loggedInUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email
      };
      
      setUser(loggedInUser);
      localStorage.setItem("auth-token", data.token);
      localStorage.setItem("auth-user", JSON.stringify(loggedInUser));
      toast.success("Account created successfully");
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user");
    toast.info("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
