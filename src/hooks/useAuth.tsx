import { useContext } from "react";
import { IAuthContextType } from "@/types/index";
import { AuthContext } from "@/contexts/AuthContext";

export const useAuth = (): IAuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };