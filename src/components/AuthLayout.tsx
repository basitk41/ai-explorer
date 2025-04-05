
import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

export const AuthLayout = ({ children, className }: AuthLayoutProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/app");
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white p-4">
      <div
        className={cn(
          "w-full max-w-md bg-white rounded-xl shadow-lg p-8 animate-fadeIn",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
