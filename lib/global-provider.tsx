import { getUser } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { createContext, useContext } from "react";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

type GlobalContextType = {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getUser,
  });

  const isLoggedIn = !!user;

  return (
    <GlobalContext.Provider
      value={{ user: user ?? null, isLoggedIn, loading, refetch }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};
