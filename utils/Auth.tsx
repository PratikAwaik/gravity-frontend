import { useRouter } from "next/router";
import * as React from "react";
import StorageService from "../services/storage";
import { AUTH, PAGES } from "./constants";

interface AuthContextProps {
  currentUser: any;
  getUser: () => string | null;
  setUser: (token: string) => void;
  removeUser: () => void;
  logout: () => void;
}

const initialAuthContextState = {
  currentUser: null,
  getUser: () => "",
  setUser: () => {},
  removeUser: () => {},
  logout: () => {},
};

const AuthContext = React.createContext<AuthContextProps>(
  initialAuthContextState
);

export const useAuth = () => {
  return React.useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  React.useEffect(() => {
    const user = getUser();
    if (!user && !AUTH.PAGES_TO_EXCLUDE.includes(router.pathname)) {
      router.replace(PAGES.LOGIN);
    }
  }, [router.pathname]);

  const getUser = () => {
    const user = StorageService.getItem(AUTH.LS_CURRENT_USER_KEY);
    if (user) return JSON.parse(user);
    return null;
  };

  const setUser = (user: any) => {
    StorageService.setItem(AUTH.LS_CURRENT_USER_KEY, JSON.stringify(user));
  };

  const removeUser = () => {
    StorageService.removeItem(AUTH.LS_CURRENT_USER_KEY);
  };

  const logout = () => {
    removeUser();
    router.push(PAGES.INDEX);
  };

  const currentUser = React.useMemo(
    () => getUser(),
    [StorageService.getItem(AUTH.LS_CURRENT_USER_KEY)]
  );

  const value = {
    currentUser,
    getUser,
    setUser,
    removeUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
